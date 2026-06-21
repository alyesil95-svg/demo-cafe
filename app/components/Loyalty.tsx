"use client";

const FILLED = 7;
const TOTAL = 10;

export default function Loyalty() {
  return (
    <section className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="reveal mx-auto mb-12 max-w-2xl text-center">
          <p className="label mb-4">Sadakat Kartı</p>
          <h2 className="display text-4xl text-espresso sm:text-5xl">
            10 Kahve Al, 1 Bedava
          </h2>
          <p className="mt-5 text-base font-light text-muted">
            Her kahveniz sizi bir adım daha ödüle yaklaştırır. Dijital kartınız
            cebinizde, sadakatiniz bizim için değerli.
          </p>
        </div>

        {/* Digital card */}
        <div className="reveal mx-auto max-w-xl">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-espresso to-espresso-deep p-8 shadow-lift sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-caramel/15 blur-2xl" />
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="display text-2xl text-warmwhite">DEMO CAFE</p>
                <p className="label mt-1 text-caramel">Coffee Club</p>
              </div>
              <span className="rounded-full bg-warmwhite/10 px-3 py-1 text-xs font-medium text-warmwhite/80">
                {FILLED}/{TOTAL}
              </span>
            </div>

            {/* Cups */}
            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: TOTAL }).map((_, i) => {
                const filled = i < FILLED;
                const isReward = i === TOTAL - 1;
                return (
                  <div
                    key={i}
                    className={`flex aspect-square items-center justify-center rounded-2xl border transition-colors ${
                      filled
                        ? "border-caramel bg-caramel/20"
                        : isReward
                          ? "border-dashed border-caramel/60 bg-transparent"
                          : "border-warmwhite/15 bg-warmwhite/5"
                    }`}
                  >
                    <CupGlyph
                      filled={filled}
                      reward={isReward}
                    />
                  </div>
                );
              })}
            </div>

            {/* Progress */}
            <div className="mt-7">
              <div className="h-2 overflow-hidden rounded-full bg-warmwhite/10">
                <div
                  className="h-full rounded-full bg-caramel transition-[width] duration-700"
                  style={{ width: `${(FILLED / TOTAL) * 100}%` }}
                />
              </div>
              <p className="mt-3 text-center text-sm font-light text-warmwhite/75">
                Bedava kahvene{" "}
                <span className="font-semibold text-caramel">
                  {TOTAL - FILLED} kahve
                </span>{" "}
                kaldı!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CupGlyph({ filled, reward }: { filled: boolean; reward: boolean }) {
  const color = filled ? "#C8A27C" : reward ? "#C8A27C" : "#FFFCF7";
  const opacity = filled ? 1 : reward ? 0.9 : 0.25;
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      style={{ opacity }}
      aria-hidden
    >
      {reward && !filled ? (
        <path
          d="M12 3v18M3 12h18"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path
            d="M5 8h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z"
            stroke={color}
            strokeWidth="1.6"
            fill={filled ? color : "none"}
            fillOpacity={filled ? 0.35 : 0}
            strokeLinejoin="round"
          />
          <path
            d="M16 9h2.2a2 2 0 0 1 0 4H16"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M8 3.5c-.4.6-.4 1.2 0 1.8M11 3.5c-.4.6-.4 1.2 0 1.8"
            stroke={color}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
