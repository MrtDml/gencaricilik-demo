"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Truck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/images/ArtvinYusufeli.jpg')",
          }}
        />
        <div className="absolute inset-0 z-10 bg-black/60" /> {/* Dim Overlay */}

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Artvin Yusufeli'nin <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-primary">
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
              className="bg-primary hover:bg-primary/90 text-black font-semibold py-4 px-8 rounded-full transition-all flex items-center justify-center gap-2"
            >
              Hemen Alışverişe Başla <ArrowRight size={18} />
            </Link>
          </motion.div>
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
