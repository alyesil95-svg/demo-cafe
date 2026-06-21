"use client";

import { useState } from "react";
import Image from "next/image";
import { img } from "@/lib/menu";
import { useCart } from "./CartProvider";

const WHATSAPP_NUMBER = "905555555555"; // demo number

export default function Cart() {
  const { lines, count, total, open, setOpen, inc, dec, remove, clear } =
    useCart();
  const [masa, setMasa] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const closeAll = () => {
    setOpen(false);
    window.setTimeout(() => setConfirmed(false), 300);
  };

  const tableOrder = () => {
    if (!lines.length) return;
    setConfirmed(true);
    clear();
  };

  const whatsappOrder = () => {
    if (!lines.length) return;
    const body =
      "Merhaba DEMO CAFE 👋%0APaket sipariş vermek istiyorum:%0A%0A" +
      lines
        .map(
          (l) =>
            `• ${l.qty}x ${l.item.name} — ₺${l.qty * l.item.price}`,
        )
        .join("%0A") +
      `%0A%0AToplam: ₺${total}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${body}`,
      "_blank",
      "noopener",
    );
  };

  return (
    <>
      {/* Floating cart button (bottom-left, opposite the AI assistant) */}
      {count > 0 && !open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-3 rounded-full bg-espresso px-5 py-3.5 text-warmwhite shadow-lift transition-all duration-300 hover:scale-105 hover:bg-espresso-deep"
          aria-label="Sepeti aç"
        >
          <CartIcon />
          <span className="text-sm font-semibold">Sepetim</span>
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-caramel px-1.5 text-xs font-bold text-espresso">
            {count}
          </span>
        </button>
      )}

      {/* Backdrop */}
      <div
        onClick={closeAll}
        className={`fixed inset-0 z-[60] bg-espresso-deep/50 backdrop-blur-sm transition-opacity duration-[400ms] ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-[100svh] w-full max-w-md flex-col bg-cream shadow-lift transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
          <div>
            <p className="label text-caramel-deep">Sepetim</p>
            <h3 className="display text-2xl text-espresso">Siparişin</h3>
          </div>
          <button
            onClick={closeAll}
            aria-label="Kapat"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-espresso/5 text-espresso transition-colors hover:bg-espresso/10"
          >
            ✕
          </button>
        </div>

        {confirmed ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600/15 text-4xl">
              ✓
            </div>
            <h4 className="display text-2xl text-espresso">
              Siparişin mutfağa iletildi!
            </h4>
            <p className="text-sm font-light text-muted">
              {masa
                ? `Masa ${masa} için siparişin hazırlanıyor. `
                : "Siparişin hazırlanıyor. "}
              Kısa süre içinde servis edilecek. Afiyet olsun ☕
            </p>
            <button
              onClick={closeAll}
              className="mt-2 rounded-full bg-espresso px-7 py-3 text-sm font-semibold text-warmwhite transition-colors hover:bg-caramel hover:text-espresso"
            >
              Harika!
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center text-muted">
            <CartIcon big />
            <p className="font-light">Sepetin henüz boş.</p>
            <button
              onClick={closeAll}
              className="mt-2 rounded-full border border-espresso/20 px-6 py-2.5 text-sm font-medium text-espresso transition-colors hover:bg-espresso hover:text-warmwhite"
            >
              Menüye Göz At
            </button>
          </div>
        ) : (
          <>
            {/* Lines */}
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {lines.map((l) => (
                <div key={l.item.id} className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={img(l.item.photo, 200)}
                      alt={l.item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <h4 className="font-serif text-base font-semibold text-espresso">
                        {l.item.name}
                      </h4>
                      <button
                        onClick={() => remove(l.item.id)}
                        className="text-xs text-muted transition-colors hover:text-espresso"
                        aria-label="Kaldır"
                      >
                        Kaldır
                      </button>
                    </div>
                    <span className="text-sm text-caramel-deep">
                      ₺{l.item.price}
                    </span>
                    <div className="mt-auto flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-espresso/15">
                        <button
                          onClick={() => dec(l.item.id)}
                          className="flex h-8 w-8 items-center justify-center text-espresso transition-colors hover:text-caramel-deep"
                          aria-label="Azalt"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-espresso">
                          {l.qty}
                        </span>
                        <button
                          onClick={() => inc(l.item.id)}
                          className="flex h-8 w-8 items-center justify-center text-espresso transition-colors hover:text-caramel-deep"
                          aria-label="Arttır"
                        >
                          +
                        </button>
                      </div>
                      <span className="ml-auto font-serif font-semibold text-espresso">
                        ₺{l.qty * l.item.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer / actions */}
            <div className="border-t border-espresso/10 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted">Toplam</span>
                <span className="display text-2xl text-espresso">₺{total}</span>
              </div>

              <label className="mb-3 block">
                <span className="label text-[0.6rem] text-caramel-deep">
                  Masa Numarası (masadan sipariş için)
                </span>
                <input
                  value={masa}
                  onChange={(e) => setMasa(e.target.value)}
                  inputMode="numeric"
                  placeholder="Örn. 12"
                  className="mt-1 w-full rounded-xl border border-espresso/15 bg-warmwhite px-4 py-2.5 text-sm text-espresso outline-none transition-colors focus:border-caramel"
                />
              </label>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={tableOrder}
                  className="w-full rounded-full bg-espresso py-3.5 text-sm font-semibold text-warmwhite transition-all duration-300 hover:bg-caramel hover:text-espresso"
                >
                  Masadan Sipariş Ver
                </button>
                <button
                  onClick={whatsappOrder}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-105"
                >
                  <WhatsAppIcon /> WhatsApp ile Paket Sipariş
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function CartIcon({ big }: { big?: boolean }) {
  const s = big ? 40 : 20;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 4h2l2.4 12.3a2 2 0 0 0 2 1.7h7.7a2 2 0 0 0 2-1.6L22 8H6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="21" r="1.4" fill="currentColor" />
      <circle cx="18" cy="21" r="1.4" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm5.8 14.16c-.24.68-1.4 1.3-1.94 1.34-.5.05-.97.23-3.26-.68-2.74-1.08-4.48-3.88-4.62-4.06-.13-.18-1.1-1.46-1.1-2.78s.7-1.97.94-2.24a1 1 0 0 1 .72-.34h.52c.17 0 .4-.06.62.47.24.56.8 1.94.87 2.08.07.14.12.3.02.48-.1.18-.15.3-.3.46-.14.18-.3.4-.44.53-.14.14-.3.3-.13.58.17.28.74 1.22 1.6 1.98 1.1.98 2.02 1.28 2.3 1.42.28.14.45.12.62-.07.17-.18.72-.84.92-1.13.2-.28.4-.23.67-.14.27.1 1.7.8 1.99.95.28.14.47.2.54.32.07.12.07.68-.17 1.35Z" />
    </svg>
  );
}
