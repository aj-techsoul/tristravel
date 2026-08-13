'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Compass, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

export default function MultiParallaxHero() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  // Multi-parallax transforms for distinct depth layers
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '120%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const mistOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0.95]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);

  return (
    <div
      ref={targetRef}
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1913]"
    >
      {/* Parallax Layer 1: Background Imagery */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0 origin-center"
      >
        <Image
          src="/hero.png"
          alt="Meghalaya Living Root Bridge & Waterfalls"
          fill
          priority
          className="object-cover object-center opacity-60 brightness-90 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1913]/60 via-[#0a1913]/40 to-[#0a1913]" />
      </motion.div>

      {/* Parallax Layer 2: Dynamic Mist Overlay */}
      <motion.div
        style={{ opacity: mistOpacity }}
        className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/40 via-transparent to-[#0a1913]"
      />

      {/* Parallax Layer 3: Hero Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 max-w-5xl mx-auto px-6 text-center pt-24 pb-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 text-sm font-semibold mb-6 backdrop-blur-md"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Recognized by Meghalaya Tourism & NIDHI</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-emerald-200 tracking-tight leading-tight mb-6"
        >
          Explore Meghalaya <br />
          <span className="text-emerald-400 underline decoration-emerald-500/50 decoration-wavy">
            Beyond the Standard Trails
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10"
        >
          Authentic Khasi village homestays, double-decker root bridges, secret caves, and crystal-clear rivers. Tailor-made with local native guides.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#planner"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-lg shadow-lg shadow-emerald-900/40 hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all duration-300"
          >
            <Compass className="w-5 h-5 animate-pulse" />
            <span>Customize Your Trip Now</span>
          </a>
        </motion.div>

        {/* Feature Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-14 flex flex-wrap justify-center gap-6 sm:gap-10 text-slate-400 text-sm font-medium"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>100% Customized Itineraries</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Cherrapunjee, Dawki, Sohra & Offbeat</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Parallax Layer 4: Foreground Depth Elements */}
      <motion.div
        style={{ y: foregroundY }}
        className="absolute bottom-0 inset-x-0 h-24 z-30 pointer-events-none bg-gradient-to-t from-[#0a1913] to-transparent"
      />
    </div>
  );
}
