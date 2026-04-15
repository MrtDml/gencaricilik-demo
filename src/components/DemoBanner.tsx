"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Clock, PhoneCall } from "lucide-react";

// Demo bitiş tarihi — buradan kolayca değiştirin
const DEMO_END_DATE = new Date("2026-04-19T00:00:00");

// Demo modu açık/kapalı — yayına geçince false yapın
const DEMO_MODE = true;

function getTimeLeft() {
  const now = new Date();
  const diff = DEMO_END_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, expired: false };
}

export default function DemoBanner() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [showModal, setShowModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    if (!DEMO_MODE) return;

    // Modal: oturum başına bir kez göster
    const alreadySeen = sessionStorage.getItem("demo_modal_seen");
    if (!alreadySeen) {
      const timer = setTimeout(() => {
        setShowModal(true);
        sessionStorage.setItem("demo_modal_seen", "1");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!DEMO_MODE) return;
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!DEMO_MODE) return null;

  const urgent = timeLeft.days < 3;

  return (
    <>
      {/* Üst Sticky Banner */}
      <AnimatePresence>
        {!bannerDismissed && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`relative z-[9999] w-full ${
              urgent
                ? "bg-red-600"
                : "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-black font-semibold text-sm">
                <AlertTriangle size={16} className={`shrink-0 ${urgent ? "text-white" : "text-black"} animate-pulse`} />
                <span className={urgent ? "text-white" : "text-black"}>
                  {timeLeft.expired
                    ? "⚠️ Demo süreniz dolmuştur!"
                    : urgent
                    ? `⚠️ Demo bitiyor! Son ${timeLeft.days} gün ${timeLeft.hours} saat kaldı`
                    : "🍯 DEMO SÜRÜM — Bu site inceleme amaçlıdır"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {!timeLeft.expired && (
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                    <Clock size={13} className={urgent ? "text-white" : "text-black"} />
                    {[
                      { val: timeLeft.days, label: "gün" },
                      { val: timeLeft.hours, label: "sa" },
                      { val: timeLeft.minutes, label: "dk" },
                      { val: timeLeft.seconds, label: "sn" },
                    ].map(({ val, label }) => (
                      <span
                        key={label}
                        className={`px-1.5 py-0.5 rounded text-xs ${
                          urgent
                            ? "bg-white/20 text-white"
                            : "bg-black/15 text-black"
                        }`}
                      >
                        {String(val).padStart(2, "0")}
                        <span className="ml-0.5 font-normal opacity-75">{label}</span>
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setShowModal(true)}
                  className={`text-xs underline underline-offset-2 cursor-pointer hidden sm:block ${
                    urgent ? "text-white" : "text-black"
                  }`}
                >
                  Detaylar
                </button>

                <button
                  onClick={() => setBannerDismissed(true)}
                  className={`p-0.5 rounded hover:bg-black/10 transition-colors ${
                    urgent ? "text-white" : "text-black"
                  }`}
                  aria-label="Kapat"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Popup */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-zinc-900 border border-amber-500/40 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Üst şerit */}
              <div className="bg-gradient-to-r from-amber-500 to-yellow-400 px-6 py-4 flex items-center gap-3">
                <div className="bg-black/20 rounded-full p-2">
                  <AlertTriangle size={22} className="text-black" />
                </div>
                <div>
                  <h2 className="text-black font-bold text-lg leading-tight">
                    Demo Kullanım Uyarısı
                  </h2>
                  <p className="text-black/70 text-xs">Bu site demo amaçlı yayındadır</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="ml-auto p-1 rounded-full hover:bg-black/20 transition-colors text-black"
                >
                  <X size={18} />
                </button>
              </div>

              {/* İçerik */}
              <div className="px-6 py-5 space-y-4">
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Şu anda <span className="text-amber-400 font-semibold">Genç Arıcılık</span> web
                  sitesinin <span className="text-amber-400 font-semibold">demo sürümünü</span>{" "}
                  inceliyorsunuz. Tüm özellikler aktif olmayabilir.
                </p>

                {/* Geri sayım */}
                {!timeLeft.expired ? (
                  <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                    <p className="text-zinc-400 text-xs mb-3 text-center">Demo süresine kalan süre</p>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {[
                        { val: timeLeft.days, label: "Gün" },
                        { val: timeLeft.hours, label: "Saat" },
                        { val: timeLeft.minutes, label: "Dakika" },
                        { val: timeLeft.seconds, label: "Saniye" },
                      ].map(({ val, label }) => (
                        <div key={label} className="bg-zinc-900 border border-amber-500/30 rounded-lg py-2">
                          <div className="text-amber-400 font-bold text-xl font-mono">
                            {String(val).padStart(2, "0")}
                          </div>
                          <div className="text-zinc-500 text-[10px] mt-0.5">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-900/30 border border-red-500/40 rounded-xl p-4 text-center">
                    <p className="text-red-400 font-semibold">Demo süreniz sona ermiştir.</p>
                    <p className="text-red-300/70 text-sm mt-1">Tam sürüm için bizimle iletişime geçin.</p>
                  </div>
                )}

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                  <p className="text-amber-300 text-xs text-center">
                    Onay vermeniz halinde siteniz tam özellikli olarak hizmetinize sunulacaktır.
                  </p>
                </div>
              </div>

              {/* Alt butonlar */}
              <div className="px-6 pb-5 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2.5 px-4 rounded-xl transition-colors text-sm"
                >
                  Anladım
                </button>
                <a
                  href="tel:+905555555555"
                  className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium py-2.5 px-4 rounded-xl transition-colors text-sm border border-zinc-600"
                >
                  <PhoneCall size={15} />
                  İletişim
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
