import { useLayoutEffect, useRef } from "react";

type SectionBackdropProps = {
  src?: string;
  objectPosition?: string;
};

const SCALE = 1.18;
const SPEED = 0.22;

type ParallaxTarget = {
  img: HTMLImageElement;
  frame: Element;
};

const targets = new Set<ParallaxTarget>();
let raf = 0;
let listeners = 0;

function tick() {
  raf = 0;
  const viewH = window.innerHeight;

  targets.forEach(({ img, frame }) => {
    const rect = frame.getBoundingClientRect();
    if (rect.bottom < -120 || rect.top > viewH + 120) return;

    const delta = rect.top + rect.height / 2 - viewH / 2;
    const max = rect.height * ((SCALE - 1) / 2) * 0.85;
    const y = Math.max(-max, Math.min(max, -delta * SPEED));
    img.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${SCALE})`;
  });
}

function requestTick() {
  if (!raf) raf = requestAnimationFrame(tick);
}

function bindParallax(img: HTMLImageElement, frame: Element) {
  const target = { img, frame };
  targets.add(target);
  img.classList.add("is-parallax");

  if (listeners === 0) {
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
  }
  listeners += 1;
  requestTick();

  return () => {
    targets.delete(target);
    listeners -= 1;
    if (listeners === 0) {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }
    img.style.transform = "";
    img.classList.remove("is-parallax");
  };
}

export function useParallaxImage(frameSelector: string) {
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 700px)");
    const frame = img.closest(frameSelector) ?? img.parentElement;
    if (!frame) return;

    let unbind: (() => void) | undefined;

    const sync = () => {
      if (motion.matches || compact.matches) {
        unbind?.();
        unbind = undefined;
        return;
      }
      if (!unbind) unbind = bindParallax(img, frame);
    };

    sync();
    motion.addEventListener("change", sync);
    compact.addEventListener("change", sync);

    return () => {
      motion.removeEventListener("change", sync);
      compact.removeEventListener("change", sync);
      unbind?.();
    };
  }, [frameSelector]);

  return imgRef;
}

export function SectionBackdrop({ src, objectPosition = "center center" }: SectionBackdropProps) {
  const imgRef = useParallaxImage(".section-photo");

  if (!src) return null;

  return (
    <div className="section-media" aria-hidden="true">
      <img
        ref={imgRef}
        src={src}
        alt=""
        decoding="async"
        loading="lazy"
        style={{ objectPosition, transformOrigin: objectPosition }}
      />
    </div>
  );
}
