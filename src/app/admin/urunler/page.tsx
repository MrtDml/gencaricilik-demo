"use client";

import { Package, Plus, Edit2, ExternalLink } from "lucide-react";
import { useState } from "react";
import { productsData } from "@/data/products";
import Link from "next/link";

export default function AdminProducts() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Package className="text-primary" /> Ürün Yönetimi
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center gap-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 font-semibold py-2 px-4 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
          >
            Bilgi
          </button>
          <Link
            href="/shop"
            target="_blank"
            className="flex items-center gap-2 bg-white/10 text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/20 transition-colors text-sm"
          >
            <ExternalLink size={16} /> Mağazayı Gör
          </Link>
        </div>
      </div>

      {showInfo && (
        <div className="glass p-4 rounded-xl mb-6 border border-blue-500/30 bg-blue-500/5 text-sm text-blue-300">
          <p>
            <strong>Demo Sürüm:</strong> Bu sayfada ürünler statik veri dosyasından gösterilmektedir.
            Tam sürümde ürünler veritabanından yönetilebilecek, fotoğraf yükleme ve stok takibi eklenecektir.
          </p>
        </div>
      )}

      {/* Ürün Listesi */}
      <div className="glass rounded-2xl overflow-hidden border border-white/10 mb-8">
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h2 className="font-semibold">Mevcut Ürünler</h2>
          <span className="text-sm text-gray-400">{productsData.length} ürün</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-sm">
                <th className="p-4 font-medium">Ürün</th>
                <th className="p-4 font-medium">Kategori</th>
                <th className="p-4 font-medium">Fiyat</th>
                <th className="p-4 font-medium">İşlem</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {productsData.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 shrink-0">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-white font-medium">{p.title}</span>
                        <p className="text-gray-500 text-xs line-clamp-1 max-w-xs">{p.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-primary">
                    {p.price.toLocaleString("tr-TR")} ₺
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/shop/${p.id}`}
                      target="_blank"
                      className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors inline-flex"
                    >
                      <ExternalLink size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Yeni Ürün Ekle Placeholder */}
      <div className="glass p-8 rounded-2xl border border-dashed border-white/20 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
          <Plus size={28} />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Yeni Ürün Ekle</h3>
        <p className="text-gray-500 text-sm mb-4 max-w-sm mx-auto">
          Tam sürümde bu alandan yeni ürün ekleyebilecek, mevcut ürünleri düzenleyebilecek ve stok takibi yapabileceksiniz.
        </p>
        <div className="flex items-center justify-center gap-2 text-primary/60">
          <Edit2 size={16} />
          <span className="text-sm font-medium">Tam Sürümde Aktif Olacak</span>
        </div>
      </div>
    </div>
  );
}
