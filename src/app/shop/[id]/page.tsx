"use client";

import { use } from "react";
import { productsData } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, ShoppingCart, HeartPulse, Star, MessageSquare, Plus, Minus, Info } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params); 
  const product = productsData.find(p => p.id === params.id);
  
  const addItem = useCartStore((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 text-white">
        <h1 className="text-2xl font-bold">Ürün Bulunamadı.</h1>
      </div>
    );
  }

  // Çapraz Satış İçin Aynı Kategorideki veya rastgele 3 benzer ürün
  const similarProducts = productsData
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 3);

  // SSS Verisi
  const faqs = [
    { q: "Hakiki olduğunu nasıl anlarım?", a: "Tüm ballarımız hiçbir ısıl işlem görmeden sağılır ve genetiğiyle oynanmamıştır. Soğukta kristalize olması hakiki olduğunun en büyük göstergesidir." },
    { q: "Kargo süreci kaç gün sürüyor?", a: "Siparişleriniz aynı gün kırılmaz, sızdırmaz özel strafor kutularında kargoya verilir ve tüm Türkiye'ye ortalama 2 iş gününde ulaşır." },
    { q: "Nasıl muhafaza etmeliyim?", a: "Buzdolabına koymayınız. Serin, ıslak olmayan ve güneş ışığına doğrudan maruz kalmayan oda sıcaklığında bir dolapta yıllarca bozulmadan saklayabilirsiniz." }
  ];

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
      size: "Standart"
    });
    toast.success(`${product.title} sepetinize eklendi! 🍯`);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="pt-28 pb-24 container mx-auto px-4 min-h-screen">
      <Link href="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8">
        <ArrowLeft size={20} /> Mağazaya Dön
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
        {/* Sol Taraf - Resim */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-[400px] md:h-[600px] w-full bg-white/5 rounded-3xl overflow-hidden glass border border-white/10 flex items-center justify-center p-8 sticky top-24"
        >
          {/* Lüks parlama efekti */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
          
          <img 
            src={product.image} 
            alt={product.title} 
            className="relative z-10 max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-700" 
          />
        </motion.div>

        {/* Sağ Taraf - Detaylar */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-start"
        >
          <span className="inline-block px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold uppercase tracking-widest w-max mb-4">
            {product.category} Grubu
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">{product.title}</h1>
          
          <div className="text-3xl font-bold text-primary mb-8 border-b border-white/10 pb-8 flex items-end gap-3">
            {product.price > 0 ? `${product.price.toLocaleString("tr-TR")} ₺` : "0 ₺"}
            <span className="text-sm font-normal text-gray-400 mb-1">(KDV Dahildir)</span>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-10">
            {product.details}
          </p>

          {/* Sağlığa Faydaları Kutusu */}
          <div className="mb-10 p-6 glass rounded-2xl border border-white/5 shadow-2xl">
            <h3 className="text-xl font-bold mb-5 flex items-center gap-2 text-white">
              <HeartPulse className="text-red-400" /> Sağlığa Faydaları
            </h3>
            <ul className="space-y-4">
              {product.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 size={24} className="text-primary shrink-0" />
                  <span className="pt-0.5">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg py-5 rounded-xl transition-all flex items-center justify-center gap-3 drop-shadow-[0_15px_15px_rgba(250,204,21,0.2)] active:scale-95 mb-10"
          >
            <ShoppingCart size={24} /> {isAdding ? "Sepete Eklendi!" : "Sepete Ekle Şifayı Yakala"}
          </button>

        </motion.div>
      </div>

      <hr className="border-white/10 my-16" />

      {/* S.S.S Akordeon (Tam Genişlik) */}
      <div className="mb-24 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-8 flex items-center justify-center gap-3">
          <Info className="text-primary" size={32} /> Merak Edilenler (S.S.S)
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-white/10 rounded-xl overflow-hidden glass shadow-lg">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span className="font-bold text-lg text-gray-200">{faq.q}</span>
                {openFaq === idx ? <Minus size={24} className="text-primary" /> : <Plus size={24} className="text-primary" />}
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-gray-300 leading-relaxed text-base"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Müşteri Yorumları Bölümü */}
      <div className="mb-24 text-center">
        <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-3">
          <MessageSquare className="text-primary" /> Müşteri Yorumları ({product.reviews?.length || 0})
        </h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto text-left">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl border border-white/5 relative">
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">"{review.comment}"</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-white">{review.author}</span>
                  <span className="text-gray-500">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Bu ürün için henüz yorum yapılmamış.</p>
        )}
      </div>

      {/* Benzer Ürünler (Çapraz Satış) */}
      {similarProducts.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold mb-8">Bunu Alanlar Şunları da İnceledi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProducts.map((simProd) => (
              <div key={simProd.id} className="glass rounded-xl p-4 flex gap-4 hover:border-primary/50 transition-colors group">
                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center p-2 shrink-0">
                  <img src={simProd.image} alt={simProd.title} className="max-h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-bold text-white hover:text-primary transition-colors">
                    <Link href={`/shop/${simProd.id}`}>{simProd.title}</Link>
                  </h4>
                  <p className="text-primary font-semibold mt-2">{simProd.price > 0 ? `${simProd.price} ₺` : "0 ₺"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
