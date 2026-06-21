"use client";

import { smoothScrollTo } from "./Navbar";

// ---- deterministic, good-looking QR-style matrix (decorative) ----
const SIZE = 25;
function buildMatrix(): boolean[][] {
  const m: boolean[][] = Array.from({ length: SIZE }, () =>
    Array(SIZE).fill(false),
  );
  let seed = 987654321;
  const rng = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let y = 0; y < SIZE; y++)
    for (let x = 0; x < SIZE; x++) m[y][x] = rng() > 0.54;

  const clearAround = (ox: number, oy: number) => {
    for (let y = -1; y < 8; y++)
      for (let x = -1; x < 8; x++) {
        const yy = oy + y;
        const xx = ox + x;
        if (yy >= 0 && yy < SIZE && xx >= 0 && xx < SIZE) m[yy][xx] = false;
      }
  };
  const finder = (ox: number, oy: number) => {
    for (let y = 0; y < 7; y++)
      for (let x = 0; x < 7; x++) {
        const edge = x === 0 || x === 6 || y === 0 || y === 6;
        const center = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        m[oy + y][ox + x] = edge || center;
      }
  };
  clearAround(0, 0);
  finder(0, 0);
  clearAround(SIZE - 7, 0);
  finder(SIZE - 7, 0);
  clearAround(0, SIZE - 7);
  finder(0, SIZE - 7);

  // clear center for logo
  const c0 = Math.floor(SIZE / 2) - 2;
  for (let y = 0; y < 5; y++)
    for (let x = 0; x < 5; x++) m[c0 + y][c0 + x] = false;
  return m;
}
const MATRIX = buildMatrix();
const CELL = 8;

export default function QRSection() {
  return (
    <section className="relative overflow-hidden bg-espresso py-24 sm:py-32">
      {/* soft glow */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-caramel/10 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        {/* QR card */}
        <div className="reveal flex justify-center lg:justify-start">
          <div className="animate-float rounded-[2rem] bg-warmwhite p-7 shadow-lift">
            <svg
              width="232"
              height="232"
              viewBox={`0 0 ${SIZE * CELL} ${SIZE * CELL}`}
              role="img"
              aria-label="DEMO CAFE menü QR kodu"
            >
              {MATRIX.flatMap((row, y) =>
                row.map((on, x) =>
                  on ? (
                    <rect
                      key={`${x}-${y}`}
                      x={x * CELL}
                      y={y * CELL}
                      width={CELL}
                      height={CELL}
                      rx={2}
                      fill="#3B2F2F"
                    />
                  ) : null,
                ),
              )}
              {/* center logo */}
              <g
                transform={`translate(${(SIZE * CELL) / 2}, ${(SIZE * CELL) / 2})`}
              >
                <circle r="20" fill="#C8A27C" />
                <rect x="-7" y="-8" width="14" height="16" rx="3" fill="#3B2F2F" />
              </g>
            </svg>
          </div>
        </div>

        {/* Copy */}
        <div>
          <p className="reveal label mb-4 text-caramel">Temassız Menü</p>
          <h2 className="reveal display text-4xl leading-tight text-warmwhite sm:text-5xl">
            Masanızdaki QR kodu okutun
          </h2>
          <p className="reveal mt-6 max-w-md text-base font-light leading-relaxed text-warmwhite/75">
            Telefonunuzun kamerasını masadaki koda doğrultun; saniyeler içinde tüm
            menümüz elinizde. Dilediğiniz lezzeti seçin, masanızdan sipariş verin —
            beklemek yok, garson aramak yok.
          </p>

          <div className="reveal mt-9 space-y-4">
            {[
              "Anında dijital menü erişimi",
              "Fotoğraflı, kategorili, her zaman güncel",
              "Masadan sipariş & paket sipariş",
            ].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-caramel text-sm font-bold text-espresso">
                  ✓
                </span>
                <span className="text-sm text-warmwhite/85">{t}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => smoothScrollTo("menu")}
            className="reveal mt-9 rounded-full bg-caramel px-8 py-3.5 text-sm font-semibold tracking-wide text-espresso transition-all duration-300 hover:scale-[1.03] hover:bg-warmwhite"
          >
            Menüyü Keşfet
          </button>
        </div>
      </div>
    </section>
  );
}
