import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserState, BodyColor, FeatherStyle, Accessory } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { Check, Sparkles, X, Palette, Feather } from 'lucide-react';

interface MagpieCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userState: UserState;
  onSave: (updatedState: UserState) => void;
}

export const MagpieCreationModal: React.FC<MagpieCreationModalProps> = ({
  isOpen,
  onClose,
  userState,
  onSave,
}) => {
  const [name, setName] = useState(userState.magpie.name);
  const [bodyColor, setBodyColor] = useState<BodyColor>(userState.magpie.bodyColor);
  const [featherStyle, setFeatherStyle] = useState<FeatherStyle>(userState.magpie.featherStyle);
  const [accessory, setAccessory] = useState<Accessory>(userState.magpie.accessory);

  if (!isOpen) return null;

  const colorOptions: { id: BodyColor; name: string; hex: string }[] = [
    { id: 'black', name: 'Obsidian Black', hex: '#1E293B' },
    { id: 'blue', name: 'Sapphire Blue', hex: '#1E3A8A' },
    { id: 'purple', name: 'Amethyst Purple', hex: '#4C1D95' },
    { id: 'green', name: 'Emerald Green', hex: '#064E3B' },
    { id: 'gold', name: 'Golden Amber', hex: '#D97706' },
  ];

  const featherOptions: { id: FeatherStyle; name: string }[] = [
    { id: 'classic', name: 'Classic Plume' },
    { id: 'soft', name: 'Soft Down' },
    { id: 'iridescent', name: 'Iridescent Sheen' },
    { id: 'patterned', name: 'Patterned Feathers' },
  ];

  const accessoryOptions: { id: Accessory; name: string; icon: string }[] = [
    { id: 'none', name: 'None', icon: '✨' },
    { id: 'headphones', name: 'Studio Headphones', icon: '🎧' },
    { id: 'glasses', name: 'Concierge Glasses', icon: '👓' },
    { id: 'cap', name: 'Flight Cap', icon: '🧢' },
    { id: 'scarf', name: 'Silk Scarf', icon: '🧣' },
  ];

  const handleSave = () => {
    const updated: UserState = {
      ...userState,
      magpie: {
        ...userState.magpie,
        name: name.trim() || 'Nova',
        bodyColor,
        featherStyle,
        accessory,
      },
    };
    onSave(updated);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto max-w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[95vh] bg-gradient-to-b from-sky-50 via-blue-50 to-amber-50 border-2 border-white rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-white/90 border-b border-sky-100">
            <div className="flex items-center gap-3">
              <span className="text-xl">✨</span>
              <div>
                <h2 className="font-black text-lg text-slate-900">
                  Customize Your Magpie Companion
                </h2>
                <p className="text-xs text-sky-800 font-semibold">
                  Personalize your avatar across the hotel learning journey, Sky League, and roleplays.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            {/* Left Preview Stage */}
            <div className="lg:col-span-5 bg-slate-900 p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FACC15_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 w-full flex flex-col items-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-950 bg-amber-400 border border-amber-300 px-3 py-1 rounded-full mb-2">
                  Level {userState.magpie.level} Companion Avatar
                </span>

                <h3 className="text-2xl font-black text-white mb-6">
                  {name || 'Nova'}
                </h3>

                {/* Bird Preview */}
                <div className="w-56 h-56 relative flex items-center justify-center">
                  <MagpieCharacter
                    bodyColor={bodyColor}
                    featherStyle={featherStyle}
                    accessory={accessory}
                    level={userState.magpie.level}
                    size="hero"
                  />
                </div>

                <p className="text-xs text-sky-200 text-center mt-4 max-w-xs font-semibold">
                  "Your custom Magpie appears live on the map, Sky League, coach, and profile."
                </p>
              </div>
            </div>

            {/* Right Customization Options */}
            <div className="lg:col-span-7 p-6 space-y-6 overflow-y-auto max-h-[580px]">
              
              {/* Magpie Name */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  Magpie Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Nova"
                  className="w-full px-4 py-3 rounded-2xl border border-sky-200 bg-white font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>

              {/* Body Color */}
              <div>
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  <Palette className="w-4 h-4 text-sky-600" />
                  <span>Body Color</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {colorOptions.map((opt) => {
                    const isSelected = bodyColor === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setBodyColor(opt.id)}
                        className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 text-xs font-bold transition-all text-left ${
                          isSelected
                            ? 'bg-sky-50 border-amber-400 text-slate-900 shadow-sm'
                            : 'bg-white border-sky-100 text-slate-700 hover:border-sky-300'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/20 shadow-xs shrink-0"
                          style={{ backgroundColor: opt.hex }}
                        />
                        <span className="truncate">{opt.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-500 ml-auto shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feather Style */}
              <div>
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  <Feather className="w-4 h-4 text-sky-600" />
                  <span>Feather Style</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {featherOptions.map((opt) => {
                    const isSelected = featherStyle === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFeatherStyle(opt.id)}
                        className={`flex items-center justify-between p-3 rounded-2xl border-2 text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-sky-50 border-amber-400 text-slate-900 shadow-sm'
                            : 'bg-white border-sky-100 text-slate-700 hover:border-sky-300'
                        }`}
                      >
                        <span>{opt.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accessories */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  Accessories
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {accessoryOptions.map((opt) => {
                    const isSelected = accessory === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAccessory(opt.id)}
                        className={`flex items-center gap-2 p-3 rounded-2xl border-2 text-xs font-bold transition-all text-left ${
                          isSelected
                            ? 'bg-sky-50 border-amber-400 text-slate-900 shadow-sm'
                            : 'bg-white border-sky-100 text-slate-700 hover:border-sky-300'
                        }`}
                      >
                        <span className="text-base">{opt.icon}</span>
                        <span className="truncate">{opt.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-sky-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-2xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-2 border border-amber-300"
                >
                  <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
                  <span>Save Magpie</span>
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
