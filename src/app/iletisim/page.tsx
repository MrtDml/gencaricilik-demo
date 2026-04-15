import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

const socialLinks = [
  { href: "https://www.instagram.com/gencaricilik", icon: Instagram, label: "Instagram", color: "hover:text-pink-400 hover:border-pink-400/40" },
  { href: "https://www.facebook.com/gencaricilik", icon: Facebook, label: "Facebook", color: "hover:text-blue-400 hover:border-blue-400/40" },
  { href: "https://www.youtube.com/@gencaricilik", icon: Youtube, label: "YouTube", color: "hover:text-red-400 hover:border-red-400/40" },
  { href: "https://wa.me/905555555555", icon: MessageCircle, label: "WhatsApp", color: "hover:text-green-400 hover:border-green-400/40" },
];

export default function IletisimPage() {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-200 mb-6 text-center">
          Bize Ulaşın
        </h1>
        <p className="text-gray-400 text-center mb-12 text-lg">Sorularınız, toptan siparişleriniz veya önerileriniz için her zaman buradayız.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
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

          {/* İletişim Bilgileri */}
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-full text-primary shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Adres</h3>
                <p className="text-gray-400">Merkez Mahallesi, Artvin/Yusufeli Yolu Üzeri, Yusufeli / ARTVİN</p>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-full text-primary shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Telefon</h3>
                <a href="tel:+905555555555" className="text-gray-400 hover:text-primary transition-colors">+90 555 555 55 55</a>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-full text-primary shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">E-Posta</h3>
                <a href="mailto:info@gencaricilik.com.tr" className="text-gray-400 hover:text-primary transition-colors">info@gencaricilik.com.tr</a>
              </div>
            </div>

            {/* Sosyal Medya */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="font-semibold text-lg mb-4">Sosyal Medya</h3>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ href, icon: Icon, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-200 ${color}`}
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-3">Bizi takip edin, doğal yaşam içeriklerimizden haberdar olun.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
