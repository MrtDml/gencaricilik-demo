"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { productsData } from "@/data/products";
import { Leaf, Award, FlaskConical, Package } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Karakovan: <Package size={20} />,
  Süzme: <Leaf size={20} />,
  Takviye: <FlaskConical size={20} />,
};

const categoryColors: Record<string, string> = {
  Karakovan: "from-amber-700 to-amber-500",
  Süzme: "from-yellow-600 to-yellow-400",
  Takviye: "from-green-700 to-green-500",
};

export default function UrunlerimizPage() {
  const categories = ["Karakovan", "Süzme", "Takviye"];

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-20 overflow-hidden bg-dark-900 border-b border-white/5">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500 via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-primary font-semibold tracking-widest uppercase text-sm mb-4">
              <Award size={16} /> Doğadan Sofraya
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ürünlerimiz
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Artvin Yusufeli&apos;nin yüksek rakımlı yaylalarından elde edilen,
              katkısız ve saf arı ürünlerini keşfedin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products by Category */}
      <div className="container mx-auto px-4 py-16 space-y-20">
        {categories.map((category, catIdx) => {
          const categoryProducts = productsData.filter(
            (p) => p.category === category
          );
          if (categoryProducts.length === 0) return null;

          return (
            <section key={category}>
              {/* Category Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className="flex items-center gap-4 mb-10"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[category]} flex items-center justify-center text-white shadow-lg`}
                >
                  {categoryIcons[category]}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {category === "Karakovan"
                      ? "Karakovan & Petek Balları"
                      : category === "Süzme"
                      ? "Süzme Ballar"
                      : "Takviye Ürünler"}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {category === "Karakovan"
                      ? "El değmemiş doğadan, geleneksel yöntemlerle üretilmiş"
                      : category === "Süzme"
                      ? "Endemik çiçeklerden elde edilen, günlük tüketim için ideal"
                      : "Propolis, arı sütü ve polenden hazırlanan özel karışımlar"}
                  </p>
                </div>
                <div className="flex-1 h-px bg-white/10 ml-4 hidden md:block" />
              </motion.div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="glass rounded-2xl overflow-hidden flex flex-col group border border-white/10 hover:border-primary/40 transition-all duration-300"
                  >
                    {/* Product Image */}
                    <div className="relative h-56 bg-white flex items-center justify-center p-6">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                        onError={(e) =>
                          (e.currentTarget.src =
                            "https://via.placeholder.com/300?text=Ürün")
                        }
                      />
                      <span
                        className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[category]} text-white`}
                      >
                        {category}
                      </span>
                    </div>

                    {/* Product Info */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
                        {product.description}
                      </p>

                      {/* Benefits Preview */}
                      {product.benefits && product.benefits.length > 0 && (
                        <ul className="mb-4 space-y-1">
                          {product.benefits.slice(0, 2).map((b, bi) => (
                            <li
                              key={bi}
                              className="text-xs text-gray-500 flex items-start gap-1.5"
                            >
                              <span className="text-primary mt-0.5">✓</span>
                              <span className="line-clamp-1">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                        <span className="text-2xl font-bold text-primary">
                          {product.price > 0
                            ? `${product.price.toLocaleString("tr-TR")} ₺`
                            : "Fiyat Sorun"}
                        </span>
                        <Link
                          href={`/shop/${product.id}`}
                          className="bg-primary hover:bg-yellow-500 text-black font-bold text-sm py-2 px-4 rounded-lg transition-colors active:scale-95"
                        >
                          İncele
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <section className="py-16 bg-dark-900 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Sepetinizi Oluşturmaya Hazır mısınız?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Beğendiğiniz ürünleri sepetinize ekleyip güvenle sipariş
              verebilirsiniz.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-primary hover:bg-yellow-500 text-black font-bold py-4 px-10 rounded-full transition-colors text-lg shadow-lg"
            >
              Mağazaya Git →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
