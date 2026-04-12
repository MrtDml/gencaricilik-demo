import { Users, ShoppingCart, DollarSign, Activity } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Özeti</h1>
      
      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass p-6 rounded-2xl flex items-center justify-between border border-white/10">
          <div>
            <p className="text-gray-400 text-sm mb-1">Toplam Satış</p>
            <h3 className="text-2xl font-bold text-white">124.500 ₺</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex items-center justify-between border border-white/10">
          <div>
            <p className="text-gray-400 text-sm mb-1">Yeni Siparişler</p>
            <h3 className="text-2xl font-bold text-white">42</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
            <ShoppingCart size={24} />
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex items-center justify-between border border-white/10">
          <div>
            <p className="text-gray-400 text-sm mb-1">Toplam Müşteri</p>
            <h3 className="text-2xl font-bold text-white">856</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
            <Users size={24} />
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex items-center justify-between border border-white/10">
          <div>
            <p className="text-gray-400 text-sm mb-1">Aylık Büyüme</p>
            <h3 className="text-2xl font-bold text-white">+14%</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
            <Activity size={24} />
          </div>
        </div>
      </div>

      {/* Son Siparişler Tablosu */}
      <div className="glass rounded-2xl overflow-hidden border border-white/10">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white">Son Siparişler</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-sm">
                <th className="p-4 font-medium">Sipariş ID</th>
                <th className="p-4 font-medium">Müşteri</th>
                <th className="p-4 font-medium">Tarih</th>
                <th className="p-4 font-medium">Tutar</th>
                <th className="p-4 font-medium">Durum</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 text-white">#ORD-9021</td>
                <td className="p-4 text-gray-300">Ahmet Yılmaz</td>
                <td className="p-4 text-gray-400">12 Nisan 2026</td>
                <td className="p-4 font-bold text-primary">2.100 ₺</td>
                <td className="p-4"><span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-xs">Hazırlanıyor</span></td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 text-white">#ORD-9020</td>
                <td className="p-4 text-gray-300">Ayşe Demir</td>
                <td className="p-4 text-gray-400">11 Nisan 2026</td>
                <td className="p-4 font-bold text-primary">1.250 ₺</td>
                <td className="p-4"><span className="bg-blue-500/20 text-blue-500 px-3 py-1 rounded-full text-xs">Kargoda</span></td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 text-white">#ORD-9019</td>
                <td className="p-4 text-gray-300">Mehmet Kaya</td>
                <td className="p-4 text-gray-400">10 Nisan 2026</td>
                <td className="p-4 font-bold text-primary">850 ₺</td>
                <td className="p-4"><span className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-xs">Teslim Edildi</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
