"use client";

import { FileBadge, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

// Normalde bu veritabanından (Prisma) çekilecek olan state
// Şimdilik testleri yapabilmeniz için mock state kullanıyoruz
export default function AdminCertificates() {
  const [certs, setCerts] = useState([
    { id: 1, title: "Organik Tarım Sertifikası", url: "/images/GençArıcılık_Logo.png" }
  ]);

  const handleDelete = (id: number) => {
    setCerts(certs.filter(c => c.id !== id));
    alert("Belge başarıyla silindi!");
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Belge yükleme API entegrasyonu başarıyla tetiklendi. (Dosya sunucuya yüklenecek)");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FileBadge className="text-primary" /> Belge ve Sertifika Yönetimi
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-6 rounded-2xl">
          <h2 className="text-lg font-semibold mb-4">Yeni Belge Ekle</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Belge Adı / Başlığı</label>
              <input required type="text" placeholder="Örn: ISO 9001 Sertifikası" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Belge Görseli / PDF (Dosya Seç)</label>
              <input required type="file" className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white" />
            </div>
            <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              <Plus size={20} /> Yükle ve Yayınla
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Mevcut Belgeleriniz</h2>
          <div className="space-y-4">
            {certs.length === 0 ? (
              <div className="text-gray-500 text-sm">Yayında belge bulunmuyor.</div>
            ) : (
              certs.map(cert => (
                <div key={cert.id} className="glass p-4 rounded-xl flex items-center justify-between border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center p-1">
                      <img src={cert.url} alt={cert.title} className="max-w-full max-h-full object-contain opacity-50" />
                    </div>
                    <span className="font-medium">{cert.title}</span>
                  </div>
                  <button onClick={() => handleDelete(cert.id)} className="text-red-400 hover:bg-red-400/10 p-2 rounded-full transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
