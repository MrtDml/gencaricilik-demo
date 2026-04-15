import { FileBadge, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

const staticBelgeler = [
  { id: "birlik", title: "Birlik Belgesi", imageUrl: "/images/Belgeler/birlik_belgesi.png" },
  { id: "plaket", title: "Plaket", imageUrl: "/images/Belgeler/plaket_resim.png" },
];

export default async function BelgelerimizPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const tumBelgeler = [
    ...staticBelgeler,
    ...certificates.map(c => ({ id: String(c.id), title: c.title, imageUrl: c.imageUrl })),
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tumBelgeler.map(belge => (
            <div key={belge.id} className="glass rounded-2xl overflow-hidden group border border-white/10 hover:border-primary/40 transition-colors">
              <div className="h-64 bg-white/5 flex items-center justify-center p-4 relative">
                <a href={belge.imageUrl} target="_blank" rel="noreferrer" className="absolute inset-0 z-10" />
                <Image
                  src={belge.imageUrl}
                  alt={belge.title}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500 p-4"
                />
              </div>
              <div className="p-4 border-t border-white/5 text-center">
                <h3 className="font-semibold text-white">{belge.title}</h3>
                <p className="text-xs text-primary mt-2">Büyütmek için tıklayın</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
