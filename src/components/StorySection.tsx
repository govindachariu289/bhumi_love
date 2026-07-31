import { motion } from "framer-motion";
import { chapters } from "../data/content";

function ChapterCard({ chapter, index }: { chapter: typeof chapters[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-6 py-20">
      {/* Accent glow */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full blur-[150px] opacity-[0.06] ${
          isEven ? "left-0 bg-rose-500" : "right-0 bg-blush-500"
        }`}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-12 md:flex-row md:gap-20">
        {/* Left: chapter meta */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`flex flex-col ${isEven ? "md:items-start md:text-left" : "md:items-end md:text-right md:order-2"} items-center text-center`}
        >
          <div className="glass flex h-16 w-16 items-center justify-center rounded-2xl text-2xl mb-6">
            {chapter.icon}
          </div>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-rose-400/70">
            {chapter.subtitle}
          </p>
          <p className="mt-2 font-display text-sm font-light italic text-white/40">
            {chapter.date}
          </p>
        </motion.div>

        {/* Right: content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`flex-1 ${isEven ? "" : "md:order-1"}`}
        >
          <h3 className="font-display text-3xl font-light tracking-tight text-white sm:text-5xl md:text-6xl">
            {chapter.title}
          </h3>
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-rose-400/40 to-transparent" />
          <p className="mt-6 max-w-xl text-sm leading-[1.9] text-white/50 sm:text-base">
            {chapter.text}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function StorySection() {
  return (
    <section id="story" className="relative py-20">
      {/* Section header */}
      <div className="flex flex-col items-center text-center px-6 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <p className="font-script text-2xl text-rose-400 sm:text-3xl">our journey</p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-white sm:text-5xl">
            How Our Story Unfolded
          </h2>
          <div className="mt-6 flex items-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-rose-400/60">✦</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </motion.div>
      </div>

      {/* Chapters */}
      <div className="space-y-0">
        {chapters.map((ch, i) => (
          <ChapterCard key={ch.id} chapter={ch} index={i} />
        ))}
      </div>
    </section>
  );
}
