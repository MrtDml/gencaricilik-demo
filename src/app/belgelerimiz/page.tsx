import { FileBadge, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function BelgelerimizPage() {
  // Veritabanındaki gerçek verileri çeker
  const certificates = await prisma.certificate.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <ShieldCheck size={48} className="text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-200 mb-4">
            Sertifika ve Belgelerimiz
          </h1>
          <p className="text-gray-400 text-lg">Kalitemizi ve güvencemizi tescilleyen resmi belgelerimiz.</p>
        </div>

        {certificates.length === 0 ? (
          <div className="glass p-12 rounded-2xl text-center text-gray-400 border border-white/5">
            <FileBadge size={48} className="mx-auto mb-4 opacity-30" />
            <p>Şu an sistemde yüklenmiş belge bulunmamakta.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map(cert => (
              <div key={cert.id} className="glass rounded-2xl overflow-hidden group border border-white/10 hover:border-primary/40 transition-colors">
                <div className="h-64 bg-white/5 flex items-center justify-center p-4 relative">
                  <a href={cert.imageUrl} target="_blank" rel="noreferrer" className="absolute inset-0 z-10"></a>
                  <img src={cert.imageUrl} alt={cert.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 border-t border-white/5 text-center">
                  <h3 className="font-semibold text-white">{cert.title}</h3>
                  <p className="text-xs text-primary mt-2">Büyütmek için tıklayın</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
