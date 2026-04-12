import { MapPin, Phone, Mail } from "lucide-react";

export default function IletisimPage() {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-200 mb-6 text-center">
          Bize Ulaşın
        </h1>
        <p className="text-gray-400 text-center mb-12 text-lg">Sorularınız, toptan siparişleriniz veya önerileriniz için her zaman buradayız.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6">İletişim Formu</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Ad Soyad</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">E-Posta</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Mesajınız</label>
                <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"></textarea>
              </div>
              <button type="button" className="w-full cursor-pointer bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-600 drop-shadow-md transition-colors duration-300 active:scale-95">
                Gönder
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="glass p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-full text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Adres</h3>
                <p className="text-gray-400">Merkez Mahallesi, Artvin/Yusufeli Yolu Üzeri, Yusufeli / ARTVİN</p>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-full text-primary">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Telefon</h3>
                <p className="text-gray-400">+90 555 555 55 55</p>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-full text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">E-Posta</h3>
                <p className="text-gray-400">info@gencaricilik.com.tr</p>
              </div>
            </div>
            
            <div className="glass rounded-2xl overflow-hidden h-48 relative border border-white/10">
              {/* Google Maps Placeholder */}
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-500">
                Google Maps Entegrasyonu
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
