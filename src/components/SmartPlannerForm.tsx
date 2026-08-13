'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Users,
  Mountain,
  Home,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Send,
  Sparkles,
} from 'lucide-react';

interface TripState {
  duration: string;
  travelDate: string;
  groupType: string;
  numTravelers: number;
  experiences: string[];
  stayType: string;
  name: string;
  phone: string;
  notes: string;
}

export default function SmartPlannerForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [state, setState] = useState<TripState>({
    duration: '5 Days / 4 Nights',
    travelDate: '',
    groupType: 'Couple / Duo',
    numTravelers: 2,
    experiences: ['Double Decker Root Bridge Hike', 'Dawki Crystal River'],
    stayType: 'Village Homestays (Recommended)',
    name: '',
    phone: '',
    notes: '',
  });

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const toggleExp = (exp: string) => {
    setState((prev) => ({
      ...prev,
      experiences: prev.experiences.includes(exp)
        ? prev.experiences.filter((item) => item !== exp)
        : [...prev.experiences, exp],
    }));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.name || !state.phone) {
      alert('Please fill out your Name and WhatsApp / Mobile number!');
      return;
    }

    triggerConfetti();

    const message = `🌿 *TRIS MEGHALAYA TRIP CUSTOM INQUIRY* 🌿\n\n` +
      `👤 *Name:* ${state.name}\n` +
      `📱 *WhatsApp:* ${state.phone}\n\n` +
      `🗓️ *Duration:* ${state.duration} (${state.travelDate || 'Dates TBD'})\n` +
      `🎒 *Group:* ${state.groupType} (${state.numTravelers} traveler/s)\n` +
      `🏞️ *Selected Experiences:* ${state.experiences.length ? state.experiences.join(', ') : 'Custom Exploration'}\n` +
      `🏡 *Stay Style:* ${state.stayType}\n` +
      (state.notes ? `💬 *Notes:* ${state.notes}\n` : '') +
      `\nPlease share a customized itinerary & quote!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/917005241197?text=${encoded}`, '_blank');
  };

  return (
    <section id="planner" className="relative z-20 py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
          Smart Custom Trip Planner
        </h2>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Tailor your dates, preferences, and experiences in 4 simple steps to receive your personalized plan.
        </p>
      </div>

      {/* Main Glassmorphism Form Card */}
      <div className="relative bg-emerald-950/40 border border-emerald-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-emerald-950/60">
        
        {/* Stepper Header */}
        <div className="flex justify-between items-center relative mb-12">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-800 z-0" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 z-0"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />

          {[
            { num: 1, label: 'Duration', icon: Calendar },
            { num: 2, label: 'Travelers', icon: Users },
            { num: 3, label: 'Experiences', icon: Mountain },
            { num: 4, label: 'Stay & Quote', icon: Home },
          ].map((s) => {
            const Icon = s.icon;
            const isActive = currentStep === s.num;
            const isDone = currentStep > s.num;

            return (
              <div
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50 scale-110'
                      : isDone
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-900 border border-slate-700 text-slate-400 group-hover:border-emerald-500/50'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span
                  className={`text-xs font-semibold hidden sm:block ${
                    isActive ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Step 1: Select Trip Length & Dates</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: '3 Days / 2 Nights', desc: 'Sohra & Shillong Quick Getaway' },
                  { title: '5 Days / 4 Nights', desc: 'Classic Waterfalls & Dawki River (Popular)' },
                  { title: '7 Days / 6 Nights', desc: 'Deep Trekking & Living Root Bridges' },
                  { title: 'Custom Duration', desc: 'Tell us your preferred timeline' },
                ].map((opt) => (
                  <div
                    key={opt.title}
                    onClick={() => setState((p) => ({ ...p, duration: opt.title }))}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      state.duration === opt.title
                        ? 'border-emerald-400 bg-emerald-500/15 shadow-lg shadow-emerald-950'
                        : 'border-slate-800 bg-slate-900/50 hover:border-emerald-500/30'
                    }`}
                  >
                    <div className="font-bold text-white text-lg mb-1">{opt.title}</div>
                    <div className="text-slate-400 text-sm">{opt.desc}</div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Estimated Travel Month / Dates
                </label>
                <input
                  type="text"
                  placeholder="e.g. November 2026 or Nov 10 - Nov 15"
                  value={state.travelDate}
                  onChange={(e) => setState((p) => ({ ...p, travelDate: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:border-emerald-400 transition"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={nextStep}
                  className="px-6 py-3 rounded-full bg-emerald-500 text-white font-bold inline-flex items-center gap-2 hover:bg-emerald-400 transition"
                >
                  <span>Select Travelers</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Step 2: Who is Traveling?</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Couple / Duo', desc: 'Private & intimate pace' },
                  { title: 'Family Trip', desc: 'Kid & elderly comfortable' },
                  { title: 'Group of Friends', desc: 'Adventure & trail focused' },
                  { title: 'Solo Traveler', desc: 'Authentic village immersion' },
                ].map((opt) => (
                  <div
                    key={opt.title}
                    onClick={() => setState((p) => ({ ...p, groupType: opt.title }))}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      state.groupType === opt.title
                        ? 'border-emerald-400 bg-emerald-500/15 shadow-lg shadow-emerald-950'
                        : 'border-slate-800 bg-slate-900/50 hover:border-emerald-500/30'
                    }`}
                  >
                    <div className="font-bold text-white text-lg mb-1">{opt.title}</div>
                    <div className="text-slate-400 text-sm">{opt.desc}</div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Number of Persons
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={state.numTravelers}
                  onChange={(e) =>
                    setState((p) => ({ ...p, numTravelers: parseInt(e.target.value) || 1 }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:border-emerald-400 transition"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 rounded-full border border-slate-700 text-slate-300 font-semibold inline-flex items-center gap-2 hover:bg-slate-800 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-3 rounded-full bg-emerald-500 text-white font-bold inline-flex items-center gap-2 hover:bg-emerald-400 transition"
                >
                  <span>Select Experiences</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                <Mountain className="w-5 h-5" />
                <span>Step 3: Choose What You Want to Experience</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Double Decker Root Bridge Hike', desc: 'Trek to Nongriat & Rainbow Falls' },
                  { title: 'Dawki Crystal River', desc: 'Clear water boat ride on Umngot' },
                  { title: 'Caves & Waterfall Trails', desc: 'Arwah Cave, Mawsmai & Wei Sawdong' },
                  { title: 'Village Homestay & Cuisine', desc: 'Local Khasi warmth & home-cooked meals' },
                ].map((opt) => {
                  const isSelected = state.experiences.includes(opt.title);
                  return (
                    <div
                      key={opt.title}
                      onClick={() => toggleExp(opt.title)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-950'
                          : 'border-slate-800 bg-slate-900/50 hover:border-emerald-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white text-lg">{opt.title}</span>
                        {isSelected && <Sparkles className="w-5 h-5 text-amber-400" />}
                      </div>
                      <div className="text-slate-400 text-sm">{opt.desc}</div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 rounded-full border border-slate-700 text-slate-300 font-semibold inline-flex items-center gap-2 hover:bg-slate-800 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-3 rounded-full bg-emerald-500 text-white font-bold inline-flex items-center gap-2 hover:bg-emerald-400 transition"
                >
                  <span>Review & Get Plan</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.form
              key="step4"
              onSubmit={handleWhatsAppSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                <Home className="w-5 h-5" />
                <span>Step 4: Stay Style & Instant Plan Request</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: 'Village Homestays (Recommended)', desc: 'Warm local hosts & traditional feel' },
                  { title: 'Boutique Eco-Resorts', desc: 'Valley view luxury & comfort' },
                  { title: 'Mix of Both', desc: 'Homestays in villages + Resort in Sohra' },
                ].map((opt) => (
                  <div
                    key={opt.title}
                    onClick={() => setState((p) => ({ ...p, stayType: opt.title }))}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      state.stayType === opt.title
                        ? 'border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-950'
                        : 'border-slate-800 bg-slate-900/50 hover:border-emerald-500/30'
                    }`}
                  >
                    <div className="font-bold text-white text-base mb-1">{opt.title}</div>
                    <div className="text-slate-400 text-xs">{opt.desc}</div>
                  </div>
                ))}
              </div>

              {/* Dynamic Summary Preview */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-2 text-sm">
                <div className="text-emerald-400 font-bold text-base mb-2">📋 Live Itinerary Breakdown</div>
                <div className="flex justify-between text-slate-300">
                  <span>Duration:</span>
                  <span className="font-semibold text-white">{state.duration}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Group Size:</span>
                  <span className="font-semibold text-white">{state.groupType} ({state.numTravelers} persons)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Experiences:</span>
                  <span className="font-semibold text-emerald-300 text-right max-w-[60%]">
                    {state.experiences.join(', ')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anita Roy"
                    value={state.name}
                    onChange={(e) => setState((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:border-emerald-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 9876543210"
                    value={state.phone}
                    onChange={(e) => setState((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:border-emerald-400 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">
                  Special Notes or Questions
                </label>
                <textarea
                  rows={2}
                  placeholder="Airport pickup details, dietary restrictions..."
                  value={state.notes}
                  onChange={(e) => setState((p) => ({ ...p, notes: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:border-emerald-400 transition"
                />
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 rounded-full border border-slate-700 text-slate-300 font-semibold inline-flex items-center gap-2 hover:bg-slate-800 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg inline-flex items-center gap-3 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5"
                >
                  <Send className="w-5 h-5" />
                  <span>Request Custom Itinerary on WhatsApp</span>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
