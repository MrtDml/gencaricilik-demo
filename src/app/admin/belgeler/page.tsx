"use client";

import { FileBadge, Plus, Trash2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface Certificate {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
}

export default function AdminCertificates() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchCerts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/certificates");
    if (res.ok) setCerts(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchCerts(); }, [fetchCerts]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;
    setSaving(true);
    const res = await fetch("/api/admin/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, imageUrl }),
    });
    if (res.ok) {
      setTitle("");
      setImageUrl("");
      await fetchCerts();
    } else {
      const err = await res.json();
      alert(err.error || "Hata oluştu");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu belgeyi silmek istediğinizden emin misiniz?")) return;
    const res = await fetch("/api/admin/certificates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) await fetchCerts();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FileBadge className="text-primary" /> Belge ve Sertifika Yönetimi
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="glass p-6 rounded-2xl">
          <h2 className="text-lg font-semibold mb-4">Yeni Belge Ekle</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Belge Adı / Başlığı *</label>
              <input
                required
                type="text"
                placeholder="Örn: ISO 9001 Sertifikası"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Görsel URL *</label>
              <input
                required
                type="url"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
              />
              <p className="text-xs text-gray-500 mt-1">
                Görseli bir bulut servisine yükleyip URL&apos;ini girin (Cloudinary, ImgBB vb.)
              </p>
            </div>
            {imageUrl && (
              <div className="h-32 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden">
                <img src={imageUrl} alt="Önizleme" className="max-h-full max-w-full object-contain" onError={(e) => e.currentTarget.style.display = "none"} />
              </div>
            )}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-primary text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors disabled:opacity-50"
            >
              <Plus size={20} /> {saving ? "Yükleniyor..." : "Yükle ve Yayınla"}
            </button>
          </form>
        </div>

        {/* Liste */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Yayındaki Belgeler{" "}
            <span className="text-sm font-normal text-gray-400">({certs.length})</span>
          </h2>
          {loading ? (
            <div className="text-gray-400 text-sm">Yükleniyor...</div>
          ) : certs.length === 0 ? (
            <div className="glass p-8 rounded-xl text-center text-gray-500 border border-white/5">
              <FileBadge size={32} className="mx-auto mb-2 opacity-20" />
              <p className="text-sm">Yayında belge bulunmuyor.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {certs.map((cert) => (
                <div
                  key={cert.id}
                  className="glass p-4 rounded-xl flex items-center justify-between border border-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center p-1 overflow-hidden">
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    </div>
                    <div>
                      <span className="font-medium text-white">{cert.title}</span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(cert.createdAt).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(cert.id)}
                    className="text-red-400 hover:bg-red-400/10 p-2 rounded-full transition-colors shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
