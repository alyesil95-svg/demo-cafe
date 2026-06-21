"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import {
  categories,
  menu,
  img,
  dietLabels,
  type CategoryId,
  type DietTag,
  type MenuItem,
} from "@/lib/menu";
import { useCart } from "./CartProvider";

const chipClass: Record<DietTag, string> = {
  popular: "bg-caramel/20 text-caramel-deep",
  vegan: "bg-emerald-600/12 text-emerald-700",
  vegetarian: "bg-emerald-600/12 text-emerald-700",
  glutensiz: "bg-espresso/8 text-espresso/70",
};

export default function Menu() {
  const [active, setActive] = useState<CategoryId>("kahveler");
  const grid = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);
  const entered = useRef(false);
  const { add, setOpen, count } = useCart();

  const items = menu.filter((m) => m.category === active);

  const playStagger = () => {
    const cards = grid.current?.querySelectorAll<HTMLElement>(".menu-card");
    if (!cards || !cards.length) return;
    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 34 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
        overwrite: true,
      },
    );
  };

  // first entrance when scrolled into view
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      gsap.set(grid.current?.querySelectorAll(".menu-card") || [], {
        autoAlpha: 1,
      });
      entered.current = true;
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          entered.current = true;
          playStagger();
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    if (grid.current) io.observe(grid.current);
    return () => io.disconnect();
  }, []);

  // re-stagger on category change (after first entrance)
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (entered.current) playStagger();
  }, [active]);

  return (
    <section id="menu" className="relative bg-warmwhite py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="reveal mx-auto mb-12 max-w-2xl text-center">
          <p className="label mb-4">Menümüz</p>
          <h2 className="display text-5xl text-espresso sm:text-6xl">
            Her Lokmada Bir Hikaye
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-muted">
            Özenle seçilmiş malzemeler, ustalıkla hazırlanan tarifler. Masanızdaki
            QR kodu okutarak tüm menümüzü keşfedin ve dilerseniz buradan sipariş
            verin.
          </p>
        </div>

        {/* Category tabs */}
        <div className="reveal mb-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                active === c.id
                  ? "bg-espresso text-warmwhite shadow-soft"
                  : "bg-cream text-espresso/70 hover:bg-caramel/15 hover:text-espresso"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={grid}
          className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <Card key={item.id} item={item} onAdd={() => add(item)} />
          ))}
        </div>

        {/* Order CTA strip */}
        <div className="reveal mt-16 overflow-hidden rounded-3xl bg-espresso px-8 py-10 text-center shadow-lift sm:px-12">
          <p className="label mb-3 text-caramel">Sipariş</p>
          <h3 className="display text-3xl text-warmwhite sm:text-4xl">
            Masandan ya da paket — lezzet bir tık uzakta
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm font-light text-warmwhite/75">
            Beğendiğin lezzetleri sepete ekle; masandan anında sipariş ver veya
            WhatsApp üzerinden paket sipariş oluştur.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-caramel px-8 py-3.5 text-sm font-semibold tracking-wide text-espresso transition-all duration-300 hover:scale-[1.03] hover:bg-warmwhite"
          >
            Sepeti Aç{count > 0 ? ` · ${count}` : ""}
          </button>
        </div>
      </div>
    </section>
  );
}

function Card({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd();
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1100);
  };

  return (
    <article className="menu-card group flex flex-col overflow-hidden rounded-2xl bg-cream shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={img(item.photo, 800)}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
        {item.tags.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span
                key={t}
                className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide backdrop-blur-sm ${chipClass[t]}`}
              >
                {dietLabels[t]}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="display text-xl text-espresso">{item.name}</h3>
          <span className="shrink-0 font-serif text-lg font-semibold text-caramel-deep">
            ₺{item.price}
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-muted">
          {item.desc}
        </p>
        <button
          onClick={handleAdd}
          className={`mt-4 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ${
            added
              ? "bg-emerald-600 text-white"
              : "bg-espresso text-warmwhite hover:bg-caramel hover:text-espresso"
          }`}
        >
          {added ? "Sepete Eklendi ✓" : "Sepete Ekle"}
        </button>
      </div>
    </article>
  );
}
