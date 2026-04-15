import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WanderingBee from "@/components/WanderingBee";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "react-hot-toast";
import DemoBanner from "@/components/DemoBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genç Arıcılık | Doğal Artvin Yusufeli Balı",
  description: "Artvin Yusufeli'nin eşsiz doğasından sofralarınıza gelen 100% doğal, katkısız, premium ballar ve arı ürünleri. Karakovan, Süzme Bal, Kestane Balı ve daha fazlası.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          <DemoBanner />
          <Toaster position="bottom-right" toastOptions={{ style: { background: '#111', color: '#fff', border: '1px solid #333' } }} />
          <WanderingBee />
          <WhatsAppButton />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
