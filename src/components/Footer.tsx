import Link from "next/link";
import { prisma } from "@/lib/prisma";
import FooterIban from "./FooterIban";

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
          <div className="md:col-span-1">
            <img
              src="/images/GençArıcılık_Logo.png"
              alt="Genç Arıcılık"
              className="h-12 w-auto mb-4 object-contain opacity-80"
            />
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              Artvin Yusufeli'nden doğanın en saf armağanı. Karakovan, Süzme Bal ve Arı ürünleri.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Kurumsal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/hakkimizda" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="hover:text-primary transition-colors">İletişim</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Sertifikalarımız</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Mağaza</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/shop" className="hover:text-primary transition-colors">Tüm Ürünler</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Mesafeli Satış Sözleşmesi</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">İptal ve İade Koşulları</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">İletişim</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Artvin / Yusufeli</li>
              <li>info@gencaricilik.com.tr</li>
              <li>0555 555 55 55</li>
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

        <div className="border-t border-white/10 mt-10 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Genç Arıcılık. Tüm hakları gizlidir.</p>
        </div>
      </div>
    </footer>
  );
}
