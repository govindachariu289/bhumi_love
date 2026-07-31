import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { letterLines } from "../data/content";

function HandwritingText({ lines, started }: { lines: string[]; started: boolean }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= lines.length) clearInterval(iv);
      // auto scroll
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 350);
    return () => clearInterval(iv);
  }, [started, lines.length]);

  return (
    <div ref={containerRef} className="max-h-[50vh] overflow-y-auto pr-2 space-y-0">
      {lines.slice(0, visibleLines).map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`font-script text-base leading-relaxed sm:text-lg ${
            line === "" ? "h-4" :
            line.startsWith("Forever") || line.startsWith("Govindachari")
              ? "font-semibold text-rose-700 mt-2"
              : line.startsWith("My dearest")
                ? "text-xl text-rose-600 sm:text-2xl"
                : "text-rose-900/70"
          }`}
        >
          {line || "\u00A0"}
        </motion.p>
      ))}
      {started && visibleLines < lines.length && (
        <span
          className="inline-block w-[2px] h-4 bg-rose-400 ml-1"
          style={{ animation: "typewriter-blink 0.8s step-end infinite" }}
        />
      )}
    </div>
  );
}

export default function LoveLetterSection() {
  const [state, setState] = useState<"sealed" | "opening" | "reading">("sealed");

  const openEnvelope = () => {
    if (state !== "sealed") return;
    setState("opening");
    setTimeout(() => setState("reading"), 1200);
  };

  const close = () => setState("sealed");

  return (
    <section id="letter" className="relative py-24 px-6">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-script text-2xl text-rose-400 sm:text-3xl">a letter for you</p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-white sm:text-5xl">
            Open When You Miss Me
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-col items-center">
        {/* Envelope */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={openEnvelope}
          animate={state === "sealed" ? { y: [0, -10, 0] } : {}}
          className="perspective-1200 relative cursor-pointer select-none"
          style={{
            width: "min(90vw, 400px)",
            height: "min(55vw, 240px)",
            transition: state === "sealed" ? undefined : "none",
            animation: state === "sealed" ? "drift 3s ease-in-out infinite" : "none",
          }}
          role="button"
          aria-label="Open envelope"
        >
          {/* Envelope back */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600 shadow-2xl shadow-rose-500/30" />

          {/* Paper */}
          <motion.div
            animate={{ y: state !== "sealed" ? "-30%" : "5%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="paper absolute bottom-[3%] left-1/2 z-10 h-[90%] w-[86%] -translate-x-1/2 rounded-lg flex flex-col items-center justify-center p-4"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 animate-heartbeat mb-2">
              <path fill="#f472b6" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <p className="font-script text-sm text-rose-800/50">tap to read me</p>
          </motion.div>

          {/* Flap */}
          <motion.div
            animate={{ rotateX: state !== "sealed" ? 180 : 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 h-[55%] w-full"
            style={{
              transformOrigin: "top center",
              zIndex: state !== "sealed" ? 5 : 20,
            }}
          >
            <div
              className="h-full w-full rounded-t-2xl bg-gradient-to-b from-rose-300 to-rose-400"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />
          </motion.div>

          {/* Front pocket */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)",
              background: "linear-gradient(165deg, #f472b6, #e11d60)",
              zIndex: state !== "sealed" ? 6 : 30,
            }}
          />

          {/* Wax seal */}
          <motion.div
            animate={{
              opacity: state !== "sealed" ? 0 : 1,
              scale: state !== "sealed" ? 0 : 1,
              rotate: state !== "sealed" ? 90 : 0,
            }}
            transition={{ duration: 0.5 }}
            className="absolute left-1/2 top-[54%] z-40 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose-600 to-rose-800 shadow-xl ring-[3px] ring-rose-300/30"
          >
            <span className="text-xl">💗</span>
          </motion.div>
        </motion.div>

        <p className="mt-8 text-xs font-medium tracking-widest uppercase text-white/30">
          {state === "sealed" ? "✦ tap the envelope ✦" : "opening..."}
        </p>
      </div>

      {/* Reading modal */}
      <AnimatePresence>
        {state === "reading" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-2xl p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="paper relative w-full max-w-xl rounded-2xl px-8 py-10 sm:px-12 sm:py-14"
            >
              <button
                onClick={close}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-500 transition-all hover:rotate-90 hover:bg-rose-200"
              >
                ✕
              </button>

              <div className="mx-auto mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-600 shadow-lg">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path fill="#fff" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              <HandwritingText lines={letterLines} started={state === "reading"} />

              <div className="mt-8 flex justify-center">
                <button
                  onClick={close}
                  className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-6 py-2.5 text-xs font-semibold text-rose-600 ring-1 ring-rose-200 transition-all hover:bg-rose-100"
                >
                  💌 Put it back
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
