import { motion } from "framer-motion";
import {
  Activity,
  ClipboardCheck,
  Dumbbell,
  HeartPulse,
  MessageCircle,
  ScanLine,
} from "lucide-react";
import image1 from "../../../photo/Step1.jpg";
import image2 from "../../../photo/Step2.jpg";
import image3 from "../../../photo/Step3.jpg";
import image4 from "../../../photo/Step4.jpg";
import image5 from "../../../photo/Step5.jpg";
import image6 from "../../../photo/Step6.png";

const STEPS = [
  {
    title: "InBody Assessment",
    description: "Understand your body composition, muscle mass, and starting point.",
    image: image1,
    Icon: ScanLine,
  },
  {
    title: "Fitness Assessment",
    description: "Check your strength, mobility, endurance, and flexibility.",
    image: image2,
    Icon: Activity,
  },
  {
    title: "Health & Report Review",
    description: "Review your results and identify the right focus areas.",
    image: image3,
    Icon: ClipboardCheck,
  },
  {
    title: "Personal Consultation",
    description: "Talk through your goals, lifestyle, and assessment results.",
    image: image4,
    Icon: MessageCircle,
  },
  {
    title: "Personalized Training",
    description: "Get a training plan built around your body and goals.",
    image: image5,
    Icon: Dumbbell,
  },
  {
    title: "Progress Check-ins",
    description: "Track your progress and fine-tune your plan as you grow.",
    image: image6,
    Icon: HeartPulse,
  },
];

export default function AssessmentJourney() {
  return (
    <section
      id="fitness-assessment"
      className="px-4 py-10 sm:px-8 lg:px-16 lg:py-14"
      data-testid="assessment-journey-section"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-7 sm:mb-8">
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.3em] text-neon">
            Your Fitness Assessment Journey
          </p>
          <h2 className="font-display text-3xl font-extrabold uppercase leading-[0.95] sm:text-4xl lg:text-5xl">
            Train With A Plan, <span className="text-volt">Not A Guess.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {STEPS.map(({ title, description, image, Icon }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group overflow-hidden rounded-xl border border-edge bg-panel transition-colors hover:border-volt/50"
              data-testid={`assessment-step-${index + 1}`}
            >
              <div className="relative h-36 overflow-hidden sm:h-40 lg:h-36 xl:h-40">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover grayscale-[25%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-panel/90 via-transparent to-black/10" />
                <span className="absolute bottom-2.5 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-volt font-display text-xs font-black text-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-3 sm:p-4">
                <Icon size={17} className="mb-2 text-neon" strokeWidth={1.8} />
                <h3 className="font-display text-sm font-extrabold uppercase leading-tight tracking-tight sm:text-base">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
