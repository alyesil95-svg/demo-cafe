// ============================================================
// DEMO CAFE — Menu data
// All Unsplash photo IDs below were visually verified to depict
// the intended dish/scene. Build URLs with the `img()` helper.
// ============================================================

export const img = (id: string, w = 800, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export type DietTag = "vegan" | "vegetarian" | "popular" | "glutensiz";

export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number; // TL
  category: CategoryId;
  photo: string; // unsplash id
  tags: DietTag[];
}

export type CategoryId =
  | "kahveler"
  | "soguk"
  | "pizzalar"
  | "burgerler"
  | "tatlilar"
  | "kahvalti";

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
}

export const categories: Category[] = [
  { id: "kahveler", label: "Kahveler", blurb: "Özenle kavrulmuş çekirdekler" },
  { id: "soguk", label: "Soğuk İçecekler", blurb: "Serinleten ferahlık" },
  { id: "pizzalar", label: "Pizzalar", blurb: "Taş fırından sıcacık" },
  { id: "burgerler", label: "Burgerler", blurb: "El yapımı gurme" },
  { id: "tatlilar", label: "Tatlılar", blurb: "Mutluluğun son dokunuşu" },
  { id: "kahvalti", label: "Kahvaltı", blurb: "Güne lezzetle başla" },
];

export const dietLabels: Record<DietTag, string> = {
  vegan: "Vegan",
  vegetarian: "Vejetaryen",
  popular: "Popüler",
  glutensiz: "Glutensiz",
};

