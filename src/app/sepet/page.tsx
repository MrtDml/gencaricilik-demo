"use client";

import { useCartStore } from "@/store/cart";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SepetPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  return (
    <div className="pt-28 pb-20 container mx-auto px-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Alışveriş Sepetim</h1>

      {items.length === 0 ? (
        <div className="glass p-12 text-center rounded-2xl flex flex-col items-center">
          <Trash2 size={48} className="text-gray-500 mb-4 opacity-50" />
          <h2 className="text-2xl font-semibold mb-2">Sepetiniz Boş</h2>
          <p className="text-gray-400 mb-6">Aradığınız doğal bal ve arı ürünleri mağazamızda sizi bekliyor.</p>
          <Link href="/shop" className="bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-full font-medium transition-colors">
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div 
                layout
                key={`${item.id}-${item.size}`}
                className="glass p-4 rounded-xl flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-2">
                    <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-gray-400 text-sm">Varyant: {item.size}</p>
                    <p className="text-primary font-bold mt-1">{item.price.toLocaleString("tr-TR")} ₺</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center glass rounded-full overflow-hidden">
                    <button 
                      className="p-2 hover:bg-white/10"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.size)}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                      className="p-2 hover:bg-white/10"
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id, item.size)}
                    className="p-2 text-red-400 hover:bg-red-400/20 rounded-full transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="glass p-6 rounded-2xl sticky top-28">
              <h3 className="text-xl font-bold mb-4">Sipariş Özeti</h3>
              <div className="space-y-3 text-gray-300 border-b border-white/10 pb-4 mb-4">
                <div className="flex justify-between">
                  <span>Ara Toplam</span>
                  <span>{totalPrice().toLocaleString("tr-TR")} ₺</span>
                </div>
                <div className="flex justify-between">
                  <span>Kargo</span>
                  <span>Ücretsiz</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold text-white mb-6">
                <span>Toplam</span>
                <span className="text-primary">{totalPrice().toLocaleString("tr-TR")} ₺</span>
              </div>

              <Link href="/checkout" className="w-full bg-primary hover:bg-primary/90 text-black py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all">
                Ödemeye Geç <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
