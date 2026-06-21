"use client";

import { useState } from "react";
import Image from "next/image";
import { img } from "@/lib/menu";

export default function Reservation() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    guests: "2",
    date: "",
    time: "",
    note: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass =
    "w-full rounded-xl border border-espresso/15 bg-warmwhite px-4 py-3 text-sm text-espresso outline-none transition-colors placeholder:text-muted/60 focus:border-caramel";

  return (
    <section id="rezervasyon" className="bg-espresso">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        {/* Image */}
        <div className="relative min-h-[320px] overflow-hidden lg:min-h-full">
          <Image
            src={img("1559925393-8be0ec4767c8", 1100)}
            alt="DEMO CAFE terası"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/10 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="display text-3xl text-warmwhite sm:text-4xl">
              Sizi ağırlamak için sabırsızlanıyoruz
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-16 sm:px-12 lg:px-16">
          <p className="reveal label mb-4 text-caramel">Rezervasyon</p>
          <h2 className="reveal display text-4xl text-warmwhite sm:text-5xl">
            Masanızı ayırtın
          </h2>
          <p className="reveal mt-4 text-sm font-light text-warmwhite/70">
            Birkaç saniyede rezervasyon oluşturun; onayı en kısa sürede iletelim.
          </p>

          {sent ? (
            <div className="reveal mt-10 rounded-2xl bg-warmwhite/10 p-8 text-center backdrop-blur-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-caramel text-3xl text-espresso">
                ✓
              </div>
              <h3 className="display text-2xl text-warmwhite">
                Talebiniz alındı, {form.name.split(" ")[0] || "değerli misafir"}!
              </h3>
              <p className="mt-3 text-sm font-light text-warmwhite/75">
                {form.guests} kişilik masanız {form.date || "seçtiğiniz tarih"}{" "}
                {form.time && `· ${form.time}`} için hazırlanıyor. Onay için sizi
                arayacağız.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 rounded-full border border-caramel px-6 py-2.5 text-sm font-medium text-caramel transition-colors hover:bg-caramel hover:text-espresso"
              >
                Yeni Rezervasyon
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="reveal mt-9 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Ad Soyad"
                  className={inputClass}
                />
                <input
                  required
                  value={form.phone}
                  onChange={set("phone")}
                  inputMode="tel"
                  placeholder="Telefon"
                  className={inputClass}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <select value={form.guests} onChange={set("guests")} className={inputClass}>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1} Kişi
                    </option>
                  ))}
                </select>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={set("date")}
                  className={inputClass}
                />
                <input
                  required
                  type="time"
                  value={form.time}
                  onChange={set("time")}
                  className={inputClass}
                />
              </div>
              <textarea
                value={form.note}
                onChange={set("note")}
                rows={3}
                placeholder="Not (opsiyonel) — özel gün, pencere kenarı, vb."
                className={`${inputClass} resize-none`}
              />
              <button
                type="submit"
                className="w-full rounded-full bg-caramel py-4 text-sm font-semibold tracking-wide text-espresso transition-all duration-300 hover:scale-[1.01] hover:bg-warmwhite"
              >
                Rezervasyon Oluştur
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
