import { motion } from "framer-motion";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { PRICING, scrollToId } from "@/data";

function PricingAction({ children, featured = false }) {
  return (
    <button
      onClick={() => scrollToId("contact")}
      className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold uppercase tracking-wider transition-colors ${featured ? "bg-volt text-ink hover:bg-white" : "border border-edgehi text-white hover:border-volt hover:text-volt"}`}
    >
      {children} <ArrowUpRight size={16} />
    </button>
  );
}

export default function Pricing() {
  const cards = PRICING.slice(0, 3);
  const yearly = PRICING[3];

  return (
    <section
      id="pricing"
      className="py-16 lg:py-20 px-4 sm:px-8 lg:px-16"
      data-testid="pricing-section"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-neon mb-4">
            Pricing & Memberships
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-[0.95]">
            Pay For Progress,
            <br />
            <span className="text-outline">Not Perks</span>
          </h2>
          <p className="mt-5 text-slate-400">
            Straightforward memberships for the way you train.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((plan, index) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 ${plan.featured ? "bg-elevated border-volt shadow-[0_0_50px_rgba(204,255,0,0.12)]" : "bg-panel border-edge"}`}
              data-testid={`pricing-card-${plan.id}`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-volt px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-ink">
                  <Sparkles size={12} /> Most Popular
                </span>
              )}
              <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight">
                {plan.name}
              </h3>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-5xl font-black tracking-tight">
                  {plan.price}
                </span>
                <span className="text-xs uppercase tracking-widest text-slate-500">
                  {plan.unit}
                </span>
              </div>
              <p className="mt-4 min-h-10 text-sm text-slate-400 leading-relaxed">
                {plan.desc}
              </p>
              <ul className="mt-6 space-y-2.5 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-slate-300"
                  >
                    <Check size={15} className="mt-0.5 shrink-0 text-volt" />
                    {feature}
                  </li>
                ))}
              </ul>
              <PricingAction featured={plan.featured}>{plan.cta}</PricingAction>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-5 grid lg:grid-cols-[1fr_auto] items-center gap-6 rounded-2xl border border-edge bg-panel p-6 sm:p-8"
          data-testid="pricing-yearly-banner"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-neon">
              Long-term commitment
            </p>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-display text-3xl font-extrabold uppercase">
                {yearly.name}
              </h3>
              <span className="font-display text-4xl font-black text-volt">
                {yearly.price}
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-500">
                {yearly.unit}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-400">{yearly.desc}</p>
          </div>
          <div className="lg:w-56">
            <PricingAction>{yearly.cta}</PricingAction>
          </div>
        </motion.div>

        <div
          className="mt-5 flex flex-col gap-4 rounded-2xl border border-volt/40 bg-volt/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          data-testid="pricing-pt-banner"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-neon">
              Dedicated coaching
            </p>
            <h3 className="mt-2 font-display text-3xl font-extrabold uppercase">
              Premium 1:1 Personal Training
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <span className="font-display text-4xl font-black text-volt">
              ₹5,000{" "}
              <small className="font-body text-xs uppercase tracking-widest text-slate-400">
                / month
              </small>
            </span>
            <PricingAction>Enquire for PT</PricingAction>
          </div>
        </div>
      </div>
    </section>
  );
}
