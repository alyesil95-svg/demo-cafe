"use client";

import { useEffect, useRef, useState } from "react";
import { menu, popularItems, type MenuItem } from "@/lib/menu";
import { smoothScrollTo } from "./Navbar";

const HOURS = "Her gün 08:00 – 24:00 (Pazar dahil) açığız.";
const LOCATION =
  "İzmir · Alsancak, Kıbrıs Şehitleri Caddesi No:12. Deniz kenarına 2 dakika yürüme mesafesinde!";

type Action = { label: string; target: string };
interface Msg {
  role: "bot" | "user";
  text: string;
  chips?: Action[];
}

const QUICK: string[] = [
  "Ne önerirsiniz?",
  "Vegan seçenekler",
  "Tatlı ve kahve ne kadar?",
  "Çalışma saatleri",
];

// turkish-insensitive normalize
function norm(s: string) {
  return s
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ş", "s")
    .replaceAll("ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ı", "i")
    .replaceAll("İ", "i");
}

const listItems = (items: MenuItem[], max = 5) =>
  items
    .slice(0, max)
    .map((m) => `• ${m.name} — ₺${m.price}`)
    .join("\n");

const cheapest = (cat: MenuItem["category"]) =>
  menu
    .filter((m) => m.category === cat)
    .reduce((a, b) => (a.price < b.price ? a : b));

const priceRange = (cat: MenuItem["category"]) => {
  const ps = menu.filter((m) => m.category === cat).map((m) => m.price);
  return { min: Math.min(...ps), max: Math.max(...ps) };
};

