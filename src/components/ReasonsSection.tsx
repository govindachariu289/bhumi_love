import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reasons } from "../data/content";
import { cn } from "../utils/cn";

function GlassBubble({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const sizes = ["h-36 w-36", "h-40 w-40", "h-32 w-32", "h-44 w-44", "h-36 w-36", "h-40 w-40"];
  // Removed unused drift variable

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.5, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: index * 0.08, type: "spring", stiffness: 180, damping: 18 }}
        whileHover={{ scale: 1.08, y: -5 }}
        onClick={() => setExpanded(true)}
        className={cn(
          "glass group relative flex flex-col items-center justify-center rounded-full cursor-pointer transition-shadow duration-500",
          "hover:shadow-[0_0_60px_rgba(244,63,94,0.15)] hover:border-rose-400/20",
          sizes[index % sizes.length]
        )}
      >
        <span className="text-2xl mb-1.5 transition-transform duration-300 group-hover:scale-125">
          {["💖", "👀", "🤍", "✨", "😂", "🫶"][index % 6]}
        </span>
        <span className="text-[11px] font-medium text-white/70 transition-colors duration-300 group-hover:text-white">
          {reason.title}
        </span>
      </motion.button>

      {/* Expanded modal */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-xl p-6"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="glass flex h-72 w-72 flex-col items-center justify-center rounded-full p-10 text-center sm:h-80 sm:w-80"
            >
              <span className="text-4xl mb-4">{["💖", "👀", "🤍", "✨", "😂", "🫶"][index % 6]}</span>
              <h4 className="font-display text-xl font-semibold text-white mb-3">{reason.title}</h4>
              <p className="text-sm leading-relaxed text-white/60">{reason.text}</p>
              <button
                onClick={() => setExpanded(false)}
                className="mt-4 text-xs font-medium text-rose-400/60 hover:text-rose-400"
              >
                close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ReasonsSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-script text-2xl text-rose-400 sm:text-3xl">why I love you</p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-white sm:text-5xl">
            Every Reason & More
          </h2>
          <p className="mt-4 text-sm text-white/30">Tap each bubble to reveal what's inside.</p>
        </motion.div>
      </div>

      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-6 sm:gap-8">
        {reasons.map((r, i) => (
          <GlassBubble key={r.title} reason={r} index={i} />
        ))}
      </div>
    </section>
  );
}
