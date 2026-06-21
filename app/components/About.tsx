"use client";

import Image from "next/image";
import { img } from "@/lib/menu";

const features = [
  { t: "Single-Origin Çekirdek", d: "Dünyanın seçkin bölgelerinden, günlük kavrulan kahve." },
  { t: "Taş Fırın", d: "600°C odun ateşinde pişen, çıtır hamur." },
  { t: "Mevsiminde Malzeme", d: "Her sabah taze, yerel üreticiden gelen ürünler." },
];

export default function About() {
  return (
    <section id="hakkimizda" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        {/* Image stack */}
        <div className="reveal relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift">
            <Image
              src={img("1453614512568-c4024d13c247", 1000)}
              alt="DEMO CAFE iç mekan"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-2 hidden w-44 rotate-2 overflow-hidden rounded-2xl border-4 border-cream shadow-lift sm:block lg:-right-8">
            <div className="relative aspect-square">
              <Image
                src={img("1509042239860-f550ce710b93", 500)}
                alt="Latte"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
          </div>
          {/* badge */}
          <div className="absolute -left-3 top-6 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-espresso text-center text-warmwhite shadow-lift sm:h-28 sm:w-28 lg:-left-8">
            <span className="display text-3xl leading-none text-caramel">8</span>
            <span className="mt-1 text-[0.6rem] uppercase tracking-[0.2em]">
              Yıl
            </span>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="reveal label mb-4">Hakkımızda</p>
          <h2 className="reveal display text-4xl leading-tight text-espresso sm:text-5xl">
            İzmir&apos;in kalbinde, sıcacık bir kaçış noktası
          </h2>
          <p className="reveal mt-6 text-base font-light leading-relaxed text-muted">
            DEMO CAFE, sabahın ilk espressosundan akşamın son dilim
            cheesecake&apos;ine kadar her anı özel kılmak için kuruldu. Burada
            kahve bir tutku, mutfak ise bir sanat. Misafirlerimizi bir dostun
            evine gelmiş gibi karşılıyor, her tabakta ev sıcaklığını sunuyoruz.
          </p>

          <div className="reveal mt-9 space-y-5">
            {features.map((f) => (
              <div key={f.t} className="flex gap-4">
                <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-caramel/20">
                  <span className="h-2 w-2 rotate-45 rounded-[2px] bg-caramel-deep" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-espresso">
                    {f.t}
                  </h3>
                  <p className="text-sm font-light text-muted">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
