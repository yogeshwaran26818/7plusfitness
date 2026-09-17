const ITEMS = [
  "7Plus Fitness",
  "Strength & HIIT Studio",
  "Sithalapakkam • Chennai",
  "Uncompromising Performance",
  "Train Hard. Recover Smart.",
];

const TICKER_COPIES = [0, 1];

export default function Marquee() {
  return (
    <section
      className="marquee-banner border-y border-edge bg-panel/70 py-5 sm:py-7 overflow-hidden"
      data-testid="marquee-section"
    >
      <div className="marquee-track flex min-w-max will-change-transform">
        {TICKER_COPIES.map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {ITEMS.map((text, index) => (
              <span
                key={`${copy}-${text}`}
                className="flex items-center font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight whitespace-nowrap"
              >
                <span
                  className={
                    index % 2 === 0 ? "px-6 text-white" : "px-6 text-outline"
                  }
                >
                  {text}
                </span>
                <span className="text-volt text-xl sm:text-2xl font-body font-bold">
                  •
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
