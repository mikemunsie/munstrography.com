import { useEffect, useRef } from "react";

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
};

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function boltPath(x1: number, y1: number, x2: number, y2: number, jitter: number) {
  const points = [[x1, y1]];
  const segs = 5 + Math.floor(Math.random() * 4);
  for (let i = 1; i < segs; i += 1) {
    const t = i / segs;
    points.push([x1 + (x2 - x1) * t + rand(-jitter, jitter), y1 + (y2 - y1) * t + rand(-jitter, jitter)]);
  }
  points.push([x2, y2]);
  return points;
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

    const particles: Particle[] = [];
    const bolts: Bolt[] = [];
    let width = 0;
    let height = 0;
    let running = true;
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let nextBolt = 900;
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    const moteCount = mobile ? 28 : 52;

    const inBand = () => ({
      x: rand(width * 0.1, width * 0.9),
      y: rand(height * 0.38, height * 0.62),
    });

    const paintMote = (): Particle => {
      const { x, y } = inBand();
      const cyan = Math.random() > 0.45;
      return {
        x,
        y,
        vx: rand(-12, 12),
        vy: rand(-18, -4),
        life: 0,
        ttl: rand(2.4, 5.8),
        size: rand(0.55, 1.35),
        r: cyan ? 168 : 244,
        g: cyan ? 224 : 241,
        b: cyan ? 255 : 234,
        spark: false,
      };
    };

    const spawnSpark = () => {
      const { x, y } = inBand();
      const angle = rand(0, Math.PI * 2);
      const speed = rand(40, 110);
      const hot = Math.random() > 0.85;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 20,
        life: 0,
        ttl: rand(0.28, 0.7),
        size: rand(0.8, 1.6),
        r: hot ? 255 : 230,
        g: hot ? 140 : 248,
        b: hot ? 90 : 255,
        spark: true,
      });
    };

    const spawnBolt = () => {
      const a = inBand();
      const b = { x: a.x + rand(-width * 0.22, width * 0.22), y: a.y + rand(-height * 0.12, height * 0.12) };
      const main = boltPath(a.x, a.y, b.x, b.y, 10);
      const paths = [main];
      if (Math.random() > 0.35) {
        const mid = main[Math.floor(main.length / 2)];
        paths.push(boltPath(mid[0], mid[1], mid[0] + rand(-28, 28), mid[1] + rand(-22, 22), 7));
      }
      bolts.push({ paths, life: 0, ttl: rand(0.12, 0.22) });
    };

    for (let i = 0; i < moteCount; i += 1) {
      const p = paintMote();
      p.life = rand(0, p.ttl);
      particles.push(p);
    }

    let resizeRaf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
      nextBolt -= dt * 1000;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      if (Math.random() < (mobile ? 0.08 : 0.14)) spawnSpark();
      if (nextBolt <= 0) {
        spawnBolt();
        nextBolt = rand(1400, 3200);
      }

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.life += dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.spark) {
          p.vy += 70 * dt;
        } else {
          p.x += Math.sin((p.life + p.y) * 1.4) * 6 * dt;
        }

        const t = p.life / p.ttl;
        if (t >= 1 || p.x < -10 || p.x > width + 10 || p.y < -10 || p.y > height + 10) {
          if (p.spark) {
            particles.splice(i, 1);
          } else {
            particles[i] = paintMote();
          }
          continue;
        }

        const fade = t < 0.18 ? t / 0.18 : t > 0.72 ? (1 - t) / 0.28 : 1;
        const alpha = fade * (p.spark ? 0.9 : 0.55);
        const glow = p.spark ? p.size * 3.2 : p.size * 2.8;

        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha * 0.22})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
        ctx.fill();

        if (p.spark) {
          ctx.strokeStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 0.05, p.y - p.vy * 0.05);
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
        const alpha = t < 0.25 ? t / 0.25 : 1 - (t - 0.25) / 0.75;
        ctx.shadowColor = "rgba(150, 220, 255, 0.9)";
        ctx.shadowBlur = 10;
        ctx.strokeStyle = `rgba(236, 250, 255, ${alpha * 0.9})`;
        ctx.lineWidth = 1.15;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        bolt.paths.forEach((path) => {
          ctx.beginPath();
          path.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt[0], pt[1]);
            else ctx.lineTo(pt[0], pt[1]);
          });
          ctx.stroke();
        });
      }

      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "source-over";
    };

    resize();
    raf = requestAnimationFrame(tick);
    scheduleResize();

    const cluster = canvas.parentElement;
    const logoImg = cluster?.querySelector("img");
    const ro = new ResizeObserver(scheduleResize);
    if (cluster) ro.observe(cluster);
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
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("resize", scheduleResize);
      logoImg?.removeEventListener("load", scheduleResize);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden />;
}
