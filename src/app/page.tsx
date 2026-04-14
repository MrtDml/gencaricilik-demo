"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Bee from "@/components/Bee";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Truck } from "lucide-react";
import { productsData } from "@/data/products";

// Animasyonlu arka plan görselleri - admin panelinden yönetilebilir
const heroImages = [
  "/images/ArtvinYusufeli.jpg",
  // Yeni görseller buraya eklenecek
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Images */}
        <AnimatePresence mode="sync">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${heroImages[currentImageIndex]}')`,
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 z-10 bg-black/75" /> {/* Dim Overlay */}

        {/* Slideshow dots */}
        {heroImages.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentImageIndex
                    ? "bg-primary scale-125"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          {/* Sevimli Arı */}
          <div className="absolute -top-16 -left-12 md:-left-24">
            <Bee className="w-24 h-24 md:w-32 md:h-32" />
          </div>
          <div className="absolute top-10 -right-10 md:-right-20">
             <Bee className="w-16 h-16 md:w-24 md:h-24 scale-x-[-1]" delay={1.5} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm md:text-base mb-4 block">
              Doğadan Sofranıza
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
          >
            Artvin Yusufeli'nin <br/>
            <span className="text-yellow-400 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
              Altın Değerindeki Balı
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl"
          >
            100% doğal, katkısız ve yüksek rakımlı yaylalardan elde edilen premium bal ve arı ürünleri.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link 
              href="/shop" 
              className="bg-primary hover:bg-yellow-500 text-white font-bold py-4 px-8 rounded-full transition-all flex items-center justify-center gap-2 drop-shadow-lg"
            >
              Hemen Alışverişe Başla <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-dark-900 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ürünlerimizden Bazıları</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productsData.slice(0, 4).map((prod) => (
              <motion.div 
                key={prod.id}
                whileHover={{ y: -10 }}
                className="glass rounded-2xl p-6 flex flex-col items-center group transition-colors hover:border-primary/50 relative"
              >
                <Link href={`/shop/${prod.id}`} className="w-full h-48 bg-white rounded-xl mb-6 p-4 flex items-center justify-center shadow-inner overflow-hidden cursor-pointer">
                  <img src={prod.image} alt={prod.title} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <Link href={`/shop/${prod.id}`}>
                  <h3 className="text-xl font-bold mb-2 text-white hover:text-primary transition-colors text-center">{prod.title}</h3>
                </Link>
                
                <div className="flex flex-col items-center mt-auto w-full pt-4 border-t border-white/10">
                  <p className="text-primary font-bold text-xl mb-3">{prod.price > 0 ? `${prod.price} ₺` : "0 ₺"}</p>
                  <Link href={`/shop/${prod.id}`} className="w-full text-center bg-yellow-400 text-black font-bold py-2.5 rounded-lg hover:bg-yellow-600 drop-shadow-md active:scale-95 transition-all duration-300">
                    Ürünü İncele
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/shop" className="inline-block border border-primary text-primary hover:bg-primary hover:text-black font-semibold py-3 px-8 rounded-full transition-colors">
              Tüm Ürünleri Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-2xl flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-semibold">Premium Kalite</h3>
              <p className="text-gray-400">En iyi polen florasına sahip yüksek rakımlı Yusufeli yaylalarından üstün kaliteli ürünler.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-2xl flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-semibold">100% Doğal</h3>
              <p className="text-gray-400">Hiçbir katkı maddesi içermeyen, tamamen doğal yöntemlerle üretilmiştir.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-2xl flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-semibold">Güvenilir Teslimat</h3>
              <p className="text-gray-400">Özel korumalı ambalajlarda tüm Türkiye'ye hasar görmeden hızlı teslimat.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Short Story Section */}
      <section className="py-24 bg-dark-900">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Nesillerdir Süren Gelenek</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Genç Arıcılık olarak, doğaya ve emeğe saygı duyarak, atalarımızdan öğrendiğimiz arıcılık geleneğini modern teknolojiyle birleştiriyoruz. Amacımız sadece bal üretmek değil, doğanın bu mucizesini en saf haliyle evinize ulaştırmaktır.
          </p>
          <div className="mt-8">
            <Link href="/hakkimizda" className="text-primary hover:underline underline-offset-4 tracking-wide font-medium">
              Hikayemizin Tamamını Oku
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