function getReply(input: string): Msg {
  const t = norm(input);
  const has = (...k: string[]) => k.some((w) => t.includes(w));

  if (has("merhaba", "selam", "iyi gun", "hey", "naber"))
    return {
      role: "bot",
      text:
        "Merhaba! 😊 DEMO CAFE asistanınızım. Menü, öneriler, fiyatlar, çalışma saatleri ya da rezervasyon — ne isterseniz yardımcı olayım.",
      chips: [{ label: "Menüye git", target: "menu" }],
    };

  if (has("tesekkur", "sagol", "eyvallah"))
    return { role: "bot", text: "Rica ederim! Afiyet olsun ☕ Başka bir konuda yardımcı olayım mı?" };

  // recommendations
  if (has("oner", "tavsiye", "ne yesem", "ne icsem", "populer", "en iyi", "favori"))
    return {
      role: "bot",
      text:
        "Misafirlerimizin en sevdikleri:\n\n" +
        listItems(popularItems, 6) +
        "\n\nDEMO Signature Burger ve Frambuazlı Cheesecake'i özellikle tavsiye ederim. 😋",
      chips: [{ label: "Menüye git", target: "menu" }],
    };

  // vegan
  if (has("vegan")) {
    const v = menu.filter((m) => m.tags.includes("vegan"));
    return {
      role: "bot",
      text:
        "Vegan dostu seçeneklerimiz 🌱\n\n" +
        listItems(v, 8) +
        "\n\nHepsi tamamen bitkisel. Afiyet olsun!",
      chips: [{ label: "Menüye git", target: "menu" }],
    };
  }

  // vegetarian
  if (has("vejetaryen", "vejeteryan", "etsiz")) {
    const v = menu.filter(
      (m) => m.tags.includes("vegetarian") || m.tags.includes("vegan"),
    );
    return {
      role: "bot",
      text:
        "Vejetaryen seçeneklerimizden bazıları 🥗\n\n" +
        listItems(v, 8) +
        "\n\nDilersen vegan olanları da gösterebilirim.",
      chips: [{ label: "Menüye git", target: "menu" }],
    };
  }

  if (has("glutensiz", "gluten")) {
    const g = menu.filter((m) => m.tags.includes("glutensiz"));
    return {
      role: "bot",
      text: g.length
        ? "Glutensiz seçenekler:\n\n" + listItems(g, 8)
        : "Şu an menüde glutensiz olarak işaretli ürünler sınırlı; ekibimiz alternatif için memnuniyetle yardımcı olur.",
    };
  }

  // price: dessert + coffee combo
  if (
    (has("tatli") && has("kahve")) ||
    (has("kombin") && has("fiyat", "ne kadar"))
  ) {
    const c = cheapest("kahveler");
    const d = cheapest("tatlilar");
    return {
      role: "bot",
      text: `Örnek bir tatlı + kahve ikilisi:\n• ${c.name} — ₺${c.price}\n• ${d.name} — ₺${d.price}\n\nToplam: ₺${c.price + d.price} 🤍\nDaha şık bir kombin: Caffè Latte (₺115) + Frambuazlı Cheesecake (₺160) = ₺275.`,
      chips: [{ label: "Menüye git", target: "menu" }],
    };
  }

  // category-specific price / listing
  const cats: { keys: string[]; cat: MenuItem["category"]; name: string }[] = [
    { keys: ["kahve", "espresso", "latte", "cappuccino"], cat: "kahveler", name: "kahve" },
    { keys: ["soguk", "buzlu", "limonata", "smoothie", "icecek"], cat: "soguk", name: "soğuk içecek" },
    { keys: ["pizza"], cat: "pizzalar", name: "pizza" },
    { keys: ["burger", "hamburger"], cat: "burgerler", name: "burger" },
    { keys: ["tatli", "dessert", "cheesecake", "brownie"], cat: "tatlilar", name: "tatlı" },
    { keys: ["kahvalti", "breakfast", "tost", "pankek"], cat: "kahvalti", name: "kahvaltı" },
  ];
  for (const c of cats) {
    if (has(...c.keys)) {
      const items = menu.filter((m) => m.category === c.cat);
      if (has("fiyat", "ne kadar", "kac para", "kac tl", "kacta")) {
        const r = priceRange(c.cat);
        return {
          role: "bot",
          text: `${c.name} fiyatlarımız ₺${r.min} ile ₺${r.max} arasında değişiyor.\n\n${listItems(items, 6)}`,
          chips: [{ label: "Menüye git", target: "menu" }],
        };
      }
      return {
        role: "bot",
        text: `${c.name.charAt(0).toLocaleUpperCase("tr-TR") + c.name.slice(1)} seçeneklerimiz:\n\n${listItems(items, 6)}`,
        chips: [{ label: "Menüye git", target: "menu" }],
      };
    }
  }

  if (has("saat", "acik", "kacta aci", "kapan", "calisma"))
    return { role: "bot", text: `⏰ ${HOURS}` };

  if (has("nerede", "konum", "adres", "yol", "lokasyon", "harita"))
    return { role: "bot", text: `📍 ${LOCATION}` };

  if (has("rezervasyon", "masa ayirt", "yer ayirt"))
    return {
      role: "bot",
      text:
        "Memnuniyetle! Rezervasyon formundan ad, telefon, kişi sayısı, tarih ve saati girmen yeterli. Seni hemen oraya götüreyim mi?",
      chips: [{ label: "Rezervasyona git", target: "rezervasyon" }],
    };

  if (has("siparis", "paket", "whatsapp"))
    return {
      role: "bot",
      text:
        "Beğendiğin ürünleri sepete ekleyip masandan sipariş verebilir ya da WhatsApp'tan paket sipariş oluşturabilirsin. Menüye göz atalım mı?",
      chips: [{ label: "Menüye git", target: "menu" }],
    };

  if (has("menu"))
    return {
      role: "bot",
      text:
        "Menümüzde Kahveler, Soğuk İçecekler, Pizzalar, Burgerler, Tatlılar ve Kahvaltı kategorileri var. Hangisini merak ediyorsun?",
      chips: [{ label: "Menüye git", target: "menu" }],
    };

  return {
    role: "bot",
    text:
      "Bunu tam anlayamadım 🤔 ama şunlarda yardımcı olabilirim: öneriler, vegan/vejetaryen seçenekler, fiyatlar, çalışma saatleri, konum ve rezervasyon.",
    chips: [{ label: "Ne önerirsin?", target: "" }],
  };
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text:
        "DEMO CAFE'ye Hoşgeldiniz ☕ Size nasıl yardımcı olabilirim? Aşağıdan hızlıca seçebilir ya da yazabilirsiniz.",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setBubble(true), 3000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs, typing, open]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      const reply = getReply(text);
      setTyping(false);
      setMsgs((m) => [...m, reply]);
    }, 550);
  };

  const openChat = () => {
    setOpen(true);
    setBubble(false);
  };

  const runAction = (a: Action) => {
    if (a.target) {
      setOpen(false);
      window.setTimeout(() => smoothScrollTo(a.target), 250);
    } else {
      send("Ne önerirsiniz?");
    }
  };

  return (
    <>
      {/* Welcome bubble */}
      {bubble && !open && (
        <div className="fixed bottom-24 right-6 z-40 max-w-[260px] animate-[fade-up-soft_0.5s_ease] rounded-2xl rounded-br-sm bg-warmwhite p-4 shadow-lift">
          <button
            onClick={() => setBubble(false)}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-espresso text-xs text-warmwhite"
            aria-label="Kapat"
          >
            ✕
          </button>
          <p className="text-sm font-light leading-snug text-espresso">
            DEMO CAFE&apos;ye Hoşgeldiniz ☕ Size nasıl yardımcı olabilirim?
          </p>
          <button
            onClick={openChat}
            className="mt-3 text-xs font-semibold text-caramel-deep hover:underline"
          >
            Sohbeti başlat →
          </button>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-label="Asistanı aç"
        className="fixed bottom-6 right-6 z-50 flex h-15 w-15 items-center justify-center rounded-full bg-caramel text-espresso shadow-lift transition-all duration-300 hover:scale-105 hover:bg-caramel-deep hover:text-warmwhite"
        style={{ height: 60, width: 60 }}
      >
        {open ? (
          <span className="text-2xl">✕</span>
        ) : (
          <ChatIcon />
        )}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-4 z-50 flex max-h-[70svh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-cream shadow-lift transition-all duration-300 sm:right-6 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{ height: 520 }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-espresso px-5 py-4">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-caramel text-espresso">
            <ChatIcon small />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-espresso bg-emerald-400" />
          </span>
          <div>
            <p className="font-serif text-base font-semibold text-warmwhite">
              DEMO Asistan
            </p>
            <p className="text-xs text-warmwhite/60">Çevrimiçi · anında yanıt</p>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
        >
          {msgs.map((m, i) => (
            <div key={i}>
              <div
                className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto rounded-br-sm bg-espresso text-warmwhite"
                    : "rounded-bl-sm bg-warmwhite text-espresso shadow-soft"
                }`}
              >
                {m.text}
              </div>
              {m.chips && m.chips.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {m.chips.map((c) => (
                    <button
                      key={c.label}
                      onClick={() => runAction(c)}
                      className="rounded-full border border-caramel/50 bg-caramel/10 px-3 py-1.5 text-xs font-medium text-caramel-deep transition-colors hover:bg-caramel hover:text-espresso"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {typing && (
            <div className="flex w-14 items-center gap-1 rounded-2xl rounded-bl-sm bg-warmwhite px-4 py-3 shadow-soft">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-caramel"
                  style={{
                    animation: "float-soft 0.9s ease-in-out infinite",
                    animationDelay: `${d * 0.15}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick replies */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-2">
          {QUICK.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="shrink-0 rounded-full bg-espresso/5 px-3 py-1.5 text-xs font-medium text-espresso/80 transition-colors hover:bg-caramel/20"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-espresso/10 px-3 py-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Bir mesaj yazın…"
            className="flex-1 rounded-full bg-warmwhite px-4 py-2.5 text-sm text-espresso outline-none placeholder:text-muted/60"
          />
          <button
            type="submit"
            aria-label="Gönder"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-caramel text-espresso transition-colors hover:bg-caramel-deep hover:text-warmwhite"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </>
  );
}

function ChatIcon({ small }: { small?: boolean }) {
  const s = small ? 18 : 26;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.9-.9L3 21l1.9-5.1A8.5 8.5 0 0 1 4 11.5 8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="11.5" r="1" fill="currentColor" />
      <circle cx="12.5" cy="11.5" r="1" fill="currentColor" />
      <circle cx="16.5" cy="11.5" r="1" fill="currentColor" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12 20 4l-4 16-4-7-8-1Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
