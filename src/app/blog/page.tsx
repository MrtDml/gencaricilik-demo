"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";

export default function BlogPage() {
  const articles = [
    {
      id: 1,
      title: "Hakiki Balı Sahtesinden Nasıl Ayırt Ederiz?",
      excerpt: "Piyasada birçok bal çeşidi var ancak hakiki karakovan balı kendini dokusundan ve tadından nasıl belli eder? İşte ipuçları...",
      image: "/images/ArtvinYusufeli.jpg",
      date: "10 Nisan 2026",
      author: "Genç Arıcılık",
      readTime: "3 dk okuma"
    },
    {
      id: 2,
      title: "Arı Sütünün Bilinmeyen 5 İnanılmaz Faydası",
      excerpt: "Kraliçe arının yegane besini olan arı sütü (Royal Jelly) hücre yenilemeden enerji artırımına kadar insan bedenine sayısız mucize sunuyor.",
      image: "/images/Arı Sütü.png",
      date: "05 Nisan 2026",
      author: "Genç Arıcılık",
      readTime: "5 dk okuma"
    },
    {
      id: 3,
      title: "Doğal Antibiyotik: Propolis Nasıl Tüketilir?",
      excerpt: "Bağışıklık sisteminin en güçlü savaşçısı propolis damlası suya mı katılmalı yoksa bala mı damlatılmalı? Günlük doz ne olmalıdır?",
      image: "/images/Propolis.png",
      date: "18 Mart 2026",
      author: "Genç Arıcılık",
      readTime: "4 dk okuma"
    }
  ];

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-200 mb-4 tracking-tight">Arıcının Günlüğü</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Doğal yaşam, sağlıklı beslenme ve arıların mucizevi dünyası hakkında yazdığımız faydalı makaleler.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, idx) => (
          <motion.article 
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass rounded-2xl overflow-hidden hover:border-primary/40 transition-colors group flex flex-col h-full"
          >
            <div className="relative h-56 w-full overflow-hidden bg-white/5">
              {/* Resim koyu temada da olsa blog havası için tam kaplayacak. Resim yoksa mock */}
              <img 
                src={article.image} 
                alt={article.title} 
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${article.id !== 1 ? 'object-contain scale-75' : ''}`}
              />
              <div className="absolute top-4 left-4 bg-primary/90 text-black text-xs font-bold px-3 py-1 rounded-full">
                Sıhhat & Şifa
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 border-b border-white/10 pb-4">
                <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3 leading-snug group-hover:text-primary transition-colors">
                <Link href="#">{article.title}</Link>
              </h2>
              
              <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
                {article.excerpt}
              </p>
              
              <Link href="#" className="inline-flex items-center gap-2 text-primary hover:text-white font-semibold transition-colors mt-auto w-max">
                Yazıyı Oku <ArrowRight size={18} />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
