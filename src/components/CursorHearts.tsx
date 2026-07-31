import { useEffect, useRef } from "react";

const HEARTS = ["♥", "❤", "💗", "💖"];

export default function CursorHearts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawn = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastSpawn.current < 120) return;
      lastSpawn.current = now;

      const el = document.createElement("span");
      el.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      el.style.cssText = `
        position:fixed;
        left:${e.clientX + (Math.random() * 20 - 10)}px;
        top:${e.clientY - 10}px;
        pointer-events:none;
        z-index:70;
        font-size:${10 + Math.random() * 10}px;
        color:rgba(251,113,133,${0.4 + Math.random() * 0.3});
        transition:all 1s cubic-bezier(0.22,1,0.36,1);
        will-change:transform,opacity;
      `;
      containerRef.current?.appendChild(el);
      requestAnimationFrame(() => {
        el.style.transform = `translateY(-40px) rotate(${Math.random() * 30 - 15}deg) scale(${0.5 + Math.random() * 0.5})`;
        el.style.opacity = "0";
      });
      setTimeout(() => el.remove(), 1050);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={containerRef} aria-hidden className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" />;
}
