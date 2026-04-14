"use client";

import { Bell, Plus, Trash2, Edit2, Check, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminAnnouncements() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", content: "", isActive: true });
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/announcements");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = editId ? "PUT" : "POST";
    const body = editId ? { ...form, id: editId } : form;
    const res = await fetch("/api/admin/announcements", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setForm({ title: "", content: "", isActive: true });
      setShowForm(false);
      setEditId(null);
      await fetchItems();
    } else {
      const err = await res.json();
      alert(err.error || "Hata oluştu");
    }
    setSaving(false);
  };

  const handleEdit = (item: Announcement) => {
    setForm({ title: item.title, content: item.content, isActive: item.isActive });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu duyuruyu silmek istediğinizden emin misiniz?")) return;
    const res = await fetch("/api/admin/announcements", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) await fetchItems();
  };

  const toggleActive = async (item: Announcement) => {
    await fetch("/api/admin/announcements", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, title: item.title, content: item.content, isActive: !item.isActive }),
    });
    await fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="text-primary" /> Duyuru Yönetimi
        </h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ title: "", content: "", isActive: true }); }}
          className="flex items-center gap-2 bg-primary text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
        >
          <Plus size={18} /> Yeni Duyuru
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="glass p-6 rounded-2xl mb-6 border border-primary/30">
          <h2 className="text-lg font-semibold mb-4">{editId ? "Duyuruyu Düzenle" : "Yeni Duyuru Ekle"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Başlık *</label>
              <input
                required
                type="text"
                placeholder="Duyuru başlığı"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">İçerik *</label>
              <textarea
                required
                rows={4}
                placeholder="Duyuru metni..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary resize-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-gray-300">Yayında</span>
              </label>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
              >
                {saving ? "Kaydediliyor..." : editId ? "Güncelle" : "Yayınla"}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditId(null); }}
                className="bg-white/10 text-white py-3 px-6 rounded-lg hover:bg-white/20 transition-colors"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste */}
      {loading ? (
        <div className="glass p-8 rounded-2xl text-center text-gray-400">Yükleniyor...</div>
      ) : items.length === 0 ? (
        <div className="glass p-12 rounded-2xl text-center text-gray-500 border border-white/5">
          <Bell size={48} className="mx-auto mb-4 opacity-20" />
          <p>Henüz duyuru yok. Yeni bir duyuru ekleyin.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="glass p-5 rounded-2xl border border-white/10 flex items-start gap-4">
              <div
                className={`mt-1 w-3 h-3 rounded-full shrink-0 ${
                  item.isActive ? "bg-green-400" : "bg-gray-600"
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      item.isActive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {item.isActive ? "Yayında" : "Gizli"}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{item.content}</p>
                <p className="text-xs text-gray-600 mt-2">
                  {new Date(item.createdAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleActive(item)}
                  className={`p-2 rounded-full transition-colors ${
                    item.isActive
                      ? "text-green-400 hover:bg-green-400/10"
                      : "text-gray-400 hover:bg-white/10"
                  }`}
                  title={item.isActive ? "Gizle" : "Yayınla"}
                >
                  {item.isActive ? <Check size={16} /> : <X size={16} />}
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-400 hover:bg-red-400/10 p-2 rounded-full transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
