"use client";

import Image from "next/image";
import { img } from "@/lib/menu";

const REVIEWS = [
  {
    name: "Elif Yıldız",
    text: "İzmir'de bu kadar samimi ve kaliteli bir mekan görmedim. Kahveleri efsane, cheesecake bir harika!",
    color: "#C8A27C",
  },
  {
    name: "Mert Demir",
    text: "Taş fırın pizza tam kıvamında. Ekip çok ilgili, atmosfer muhteşem. Sürekli geleceğim.",
    color: "#B08856",
  },
  {
    name: "Zeynep Kaya",
    text: "Sabah kahvaltısı için favori yerim oldu. Avokado tost ve flat white kombini mükemmel.",
    color: "#3B2F2F",
  },
  {
    name: "Can Aksoy",
    text: "Burgerler gerçekten gurme. Truffle burger mutlaka denenmeli. Kesinlikle tavsiye ederim.",
    color: "#C8A27C",
  },
  {
    name: "Ayşe Şahin",
    text: "Tasarımı, lezzeti, servisi... her detay düşünülmüş. Kendimi çok özel hissettim.",
    color: "#B08856",
  },
  {
    name: "Burak Çelik",
    text: "Cold brew ve tiramisu ile akşamüstü keyfi. Fiyatlar da gayet makul. 10 numara!",
    color: "#3B2F2F",
  },
];

const INSTA = [
  "1607013251379-e6eecfffe234",
  "1595854341625-f33ee10dbf94",
  "1541167760496-1628856ab772",
  "1571877227200-a0d98ea607e9",
  "1517701550927-30cf4ba1dba5",
  "1550547660-d9450f859349",
];

export default function Reviews() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header with Google rating */}
        <div className="reveal mx-auto mb-14 max-w-2xl text-center">
          <p className="label mb-4">Misafirlerimiz</p>
          <h2 className="display text-4xl text-espresso sm:text-5xl">
            Sevgiyle anlatıyorlar
          </h2>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-warmwhite px-5 py-2.5 shadow-soft">
            <GoogleG />
            <Stars />
            <span className="text-sm font-semibold text-espresso">
              4,9 · 1.200+ değerlendirme
            </span>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <article
              key={r.name}
              className="reveal flex flex-col rounded-2xl bg-warmwhite p-7 shadow-soft transition-transform duration-500 hover:-translate-y-1"
              data-reveal-delay={(i % 3) * 0.08}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-warmwhite"
                    style={{ background: r.color }}
                  >
                    {r.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div>
                    <p className="font-serif text-base font-semibold text-espresso">
                      {r.name}
                    </p>
                    <p className="text-xs text-muted">Google&apos;da değerlendirdi</p>
                  </div>
                </div>
                <GoogleG small />
              </div>
              <Stars />
              <p className="mt-4 text-sm font-light leading-relaxed text-muted">
                “{r.text}”
              </p>
            </article>
          ))}
        </div>

        {/* Instagram */}
        <div className="reveal mt-20 text-center">
          <p className="label mb-3">Instagram</p>
          <h3 className="display text-3xl text-espresso sm:text-4xl">@democafe</h3>
          <p className="mt-3 text-sm font-light text-muted">
            Günlük lezzetler ve anlar için bizi takip edin.
          </p>
        </div>
        <div className="reveal mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {INSTA.map((p) => (
            <a
              key={p}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={img(p, 400)}
                alt="Instagram gönderisi"
                fill
                sizes="(max-width: 640px) 33vw, 16vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-espresso/0 text-warmwhite opacity-0 transition-all duration-500 group-hover:bg-espresso/40 group-hover:opacity-100">
                <HeartIcon />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F5B400">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleG({ small }: { small?: boolean }) {
  const s = small ? 16 : 20;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.3c-.2-.7-.4-1.4-.4-2.3s.1-1.6.4-2.3V6.6H1.4C.5 8.2 0 10 0 12s.5 3.8 1.4 5.4l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 21s-7.5-4.6-10-9.2C.5 8.6 2 5 5.3 5c2 0 3.3 1.1 4.2 2.3.4.6 1.1.6 1.5 0C11.9 6.1 13.2 5 15.2 5 18.5 5 20 8.6 18.5 11.8 16 16.4 12 21 12 21z" />
    </svg>
  );
}
