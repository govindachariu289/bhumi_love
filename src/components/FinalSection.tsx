import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

function launchCelebration() {
  const defaults = {
    spread: 120,
    ticks: 140,
    gravity: 0.8,
    decay: 0.94,
    startVelocity: 35,
    colors: ["#fb7185", "#f472b6", "#fda4af", "#fecdd3", "#ffffff", "#f43f5e"],
  };
  const heart = confetti.shapeFromPath({
    path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
  });

  confetti({ ...defaults, particleCount: 100, origin: { x: 0.5, y: 0.6 }, shapes: [heart, "circle", "star"], scalar: 1.3 });
  setTimeout(() => {
    confetti({ ...defaults, particleCount: 60, angle: 60, origin: { x: 0, y: 0.7 }, shapes: [heart, "circle"] });
    confetti({ ...defaults, particleCount: 60, angle: 120, origin: { x: 1, y: 0.7 }, shapes: [heart, "circle"] });
  }, 300);
  setTimeout(() => {
    confetti({ ...defaults, particleCount: 80, origin: { x: 0.5, y: 0.4 }, shapes: [heart, "star"], scalar: 1.1 });
  }, 700);
}

function Stars() {
  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 2,
      dur: 2 + Math.random() * 4,
      delay: Math.random() * 5,
    })),
  []);

  return (
    <>
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

function Fireflies() {
  const flies = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 80,
      size: 3 + Math.random() * 4,
      dur: 4 + Math.random() * 6,
      delay: Math.random() * 6,
      fdx: (Math.random() - 0.5) * 100,
      fdy: (Math.random() - 0.5) * 80,
    })),
  []);

  return (
    <>
      {flies.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full bg-rose-300 shadow-[0_0_12px_rgba(251,113,133,0.8)]"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            width: f.size,
            height: f.size,
            ["--fdx" as string]: `${f.fdx}px`,
            ["--fdy" as string]: `${f.fdy}px`,
            animation: `firefly ${f.dur}s ease-in-out ${f.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

export default function FinalSection() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !fired.current) {
          fired.current = true;
          setTimeout(launchCelebration, 600);
        }
      },
      { threshold: 0.4 }
    );
    const el = document.getElementById("forever");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="forever" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Dark cinematic bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0510] to-[#0f0515]" />

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        <Stars />
        <Fireflies />
      </div>

      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-radial from-rose-500/10 via-rose-500/5 to-transparent blur-[80px] animate-glow-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        {/* Glowing heart */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 180, damping: 16 }}
          className="relative mb-10"
        >
          <div className="absolute inset-0 h-32 w-32 rounded-full bg-rose-500/20 blur-3xl animate-glow-pulse" />
          <div className="glass flex h-28 w-28 items-center justify-center rounded-full shadow-[0_0_60px_rgba(244,63,94,0.3)]">
            <svg viewBox="0 0 24 24" className="h-14 w-14 animate-heartbeat drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]">
              <defs>
                <linearGradient id="fHeart" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
              </defs>
              <path fill="url(#fHeart)" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </motion.div>

        {/* Names */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="font-display text-4xl font-light tracking-tight text-white text-glow sm:text-6xl md:text-7xl"
        >
          Govindachari <span className="text-gradient">❤️</span> Bhumika
        </motion.h2>

        {/* Poem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="mt-10 space-y-2"
        >
          <p className="font-display text-lg italic text-white/50 sm:text-xl">
            "Some stories are written in books.
          </p>
          <p className="font-display text-lg italic text-white/50 sm:text-xl">
            Ours was written inside a game...
          </p>
          <p className="font-display text-lg italic text-rose-300/70 sm:text-xl">
            and continued in my heart."
          </p>
        </motion.div>

        {/* Confetti button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <button
            onClick={launchCelebration}
            className="glass-btn shine inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-white/80"
          >
            <span>🎆</span> Celebrate Us
          </button>
          <button
            onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-8 py-3.5 text-sm font-medium text-white/40 transition-all hover:border-white/15 hover:text-white/60"
          >
            <span>↑</span> Back to Start
          </button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3 }}
          className="mt-16 font-script text-lg text-white/20"
        >
          made with all my heart, for you 💗
        </motion.p>
      </div>
    </section>
  );
}
