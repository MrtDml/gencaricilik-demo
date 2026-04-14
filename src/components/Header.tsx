"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="/images/GençArıcılık_Logo.png" 
              alt="Genç Arıcılık Logo" 
              className="h-12 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/150x50?text=Logo";
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <Link href="/hakkimizda" className="hover:text-primary transition-colors">Hakkımızda</Link>
            <Link href="/urunlerimiz" className="hover:text-primary transition-colors">Ürünlerimiz</Link>
            <Link href="/belgelerimiz" className="hover:text-primary transition-colors">Belgelerimiz</Link>
            <Link href="/shop" className="hover:text-primary transition-colors">Mağaza</Link>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="/iletisim" className="hover:text-primary transition-colors">İletişim</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/sepet" className="p-2 hover:text-primary transition-colors relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/login" className="p-2 hover:text-primary transition-colors">
              <User size={20} />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <nav className="flex flex-col px-4 py-4 gap-4 text-center">
              <Link href="/" className="py-2 hover:text-primary transition-colors">Ana Sayfa</Link>
              <Link href="/hakkimizda" className="py-2 hover:text-primary transition-colors">Hakkımızda</Link>
              <Link href="/urunlerimiz" className="py-2 hover:text-primary transition-colors">Ürünlerimiz</Link>
              <Link href="/belgelerimiz" className="py-2 hover:text-primary transition-colors">Belgelerimiz</Link>
              <Link href="/shop" className="py-2 hover:text-primary transition-colors">Mağaza</Link>
              <Link href="/blog" className="py-2 hover:text-primary transition-colors">Blog</Link>
              <Link href="/iletisim" className="py-2 hover:text-primary transition-colors">İletişim</Link>
              <div className="flex justify-center gap-6 pt-4 border-t border-white/10">
                <Link href="/sepet" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <ShoppingCart size={20} /> Sepet
                </Link>
                <Link href="/login" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <User size={20} /> Giriş
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
