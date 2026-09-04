import { useEffect, useRef } from "react";

import styles from "./LogoParticles.module.css";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  ttl: number;
  size: number;
  r: number;
  g: number;
  b: number;
  spark: boolean;
};

type Bolt = {
  paths: number[][][];
  life: number;
  ttl: number;
  width: number;
  glow: number;
  flicker: boolean;
};

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function boltPath(x1: number, y1: number, x2: number, y2: number, jitter: number, segs?: number) {
  const n = segs ?? 6 + Math.floor(Math.random() * 5);
  const points = [[x1, y1]];
  for (let i = 1; i < n; i += 1) {
    const t = i / n;
    const fade = 1 - t * 0.25;
    points.push([
      x1 + (x2 - x1) * t + rand(-jitter, jitter) * fade,
      y1 + (y2 - y1) * t + rand(-jitter * 0.45, jitter * 0.45) * fade,
    ]);
  }
  points.push([x2, y2]);
  return points;
}

function forkBolt(x1: number, y1: number, x2: number, y2: number, branches: number) {
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const segs = Math.max(7, Math.round(dist / 38));
  const main = boltPath(x1, y1, x2, y2, Math.min(34, dist * 0.07), segs);
  const paths = [main];

  for (let i = 0; i < branches; i += 1) {
    const idx = 2 + Math.floor(Math.random() * Math.max(1, main.length - 4));
    const origin = main[idx];
    const t = idx / main.length;
    const ang = Math.atan2(y2 - y1, x2 - x1) + rand(-1.05, 1.05);
    const len = dist * rand(0.14, 0.42) * (1 - t * 0.25);
    const endX = origin[0] + Math.cos(ang) * len;
    const endY = origin[1] + Math.sin(ang) * len;
    const branch = boltPath(origin[0], origin[1], endX, endY, 11, 4 + Math.floor(Math.random() * 3));
    paths.push(branch);

    if (Math.random() > 0.55) {
      const mid = branch[Math.floor(branch.length / 2)];
      const twigAng = ang + rand(-0.8, 0.8);
      const twigLen = len * rand(0.28, 0.55);
      paths.push(
        boltPath(mid[0], mid[1], mid[0] + Math.cos(twigAng) * twigLen, mid[1] + Math.sin(twigAng) * twigLen, 8, 3)
      );
    }
  }

  return paths;
}

function strokePaths(
  ctx: CanvasRenderingContext2D,
  paths: number[][][],
  color: string,
  width: number,
  blur: number
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  paths.forEach((path, pathIdx) => {
    ctx.lineWidth = pathIdx === 0 ? width : width * 0.45;
    ctx.beginPath();
    path.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt[0], pt[1]);
      else ctx.lineTo(pt[0], pt[1]);
    });
    ctx.stroke();
  });
}

