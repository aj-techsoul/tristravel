import Canvas3DBackground from '@/components/Canvas3DBackground';
import MultiParallaxHero from '@/components/MultiParallaxHero';
import SmartPlannerForm from '@/components/SmartPlannerForm';
import Image from 'next/image';
import { Phone, Mail, MapPin, Heart, Shield } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a1913] text-slate-100 relative overflow-hidden font-sans">
      {/* 3D Three.js Floating Particle Background */}
      <Canvas3DBackground />

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a1913]/80 backdrop-blur-xl border-b border-emerald-500/20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌿</span>
            <span className="font-extrabold text-xl tracking-tight text-white">
              TRIS MEGHALAYA
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              COMMUNITY TRAVELS
            </span>
          </div>
          <a
            href="https://wa.me/9362930192"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-semibold text-sm hover:bg-emerald-500 hover:text-white transition-all duration-300"
          >
            <Phone className="w-4 h-4" />
            <span>WhatsApp +91-9362930192</span>
          </a>
        </div>
      </header>

      {/* Multi-Parallax Hero Section */}
      <MultiParallaxHero />

      {/* Homestay & Culture Spotlight Section */}
      <section className="relative z-20 py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[420px] rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl group">
            <Image
              src="/homestay.png"
              alt="Traditional Khasi Homestay"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1913] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider">
                Barefoot Comfort
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">
                Live Like a Local in Khasi Villages
              </h3>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold">
              <Heart className="w-4 h-4" />
              <span>Community Rooted Tourism</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Beyond Ordinary Hotels: True Warmth & Local Connection
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              TRIS Travels partners directly with local village families across Shillong, Sohra, Dawki, and remote hills. Enjoy warm home-cooked meals by open hearths, organic tea, and untold local legends.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-emerald-400 font-bold text-lg mb-1">100% Native</div>
                <div className="text-slate-400 text-xs">Local guides born in the hills</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-emerald-400 font-bold text-lg mb-1">Sustainable</div>
                <div className="text-slate-400 text-xs">Empowering rural livelihoods</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Smart Planner Form Section */}
      <SmartPlannerForm />

      {/* Footer */}
      <footer className="relative z-20 border-t border-emerald-500/20 py-12 px-6 bg-[#06120d] text-slate-400 text-sm text-center">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-white font-bold text-lg">
            <span>🌿 TRIS Meghalaya Travels</span>
          </div>
          <p className="max-w-md mx-auto text-slate-400">
            Recognized by Meghalaya Tourism & NIDHI. Crafting bespoke, eco-friendly journeys across the Northeast.
          </p>
          <div className="flex justify-center gap-6 text-emerald-400 font-medium">
            <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> +91 7005241197</span>
            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> trissimai03@gmail.com</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Shillong, Meghalaya</span>
          </div>
          <div className="pt-6 border-t border-slate-800 text-xs text-slate-500">
            © 2026 TRIS Meghalaya Travels. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
