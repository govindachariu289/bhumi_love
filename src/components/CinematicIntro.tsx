import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

const LINES = [
  "Some stories begin by chance...",
  "Ours began inside a game.",
  "18 November 2025",
];

function TypewriterLine({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(iv);
        setTimeout(() => {
          setShowCursor(false);
          onDone?.();
        }, 900);
      }
    }, 60);
    return () => clearInterval(iv);
  }, [text, onDone]);

  return (
    <span>
      {displayed}
      {showCursor && (
        <span
          className="inline-block w-[2px] h-[1em] bg-rose-400 ml-1 align-middle"
          style={{ animation: "typewriter-blink 1s step-end infinite" }}
        />
      )}
    </span>
  );
}

export default function CinematicIntro({ onComplete }: Props) {
  const [phase, setPhase] = useState(0);

  const onLineDone = useCallback(() => {
    if (phase < LINES.length - 1) {
      setTimeout(() => setPhase((p) => p + 1), 600);
    } else {
      setTimeout(onComplete, 1000);
    }
  }, [phase, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-aurora absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/[0.07] blur-[120px]" />
        <div className="animate-aurora-r absolute top-1/3 left-1/3 h-[300px] w-[300px] rounded-full bg-blush-500/[0.05] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-2xl px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24, filter: "blur(4px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className={`font-display leading-relaxed tracking-wide ${
                phase === 2
                  ? "text-2xl font-light text-rose-300 sm:text-4xl md:text-5xl"
                  : "text-lg font-light text-white/70 sm:text-2xl md:text-3xl italic"
              }`}
            >
              <TypewriterLine
                key={phase}
                text={LINES[phase]}
                onDone={onLineDone}
              />
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-20 flex gap-2">
        {LINES.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-700 ${
              i <= phase ? "w-6 bg-rose-400/60" : "w-1 bg-white/10"
            }`}
          />
        ))}
      </div>

      {/* Skip */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        whileHover={{ opacity: 0.8 }}
        transition={{ delay: 1.5 }}
        onClick={onComplete}
        className="absolute bottom-8 right-8 z-20 rounded-full border border-white/[0.08] px-5 py-2 text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 transition-all hover:border-white/20 hover:text-white/70"
      >
        Skip intro
      </motion.button>
    </motion.div>
  );
}
