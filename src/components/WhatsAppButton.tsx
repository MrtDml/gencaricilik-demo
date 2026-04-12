"use client";

import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  const phoneNumber = "905555555555"; // Örnek WhatsApp Numarası
  const message = "Merhaba, web siteniz üzerinden ulaşıyorum. Genç Arıcılık ürünleri hakkında detaylı bilgi almak istiyorum.";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      <AnimatePresence>
        <motion.a
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-[0_10px_20px_rgba(34,197,94,0.5)] border-[3px] border-black hover:bg-green-600 transition-colors cursor-pointer group"
        >
          {/* Arka planda yayılan dalga efekti */}
          <div className="absolute inset-0 rounded-full border border-green-500 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-75"></div>
          
          <MessageCircle size={32} className="text-white z-10" />
          
          {/* Tooltip gizli alan */}
          <div className="absolute right-20 bg-black/90 backdrop-blur-md border border-white/10 text-white text-sm font-semibold px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none drop-shadow-2xl">
            Sorunuz mu var? Bize Ulaşın!
          </div>
        </motion.a>
      </AnimatePresence>
    </div>
  );
}
