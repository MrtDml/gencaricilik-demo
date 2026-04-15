import Link from "next/link";
import { prisma } from "@/lib/prisma";
import FooterIban from "./FooterIban";
import { Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

const socialLinks = [
  { href: "https://www.instagram.com/gencaricilik", icon: Instagram, label: "Instagram" },
  { href: "https://www.facebook.com/gencaricilik", icon: Facebook, label: "Facebook" },
  { href: "https://www.youtube.com/@gencaricilik", icon: Youtube, label: "YouTube" },
  { href: "https://wa.me/905555555555", icon: MessageCircle, label: "WhatsApp" },
];

export default async function Footer() {
  const bankAccounts = await prisma.bankAccount.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    select: { id: true, bankName: true, accountName: true, iban: true, branch: true },
  });

  return (
    <footer className="bg-dark-950 border-t border-white/5 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Marka */}
          <div className="md:col-span-1">
            <img
              src="/images/logo.png"
              alt="Genç Arıcılık"
              className="h-12 w-auto mb-4 object-contain opacity-80"
            />
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              Artvin Yusufeli'nden doğanın en saf armağanı. Karakovan, Süzme Bal ve Arı ürünleri.
            </p>
            {/* Sosyal Medya */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Kurumsal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Kurumsal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/hakkimizda" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="hover:text-primary transition-colors">İletişim</Link></li>
              <li><Link href="/belgelerimiz" className="hover:text-primary transition-colors">Sertifikalarımız</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Mağaza */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Mağaza</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/shop" className="hover:text-primary transition-colors">Tüm Ürünler</Link></li>
              <li><Link href="/urunlerimiz" className="hover:text-primary transition-colors">Ürünlerimiz</Link></li>
              <li><Link href="/sepet" className="hover:text-primary transition-colors">Sepetim</Link></li>
              <li><Link href="/iletisim" className="hover:text-primary transition-colors">İptal ve İade</Link></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">İletişim</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Artvin / Yusufeli</li>
              <li>
                <a href="mailto:info@gencaricilik.com.tr" className="hover:text-primary transition-colors">
                  info@gencaricilik.com.tr
                </a>
              </li>
              <li>
                <a href="tel:+905555555555" className="hover:text-primary transition-colors">
                  0555 555 55 55
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* IBAN Bölümü */}
        {bankAccounts.length > 0 && (
          <div className="border-t border-white/5 mt-10 pt-10">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-5">
              Havale / EFT Bilgileri
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {bankAccounts.map((acc) => (
                <FooterIban key={acc.id} account={acc} />
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Genç Arıcılık. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:text-primary transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
