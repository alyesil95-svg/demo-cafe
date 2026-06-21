import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DEMO CAFE — Lezzetin ve Keyfin Buluştuğu Yer | İzmir",
  description:
    "DEMO CAFE — İzmir'in kalbinde özenle hazırlanan kahveler, taş fırın pizzalar ve gurme burgerler. Sıcak, samimi ve eşsiz bir lezzet deneyimi.",
  keywords: [
    "cafe",
    "restoran",
    "İzmir cafe",
    "kahve",
    "taş fırın pizza",
    "gurme burger",
    "DEMO CAFE",
  ],
  openGraph: {
    title: "DEMO CAFE — Lezzetin ve Keyfin Buluştuğu Yer",
    description:
      "İzmir'in en sıcak mekanı. Özenle hazırlanan kahveler, taş fırın pizzalar ve gurme burgerler.",
    locale: "tr_TR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#3B2F2F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-cream text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
