"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { ShoppingCart, Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { productsData } from "@/data/products";

export default function ShopPage() {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const categories = ["Tümü", "Karakovan", "Süzme", "Takviye"];

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
      size: "Standart"
    });
    
    setAdded(product.id);
    toast.success(`${product.title} sepetinize eklendi! 🍯`);
    setTimeout(() => setAdded(null), 2000);
  };

  // Filtreme Mantığı
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      // 1. Kategori Uyumu
      if (activeCategory !== "Tümü" && product.category !== activeCategory) {
        return false;
      }
      // 2. Arama Uyumu
      if (searchTerm.trim() !== "") {
        return product.title.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="pt-28 pb-20 container mx-auto px-4 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-200">Mağaza</h1>
          <p className="text-gray-400 mt-2">Artvin'in doğal şifası hemen kapınızda.</p>
        </div>
        
        {/* Arama Alanı */}
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="Bal arayın..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/10 text-white px-4 py-3 pl-11 rounded-full focus:outline-none focus:border-primary transition-colors"
          />
          <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Kategori Filtreleri */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 hide-scrollbar border-b border-white/10">
        <div className="flex items-center text-gray-500 mr-2 shrink-0">
          <Filter size={18} className="mr-2" /> Filtrele:
        </div>
        {categories.map((cat, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full font-semibold transition-all shrink-0 border ${activeCategory === cat ? 'bg-primary text-black border-transparent' : 'bg-black/30 border-white/20 text-gray-300 hover:border-primary/50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % 4) * 0.1 }}
              className="glass rounded-2xl overflow-hidden flex flex-col hover:border-primary/50 transition-colors group cursor-pointer"
            >
              <Link href={`/shop/${product.id}`} className="relative h-64 w-full bg-white flex items-center justify-center p-4">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => e.currentTarget.src = "https://via.placeholder.com/300?text=Ürün"}
                />
              </Link>
              <div className="p-6 flex flex-col flex-grow">
                <Link href={`/shop/${product.id}`} className="hover:text-primary transition-colors">
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                </Link>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">{product.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-primary">{product.price > 0 ? `${product.price.toLocaleString("tr-TR")} ₺` : "0 ₺"}</span>
                    <Link href={`/shop/${product.id}`} className="inline-block text-center mt-2 bg-yellow-400 text-black font-bold text-xs py-1.5 px-3 rounded-md hover:bg-yellow-600 drop-shadow-sm active:scale-95 transition-all duration-300">
                      İncele
                    </Link>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className={`p-3 rounded-full transition-all flex items-center justify-center ${added === product.id ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-primary hover:text-black text-white'}`}
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500">
            <p className="text-xl mb-4">Arama kriterlerinize uygun ürün bulunamadı. 🍯</p>
            <button onClick={() => {setSearchTerm(""); setActiveCategory("Tümü");}} className="text-primary underline">Filtreleri Temizle</button>
          </div>
        )}
      </div>
    </div>
  );
}