export function LogoParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const hero = canvas.closest("[data-hero]") ?? canvas.parentElement;
    const logo = hero?.querySelector<HTMLElement>("[data-hero-logo]");
    const logoImg = logo?.querySelector("img");
    const particles: Particle[] = [];
    const bolts: Bolt[] = [];
    const timers: number[] = [];
    let width = 0;
    let height = 0;
    let running = true;
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let nextEvent = 520;
    let nextStrike = 1500;
    let splitting = false;
    let flash = 0;
    let sheetX = 0.5;
    let wind = 0;
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    const moteCount = mobile ? 34 : 64;

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        if (!running) return;
        fn();
      }, ms);
      timers.push(id);
    };

    const logoTarget = () => {
      if (!logo) return { x: width * 0.5, y: height * 0.58, w: width * 0.42, h: height * 0.28 };
      const cr = canvas.getBoundingClientRect();
      const lr = logo.getBoundingClientRect();
      if (lr.width < 8) return { x: width * 0.5, y: height * 0.58, w: width * 0.42, h: height * 0.28 };
      return {
        x: lr.left + lr.width * 0.52 - cr.left,
        y: lr.top + lr.height * 0.5 - cr.top,
        w: lr.width,
        h: lr.height,
      };
    };

    const inBand = () => {
      const t = logoTarget();
      return {
        x: t.x + rand(-t.w * 0.46, t.w * 0.46),
        y: t.y + rand(-t.h * 0.38, t.h * 0.38),
      };
    };

    const paintMote = (): Particle => {
      const sky = Math.random() > 0.55;
      const cyan = Math.random() > 0.42;
      return {
        x: sky ? rand(width * 0.04, width * 0.96) : inBand().x,
        y: sky ? rand(height * 0.02, height * 0.72) : inBand().y,
        vx: rand(-18, 18),
        vy: sky ? rand(12, 46) : rand(-16, -3),
        life: 0,
        ttl: rand(2.2, 5.6),
        size: rand(0.45, 1.25),
        r: cyan ? 168 : 244,
        g: cyan ? 224 : 241,
        b: cyan ? 255 : 234,
        spark: false,
      };
    };

    const spawnSparkAt = (x: number, y: number, burst = false) => {
      const angle = rand(0, Math.PI * 2);
      const speed = burst ? rand(70, 220) : rand(40, 120);
      const hot = Math.random() > 0.82;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (burst ? 30 : 18),
        life: 0,
        ttl: burst ? rand(0.32, 0.85) : rand(0.26, 0.65),
        size: burst ? rand(0.9, 2.1) : rand(0.75, 1.55),
        r: hot ? 255 : 230,
        g: hot ? 150 : 248,
        b: hot ? 95 : 255,
        spark: true,
      });
    };

    const spawnBolt = (paths: number[][][], widthN: number, glow: number, ttl: number, flicker = true) => {
      bolts.push({ paths, life: 0, ttl, width: widthN, glow, flicker });
    };

    const spawnSkyBolt = (aimed = false) => {
      const t = logoTarget();
      const x1 = rand(width * 0.08, width * 0.92);
      const y1 = rand(-height * 0.08, height * 0.1);
      const x2 = aimed ? t.x + rand(-t.w * 0.38, t.w * 0.38) : x1 + rand(-width * 0.22, width * 0.22);
      const y2 = aimed ? t.y + rand(-t.h * 0.2, t.h * 0.12) : rand(height * 0.28, height * 0.7);
      const paths = forkBolt(x1, y1, x2, y2, mobile ? 1 : 1 + Math.floor(Math.random() * 3));
      spawnBolt(paths, rand(0.7, 1.15), 8, rand(0.1, 0.2));
    };

    const setStruck = (on: boolean) => {
      logo?.toggleAttribute("data-split", on);
    };

    const spawnStrike = () => {
      if (splitting) return;
      splitting = true;
      const t = logoTarget();
      const x1 = rand(width * 0.18, width * 0.82);
      const y1 = rand(-height * 0.06, height * 0.06);
      const x2 = t.x + rand(-t.w * 0.08, t.w * 0.08);
      const y2 = t.y + rand(-t.h * 0.06, t.h * 0.06);
      const paths = forkBolt(x1, y1, x2, y2, mobile ? 2 : 3 + Math.floor(Math.random() * 2));

      sheetX = x1 / Math.max(1, width);
      spawnBolt(paths, 0.7, 6, 0.12, false);

      later(() => {
        spawnBolt(paths, mobile ? 1.7 : 2.35, 18, 0.2);
        setStruck(true);
        const sparks = mobile ? 14 : 26;
        for (let i = 0; i < sparks; i += 1) spawnSparkAt(x2, y2, true);
        paths[0].forEach((pt, idx) => {
          if (idx % 3 === 0) spawnSparkAt(pt[0], pt[1]);
        });
      }, 90);

      later(() => {
        spawnBolt(paths, 1.1, 10, 0.1);
      }, 160);

      later(() => setStruck(false), 720);
      later(() => {
        splitting = false;
      }, 1500);
    };

    for (let i = 0; i < moteCount; i += 1) {
      const p = paintMote();
      p.life = rand(0, p.ttl);
      particles.push(p);
    }

    let resizeRaf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      const nextW = Math.max(1, canvas.clientWidth);
      const nextH = Math.max(1, canvas.clientHeight);
      const nextBw = Math.floor(nextW * dpr);
      const nextBh = Math.floor(nextH * dpr);
      if (canvas.width === nextBw && canvas.height === nextBh) return;
      width = nextW;
      height = nextH;
      canvas.width = nextBw;
      canvas.height = nextBh;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const scheduleResize = () => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        if (!running) return;
        resize();
      });
    };

    const tick = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) {
        last = now;
        return;
      }

      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      nextEvent -= dt * 1000;
      nextStrike -= dt * 1000;
      wind = Math.sin(now * 0.00045) * 26 + Math.sin(now * 0.00105) * 14;
      flash *= Math.exp(-dt * 6.2);

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      if (flash > 0.01) {
        const glow = ctx.createRadialGradient(sheetX * width, 0, 0, sheetX * width, height * 0.12, height * 0.72);
        glow.addColorStop(0, `rgba(214, 236, 255, ${flash * 0.42})`);
        glow.addColorStop(0.45, `rgba(170, 210, 255, ${flash * 0.16})`);
        glow.addColorStop(1, "rgba(170, 210, 255, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      if (nextEvent <= 0) {
        const roll = Math.random();
        if (roll < 0.28) {
          flash = Math.max(flash, rand(0.1, 0.22));
          sheetX = rand(0.18, 0.82);
        } else if (roll < 0.72) {
          spawnSkyBolt(false);
        } else {
          spawnSkyBolt(true);
          if (Math.random() > 0.55) later(() => spawnSkyBolt(Math.random() > 0.4), rand(40, 160));
        }
        nextEvent = rand(280, 1100);
      }

      if (nextStrike <= 0) {
        spawnStrike();
        nextStrike = rand(mobile ? 5200 : 4300, mobile ? 9200 : 8200);
        nextEvent = rand(700, 1400);
      }

      if (Math.random() < (mobile ? 0.07 : 0.13)) {
        const { x, y } = inBand();
        spawnSparkAt(x, y);
      }

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.life += dt;
        p.x += (p.vx + wind * (p.spark ? 0.15 : 0.55)) * dt;
        p.y += p.vy * dt;
        if (p.spark) {
          p.vy += 80 * dt;
        } else {
          p.x += Math.sin((p.life + p.y) * 1.4) * 6 * dt;
        }

        const t = p.life / p.ttl;
        if (t >= 1 || p.x < -12 || p.x > width + 12 || p.y < -12 || p.y > height + 12) {
          if (p.spark) particles.splice(i, 1);
          else particles[i] = paintMote();
          continue;
        }

        const fade = t < 0.18 ? t / 0.18 : t > 0.72 ? (1 - t) / 0.28 : 1;
        const alpha = fade * (p.spark ? 0.92 : 0.5);
        const glow = p.spark ? p.size * 3.2 : p.size * 2.6;

        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha * 0.22})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
        ctx.fill();

        if (p.spark) {
          ctx.strokeStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 0.045, p.y - p.vy * 0.045);
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.spark ? p.size * 1.2 : p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = bolts.length - 1; i >= 0; i -= 1) {
        const bolt = bolts[i];
        bolt.life += dt;
        const t = bolt.life / bolt.ttl;
        if (t >= 1) {
          bolts.splice(i, 1);
          continue;
        }

        const head = t < 0.18 ? t / 0.18 : 1;
        const tail = t > 0.42 ? 1 - (t - 0.42) / 0.58 : 1;
        const strobe = bolt.flicker && Math.random() > 0.78 ? 0.2 : 1;
        const alpha = head * tail * strobe;

        strokePaths(ctx, bolt.paths, `rgba(140, 200, 255, ${alpha * 0.35})`, bolt.width * 4.2, bolt.glow);
        strokePaths(ctx, bolt.paths, `rgba(210, 238, 255, ${alpha * 0.7})`, bolt.width * 1.7, bolt.glow * 0.45);
        strokePaths(ctx, bolt.paths, `rgba(255, 255, 255, ${alpha * 0.95})`, bolt.width, 0);
      }

      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "source-over";
    };

    resize();
    raf = requestAnimationFrame(tick);
    scheduleResize();

    const ro = new ResizeObserver(scheduleResize);
    if (hero) ro.observe(hero);
    window.addEventListener("resize", scheduleResize);
    logoImg?.addEventListener("load", scheduleResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    const onMotion = () => {
      if (motion.matches) running = false;
    };
    motion.addEventListener("change", onMotion);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      timers.forEach((id) => window.clearTimeout(id));
      setStruck(false);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("resize", scheduleResize);
      logoImg?.removeEventListener("load", scheduleResize);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden />;
}
