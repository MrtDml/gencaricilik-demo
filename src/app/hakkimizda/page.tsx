"use client";

import { useState, useEffect, useCallback } from "react";
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

function Slideshow({ slides }: { slides: GallerySlide[] }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goTo = useCallback(
    (index: number, dir: "left" | "right" = "right") => {
      if (animating || slides.length < 2) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 400);
    },
    [animating, slides.length]
  );

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "left");
  }, [current, slides.length, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "right");
  }, [current, slides.length, goTo]);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[current];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl group" style={{ aspectRatio: "16/9" }}>
      {/* Image */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating
            ? `translateX(${direction === "right" ? "-4%" : "4%"})`
            : "translateX(0)",
        }}
      >
        <Image
          src={slide.imageUrl}
          alt={slide.title || "Galeri"}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 900px"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
      </div>

      {/* Caption */}
      {(slide.title || slide.caption) && (
        <div
          className="absolute bottom-0 left-0 right-0 p-6 z-10 transition-all duration-500"
          style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(8px)" : "translateY(0)" }}
        >
          {slide.title && (
            <h3 className="text-white font-bold text-xl md:text-2xl drop-shadow-lg">
              {slide.title}
            </h3>
          )}
          {slide.caption && (
            <p className="text-gray-200 text-sm md:text-base mt-1 drop-shadow">{slide.caption}</p>
          )}
        </div>
      )}

      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 backdrop-blur-sm"
            aria-label="Önceki"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 backdrop-blur-sm"
            aria-label="Sonraki"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "right" : "left")}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                background: i === current ? "#f5a623" : "rgba(255,255,255,0.5)",
              }}
              aria-label={`Slayt ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide counter */}
      <div className="absolute top-3 right-4 z-20 text-xs text-white/70 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
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

        {/* Slideshow */}
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
