import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserState, BodyColor, FeatherStyle, Accessory } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { Magpie3DCanvas } from './Magpie3DCanvas';
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
  const [use3DMode, setUse3DMode] = useState(false);

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#FAF8F5] border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <h2 className="font-serif font-bold text-xl text-slate-900">
                  Customise Your Magpie
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Personalise your persistent companion
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setUse3DMode(!use3DMode)}
                className="text-xs font-bold px-3 py-1.5 rounded-full bg-purple-100 text-purple-900 hover:bg-purple-200 transition-colors flex items-center gap-1.5"
              >
                <span>{use3DMode ? '3D Mode' : '2.5D Mode'}</span>
                <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left Preview Stage */}
            <div className="lg:col-span-5 bg-gradient-to-b from-purple-950 via-slate-900 to-indigo-950 p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#a78bfa_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 w-full flex flex-col items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-900/60 border border-purple-700/50 px-3 py-1 rounded-full mb-2">
                  Level {userState.magpie.level} Companion
                </span>

                <h3 className="font-serif text-2xl font-bold text-white mb-6">
                  {name || 'Nova'}
                </h3>

                {/* Bird Preview */}
                <div className="w-64 h-64 relative flex items-center justify-center">
                  {use3DMode ? (
                    <Magpie3DCanvas
                      bodyColor={bodyColor}
                      accessory={accessory}
                      level={userState.magpie.level}
                      className="w-full h-full"
                    />
                  ) : (
                    <MagpieCharacter
                      bodyColor={bodyColor}
                      featherStyle={featherStyle}
                      accessory={accessory}
                      level={userState.magpie.level}
                      size="hero"
                    />
                  )}
                </div>

                <p className="text-xs text-purple-200/70 text-center mt-4 max-w-xs">
                  "Your learning grows your Magpie. Practice scenarios to unlock flight lanes and cosmetics!"
                </p>
              </div>
            </div>

            {/* Right Customization Options */}
            <div className="lg:col-span-7 p-6 space-y-6 overflow-y-auto max-h-[600px]">
              
              {/* Magpie Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  What's your Magpie's name?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Nova"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm"
                />
              </div>

              {/* Body Color */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  <Palette className="w-4 h-4 text-purple-700" />
                  <span>Body Colour</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {colorOptions.map((opt) => {
                    const isSelected = bodyColor === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setBodyColor(opt.id)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                          isSelected
                            ? 'bg-purple-50 border-purple-600 text-purple-900 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/20 shadow-xs shrink-0"
                          style={{ backgroundColor: opt.hex }}
                        />
                        <span className="truncate">{opt.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-purple-600 ml-auto shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feather Style */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  <Feather className="w-4 h-4 text-purple-700" />
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
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-purple-50 border-purple-600 text-purple-900 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span>{opt.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-purple-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accessories */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
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
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                          isSelected
                            ? 'bg-purple-50 border-purple-600 text-purple-900 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
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
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
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
