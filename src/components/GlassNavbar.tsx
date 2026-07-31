import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "story", label: "Story" },
  { id: "gallery", label: "Gallery" },
  { id: "letter", label: "Letter" },
  { id: "forever", label: "Forever" },
];

export default function GlassNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = LINKS.map((l) => document.getElementById(l.id));
      const y = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= y) { setActive(LINKS[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/40 backdrop-blur-2xl border-b border-white/[0.06] shadow-xl shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-blush-500 shadow-lg shadow-rose-500/30 transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path fill="#fff" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </span>
          <span className="font-display text-lg font-semibold tracking-wide text-white/90">
            G <span className="text-rose-400">&</span> B
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 sm:flex">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={cn(
                "relative rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-300",
                active === link.id
                  ? "text-white"
                  : "text-white/50 hover:text-white/80"
              )}
            >
              {active === link.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.1]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 sm:hidden"
          aria-label="Menu"
        >
          <span className={cn("h-px w-5 bg-white/70 transition-all duration-300", menuOpen && "translate-y-[4px] rotate-45")} />
          <span className={cn("h-px w-5 bg-white/70 transition-all duration-300", menuOpen && "-translate-y-[3px] -rotate-45")} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-0 right-0 border-b border-white/[0.06] bg-black/80 backdrop-blur-2xl p-6 sm:hidden"
        >
          <div className="flex flex-col gap-2">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={cn(
                  "rounded-xl px-4 py-3 text-left text-sm font-medium transition-all",
                  active === link.id ? "bg-white/[0.08] text-white" : "text-white/50"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
