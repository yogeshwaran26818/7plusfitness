import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { WORKOUTS, scrollToId } from "@/data";

export default function WorkoutStyles() {
  return (
    <section
      id="workouts"
      className="py-12 lg:py-16 px-4 sm:px-8 lg:px-16"
      data-testid="workouts-section"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-neon mb-4">
            Workout Styles
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-[0.95]">
            Three Disciplines.
            <br />
            <span className="text-outline">One Engine.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {WORKOUTS.map((w, i) => (
            <motion.article
              key={w.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative bg-panel border border-edge rounded-2xl overflow-hidden hover:border-neon/50 transition-colors"
              data-testid={`workout-card-${w.id}`}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={w.img}
                  alt={w.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
                <span className="absolute top-4 left-5 font-display text-5xl font-black text-outline-volt">
                  {w.num}
                </span>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight">
                  {w.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  {w.desc}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {w.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 text-sm text-slate-300"
                    >
                      <Check
                        size={15}
                        className="text-volt mt-0.5 shrink-0"
                        strokeWidth={3}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
                <button
                  data-testid={`workout-book-${w.id}`}
                  onClick={() => scrollToId("contact")}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neon hover:text-volt transition-colors"
                >
                  Book this session
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
