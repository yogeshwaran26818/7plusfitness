import { motion } from "framer-motion";
import { ArrowUpRight, Dumbbell, Salad, Users, UserRound } from "lucide-react";
import { SERVICES, scrollToId } from "@/data";

const ICONS = {
  manager: UserRound,
  classes: Users,
  nutrition: Salad,
  personal: Dumbbell,
};

export default function Services() {
  return (
    <section
      id="services"
      className="py-12 lg:py-16 px-4 sm:px-8 lg:px-16"
      data-testid="services-section"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-neon mb-4">
            Our Services
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-[0.95]">
            More Than A <span className="text-volt">Workout</span>
          </h2>
          <p className="mt-5 text-slate-400 text-base sm:text-lg leading-relaxed">
            Everything you need to train with purpose, stay consistent, and make
            progress that lasts.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.id];
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-edge bg-panel hover:border-volt/50 transition-colors"
                data-testid={`service-card-${service.id}`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
                  <span className="absolute top-4 left-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-ink/60 text-volt backdrop-blur-sm">
                    <Icon size={19} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                  <button
                    data-testid={`service-cta-${service.id}`}
                    onClick={() => scrollToId("contact")}
                    className="mt-6 inline-flex items-center gap-2 self-start text-sm font-bold uppercase tracking-widest text-neon hover:text-volt transition-colors"
                  >
                    Get started <ArrowUpRight size={16} />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
