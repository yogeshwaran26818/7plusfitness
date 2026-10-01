import { Zap, Instagram, Youtube, Facebook } from "lucide-react";
import { STUDIO, scrollToId } from "@/data";

export default function Footer() {
  return (
    <footer className="border-t border-edge bg-panel/60" data-testid="footer">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-8">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 bg-volt text-ink flex items-center justify-center rounded-md">
                <Zap size={18} strokeWidth={2.5} />
              </span>
              <span className="font-display text-2xl font-extrabold uppercase tracking-tight">
                7<span className="text-volt">plus</span> Fitness
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-400 max-w-sm leading-relaxed">
              Boutique strength & conditioning studio in the heart of
              Sithalapakkam, Chennai. Engineered for strength, forged in
              Chennai.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
                { icon: Facebook, label: "Facebook" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  data-testid={`footer-social-${label.toLowerCase()}`}
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-full border border-edgehi flex items-center justify-center text-slate-400 hover:text-volt hover:border-volt transition-colors"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Services", id: "services" },
                { label: "Workout Styles", id: "workouts" },
                { label: "Coaches", id: "trainers" },
                { label: "Pricing", id: "pricing" },
              ].map((l) => (
                <li key={l.id}>
                  <button
                    data-testid={`footer-link-${l.id}`}
                    onClick={() => scrollToId(l.id)}
                    className="text-sm text-slate-300 hover:text-volt transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500 mb-4">
              Studio
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              {STUDIO.addressShort}
            </p>
            <p className="mt-3 text-sm text-slate-300">
              {STUDIO.phoneInternational}
            </p>
            <p className="text-sm text-slate-300">{STUDIO.email}</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-edge flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-xs text-slate-500">
            © 2026 7plus Fitness. All rights reserved.
          </p>
          <p className="text-slate-500 uppercase tracking-widest font-display text-lg text-outline">
            Train Hard • Recover Harder
          </p>
        </div>
      </div>
    </footer>
  );
}
