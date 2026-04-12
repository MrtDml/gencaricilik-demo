"use client";

import { useCartStore } from "@/store/cart";
import { CreditCard, Truck, AlertCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [method, setMethod] = useState("iyzico");
  const router = useRouter();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Siparişiniz başarıyla alındı! (Mock İşlem)");
    clearCart();
    router.push("/");
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 min-h-screen text-center">
        <h1 className="text-2xl font-bold mb-4">Sepetiniz Boş</h1>
        <Link href="/shop" className="text-primary underline">Alışverişe Dön</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 container mx-auto px-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Ödeme Adımı</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handleCheckout} className="space-y-8">
          <div className="glass p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Truck className="text-primary" /> Teslimat Bilgileri
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Adınız</label>
                <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Soyadınız</label>
                <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-400 mb-2">Açık Adres</label>
                <textarea required rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary"></textarea>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CreditCard className="text-primary" /> Ödeme Yöntemi
            </h2>
            <div className="space-y-4">
              <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer border-white/10`}>
                <input type="radio" value="iyzico" checked={method === "iyzico"} onChange={(e) => setMethod(e.target.value)} className="w-5 h-5 text-primary" />
                <span className="font-medium">Kredi Kartı / Iyzico</span>
              </label>
              <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer border-white/10`}>
                <input type="radio" value="havale" checked={method === "havale"} onChange={(e) => setMethod(e.target.value)} className="w-5 h-5 text-primary" />
                <span className="font-medium">Havale / EFT</span>
              </label>
              <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer border-white/10`}>
                <input type="radio" value="kapida" checked={method === "kapida"} onChange={(e) => setMethod(e.target.value)} className="w-5 h-5 text-primary" />
                <span className="font-medium">Kapıda Ödeme</span>
              </label>
            </div>
            {method === "iyzico" && (
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 rounded-lg flex gap-3 text-sm">
                <AlertCircle size={20} className="shrink-0" />
                <p>Iyzico entegrasyonu onay aşamasındadır. Şimdilik "Siparişi Tamamla" butonuna basarak sanal / mock testi yapabilirsiniz.</p>
              </div>
            )}
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-full text-lg transition-colors">
            {totalPrice().toLocaleString("tr-TR")} ₺ Siparişi Tamamla
          </button>
        </form>

        <div className="lg:col-span-1">
          <div className="glass p-6 rounded-2xl sticky top-28">
            <h3 className="text-xl font-bold mb-6">Siparişiniz</h3>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/5 rounded flex items-center justify-center p-1">
                      <img src={item.image} alt={item.title} className="max-w-full max-h-full" />
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-400">Adet: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-primary">{(item.price * item.quantity).toLocaleString("tr-TR")} ₺</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-4 space-y-2 text-sm font-bold">
              <div className="flex justify-between text-white text-lg mt-4">
                <span>Genel Toplam</span>
                <span className="text-primary">{totalPrice().toLocaleString("tr-TR")} ₺</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
