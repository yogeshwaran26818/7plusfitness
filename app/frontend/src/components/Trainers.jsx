import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { TRAINERS } from "@/data";

export default function Trainers() {
  return (
    <section
      id="trainers"
      className="py-3 lg:py-5 px-4 sm:px-8 lg:px-16"
      data-testid="trainers-section"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-neon mb-4">
              The Coaches
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase leading-[0.95]">
              Coached By The
              <br />
              <span className="text-volt">Best In Chennai</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-md">
            Certified, competitive and genuinely invested in your numbers. Every
            coach programs, every coach tracks, every coach shows up.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TRAINERS.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative bg-panel border border-edge rounded-2xl overflow-hidden hover:border-volt/50 transition-colors"
              data-testid={`trainer-card-${t.id}`}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <h3
                    className="font-display text-2xl font-extrabold tracking-tight"
                    data-testid={`trainer-name-${t.id}`}
                  >
                    Mr. {t.name}
                  </h3>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.bio}
                </p>
                <div
                  className="mt-3 pt-3 border-t border-edge flex flex-wrap gap-x-4 gap-y-2"
                  data-testid={`trainer-certs-${t.id}`}
                >
                  {t.certs.map((c) => (
                    <span
                      key={c}
                      className="flex items-center gap-1.5 text-xs font-semibold text-volt"
                    >
                      <BadgeCheck size={14} /> {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
