import { motion } from "framer-motion";

const CHAPTERS = [
  {
    num: "01",
    title: "The Code",
    text: "Every block is periodised and coach-led. No random workouts, no junk volume — just measurable progress logged on the board each week.",
  },
  {
    num: "02",
    title: "Metabolic Capacity",
    text: "HIIT and conditioning that raises your ceiling. Heart-rate-zoned intervals engineered to torch calories and build a serious engine.",
  },
  {
    num: "03",
    title: "Recovery & Mobility",
    text: "Longevity is part of the program. Prehab, breathwork and decompression sessions keep you lifting hard for decades, not months.",
  },
];

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="py-12 lg:py-16 px-4 sm:px-8 lg:px-16"
      data-testid="manifesto-section"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono uppercase tracking-[0.3em] text-neon mb-4"
            >
              The Manifesto
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-[0.95]"
            >
              The 7plus
              <br />
              <span className="text-outline-volt">Method</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-slate-400 leading-relaxed max-w-sm"
            >
              Three chapters run every class on our floor. Read them once and
              you will understand why our members keep beating their own
              numbers.
            </motion.p>
          </div>

          <div className="flex flex-col">
            {CHAPTERS.map((c, i) => (
              <motion.article
                key={c.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group flex gap-6 sm:gap-10 py-7 border-t border-edge last:border-b hover:bg-panel/50 transition-colors px-2 sm:px-6"
                data-testid={`manifesto-chapter-${c.num}`}
              >
                <span className="font-display text-5xl sm:text-7xl font-black text-edgehi group-hover:text-volt transition-colors duration-300 leading-none">
                  {c.num}
                </span>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-3">
                    {c.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed max-w-xl">
                    {c.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
