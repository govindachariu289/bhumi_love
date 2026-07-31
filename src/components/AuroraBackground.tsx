import React, { useEffect, useRef, useMemo } from "react";

function SakuraPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 14,
        dur: 12 + Math.random() * 18,
        delay: -Math.random() * 30,
        dx: (Math.random() - 0.5) * 200,
        rot: 360 + Math.random() * 720,
        opacity: 0.2 + Math.random() * 0.4,
        scale: 0.6 + Math.random() * 0.5,
      })),
    []
  );
  return (
    <>
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: -20,
            width: p.size,
            height: p.size,
            ["--dx" as string]: `${p.dx}px`,
            ["--rot" as string]: `${p.rot}deg`,
            ["--o" as string]: p.opacity,
            ["--s" as string]: p.scale,
            animation: `sakura-fall ${p.dur}s linear ${p.delay}s infinite`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="rgba(244,114,182,0.6)" className="w-full h-full drop-shadow-sm">
            <ellipse cx="12" cy="8" rx="6" ry="8" transform="rotate(-20 12 12)" />
            <ellipse cx="12" cy="8" rx="6" ry="8" transform="rotate(20 12 12)" opacity="0.7" />
          </svg>
        </div>
      ))}
    </>
  );
}

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 16,
        dur: 16 + Math.random() * 14,
        delay: -Math.random() * 28,
        dx: (Math.random() - 0.5) * 120,
        rot: `${Math.random() * 360}deg`,
        opacity: 0.15 + Math.random() * 0.3,
      })),
    []
  );
  return (
    <>
      {hearts.map((h) => (
        <svg
          key={h.id}
          viewBox="0 0 24 24"
          className="absolute"
          style={{
            left: `${h.left}%`,
            bottom: -30,
            width: h.size,
            height: h.size,
            opacity: 0,
            ["--o" as string]: h.opacity,
            ["--dx" as string]: `${h.dx}px`,
            ["--rot" as string]: h.rot,
            animation: `float-up ${h.dur}s linear ${h.delay}s infinite`,
          }}
        >
          <path
            fill="rgba(251,113,133,0.7)"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      ))}
    </>
  );
}

function ParallaxGlow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let animId: number;
    const onMove = (e: MouseEvent) => {
      animId = requestAnimationFrame(() => {
        if (!ref.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(animId); };
  }, []);
  return <div ref={ref} className="absolute inset-0 transition-transform duration-700 ease-out">{children}</div>;
}

export default function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Deep base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Aurora blobs with parallax */}
      <ParallaxGlow>
        <div className="animate-aurora absolute -top-[20%] -left-[10%] h-[700px] w-[700px] rounded-full bg-gradient-to-br from-rose-500/15 via-blush-500/10 to-transparent blur-[120px]" />
        <div className="animate-aurora-r absolute top-[20%] -right-[15%] h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-blush-400/12 via-rose-600/8 to-transparent blur-[120px]" />
        <div className="animate-aurora-slow absolute -bottom-[20%] left-[20%] h-[800px] w-[800px] rounded-full bg-gradient-to-tr from-rose-400/10 via-blush-500/8 to-transparent blur-[140px]" />
        <div className="animate-aurora absolute top-[50%] left-[50%] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-blush-500/6 to-transparent blur-[80px]" />
      </ParallaxGlow>

      {/* Light rays */}
      <div className="absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-rose-400/5 via-transparent to-transparent" />
      <div className="absolute top-0 right-1/3 h-full w-px bg-gradient-to-b from-blush-400/4 via-transparent to-transparent" />

      {/* Floating elements */}
      <SakuraPetals />
      <FloatingHearts />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
}
