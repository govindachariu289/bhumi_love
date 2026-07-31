import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 right-6 z-40"
    >
      <button
        onClick={() => setPlaying(!playing)}
        className={cn(
          "glass group relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500",
          "hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]",
          playing && "border-rose-400/30"
        )}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {/* Vinyl spinning disc */}
        <div className={cn(
          "absolute inset-1.5 rounded-full bg-gradient-to-br from-night-800 to-night-900 ring-1 ring-white/5",
          playing && "animate-spin-slow"
        )}>
          {/* Grooves */}
          <div className="absolute inset-2 rounded-full border border-white/5" />
          <div className="absolute inset-3.5 rounded-full border border-white/5" />
          {/* Center label */}
          <div className="absolute inset-[38%] rounded-full bg-gradient-to-br from-rose-400 to-rose-600" />
        </div>

        {/* Play/Pause icon */}
        <div className="relative z-10 text-white/80 transition-transform duration-300 group-hover:scale-110">
          {playing ? (
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="h-3.5 w-3.5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>

        {/* Pulse rings when playing */}
        {playing && (
          <>
            <span className="absolute inset-0 rounded-full border border-rose-400/30 animate-ping" style={{ animationDuration: "2s" }} />
          </>
        )}
      </button>
    </motion.div>
  );
}
