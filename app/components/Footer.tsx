"use client";

import { smoothScrollTo } from "./Navbar";

const LINKS = [
  { id: "anasayfa", label: "Ana Sayfa" },
  { id: "menu", label: "Menü" },
  { id: "hakkimizda", label: "Hakkımızda" },
  { id: "galeri", label: "Galeri" },
  { id: "rezervasyon", label: "Rezervasyon" },
];

export default function Footer() {
  return (
    <footer className="bg-espresso-deep text-warmwhite">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rotate-45 rounded-[2px] bg-caramel" />
              <span className="display text-2xl font-semibold">DEMO CAFE</span>
            </div>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-warmwhite/60">
              Lezzetin ve keyfin buluştuğu yer. İzmir&apos;in kalbinde, her anınıza
              değer katan sıcacık bir durak.
            </p>
            <div className="mt-6 flex gap-3">
              <Social label="Instagram">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.9.07s-3.63 0-4.9-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.5 0-4.74.07-.9.04-1.38.2-1.7.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.28.8-.32 1.7C3.42 9.08 3.4 9.44 3.4 12s.02 2.92.09 4.16c.04.9.2 1.38.32 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.28 1.7.32 1.24.07 1.6.09 4.74.09s3.5-.02 4.74-.09c.9-.04 1.38-.2 1.7-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.28-.8.32-1.7.07-1.24.09-1.6.09-4.16s-.02-2.92-.09-4.16c-.04-.9-.2-1.38-.32-1.7a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.12-.8-.28-1.7-.32C15.5 4 15.14 4 12 4Zm0 3.06A4.94 4.94 0 1 1 7.06 12 4.94 4.94 0 0 1 12 7.06Zm0 1.8A3.14 3.14 0 1 0 15.14 12 3.14 3.14 0 0 0 12 8.86Zm5.13-3.2a1.15 1.15 0 1 1-1.15 1.15 1.15 1.15 0 0 1 1.15-1.15Z" />
              </Social>
              <Social label="Facebook">
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
              </Social>
              <Social label="X">
                <path d="M17.3 3h3.3l-7.2 8.2L22 21h-6.6l-5.2-6.8L4.3 21H1l7.7-8.8L2 3h6.8l4.7 6.2L17.3 3Zm-1.16 16h1.83L7.94 4.9H6L16.14 19Z" />
              </Social>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="label mb-5 text-caramel">Keşfet</h4>
            <ul className="space-y-3">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => smoothScrollTo(l.id)}
                    className="text-sm font-light text-warmwhite/70 transition-colors hover:text-caramel"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="label mb-5 text-caramel">İletişim</h4>
            <ul className="space-y-3 text-sm font-light text-warmwhite/70">
              <li>İzmir · Alsancak</li>
              <li>Kıbrıs Şehitleri Cd. No:12</li>
              <li>
                <a href="tel:+902320000000" className="hover:text-caramel">
                  +90 232 000 00 00
                </a>
              </li>
              <li>
                <a href="mailto:merhaba@democafe.com" className="hover:text-caramel">
                  merhaba@democafe.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="label mb-5 text-caramel">Çalışma Saatleri</h4>
            <ul className="space-y-3 text-sm font-light text-warmwhite/70">
              <li className="flex justify-between gap-4">
                <span>Pzt – Cum</span>
                <span className="text-warmwhite/90">08:00 – 24:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Cmt – Paz</span>
                <span className="text-warmwhite/90">09:00 – 01:00</span>
              </li>
              <li className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Şu an açık
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-warmwhite/10 pt-6 sm:flex-row">
          <p className="text-xs font-light text-warmwhite/50">
            © 2026 DEMO CAFE · Tüm hakları saklıdır.
          </p>
          <p className="text-xs font-light text-warmwhite/50">
            Designed by{" "}
            <span className="font-medium text-caramel">ALY Ajans</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function Social({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-warmwhite/8 text-warmwhite/80 transition-colors hover:bg-caramel hover:text-espresso"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        {children}
      </svg>
    </a>
  );
}
