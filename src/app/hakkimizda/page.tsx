"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GallerySlide {
  id: string;
  imageUrl: string;
  title: string;
  caption: string;
  order: number;
  isActive: boolean;
}

// Her slayta farklı Ken Burns efekti ver
const KB_CLASSES = ["kb-in", "kb-out", "kb-panl", "kb-panr"];

function Slideshow({ slides }: { slides: GallerySlide[] }) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [kbKey, setKbKey] = useState(0); // animasyonu sıfırlamak için
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const kbClass = KB_CLASSES[current % KB_CLASSES.length];

  const goTo = useCallback(
    (index: number) => {
      if (transitioning || index === current) return;
      setTransitioning(true);
      setPrev(current);
      setCurrent(index);
      setKbKey((k) => k + 1);
      setTimeout(() => {
        setPrev(null);
        setTransitioning(false);
      }, 600);
    },
    [transitioning, current]
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, slides.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, slides.length, goTo]);

  // Otomatik geçiş
  useEffect(() => {
    if (slides.length < 2) return;
    timerRef.current = setInterval(goNext, 5500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [goNext, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[current];
  const prevSlide = prev !== null ? slides[prev] : null;

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-2xl group bg-black"
      style={{ aspectRatio: "16/9" }}
    >
      {/* Önceki slayt (fade-out) */}
      {prevSlide && (
        <div
          className="absolute inset-0"
          style={{ opacity: transitioning ? 0 : 1, transition: "opacity 0.6s ease" }}
        >
          <Image
            src={prevSlide.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>
      )}

      {/* Aktif slayt */}
      <div
        className="absolute inset-0"
        style={{
          opacity: transitioning ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* Ana resim — Ken Burns efektli, çerçeveyi tamamen doldurur */}
        <div
          key={kbKey}
          className={`absolute inset-0 ${kbClass}`}
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.title || "Galeri"}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>

        {/* Alt gradient — caption için */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Caption */}
      {(slide.title || slide.caption) && (
        <div
          className="absolute bottom-0 left-0 right-0 p-5 z-30"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "translateY(6px)" : "translateY(0)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          {slide.title && (
            <h3 className="text-white font-bold text-lg md:text-2xl drop-shadow-lg">
              {slide.title}
            </h3>
          )}
          {slide.caption && (
            <p className="text-gray-200 text-sm md:text-base mt-1 drop-shadow">{slide.caption}</p>
          )}
        </div>
      )}

      {/* Ok butonları */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 backdrop-blur-sm"
            aria-label="Önceki"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 backdrop-blur-sm"
            aria-label="Sonraki"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Nokta göstergeler */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                background: i === current ? "#f5a623" : "rgba(255,255,255,0.45)",
              }}
              aria-label={`Slayt ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Sayaç */}
      <div className="absolute top-3 right-4 z-40 text-xs text-white/70 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
        {current + 1} / {slides.length}
      </div>
    </div>
  );
}

export default function HakkimizdaPage() {
  const [slides, setSlides] = useState<GallerySlide[]>([]);

  useEffect(() => {
    fetch("/api/admin/gallery-slides")
      .then((r) => r.json())
      .then((data: GallerySlide[]) => {
        setSlides(data.filter((s) => s.isActive));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-200 mb-8 text-center">
          Hikayemiz
        </h1>

        {slides.length > 0 && (
          <div className="mb-12">
            <Slideshow slides={slides} />
          </div>
        )}

        <div className="glass p-8 rounded-2xl space-y-6 text-gray-300 leading-relaxed text-lg">
          <p>
            Artvin'in eşsiz doğasında, yüksek rakımlı yaylalarında ve el değmemiş ormanlarında başlayan serüvenimiz,{" "}
            <strong className="text-primary"> Genç Arıcılık </strong> olarak yıllardır aynı doğallık ve saflıkla devam ediyor.
          </p>
          <p>
            Amacımız, endüstriyel üretimden tamamen uzak; arının sadece doğadaki bitkilerden faydalanarak ürettiği,
            şeker veya hiçbir kimyasal katkı maddesi içermeyen hakiki balı sofralarınıza ulaştırmaktır. Bizim için arıcılık
            bir meslekten öte, ata yadigarı bir tutku ve doğaya olan bir borcumuzdur.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Misyonumuz</h2>
          <p>
            İnsan sağlığını her şeyin üstünde tutarak; en yüksek standartlarda, hijyenik ve modern şartlarda ürettiğimiz
            arı ürünlerini Türkiye'nin her köşesine ulaştırmak.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Vizyonumuz</h2>
          <p>
            Bölgemizin zengin florasını koruyarak, doğal arıcılık pratikleriyle dünya çapında tanınan ve
            kalitesinden ödün vermeyen bir marka olmak.
          </p>
        </div>
      </div>
    </div>
  );
}
