"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ImageIcon, Plus, Trash2, Pencil, Check, X, GripVertical, Eye, EyeOff, Upload } from "lucide-react";
import Image from "next/image";

interface GallerySlide {
  id: string;
  imageUrl: string;
  title: string;
  caption: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminGaleri() {
  const [slides, setSlides] = useState<GallerySlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit state
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCaption, setEditCaption] = useState("");

  const fetchSlides = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/gallery-slides");
    if (res.ok) setSlides(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchSlides(); }, [fetchSlides]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalUrl = imageUrl;

      if (uploadMode === "file" && selectedFile) {
        const fd = new FormData();
        fd.append("file", selectedFile);
        const upRes = await fetch("/api/admin/gallery-slides/upload", { method: "POST", body: fd });
        if (!upRes.ok) { alert("Yükleme hatası"); setSaving(false); return; }
        const { imageUrl: url } = await upRes.json();
        finalUrl = url;
      }

      if (!finalUrl) { alert("Görsel seçin veya URL girin"); setSaving(false); return; }

      const res = await fetch("/api/admin/gallery-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: finalUrl, title, caption }),
      });
      if (res.ok) {
        setImageUrl(""); setTitle(""); setCaption("");
        setSelectedFile(null); setPreviewUrl("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        await fetchSlides();
      } else {
        const err = await res.json();
        alert(err.error || "Hata oluştu");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu slaytı silmek istediğinizden emin misiniz?")) return;
    await fetch("/api/admin/gallery-slides", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchSlides();
  };

  const handleToggleActive = async (slide: GallerySlide) => {
    await fetch("/api/admin/gallery-slides", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: slide.id, isActive: !slide.isActive }),
    });
    await fetchSlides();
  };

  const startEdit = (slide: GallerySlide) => {
    setEditId(slide.id);
    setEditTitle(slide.title);
    setEditCaption(slide.caption);
  };

  const saveEdit = async (id: string) => {
    await fetch("/api/admin/gallery-slides", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title: editTitle, caption: editCaption }),
    });
    setEditId(null);
    await fetchSlides();
  };

  const currentPreview = uploadMode === "file" ? previewUrl : imageUrl;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
        <ImageIcon className="text-primary" /> Hakkımızda Galeri Yönetimi
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Form */}
        <div className="glass p-6 rounded-2xl border border-white/10">
          <h2 className="text-lg font-semibold mb-4 text-white">Yeni Slayt Ekle</h2>

          {/* Upload mode toggle */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setUploadMode("file")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                uploadMode === "file"
                  ? "bg-primary text-black"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <Upload size={16} /> Dosya Yükle
            </button>
            <button
              type="button"
              onClick={() => setUploadMode("url")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                uploadMode === "url"
                  ? "bg-primary text-black"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              URL Gir
            </button>
          </div>

          <form onSubmit={handleAdd} className="space-y-4">
            {uploadMode === "file" ? (
              <div>
                <label className="block text-sm text-gray-400 mb-2">Görsel Dosyası *</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer hover:border-primary/60 transition-colors"
                >
                  {previewUrl ? (
                    <div className="relative w-full h-36 rounded-lg overflow-hidden">
                      <Image src={previewUrl} alt="Önizleme" fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <Upload size={32} className="mx-auto mb-2 opacity-40" />
                      <p className="text-sm">Tıklayarak görsel seçin</p>
                      <p className="text-xs mt-1 opacity-60">JPG, PNG, WEBP desteklenir</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm text-gray-400 mb-2">Görsel URL *</label>
                <input
                  type="url"
                  placeholder="https://... veya /images/resimler/manzara1.jpeg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Örnek: /images/resimler/manzara1.jpeg veya harici URL
                </p>
              </div>
            )}

            {/* Preview */}
            {currentPreview && uploadMode === "url" && (
              <div className="relative w-full h-36 bg-white/5 rounded-xl overflow-hidden">
                <Image
                  src={currentPreview}
                  alt="Önizleme"
                  fill
                  className="object-cover"
                  onError={() => {}}
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-400 mb-2">Başlık <span className="opacity-50">(isteğe bağlı)</span></label>
              <input
                type="text"
                placeholder="Örn: Artvin'in Eşsiz Doğası"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Açıklama <span className="opacity-50">(isteğe bağlı)</span></label>
              <input
                type="text"
                placeholder="Kısa açıklama..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-primary text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors disabled:opacity-50"
            >
              <Plus size={20} /> {saving ? "Ekleniyor..." : "Slayt Ekle"}
            </button>
          </form>

          {/* Quick add hint */}
          <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/5">
            <p className="text-xs text-gray-500 font-medium mb-1">Yüklü resimler (URL ile hızlı ekle):</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {["manzara1.jpeg","manzara2.jpeg","manzara3.jpeg","manzara4.jpeg","manzara5.jpeg"].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => { setUploadMode("url"); setImageUrl(`/images/resimler/${f}`); }}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Slides List */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-white">
            Slaytlar{" "}
            <span className="text-sm font-normal text-gray-400">({slides.length})</span>
          </h2>

          {loading ? (
            <div className="text-gray-400 text-sm">Yükleniyor...</div>
          ) : slides.length === 0 ? (
            <div className="glass p-8 rounded-xl text-center text-gray-500 border border-white/5">
              <ImageIcon size={32} className="mx-auto mb-2 opacity-20" />
              <p className="text-sm">Henüz slayt eklenmedi.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className={`glass p-3 rounded-xl border transition-colors ${
                    slide.isActive ? "border-white/10" : "border-white/5 opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <GripVertical size={16} className="text-gray-600 mt-1 shrink-0 cursor-grab" />

                    {/* Thumbnail */}
                    <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-white/5">
                      <Image
                        src={slide.imageUrl}
                        alt={slide.title || "Slayt"}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {editId === slide.id ? (
                        <div className="space-y-2">
                          <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Başlık"
                            className="w-full bg-black/50 border border-white/20 rounded p-1.5 text-white text-sm focus:outline-none focus:border-primary"
                          />
                          <input
                            value={editCaption}
                            onChange={(e) => setEditCaption(e.target.value)}
                            placeholder="Açıklama"
                            className="w-full bg-black/50 border border-white/20 rounded p-1.5 text-white text-sm focus:outline-none focus:border-primary"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveEdit(slide.id)}
                              className="flex items-center gap-1 text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded hover:bg-green-600/30 transition-colors"
                            >
                              <Check size={12} /> Kaydet
                            </button>
                            <button
                              onClick={() => setEditId(null)}
                              className="flex items-center gap-1 text-xs bg-white/5 text-gray-400 px-2 py-1 rounded hover:bg-white/10 transition-colors"
                            >
                              <X size={12} /> İptal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-white text-sm font-medium truncate">
                            {slide.title || <span className="text-gray-500 italic">Başlıksız</span>}
                          </p>
                          <p className="text-gray-400 text-xs truncate mt-0.5">
                            {slide.caption || <span className="opacity-50">Açıklama yok</span>}
                          </p>
                          <p className="text-gray-600 text-xs mt-0.5 truncate">{slide.imageUrl}</p>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    {editId !== slide.id && (
                      <div className="flex flex-col gap-1 shrink-0">
                        <button
                          onClick={() => startEdit(slide)}
                          className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                          title="Düzenle"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleToggleActive(slide)}
                          className={`p-1.5 rounded transition-colors ${
                            slide.isActive
                              ? "text-green-400 hover:bg-green-400/10"
                              : "text-gray-600 hover:bg-white/10"
                          }`}
                          title={slide.isActive ? "Gizle" : "Göster"}
                        >
                          {slide.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>
                        <button
                          onClick={() => handleDelete(slide.id)}
                          className="p-1.5 rounded text-red-400 hover:bg-red-400/10 transition-colors"
                          title="Sil"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
