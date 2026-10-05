import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, TrendingUp } from "lucide-react";
import { GOOGLE_BUSINESS, TRANSFORMATIONS } from "@/data";
import TransformationGallery from "@/components/TransformationGallery";

function ReviewStars({ rating }) {
  return (
    <span className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, index) => (
        <Star key={index} size={16} className="fill-volt text-volt" />
      ))}
    </span>
  );
}

export default function SocialProof() {
  const [reviews, setReviews] = useState(GOOGLE_BUSINESS.reviews);
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    if (reviews.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [reviews.length]);

  const review = reviews[activeReview];
  const moveReview = (direction) => {
    setActiveReview(
      (current) => (current + direction + reviews.length) % reviews.length,
    );
  };

  return (
    <section
      id="proof"
      className="py-8 lg:py-12 px-4 sm:px-8 lg:px-16"
      data-testid="proof-section"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-neon mb-4">
            Social Proof
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-[0.95]">
            Proof Over <span className="text-volt">Promises</span>
          </h2>
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-400">
            {GOOGLE_BUSINESS.rating.toFixed(1)} / 5 member rating ·{" "}
            {GOOGLE_BUSINESS.reviewCount} reviews
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {TRANSFORMATIONS.map((transformation, index) => (
            <motion.div
              key={transformation.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-panel border border-edge rounded-2xl p-6 flex flex-col gap-3"
              data-testid={`transformation-${index}`}
            >
              <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
                <TrendingUp size={14} className="text-volt" />{" "}
                {transformation.label}
              </span>
              <div className="flex items-center gap-4 font-display font-black">
                <span className="text-3xl text-slate-500 line-through decoration-ember/70">
                  {transformation.from}
                </span>
                <span className="text-volt text-2xl">→</span>
                <span className="text-5xl text-white">{transformation.to}</span>
              </div>
              <span className="text-sm text-slate-400">
                {transformation.who}
              </span>
            </motion.div>
          ))}
        </div>

        <div
          className="relative overflow-hidden rounded-2xl border border-edge bg-panel p-5 sm:p-7 min-h-[220px]"
          data-testid="review-carousel"
        >
          {review ? (
            <motion.blockquote
              key={`${review.name}-${activeReview}`}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto max-w-3xl text-center"
              data-testid="live-review"
            >
              <div className="flex justify-center">
                <img
                  src={
                    review.photo ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=ccff00&color=0b0c0e`
                  }
                  alt=""
                  className="h-16 w-16 rounded-full border-2 border-volt object-cover"
                />
              </div>
              <div className="mt-5 flex flex-col items-center gap-2">
                <p className="font-display text-2xl font-extrabold uppercase">
                  {review.name}
                </p>
                <ReviewStars rating={review.rating} />
              </div>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300">
                “{review.text}”
              </p>
              <p className="mt-4 text-xs uppercase tracking-widest text-slate-500">
                {review.relativeTime} · Google review
              </p>
            </motion.blockquote>
          ) : null}

          {reviews.length > 1 && (
            <div className="absolute inset-x-5 bottom-5 flex items-center justify-between">
              <button
                onClick={() => moveReview(-1)}
                className="rounded-full border border-edgehi p-2 text-slate-300 hover:border-volt hover:text-volt"
                aria-label="Previous review"
              >
                <ArrowLeft size={17} />
              </button>
              <div className="flex gap-1.5">
                {reviews.map((item, index) => (
                  <button
                    key={`${item.name}-${index}`}
                    onClick={() => setActiveReview(index)}
                    className={`h-1.5 rounded-full transition-all ${index === activeReview ? "w-8 bg-volt" : "w-2 bg-edgehi"}`}
                    aria-label={`Show review ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => moveReview(1)}
                className="rounded-full border border-edgehi p-2 text-slate-300 hover:border-volt hover:text-volt"
                aria-label="Next review"
              >
                <ArrowRight size={17} />
              </button>
            </div>
          )}
        </div>

        <TransformationGallery />
      </div>
    </section>
  );
}
