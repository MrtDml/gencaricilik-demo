Gelişmiş Müşteri Deneyimi ve Satış Artırıcı Modüllerin Entegrasyonu
Bu plan, E-ticaret sitemizin "Frontend (Önyüz)" tarafını zirveye taşıyacak; müşteri güvenini artırıp satışa teşvik edecek 6 devrimsel modülün projeye dahil edilmesini kapsar.

User Review Required
Bu plan sitenize yeni sayfalar, küresel bileşenler ve interaktif alanlar ekleyeceği için genel bir onayınıza ihtiyaç duymaktadır. Lütfen eklemeleri inceleyip işleme başlamam için onay veriniz! (Dilerseniz WhatsApp butonunda kullanılacak telefon veya metin detayını da iletebilirsiniz, ama şimdilik örnek bir yapıyla kurabilirim).

Proposed Changes
Global Bileşenler
[NEW] src/components/WhatsAppButton.tsx
Ekranın sağ alt köşesinde her zaman sabit (fixed) ve yukarı aşağı animasyonla hafifçe süzülen "Canlı Destek / WhatsApp" butonu. Müşteri butona bastığında doğrudan sizin WhatsApp numaranıza (şimdilik örnek numara) ve özel bir karşılama mesajına ("Merhaba, Genç Arıcılık balları hakkında bilgi almak istiyorum") yönlendirilecek.

[MODIFY] src/app/layout.tsx
WhatsAppButton bileşeni uygulamanın en kök dosyasına eklenecek, böylece müşteri hangi sayfada olursa olsun tek tıkla size ulaşabilecek.

Mağaza & Veri Geliştirmeleri
[MODIFY] src/data/products.ts
Mevcut sahte veritabanımıza yeni alanlar eklenecek:

category: Ürünlere kategori etiketi (Petek, Süzme, Takviye).
reviews: Her bir ürün için 5 yıldızlı müşteri yorumları (isim, puan, yorum metni).
[MODIFY] src/app/shop/page.tsx
Mağaza sayfasına şu yetenekler eklenecek:

Sayfa üstüne şık bir Arama (Search) Çubuğu.
Kategorilere göre listeleme sağlayan Filtreleme Butonları (Tümü, Petek Ballar, Süzme Ballar, Takviyeler vb.).
Ürün Detay Sayfası Geliştirmeleri
[MODIFY] src/app/shop/[id]/page.tsx
Mevcut şık ürün detay sayfası daha da zenginleştirilecek:

S.S.S ve Kargo Bilgisi: Sayfaya açılır kapanır (Accordion) bir yapı ile "Nasıl Muhafaza Edilir?", "Kargo Ne Zaman Ulaşır?" gibi önemli sorular sıkıştırılacak.
Müşteri Yorumları: Müşterilerin o ürüne verdiği yıldızlar ve gerçekçi yorum arayüzü görselleştirilecek.
Benzer Ürünler (Çapraz Satış): Müşteri sayfanın en altına geldiğinde dinamik olarak 3 adet başka ürünü daha "Bunu İnceleyenler Şunları Da Beğendi" başlığı altında görecek.
Blog Sistemi
[NEW] src/app/blog/page.tsx
Sitenin Google görünürlüğünü (SEO) şaha kaldıracak olan yeni "Blog / Arıcının Günlüğü" sayfası eklenecek. Sayfada birkaç örnek makale ("Hakiki bal nasıl anlaşılır?", "Arı sütünün faydaları" vb.) fotoğraf ve başlıklarla listelenecek. Tepedeki menüye (Header) "Blog" bağlantısı eklenecek.

Open Questions
Şimdilik WhatsApp butonuna +90 555 555 55 55 tarzı örnek bir numara yazacağım, ancak gerçek numaranızı vermek isterseniz direkt onu kullanabiliriz.
Blog kısmı için yazıların içerikleri şimdilik örnek metinlerle gösterilecektir, uygun mudur?
Verification Plan
Manual Verification
Onayınızla birlikte her işlem tamamlandıktan sonra sitenizi tarayıcınızdan ziyaret ederek; filtrelemelerin doğru çalıştığını, detay sayfasının dopdolu olduğunu ve sol attaki WhatsApp butonunun harika işlediğini kendi gözlerinizle test edeceksiniz.

