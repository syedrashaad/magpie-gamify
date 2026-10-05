import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserState, BodyColor } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { Sparkles, ArrowRight, CheckCircle2, Shield, Hotel, Award, Star } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: (updatedUser?: Partial<UserState>) => void;
  userState: UserState;
}

const BIRD_VARIANTS: Array<{
  id: string;
  name: string;
  species: string;
  bodyColor: BodyColor;
  tagline: string;
  description: string;
}> = [
  {
    id: 'nova',
    name: 'Nova',
    species: 'Magpie-Robin',
    bodyColor: 'blue',
    tagline: 'Energetic & Observant',
    description: 'Specializes in active listening, guest de-escalation, and 5-star service recovery.',
  },
  {
    id: 'skye',
    name: 'Skye',
    species: 'Kingfisher',
    bodyColor: 'purple',
    tagline: 'Swift & Precision',
    description: 'Excels at rapid problem solving, arrival VIP greetings, and seamless concierge routing.',
  },
  {
    id: 'ember',
    name: 'Ember',
    species: 'Sunbird',
    bodyColor: 'gold',
    tagline: 'Warm & Enthusiastic',
    description: 'Master of hospitality warmth, fine dining etiquette, and memorable guest delight.',
  },
];

const HOTEL_PROPERTIES = [
  'The Taj Mahal Palace, Mumbai',
  'Grand Hyatt, Goa',
  'The Leela Palace, Bengaluru',
  'ITC Maurya, New Delhi',
  'Oberoi Udaivilas, Udaipur',
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  userState,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedBird, setSelectedBird] = useState(BIRD_VARIANTS[0]);
  const [userName, setUserName] = useState(userState.name || 'Alex Morgan');
  const [userRole, setUserRole] = useState(userState.role || 'Front Office Manager');
  const [userProperty, setUserProperty] = useState(userState.property || HOTEL_PROPERTIES[0]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 5) {
      setStep((prev) => (prev + 1) as any);
    } else {
      onClose({
        name: userName,
        role: userRole,
        property: userProperty,
        magpie: {
          ...userState.magpie,
          name: selectedBird.name,
          bodyColor: selectedBird.bodyColor,
        },
      });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-gradient-to-b from-sky-50 via-blue-50 to-amber-50 border-2 border-white shadow-2xl rounded-3xl p-6 sm:p-8 text-slate-800 my-auto"
        >
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-6 border-b border-sky-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                {step}/5
              </span>
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                {step === 1 && 'Welcome to Magpie AI'}
                {step === 2 && 'Choose Your Companion'}
                {step === 3 && 'Your Hotel Role'}
                {step === 4 && 'Hotel World Map'}
                {step === 5 && 'Ready to Soar!'}
              </span>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s === step ? 'w-6 bg-sky-500' : s < step ? 'w-2 bg-sky-300' : 'w-2 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* STEP 1: WELCOME */}
          {step === 1 && (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto relative flex items-center justify-center rounded-3xl bg-white shadow-lg border-2 border-sky-100">
                <MagpieCharacter
                  bodyColor="blue"
                  featherStyle="classic"
                  accessory="badge"
                  level={1}
                  isCelebrating={true}
                  size="hero"
                />
              </div>

              <div>
                <span className="px-3.5 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-700 font-extrabold text-xs uppercase tracking-wider">
                  PLAY · LEARN · SOAR
                </span>
                <h2 className="text-3xl font-black text-slate-900 mt-3 tracking-tight">
                  Hospitality Training Redefined
                </h2>
                <p className="text-sm font-medium text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                  Master real 5-star hotel guest scenarios, raise your personal AI Magpie companion, and race your team on the Sky League leaderboard.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-white/80 border border-sky-100 p-3 rounded-2xl text-center shadow-sm">
                  <span className="text-2xl mb-1 block">🏆</span>
                  <div className="text-xs font-bold text-slate-800">5 Hotel Regions</div>
                  <div className="text-[10px] font-semibold text-slate-500">25 Level Journey</div>
                </div>
                <div className="bg-white/80 border border-sky-100 p-3 rounded-2xl text-center shadow-sm">
                  <span className="text-2xl mb-1 block">🐦</span>
                  <div className="text-xs font-bold text-slate-800">AI Companion</div>
                  <div className="text-[10px] font-semibold text-slate-500">Nourish & Evolve</div>
                </div>
                <div className="bg-white/80 border border-sky-100 p-3 rounded-2xl text-center shadow-sm">
                  <span className="text-2xl mb-1 block">⚡</span>
                  <div className="text-xs font-bold text-slate-800">Sky League</div>
                  <div className="text-[10px] font-semibold text-slate-500">Team Competition</div>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2 border border-amber-300"
              >
                <span>CHOOSE YOUR BIRD COMPANION</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STEP 2: CHOOSE YOUR BIRD */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Choose Your Companion Bird
                </h2>
                <p className="text-xs font-semibold text-slate-600 mt-1">
                  Your companion accompanies you through every hospitality level and reacts in real-time.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BIRD_VARIANTS.map((bird) => {
                  const isSelected = selectedBird.id === bird.id;
                  return (
                    <button
                      key={bird.id}
                      onClick={() => setSelectedBird(bird)}
                      className={`relative p-4 rounded-2xl border-2 text-left transition-all ${
                        isSelected
                          ? 'bg-white border-amber-400 shadow-xl ring-2 ring-amber-400/50 scale-[1.02]'
                          : 'bg-white/70 border-sky-100 hover:border-sky-300 hover:bg-white shadow-sm'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider">
                          SELECTED
                        </span>
                      )}

                      <div className="w-16 h-16 mx-auto mb-2 relative flex items-center justify-center rounded-xl bg-sky-50 border border-sky-100">
                        <MagpieCharacter
                          bodyColor={bird.bodyColor}
                          featherStyle="classic"
                          accessory="none"
                          level={1}
                          size="md"
                        />
                      </div>

                      <div className="text-center">
                        <h3 className="font-black text-slate-900 text-sm">{bird.name}</h3>
                        <p className="text-[10px] font-bold text-sky-600 uppercase tracking-wider mb-1">
                          {bird.species}
                        </p>
                        <p className="text-[11px] font-medium text-slate-600 leading-snug">
                          {bird.tagline}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 bg-white/80 border border-sky-100 rounded-2xl flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-xs font-semibold text-slate-700">
                  {selectedBird.description}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all"
                >
                  BACK
                </button>
                <button
                  onClick={handleNext}
                  className="w-2/3 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 border border-amber-300"
                >
                  <span>CONFIRM COMPANION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: WORKPLACE DETAILS */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Your Hotel Profile
                </h2>
                <p className="text-xs font-semibold text-slate-600 mt-1">
                  We customize scenario feedback to your specific department and hotel brand standards.
                </p>
              </div>

              <div className="space-y-4 bg-white/80 p-4 rounded-2xl border border-sky-100 shadow-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold text-sm text-slate-800"
                    placeholder="Alex Morgan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Department Role
                  </label>
                  <input
                    type="text"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold text-sm text-slate-800"
                    placeholder="Front Office Manager"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Hotel Property
                  </label>
                  <select
                    value={userProperty}
                    onChange={(e) => setUserProperty(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold text-sm text-slate-800 bg-white"
                  >
                    {HOTEL_PROPERTIES.map((prop) => (
                      <option key={prop} value={prop}>
                        {prop}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="w-1/3 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all"
                >
                  BACK
                </button>
                <button
                  onClick={handleNext}
                  className="w-2/3 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 border border-amber-300"
                >
                  <span>SAVE & CONTINUE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: HOTEL WORLD PREVIEW */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  The Hotel Learning World
                </h2>
                <p className="text-xs font-semibold text-slate-600 mt-1">
                  Travel through 5 realistic hotel environments and master guest interaction challenges.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  { region: 'Region 1', title: 'Lobby & Arrival', desc: 'VIP greetings & speedy check-ins', icon: '🏨' },
                  { region: 'Region 2', title: 'Housekeeping Sanctuary', desc: 'Deep room readiness & turn-down perfection', icon: '🧹' },
                  { region: 'Region 3', title: 'Fine Dining & Bar', desc: 'Dietary disputes & table wine pairing', icon: '🍷' },
                  { region: 'Region 4', title: 'Concierge & Guest Relations', desc: 'Excursion routing & high-stakes complaints', icon: '🗺️' },
                  { region: 'Region 5', title: 'Executive Suite & VIP Service', desc: 'Celebrity guest privacy & butler etiquette', icon: '👑' },
                ].map((r, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white/80 border border-sky-100 rounded-2xl flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{r.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-sky-600 uppercase tracking-wider">{r.region}</span>
                          <span className="font-bold text-slate-900 text-xs">{r.title}</span>
                        </div>
                        <p className="text-[11px] font-semibold text-slate-500">{r.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      5 Levels
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="w-1/3 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all"
                >
                  BACK
                </button>
                <button
                  onClick={handleNext}
                  className="w-2/3 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 border border-amber-300"
                >
                  <span>SEE STARTING DESTINATION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: READY TO SOAR */}
          {step === 5 && (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto relative flex items-center justify-center rounded-3xl bg-white shadow-xl border-2 border-amber-300">
                <MagpieCharacter
                  bodyColor={selectedBird.bodyColor}
                  featherStyle="classic"
                  accessory="badge"
                  level={1}
                  isCelebrating={true}
                  size="hero"
                />
              </div>

              <div>
                <span className="px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 font-extrabold text-xs uppercase tracking-wider">
                  ALL SET, {userName.toUpperCase()}!
                </span>
                <h2 className="text-3xl font-black text-slate-900 mt-3 tracking-tight">
                  Your Journey Begins Now
                </h2>
                <p className="text-sm font-medium text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                  Destination Level 3: <strong className="text-slate-900">"VIP Late Check-in dispute with Mr. Iyer"</strong> is ready on your map.
                </p>
              </div>

              <div className="p-4 bg-white/90 border-2 border-amber-300 rounded-2xl shadow-md text-left flex items-center gap-3">
                <Star className="w-6 h-6 text-amber-500 fill-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-black text-slate-900 uppercase">First Objective</div>
                  <div className="text-xs font-semibold text-slate-600">
                    Earn 80+ score to unlock your first My Sky Sanctuary upgrade and 3 Food for {selectedBird.name}!
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-400/30 transition-all flex items-center justify-center gap-2 border border-amber-300"
              >
                <span>ENTER THE HOTEL JOURNEY</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
