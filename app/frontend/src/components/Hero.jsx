import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { GOOGLE_BUSINESS, HERO_BG, scrollToId } from "@/data";

const EASE = [0.16, 1, 0.3, 1];

function MaskLine({ children, delay }) {
  return (
    <span className="mask-line">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end"
      data-testid="hero-section"
    >
      <motion.div
        initial={{ scale: 1.05, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="absolute inset-0 -z-0"
        aria-hidden="true"
      >
        <img
          src={HERO_BG}
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center"
          data-testid="hero-bg-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/20 to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 pt-36 pb-20 lg:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-neon mb-6 flex items-center gap-3"
          data-testid="hero-eyebrow"
        >
          <span className="w-10 h-px bg-neon inline-block" />
          Strength & HIIT Studio — Sithalapakkam, Chennai
        </motion.p>

        <h1
          className="font-display font-black uppercase leading-[0.88] tracking-tight text-[clamp(3.4rem,10vw,8.75rem)]"
          data-testid="hero-heading"
        >
          <MaskLine delay={0.25}>Engineered</MaskLine>
          <MaskLine delay={0.4}>
            For <span className="text-volt">Strength.</span>
          </MaskLine>
          <MaskLine delay={0.55}>
            <span className="text-outline">Forged in</span> Chennai.
          </MaskLine>
        </h1>

        <div className="mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
            className="max-w-md text-base sm:text-lg text-slate-300 leading-relaxed"
            data-testid="hero-tagline"
          >
            A boutique coaching floor built for one thing — progress you can
            measure. 45-minute sessions. Real barbells. Zero ego.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease: EASE }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-cta-book"
              onClick={() => scrollToId("contact")}
              className="group inline-flex items-center gap-3 bg-volt text-ink font-display font-extrabold uppercase tracking-wide text-xl px-8 py-4 rounded-full hover:bg-white transition-colors"
            >
              Book a Class
              <ArrowUpRight
                size={22}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </button>
            <button
              data-testid="hero-cta-pricing"
              onClick={() => scrollToId("pricing")}
              className="inline-flex items-center gap-2 border border-slate-500/60 text-white font-semibold uppercase tracking-wider text-sm px-7 py-4 rounded-full hover:border-volt hover:text-volt transition-colors"
            >
              View Passes
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6"
          data-testid="hero-stats"
        >
          {[
            { v: "700+", l: "Members Strong" },
            { v: `${GOOGLE_BUSINESS.rating.toFixed(1)}★`, l: "Member Rating" },
            { v: "03", l: "Core Disciplines" },
          ].map((s) => (
            <div key={s.l} className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-extrabold text-white">
                {s.v}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {s.l}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 right-6 lg:right-16 hidden sm:flex items-center gap-2 text-slate-400 text-xs uppercase tracking-[0.25em]"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.div>
    </section>
  );
}
