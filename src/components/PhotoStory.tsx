import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { photoStories, type PhotoStoryItem } from "../data/content";
import { cn } from "../utils/cn";

/* ── Smart image: renders the photo, or an elegant glass frame if missing ── */
function StoryImage({ item }: { item: PhotoStoryItem }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-white/[0.04] via-transparent to-rose-500/[0.06]">
        <div className="glass flex h-16 w-16 items-center justify-center rounded-full">
          <svg viewBox="0 0 24 24" className="animate-heartbeat h-7 w-7">
            <path
              fill="rgba(251,113,133,0.8)"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </div>
        <p className="px-8 text-center font-script text-lg text-white/30">{item.caption}</p>
      </div>
    );
  }

  return (
    <img
      src={item.src}
      alt={item.caption}
      loading="lazy"
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: item.position }}
    />
  );
}

/* ── One full-screen story panel ── */
function StoryPanel({
  item,
  index,
  registerRef,
}: {
  item: PhotoStoryItem;
  index: number;
  registerRef: (el: HTMLElement | null) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax: photo drifts slower than the page
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [1.12, 1, 1, 1.08]);
  // Caption card rises in
  const cardY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);
  // Ghost number parallax (opposite direction)
  const numY = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);

  useEffect(() => {
    registerRef(ref.current);
  }, [registerRef]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
    >
      {/* Giant ghost numeral */}
      <motion.span
        style={{ y: numY }}
        aria-hidden
        className={cn(
          "pointer-events-none absolute select-none font-display font-semibold leading-none text-white/[0.035]",
          "text-[16rem] sm:text-[22rem] md:text-[28rem]",
          index % 2 === 0 ? "left-[-4%] top-[6%]" : "right-[-4%] bottom-[4%]"
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* Soft ambient tint per photo */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-gradient-to-br to-transparent blur-[130px] opacity-40",
          item.tint,
          index % 2 === 0 ? "right-[8%] top-[18%]" : "left-[8%] bottom-[18%]"
        )}
      />

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        {/* Photo frame */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Glow behind frame */}
          <div className="absolute -inset-3 rounded-[2.4rem] bg-gradient-to-br from-rose-500/15 via-transparent to-blush-500/10 blur-2xl" />

          <div className="relative h-[58vh] overflow-hidden rounded-[2rem] ring-1 ring-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.55)] sm:h-[66vh]">
            {/* Parallax image layer (oversized so edges never show) */}
            <motion.div style={{ y: imgY, scale: imgScale }} className="absolute -inset-[6%]">
              <StoryImage item={item} />
            </motion.div>

            {/* Cinematic vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/[0.06]" />

            {/* Small index chip, top-left */}
            <div className="glass-light absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.25em] uppercase text-white/70">
              {String(index + 1).padStart(2, "0")} / {String(photoStories.length).padStart(2, "0")}
            </div>
          </div>

          {/* Glass caption card */}
          <motion.div
            style={{ y: cardY, opacity: cardOpacity }}
            className="absolute -bottom-9 left-1/2 w-[86%] -translate-x-1/2"
          >
            <div className="glass shine rounded-2xl px-6 py-4 text-center">
              <p className="font-script text-xl leading-snug text-white sm:text-2xl">
                {item.caption}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Full section: header + six panels + progress rail ── */
export default function PhotoStory() {
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  const registerRef = (i: number) => (el: HTMLElement | null) => {
    panelRefs.current[i] = el;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = panelRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (i: number) => {
    panelRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="gallery" className="relative">
      {/* Header */}
      <div className="flex flex-col items-center px-6 pt-24 pb-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-script text-2xl text-rose-400 sm:text-3xl">six frames of you</p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-white sm:text-5xl">
            A Story in Pictures
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/30">
            Scroll slowly. Each frame is a moment I keep coming back to.
          </p>
        </motion.div>
      </div>

      {/* Progress rail */}
      <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
        {photoStories.map((_, i) => (
          <button
            key={i}
            onClick={() => jumpTo(i)}
            aria-label={`Go to photo ${i + 1}`}
            className="group relative flex h-6 w-6 items-center justify-center"
          >
            <span
              className={cn(
                "block rounded-full transition-all duration-500",
                active === i
                  ? "h-6 w-[3px] bg-gradient-to-b from-rose-400 to-rose-600 shadow-[0_0_10px_rgba(251,113,133,0.7)]"
                  : "h-[6px] w-[6px] bg-white/15 group-hover:bg-white/40"
              )}
            />
          </button>
        ))}
      </div>

      {/* Six full-screen story panels */}
      <div className="space-y-24 py-16">
        {photoStories.map((item, i) => (
          <StoryPanel
            key={item.src}
            item={item}
            index={i}
            registerRef={registerRef(i)}
          />
        ))}
      </div>
    </section>
  );
}
