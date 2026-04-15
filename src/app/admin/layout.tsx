"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, FileBadge, Package, Bell, Images, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
      router.push("/login");
    }
  }, [status, session, router]);

  if (status === "loading" || session?.user?.role !== "ADMIN") {
    return (
      <div className="flex h-screen items-center justify-center bg-dark-950">
        <p className="text-gray-400">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-dark-950 pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-900 border-r border-white/5 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white tracking-wide">Yönetim Paneli</h2>
          <p className="text-sm text-gray-400 mt-1">Hoş geldiniz, Admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 hover:text-white text-gray-400 transition-colors">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/urunler" className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <Package size={20} /> Ürünler
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <ShoppingBag size={20} /> Siparişler
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <Users size={20} /> Kullanıcılar
          </Link>
          <Link href="/admin/duyurular" className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <Bell size={20} /> Duyurular
          </Link>
          <Link href="/admin/belgeler" className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <FileBadge size={20} /> Belgeler
          </Link>
          <Link href="/admin/galeri" className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <Images size={20} /> Galeri
          </Link>
          <Link href="/admin/banka-hesaplari" className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <Building2 size={20} /> Banka Hesapları
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <Settings size={20} /> Ayarlar
          </Link>
        </nav>
        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={20} /> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-dark-950">
        {children}
      </main>
    </div>
  );
}
