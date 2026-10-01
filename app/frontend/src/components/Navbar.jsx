import { useEffect, useState } from "react";
import { Zap, Menu, X } from "lucide-react";
import { scrollToId } from "@/data";

const LINKS = [
  { label: "Services", id: "services" },
  { label: "Workouts", id: "workouts" },
  { label: "Coaches", id: "trainers" },
  { label: "Pricing", id: "pricing" },
  { label: "Location", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);

  useEffect(() => {
    const updateStudioStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const minutes = now.getHours() * 60 + now.getMinutes();
      const opening = day === 0 ? 6 * 60 : 5 * 60;
      const closing = day === 0 ? 13 * 60 : 22 * 60;
      setStudioOpen(minutes >= opening && minutes < closing);
    };

    updateStudioStatus();
    const timer = window.setInterval(updateStudioStatus, 60000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-ink/90 backdrop-blur-xl border-b border-edge"
          : "border-b border-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 h-16 flex items-center justify-between gap-6">
        <button
          data-testid="nav-logo"
          onClick={() => go("hero")}
          className="flex items-center gap-2 shrink-0 group"
        >
          <span className="w-8 h-8 bg-volt text-ink flex items-center justify-center rounded-md transition-transform duration-300 group-hover:rotate-12">
            <Zap size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-2xl font-extrabold uppercase tracking-tight">
            7<span className="text-volt">plus</span> Fitness
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              onClick={() => go(l.id)}
              className="text-sm font-medium text-slate-300 hover:text-volt transition-colors uppercase tracking-widest"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden md:flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest">
            <span
              className={`w-2 h-2 rounded-full ${studioOpen ? "bg-volt" : "bg-ember"} animate-pulse`}
            />
            {studioOpen ? "STUDIO OPEN" : "STUDIO CLOSED"} · SITTALAPAKKAM
          </span>
          <button
            data-testid="nav-cta-book"
            onClick={() => go("contact")}
            className="hidden sm:inline-flex bg-volt text-ink font-bold text-sm uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-white transition-colors"
          >
            Book a Class
          </button>
          <button
            data-testid="nav-mobile-toggle"
            className="lg:hidden text-slate-200 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-edge bg-ink/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-1">
          {LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-mobile-link-${l.id}`}
              onClick={() => go(l.id)}
              className="text-left font-display text-2xl font-bold uppercase tracking-tight text-slate-200 hover:text-volt py-2 transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            data-testid="nav-mobile-cta-book"
            onClick={() => go("contact")}
            className="mt-3 bg-volt text-ink font-bold uppercase tracking-wider px-5 py-3 rounded-full"
          >
            Book a Class
          </button>
        </nav>
      )}
    </header>
  );
}
