"use client";

import { Check, Clock, Truck } from "lucide-react";

export default function AdminOrders() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sipariş Yönetimi</h1>
      
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5 text-gray-400">
            <tr>
              <th className="p-4">Sipariş ID</th>
              <th className="p-4">Tarih</th>
              <th className="p-4">Müşteri Detayı</th>
              <th className="p-4">Toplam</th>
              <th className="p-4">Ödeme</th>
              <th className="p-4">Durum (Güncelle)</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-white/5">
              <td className="p-4">#GENC-892</td>
              <td className="p-4 text-gray-400">12 Nisan 2026</td>
              <td className="p-4">Mustafa Yılmaz<br/><span className="text-xs text-gray-500">mustafa@mail.com</span></td>
              <td className="p-4 font-bold text-primary">1.250 ₺</td>
              <td className="p-4">Iyzico / Kart</td>
              <td className="p-4">
                <select className="bg-black/50 border border-white/20 p-2 rounded text-yellow-500 outline-none">
                  <option value="PREPARING">Hazırlanıyor</option>
                  <option value="SHIPPED">Kargoda</option>
                  <option value="DELIVERED">Teslim Edildi</option>
                </select>
              </td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="p-4">#GENC-891</td>
              <td className="p-4 text-gray-400">10 Nisan 2026</td>
              <td className="p-4">Zeynep Kaya<br/><span className="text-xs text-gray-500">zeynep@mail.com</span></td>
              <td className="p-4 font-bold text-primary">850 ₺</td>
              <td className="p-4">Havale</td>
              <td className="p-4">
                <select className="bg-black/50 border border-white/20 p-2 rounded text-blue-500 outline-none" defaultValue="SHIPPED">
                  <option value="PREPARING">Hazırlanıyor</option>
                  <option value="SHIPPED">Kargoda</option>
                  <option value="DELIVERED">Teslim Edildi</option>
                </select>
              </td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="p-4">#GENC-890</td>
              <td className="p-4 text-gray-400">08 Nisan 2026</td>
              <td className="p-4">Ali Demir<br/><span className="text-xs text-gray-500">ali@mail.com</span></td>
              <td className="p-4 font-bold text-primary">2.100 ₺</td>
              <td className="p-4">Kapıda Ödeme</td>
              <td className="p-4">
                <select className="bg-black/50 border border-white/20 p-2 rounded text-green-500 outline-none" defaultValue="DELIVERED">
                  <option value="PREPARING">Hazırlanıyor</option>
                  <option value="SHIPPED">Kargoda</option>
                  <option value="DELIVERED">Teslim Edildi</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
