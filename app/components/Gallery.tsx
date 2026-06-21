"use client";

import Image from "next/image";
import { galleryPhotos, img } from "@/lib/menu";

// varying aspect ratios for an editorial masonry rhythm
const RATIOS = [
  "4 / 5",
  "1 / 1",
  "3 / 4",
  "4 / 3",
  "1 / 1",
  "3 / 4",
  "4 / 5",
  "4 / 3",
  "1 / 1",
  "3 / 4",
  "4 / 3",
  "4 / 5",
];

export default function Gallery() {
  return (
    <section id="galeri" className="bg-warmwhite py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal mx-auto mb-12 max-w-2xl text-center">
          <p className="label mb-4">Galeri</p>
          <h2 className="display text-4xl text-espresso sm:text-5xl">
            Bir bakışta DEMO CAFE
          </h2>
          <p className="mt-5 text-base font-light text-muted">
            Mekanımızdan, tabaklarımızdan ve anlarımızdan kareler.
          </p>
        </div>

        <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {galleryPhotos.map((photo, i) => (
            <div
              key={photo}
              className="reveal group mb-4 break-inside-avoid overflow-hidden rounded-2xl shadow-soft"
              data-reveal-delay={(i % 4) * 0.06}
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: RATIOS[i % RATIOS.length] }}
              >
                <Image
                  src={img(photo, 700)}
                  alt="DEMO CAFE galeri"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/15" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
