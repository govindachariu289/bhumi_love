import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { START_DATE } from "../data/content";

function LiveCounter() {
  const [days, setDays] = useState(0);
  const [hrs, setHrs] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    const tick = () => {
      const diff = Date.now() - START_DATE.getTime();
      if (diff < 0) { setDays(0); setHrs(0); setMins(0); setSecs(0); return; }
      const s = Math.floor(diff / 1000);
      setDays(Math.floor(s / 86400));
      setHrs(Math.floor((s % 86400) / 3600));
      setMins(Math.floor((s % 3600) / 60));
      setSecs(s % 60);
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const blocks = [
    { val: days, label: "Days" },
    { val: hrs, label: "Hours" },
    { val: mins, label: "Minutes" },
    { val: secs, label: "Seconds" },
  ];

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {blocks.map((b, i) => (
        <div key={b.label} className="flex items-center gap-3 sm:gap-4">
          <div className="text-center">
            <div className="font-display text-2xl font-semibold tabular-nums text-white sm:text-4xl">
              {String(b.val).padStart(b.label === "Days" ? 1 : 2, "0")}
            </div>
            <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/40">
              {b.label}
            </div>
          </div>
          {i < blocks.length - 1 && (
            <span className="text-xl font-light text-rose-400/40 sm:text-2xl">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

function RealisticHeart() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow rings */}
      <div className="absolute h-40 w-40 rounded-full bg-rose-500/10 blur-3xl animate-glow-pulse" />
      <div className="absolute h-28 w-28 rounded-full bg-rose-400/15 blur-2xl animate-glow-pulse" style={{ animationDelay: "0.5s" }} />

      <svg
        viewBox="0 0 24 24"
        className="relative h-20 w-20 animate-heartbeat drop-shadow-[0_0_30px_rgba(244,63,94,0.6)] sm:h-28 sm:w-28"
      >
        <defs>
          <linearGradient id="heroHeart" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="50%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
          <filter id="heartGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          fill="url(#heroHeart)"
          filter="url(#heartGlow)"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </div>
  );
}

export default function HeroSection() {
  const scrollToStory = () => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
        {/* Small tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="glass-light shine mb-10 inline-flex items-center gap-2 rounded-full px-5 py-2.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]" />
          <span className="text-xs font-medium tracking-widest uppercase text-white/60">
            Free Fire Social Island · 18 Nov 2025
          </span>
        </motion.div>

        {/* Names */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl font-light tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
        >
          <span className="block text-glow">Govindachari</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
          className="my-6 sm:my-8"
        >
          <RealisticHeart />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl font-light tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
        >
          <span className="block text-glow">Bhumika</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-10 max-w-lg text-sm leading-relaxed text-white/40 sm:text-base"
        >
          A story that began with a friend request and became the most beautiful
          chapter of our lives.
        </motion.p>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="glass mt-10 rounded-2xl px-8 py-5 sm:rounded-3xl"
        >
          <p className="mb-3 text-[10px] font-semibold tracking-[0.3em] uppercase text-white/30">
            Making memories for
          </p>
          <LiveCounter />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
          className="mt-10"
        >
          <button onClick={scrollToStory} className="glass-btn shine group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-medium text-white/80">
            <span>Begin Our Story</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-600 text-xs text-white transition-transform duration-500 group-hover:translate-x-1">
              ↓
            </span>
          </button>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <div className="h-8 w-[1px] bg-gradient-to-b from-transparent to-white/20" />
        <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-white/20">Scroll</span>
      </motion.div>
    </section>
  );
}
