"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

// Geçiçi mock veriler.
// Normalde bu veriler Server Component üzerinden Prisma (db.product.findMany()) ile gelmeli.
// Eğitim amacı ve çalışırlık testi için client'da tutulmaktadır.
const dummyProducts = [
  { id: "1", title: "Hakiki Karakovan Balı", price: 1250, image: "/images/Karakovan Balı.png", description: "Artvin'in el değmemiş doğasından yüksek rakımlı yaylalarda üretilmiş petekli hakiki karakovan balı." },
  { id: "2", title: "Süzme Çiçek Balı", price: 850, image: "/images/Süzme Bal.png", description: "Zengin flora ve endemik türlerin karışımıyla hazırlanan hafif ama etkili süzme bal." },
  { id: "3", title: "Saf Arı Sütü", price: 2100, image: "/images/Arı Sütü.png", description: "Kraliçe arının besini, hücre yenileyici ve saf enerji deposu doğal arı sütü." },
  { id: "4", title: "Doğal Propolis Damla", price: 550, image: "/images/Propolis.png", description: "Bağışıklık sisteminin en güçlü doğal savunucusu, saf propolis ekstresi." },
  { id: "5", title: "Çerçeve Petek Balı", price: 950, image: "/images/Çerçeve Bal.png", description: "Ahşap çerçeve içerisinde arıların kendi ördüğü katkısız petek bal." }
];

export default function ShopPage() {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState<string | null>(null);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
      size: "Standart" // Varyant için varsayılan
    });
    
    setAdded(product.id);
    setTimeout(() => setAdded(null), 2000);
  };

  return (
    <div className="pt-28 pb-20 container mx-auto px-4 min-h-screen">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-200">Tüm Ürünlerimiz</h1>
          <p className="text-gray-400 mt-2">Artvin'in doğal şifası hemen kapınızda.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {dummyProducts.map((product, index) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-2xl overflow-hidden flex flex-col hover:border-primary/50 transition-colors group"
          >
            <div className="relative h-64 w-full bg-white flex items-center justify-center p-4">
              <img 
                src={product.image} 
                alt={product.title} 
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                onError={(e) => e.currentTarget.src = "https://via.placeholder.com/300?text=Ürün"}
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">{product.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <span className="text-2xl font-bold text-primary">{product.price.toLocaleString("tr-TR")} ₺</span>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className={`p-3 rounded-full transition-all flex items-center justify-center ${added === product.id ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-primary hover:text-black text-white'}`}
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
