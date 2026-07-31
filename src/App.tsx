import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AuroraBackground from "./components/AuroraBackground";
import CursorHearts from "./components/CursorHearts";
import CinematicIntro from "./components/CinematicIntro";
import GlassNavbar from "./components/GlassNavbar";
import HeroSection from "./components/HeroSection";
import StorySection from "./components/StorySection";
import PhotoStory from "./components/PhotoStory";
import LoveLetterSection from "./components/LoveLetterSection";
import ReasonsSection from "./components/ReasonsSection";
import FinalSection from "./components/FinalSection";
import MusicPlayer from "./components/MusicPlayer";

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-12 sm:py-16">
      <div className="flex items-center gap-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/[0.06]" />
        <div className="h-1 w-1 rounded-full bg-rose-400/20" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/[0.06]" />
      </div>
    </div>
  );
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="relative">
      {/* Cinematic intro */}
      <AnimatePresence>
        {!introComplete && (
          <CinematicIntro onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      {/* Ambient layers */}
      <AuroraBackground />
      <CursorHearts />

      {/* Main site */}
      <AnimatePresence>
        {introComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassNavbar />
            <MusicPlayer />

            <main className="relative z-10">
              <HeroSection />
              <SectionDivider />
              <StorySection />
              <SectionDivider />
              <PhotoStory />
              {/* Flows straight into the love letter */}
              <LoveLetterSection />
              <SectionDivider />
              <ReasonsSection />
              <SectionDivider />
              <FinalSection />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
