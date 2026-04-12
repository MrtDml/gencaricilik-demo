export default function HakkimizdaPage() {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-200 mb-8 text-center">
          Hikayemiz
        </h1>
        
        <div className="glass p-8 rounded-2xl space-y-6 text-gray-300 leading-relaxed text-lg">
          <p>
            Artvin'in eşsiz doğasında, yüksek rakımlı yaylalarında ve el değmemiş ormanlarında başlayan serüvenimiz, 
            <strong className="text-primary"> Genç Arıcılık </strong> olarak yıllardır aynı doğallık ve saflıkla devam ediyor.
          </p>
          <p>
            Amacımız, endüstriyel üretimden tamamen uzak; arının sadece doğadaki bitkilerden faydalanarak ürettiği, 
            şeker veya hiçbir kimyasal katkı maddesi içermeyen hakiki balı sofralarınıza ulaştırmaktır. Bizim için arıcılık 
            bir meslekten öte, ata yadigarı bir tutku ve doğaya olan bir borcumuzdur.
          </p>
          
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Misyonumuz</h2>
          <p>
            İnsan sağlığını her şeyin üstünde tutarak; en yüksek standartlarda, hijyenik ve modern şartlarda ürettiğimiz 
            arı ürünlerini Türkiye'nin her köşesine ulaştırmak.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Vizyonumuz</h2>
          <p>
            Bölgemizin zengin florasını koruyarak, doğal arıcılık pratikleriyle dünya çapında tanınan ve 
            kalitesinden ödün vermeyen bir marka olmak.
          </p>
        </div>
      </div>
    </div>
  );
}