export const menu: MenuItem[] = [
  // ---------------- KAHVELER ----------------
  {
    id: "espresso",
    name: "Espresso",
    desc: "Tek shot, yoğun gövdeli ve karakterli. Gerçek kahve tutkunları için.",
    price: 85,
    category: "kahveler",
    photo: "1510707577719-ae7c14805e3a",
    tags: ["vegan", "popular"],
  },
  {
    id: "turk-kahvesi",
    name: "Türk Kahvesi",
    desc: "Közde pişmiş usulü, bol köpüklü. Yanında lokum ile servis edilir.",
    price: 75,
    category: "kahveler",
    photo: "1485808191679-5f86510681a2",
    tags: ["vegan", "popular"],
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    desc: "İpeksi süt köpüğü ile espresso'nun kusursuz dengesi.",
    price: 110,
    category: "kahveler",
    photo: "1572442388796-11668a67e53d",
    tags: ["vegetarian"],
  },
  {
    id: "latte",
    name: "Caffè Latte",
    desc: "Yumuşak içimli, kadifemsi süt ile sarmalanmış espresso.",
    price: 115,
    category: "kahveler",
    photo: "1541167760496-1628856ab772",
    tags: ["vegetarian", "popular"],
  },
  {
    id: "flat-white",
    name: "Flat White",
    desc: "Çift shot espresso, ince mikrofom. Dengeli ve aromatik.",
    price: 120,
    category: "kahveler",
    photo: "1509042239860-f550ce710b93",
    tags: ["vegetarian"],
  },
  {
    id: "mocha",
    name: "Caffè Mocha",
    desc: "Belçika çikolatası ile buluşan espresso, üzeri süt köpüğü.",
    price: 125,
    category: "kahveler",
    photo: "1561882468-9110e03e0f78",
    tags: ["vegetarian"],
  },
  {
    id: "filtre",
    name: "Filtre Kahve",
    desc: "Günün özel single-origin çekirdeğinden taze demlenmiş.",
    price: 90,
    category: "kahveler",
    photo: "1447933601403-0c6688de566e",
    tags: ["vegan"],
  },

  // ---------------- SOĞUK İÇECEKLER ----------------
  {
    id: "iced-latte",
    name: "Iced Latte",
    desc: "Buzla soğutulmuş, ferahlatıcı sütlü kahve keyfi.",
    price: 120,
    category: "soguk",
    photo: "1517701550927-30cf4ba1dba5",
    tags: ["vegetarian", "popular"],
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    desc: "16 saat soğuk demleme. Yumuşak, az asitli, derin aroma.",
    price: 130,
    category: "soguk",
    photo: "1461023058943-07fcbe16d735",
    tags: ["vegan"],
  },
  {
    id: "limonata",
    name: "Ev Yapımı Limonata",
    desc: "Taze sıkılmış limon ve nane ile serinleten klasik.",
    price: 80,
    category: "soguk",
    photo: "1621263764928-df1444c5e859",
    tags: ["vegan", "popular"],
  },
  {
    id: "smoothie",
    name: "Meyveli Smoothie",
    desc: "Mevsim meyveleri ve doğal yoğurt ile hazırlanır.",
    price: 110,
    category: "soguk",
    photo: "1505252585461-04db1eb84625",
    tags: ["vegetarian", "glutensiz"],
  },

  // ---------------- PİZZALAR ----------------
  {
    id: "margherita",
    name: "Margherita",
    desc: "Taze mozzarella, San Marzano domates sosu, fesleğen.",
    price: 190,
    category: "pizzalar",
    photo: "1595854341625-f33ee10dbf94",
    tags: ["vegetarian", "popular"],
  },
  {
    id: "pepperoni",
    name: "Pepperoni",
    desc: "Bol acılı pepperoni, mozzarella ve özel domates sosu.",
    price: 230,
    category: "pizzalar",
    photo: "1565299624946-b28f40a0ae38",
    tags: ["popular"],
  },
  {
    id: "karisik",
    name: "Karışık Pizza",
    desc: "Sucuk, mantar, biber, zeytin ve bol kaşar. Klasik favori.",
    price: 240,
    category: "pizzalar",
    photo: "1604382354936-07c5d9983bd3",
    tags: [],
  },
  {
    id: "quattro",
    name: "Quattro Formaggi",
    desc: "Dört peynirli: mozzarella, gorgonzola, parmesan, taze ricotta.",
    price: 250,
    category: "pizzalar",
    photo: "1593560708920-61dd98c46a4e",
    tags: ["vegetarian"],
  },
  {
    id: "akdeniz",
    name: "Akdeniz Pizza",
    desc: "Kurutulmuş domates, taze roka, kiraz domates ve parmesan.",
    price: 235,
    category: "pizzalar",
    photo: "1594007654729-407eedc4be65",
    tags: ["vegetarian"],
  },

  // ---------------- BURGERLER ----------------
  {
    id: "demo-burger",
    name: "DEMO Signature Burger",
    desc: "Çift dana köftesi, eritilmiş cheddar, karamelize soğan, özel sos.",
    price: 280,
    category: "burgerler",
    photo: "1607013251379-e6eecfffe234",
    tags: ["popular"],
  },
  {
    id: "cheeseburger",
    name: "Klasik Cheeseburger",
    desc: "Dana köfte, cheddar, marul, domates, turşu ve burger sos.",
    price: 230,
    category: "burgerler",
    photo: "1568901346375-23c9450c58cd",
    tags: [],
  },
  {
    id: "tavuk-burger",
    name: "Çıtır Tavuk Burger",
    desc: "Çıtır marine tavuk göğsü, ranch sos, taze marul.",
    price: 220,
    category: "burgerler",
    photo: "1571091718767-18b5b1457add",
    tags: [],
  },
  {
    id: "truffle-burger",
    name: "Truffle Gurme Burger",
    desc: "Dana köfte, trüf mayonez, mantar, roka ve brioche ekmek.",
    price: 310,
    category: "burgerler",
    photo: "1550547660-d9450f859349",
    tags: ["popular"],
  },

  // ---------------- TATLILAR ----------------
  {
    id: "cheesecake",
    name: "Frambuazlı Cheesecake",
    desc: "Kremamsı San Sebastian dokusu, taze frambuaz ile.",
    price: 160,
    category: "tatlilar",
    photo: "1565958011703-44f9829ba187",
    tags: ["vegetarian", "popular"],
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    desc: "Mascarpone, espresso'da ıslatılmış kedidili, kakao.",
    price: 150,
    category: "tatlilar",
    photo: "1571877227200-a0d98ea607e9",
    tags: ["vegetarian"],
  },
  {
    id: "brownie",
    name: "Sıcak Brownie",
    desc: "Akışkan çikolata dolgulu, yanında vanilyalı dondurma.",
    price: 145,
    category: "tatlilar",
    photo: "1606313564200-e75d5e30476c",
    tags: ["vegetarian", "popular"],
  },
  {
    id: "sorbe",
    name: "Orman Meyveli Sorbe",
    desc: "Şeker ilavesiz, ev yapımı meyve sorbesi. Hafif ve ferah.",
    price: 120,
    category: "tatlilar",
    photo: "1488900128323-21503983a07e",
    tags: ["vegan", "glutensiz"],
  },

  // ---------------- KAHVALTI ----------------
  {
    id: "avokado-tost",
    name: "Avokado Tost",
    desc: "Ekşi mayalı ekmek, ezilmiş avokado, sahanda yumurta.",
    price: 175,
    category: "kahvalti",
    photo: "1525351484163-7529414344d8",
    tags: ["vegetarian", "popular"],
  },
  {
    id: "pankek",
    name: "Bal & Cevizli Pankek",
    desc: "Kabarık pankekler, süzme bal, ceviz ve taze meyveler.",
    price: 160,
    category: "kahvalti",
    photo: "1528207776546-365bb710ee93",
    tags: ["vegetarian"],
  },
  {
    id: "kruvasan",
    name: "Tereyağlı Kruvasan",
    desc: "Günlük açılan, katmer katmer çıtır Fransız kruvasanı.",
    price: 95,
    category: "kahvalti",
    photo: "1555507036-ab1f4038808a",
    tags: ["vegetarian"],
  },
];

// Curated gallery (all verified cafe / food scenes)
export const galleryPhotos: string[] = [
  "1554118811-1e0d58224f24", // cafe interior
  "1607013251379-e6eecfffe234", // burger
  "1495474472287-4d71bcdd2085", // coffee cheers
  "1595854341625-f33ee10dbf94", // margherita
  "1559925393-8be0ec4767c8", // terrace
  "1571877227200-a0d98ea607e9", // tiramisu
  "1453614512568-c4024d13c247", // cafe counter
  "1559339352-11d035aa65de", // seaside terrace
  "1505252585461-04db1eb84625", // smoothies
  "1414235077428-338989a2e8c0", // fine dining plate
  "1521017432531-fbd92d768814", // industrial cafe
  "1509042239860-f550ce710b93", // latte + plants
];

export const popularItems = menu.filter((m) => m.tags.includes("popular"));
