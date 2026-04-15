"use client";

import { Building2, Plus, Trash2, Pencil, X, Check } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  iban: string;
  branch: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
}

const emptyForm = { bankName: "", accountName: "", iban: "", branch: "", order: 0 };

export default function AdminBankAccounts() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/bank-accounts");
    if (res.ok) setAccounts(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchAccounts(); }, [fetchAccounts]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/bank-accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm(emptyForm);
      await fetchAccounts();
    } else {
      const err = await res.json();
      alert(err.error || "Hata oluştu");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu banka hesabını silmek istediğinizden emin misiniz?")) return;
    const res = await fetch("/api/admin/bank-accounts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) await fetchAccounts();
  };

  const startEdit = (acc: BankAccount) => {
    setEditingId(acc.id);
    setEditForm({ bankName: acc.bankName, accountName: acc.accountName, iban: acc.iban, branch: acc.branch ?? "", order: acc.order });
  };

  const handleUpdate = async (id: string) => {
    const res = await fetch("/api/admin/bank-accounts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...editForm }),
    });
    if (res.ok) {
      setEditingId(null);
      await fetchAccounts();
    } else {
      const err = await res.json();
      alert(err.error || "Güncelleme hatası");
    }
  };

  const toggleActive = async (acc: BankAccount) => {
    await fetch("/api/admin/bank-accounts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: acc.id, bankName: acc.bankName, accountName: acc.accountName, iban: acc.iban, branch: acc.branch, isActive: !acc.isActive, order: acc.order }),
    });
    await fetchAccounts();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Building2 className="text-primary" /> Banka Hesapları (IBAN)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ekleme Formu */}
        <div className="glass p-6 rounded-2xl">
          <h2 className="text-lg font-semibold mb-4">Yeni Hesap Ekle</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Banka Adı *</label>
              <input required type="text" placeholder="Örn: Ziraat Bankası"
                value={form.bankName} onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Hesap Sahibi *</label>
              <input required type="text" placeholder="Örn: Ahmet Yılmaz"
                value={form.accountName} onChange={(e) => setForm({ ...form, accountName: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">IBAN *</label>
              <input required type="text" placeholder="TR00 0000 0000 0000 0000 0000 00"
                value={form.iban} onChange={(e) => setForm({ ...form, iban: e.target.value.toUpperCase() })}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white font-mono focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Şube (opsiyonel)</label>
              <input type="text" placeholder="Örn: Yusufeli"
                value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Sıra</label>
              <input type="number" min={0}
                value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary" />
            </div>
            <button type="submit" disabled={saving}
              className="w-full bg-primary text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors disabled:opacity-50">
              <Plus size={20} /> {saving ? "Kaydediliyor..." : "Ekle ve Yayınla"}
            </button>
          </form>
        </div>

        {/* Liste */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Kayıtlı Hesaplar <span className="text-sm font-normal text-gray-400">({accounts.length})</span>
          </h2>
          {loading ? (
            <div className="text-gray-400 text-sm">Yükleniyor...</div>
          ) : accounts.length === 0 ? (
            <div className="glass p-8 rounded-xl text-center text-gray-500 border border-white/5">
              <Building2 size={32} className="mx-auto mb-2 opacity-20" />
              <p className="text-sm">Henüz hesap eklenmemiş.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {accounts.map((acc) => (
                <div key={acc.id} className="glass p-4 rounded-xl border border-white/5">
                  {editingId === acc.id ? (
                    <div className="space-y-2">
                      <input type="text" value={editForm.bankName}
                        onChange={(e) => setEditForm({ ...editForm, bankName: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-primary" />
                      <input type="text" value={editForm.accountName}
                        onChange={(e) => setEditForm({ ...editForm, accountName: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-primary" />
                      <input type="text" value={editForm.iban}
                        onChange={(e) => setEditForm({ ...editForm, iban: e.target.value.toUpperCase() })}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white text-sm font-mono focus:outline-none focus:border-primary" />
                      <input type="text" placeholder="Şube" value={editForm.branch}
                        onChange={(e) => setEditForm({ ...editForm, branch: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-primary" />
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleUpdate(acc.id)}
                          className="flex-1 bg-primary text-black font-bold py-2 rounded-lg flex items-center justify-center gap-1 text-sm hover:bg-yellow-500 transition-colors">
                          <Check size={16} /> Kaydet
                        </button>
                        <button onClick={() => setEditingId(null)}
                          className="px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:bg-white/5 text-sm transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-white">{acc.bankName}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${acc.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                            {acc.isActive ? "Aktif" : "Pasif"}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{acc.accountName}</p>
                        {acc.branch && <p className="text-gray-500 text-xs">{acc.branch} Şubesi</p>}
                        <p className="font-mono text-primary text-sm mt-1 break-all">{acc.iban}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button onClick={() => toggleActive(acc)}
                          className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title={acc.isActive ? "Pasife Al" : "Aktife Al"}>
                          {acc.isActive ? <X size={16} /> : <Check size={16} />}
                        </button>
                        <button onClick={() => startEdit(acc)}
                          className="p-2 rounded-full hover:bg-white/10 text-blue-400 transition-colors">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(acc.id)}
                          className="p-2 rounded-full hover:bg-red-400/10 text-red-400 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
