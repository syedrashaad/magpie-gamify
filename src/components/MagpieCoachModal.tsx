import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserState } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  X,
  Award,
} from 'lucide-react';

interface MagpieCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  userState: UserState;
  onCompleteScenario: (score: number) => void;
}

export const MagpieCoachModal: React.FC<MagpieCoachModalProps> = ({
  isOpen,
  onClose,
  userState,
  onCompleteScenario,
}) => {
  const [phase, setPhase] = useState<'intro' | 'conversation' | 'analyzing' | 'complete'>('intro');
  const [currentTurn, setCurrentTurn] = useState(0);
  const [isMicActive, setIsMicActive] = useState(true);
  const [selectedResponseIndex, setSelectedResponseIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPhase('intro');
      setCurrentTurn(0);
      setSelectedResponseIndex(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Scenario Dialogue Turns
  const scenarioTurns = [
    {
      guestLine: "Look at this bill! There is an ₹18,000 charge for room service I NEVER ordered! My card was already charged, and my flight leaves in 90 minutes. I expect this resolved IMMEDIATELY!",
      guestEmotion: "Frustrated & Rushed 😠",
      userOptions: [
        {
          text: "I completely understand your urgency, Mr. Iyer. Let me pull up your folio right away and investigate this ₹18k discrepancy immediately.",
          quality: "optimal",
          scoreBonus: 2,
        },
        {
          text: "Sir, please calm down. Room service charges are handled by dining, let me transfer you.",
          quality: "poor",
          scoreBonus: 0,
        },
        {
          text: "Let me check the computer. Are you sure your family didn't order anything?",
          quality: "neutral",
          scoreBonus: 1,
        },
      ],
      coachAdvice: "Acknowledge the guest's urgency immediately and take direct ownership without deflecting.",
    },
    {
      guestLine: "Thank you. I don't have time to wait while you talk to kitchen staff. Can you refund this now?",
      guestEmotion: "Impatient ⏱️",
      userOptions: [
        {
          text: "I have already placed a direct hold refund of ₹18,000 to your card, Mr. Iyer. Here is your revised zero-balance folio and bank receipt code.",
          quality: "optimal",
          scoreBonus: 3,
        },
        {
          text: "Refunds take 3 to 5 business days, sir. You will have to wait for finance approval.",
          quality: "poor",
          scoreBonus: 0,
        },
        {
          text: "I can issue a voucher for your next stay at Sandalwood Grand instead.",
          quality: "neutral",
          scoreBonus: 1,
        },
      ],
      coachAdvice: "Proactive resolution! Instant credit authorization reassures high-tier loyalty guests.",
    },
    {
      guestLine: "Appreciate the quick refund. But I still need to make my flight at BLR Airport in 90 minutes. Is my airport transfer ready?",
      guestEmotion: "Relieved but Rushed ✈️",
      userOptions: [
        {
          text: "Your executive sedan is waiting at the portico right now, Mr. Iyer. I've pre-loaded your luggage and packed a chilled beverage for the trip.",
          quality: "optimal",
          scoreBonus: 3,
        },
        {
          text: "Taxis are waiting outside on the street. You can grab one there.",
          quality: "poor",
          scoreBonus: 0,
        },
        {
          text: "The concierge desk can call a car for you in about 10 minutes.",
          quality: "neutral",
          scoreBonus: 1,
        },
      ],
      coachAdvice: "Turn a potential service crisis into a memorable hospitality triumph!",
    },
  ];

  const handleSelectOption = (index: number) => {
    setSelectedResponseIndex(index);
    setTimeout(() => {
      if (currentTurn < scenarioTurns.length - 1) {
        setCurrentTurn(currentTurn + 1);
        setSelectedResponseIndex(null);
      } else {
        // Finish conversation
        setPhase('analyzing');
        setTimeout(() => {
          setPhase('complete');
        }, 2200);
      }
    }, 1200);
  };

  const handleFinish = () => {
    // Score 8/10 as requested in prompt specs
    onCompleteScenario(8);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-[#FAF8F5] border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xl">
                🪽
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif font-bold text-lg text-white">
                    MAGPIE AI COACH
                  </h2>
                  <span className="text-[10px] font-extrabold uppercase bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                    Voice Simulation
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Sandalwood Grand • Front Office in BLR
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* PHASE 1: INTRO */}
          {phase === 'intro' && (
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-48 h-48 relative mb-4">
                <MagpieCharacter
                  bodyColor={userState.magpie.bodyColor}
                  featherStyle={userState.magpie.featherStyle}
                  accessory={userState.magpie.accessory}
                  level={userState.magpie.level}
                  size="hero"
                />
              </div>

              {/* Speech Bubble */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative max-w-md bg-white border border-purple-200 p-5 rounded-2xl shadow-md mb-6"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-purple-200 rotate-45" />
                <p className="text-sm font-semibold text-slate-800">
                  "Hey {userState.name.split(' ')[0]}! Mr. Iyer is waiting at reception. His room isn't ready and he discovered ₹18k in wrong charges. Flight leaves in 90 minutes. Ready to fly?"
                </p>
              </motion.div>

              {/* Scenario Context Card */}
              <div className="w-full max-w-xl bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-6 text-left">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Flight Scenario Briefing</span>
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-base mb-1">
                  Wrong Charges at Checkout
                </h4>
                <p className="text-xs text-slate-600">
                  Guest: <strong className="text-slate-800">Mr. Iyer (VIP Gold Tier)</strong> • Time remaining: 90 mins before departure.
                </p>
              </div>

              <button
                onClick={() => setPhase('conversation')}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-bold text-sm shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>START FLIGHT</span>
              </button>
            </div>
          )}

          {/* PHASE 2: CONVERSATION */}
          {phase === 'conversation' && (
            <div className="p-6 space-y-6">
              
              {/* Voice Equalizer Visualizer Header */}
              <div className="flex items-center justify-between bg-slate-900 text-white px-5 py-3 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[0.6, 1, 0.4, 0.8, 0.5, 0.9, 0.3].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ['8px', '24px', '8px'] }}
                        transition={{ duration: 0.6 + i * 0.1, repeat: Infinity }}
                        className="w-1 bg-purple-400 rounded-full"
                        style={{ height: `${h * 24}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-purple-300">
                    AI Voice Channel Active
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMicActive(!isMicActive)}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      isMicActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/40'
                    }`}
                  >
                    {isMicActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    <span>{isMicActive ? 'Mic On' : 'Muted'}</span>
                  </button>
                </div>
              </div>

              {/* Guest Dialogue & Character Stage */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Guest Card */}
                <div className="md:col-span-4 bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs text-center flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-amber-500 flex items-center justify-center text-3xl mb-3 shadow-inner">
                    👨🏽‍💼
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Mr. Iyer</h4>
                  <span className="text-[10px] font-semibold text-slate-500">VIP Gold Guest</span>
                  <span className="mt-2 text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-medium">
                    {scenarioTurns[currentTurn].guestEmotion}
                  </span>
                </div>

                {/* Speech Bubble */}
                <div className="md:col-span-8 bg-white border border-purple-200 p-6 rounded-2xl shadow-md relative">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
                    <Volume2 className="w-4 h-4 animate-pulse" />
                    <span>Guest Speaking (Turn {currentTurn + 1} of 3)</span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 leading-relaxed italic">
                    "{scenarioTurns[currentTurn].guestLine}"
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Coach Tip: {scenarioTurns[currentTurn].coachAdvice}</span>
                  </div>
                </div>
              </div>

              {/* User Response Options */}
              <div className="space-y-3 pt-2">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Select Your Verbal Response:
                </span>

                <div className="space-y-2.5">
                  {scenarioTurns[currentTurn].userOptions.map((opt, idx) => {
                    const isSelected = selectedResponseIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={selectedResponseIndex !== null}
                        className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all ${
                          isSelected
                            ? 'bg-purple-900 text-white border-purple-900 shadow-lg scale-[1.01]'
                            : 'bg-white border-slate-200/90 text-slate-800 hover:border-purple-300 hover:bg-purple-50/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-normal">{opt.text}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* PHASE 3: ANALYZING */}
          {phase === 'analyzing' && (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-4 border-purple-200 border-t-purple-700 rounded-full mb-6"
              />
              <h3 className="font-serif font-bold text-2xl text-slate-900 mb-2">
                Flight Complete!
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Magpie Coach is scoring your resolution speed, empathy, and service accuracy...
              </p>
            </div>
          )}

          {/* PHASE 4: COMPLETE */}
          {phase === 'complete' && (
            <div className="p-8 text-center flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-600 flex items-center justify-center mb-4"
              >
                <CheckCircle2 className="w-12 h-12" />
              </motion.div>

              <h3 className="font-serif font-bold text-2xl text-slate-900 mb-1">
                Scenario Mastered!
              </h3>
              <p className="text-xs font-semibold text-slate-500 mb-6">
                You resolved Mr. Iyer's wrong charges with high empathy and zero flight delay.
              </p>

              <button
                onClick={handleFinish}
                className="px-8 py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-xl flex items-center gap-2"
              >
                <span>REVEAL SCORE & REWARDS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
