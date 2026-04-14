"use client";

import { Users, Plus, Trash2, Shield, User } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface UserRecord {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "USER" });
  const [saving, setSaving] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ name: "", email: "", password: "", role: "USER" });
      setShowForm(false);
      await fetchUsers();
    } else {
      const err = await res.json();
      alert(err.error || "Hata oluştu");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) return;
    const res = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      await fetchUsers();
    } else {
      const err = await res.json();
      alert(err.error || "Silme başarısız");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="text-primary" /> Kullanıcı Yönetimi
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
        >
          <Plus size={18} /> Yeni Kullanıcı
        </button>
      </div>

      {/* Yeni Kullanıcı Formu */}
      {showForm && (
        <div className="glass p-6 rounded-2xl mb-6 border border-primary/30">
          <h2 className="text-lg font-semibold mb-4">Yeni Kullanıcı Ekle</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Ad Soyad</label>
              <input
                type="text"
                placeholder="Ad Soyad"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">E-posta *</label>
              <input
                required
                type="email"
                placeholder="ornek@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Şifre *</label>
              <input
                required
                type="password"
                placeholder="Şifre"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Rol</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
              >
                <option value="USER">Kullanıcı</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
              >
                {saving ? "Kaydediliyor..." : "Kullanıcı Oluştur"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-white/10 text-white py-3 px-6 rounded-lg hover:bg-white/20 transition-colors"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Kullanıcı Listesi */}
      <div className="glass rounded-2xl overflow-hidden border border-white/10">
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h2 className="font-semibold">Tüm Kullanıcılar</h2>
          <span className="text-sm text-gray-400">{users.length} kullanıcı</span>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-400">Yükleniyor...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Henüz kullanıcı yok.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-gray-400 text-sm">
                  <th className="p-4 font-medium">Kullanıcı</th>
                  <th className="p-4 font-medium">E-posta</th>
                  <th className="p-4 font-medium">Rol</th>
                  <th className="p-4 font-medium">Kayıt Tarihi</th>
                  <th className="p-4 font-medium">İşlem</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        {u.role === "ADMIN" ? <Shield size={14} /> : <User size={14} />}
                      </div>
                      <span className="text-white">{u.name || "—"}</span>
                    </td>
                    <td className="p-4 text-gray-300">{u.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          u.role === "ADMIN"
                            ? "bg-primary/20 text-primary"
                            : "bg-white/10 text-gray-300"
                        }`}
                      >
                        {u.role === "ADMIN" ? "Admin" : "Kullanıcı"}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">
                      {new Date(u.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="text-red-400 hover:bg-red-400/10 p-2 rounded-full transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
