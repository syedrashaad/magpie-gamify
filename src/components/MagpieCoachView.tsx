import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserState } from '../types';
import { ScenarioData } from '../data/scenarios';
import { MagpieCharacter } from './MagpieCharacter';
import { MessageSquareHeart, Sparkles, ArrowRight, ShieldAlert, Zap, RefreshCcw } from 'lucide-react';

interface MagpieCoachViewProps {
  userState: UserState;
  onStartScenario: (scenarioId?: string) => void;
}

export const MagpieCoachView: React.FC<MagpieCoachViewProps> = ({
  userState,
  onStartScenario,
}) => {
  const [messages, setMessages] = useState<{ sender: 'nova' | 'user'; text: string }[]>([
    {
      sender: 'nova',
      text: `Hey ${userState.name.split(' ')[0]}! I noticed your Empathy score dropped slightly during the last flight. Would you like to practice de-escalating an upset guest?`,
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const promptSuggestions = [
    'How should I handle an angry guest?',
    'Practice my check-in protocol',
    'Why did I lose points on Ownership?',
    'Give me another scenario flight',
  ];

  const handleSendPrompt = (text: string) => {
    setMessages((prev) => [...prev, { sender: 'user', text }]);

    setTimeout(() => {
      let coachReply = `Great question! In 5-star luxury hospitality at Sandalwood Grand, always validate emotion first before explaining hotel policy. Taking direct ownership turns crises into guest loyalty.`;

      if (text.includes('angry')) {
        coachReply = `When handling an angry guest: 1) Acknowledge their frustration immediately without interrupting. 2) Take personal ownership regardless of department. 3) Provide an instant tangible resolution (e.g., hold refund or suite move).`;
      } else if (text.includes('check-in')) {
        coachReply = `For 5-star check-in: Greet by surname, confirm loyalty tier benefits, verify room preferences, and ensure luggage is pre-loaded seamlessly.`;
      } else if (text.includes('scenario')) {
        coachReply = `Let’s launch your next flight! Mr. Iyer’s wrong charges scenario is ready for you in Tasks.`;
      }

      setMessages((prev) => [...prev, { sender: 'nova', text: coachReply }]);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black uppercase tracking-wider bg-purple-100 text-purple-900 px-3 py-1 rounded-full border border-purple-200">
              AI HOSPITALITY MENTOR
            </span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Magpie Coach • {userState.magpie.name}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
            Personalized mentoring synchronized with your training performance analytics
          </p>
        </div>
      </div>

      {/* Targeted Performance Alert Card (Connected Coach Feature) */}
      <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 border border-amber-400/40 rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xl shrink-0 mt-0.5">
            ⚠️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-md">
                Performance Focus Alert
              </span>
              <span className="text-xs text-slate-500 font-semibold">Empathy Score: 74/100</span>
            </div>
            <h4 className="font-serif font-bold text-slate-900 text-base mt-1">
              "Your empathy score was lower than usual during billing disputes."
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Practice de-escalating Mr. Iyer's room service charge dispute to raise your skill rating back to 85+.
            </p>
          </div>
        </div>

        <button
          onClick={() => onStartScenario('sc-3')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>PRACTISE EMPATHY</span>
        </button>
      </div>

      {/* Main Chat Stage */}
      <div className="bg-white border border-slate-200/90 rounded-3xl shadow-xl overflow-hidden flex flex-col min-h-[440px]">
        
        {/* Chat Stage Banner */}
        <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10">
              <MagpieCharacter
                bodyColor={userState.magpie.bodyColor}
                featherStyle={userState.magpie.featherStyle}
                accessory={userState.magpie.accessory}
                level={userState.magpie.level}
                size="sm"
              />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">{userState.magpie.name}</h3>
              <p className="text-[10px] text-purple-300 font-semibold">Hospitality AI Mentor • Sandalwood Grand</p>
            </div>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[380px]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.sender === 'nova' ? (
                <div className="w-9 h-9 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-base shrink-0">
                  🐦
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {userState.name.split(' ')[0][0]}
                </div>
              )}

              <div
                className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm font-medium ${
                  msg.sender === 'nova'
                    ? 'bg-purple-50 text-slate-900 border border-purple-200 shadow-xs'
                    : 'bg-slate-900 text-white shadow-md'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Prompts */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 space-y-2">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Suggested Mentoring Topics:
          </span>
          <div className="flex flex-wrap gap-2">
            {promptSuggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(prompt)}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-purple-300 hover:bg-purple-50 transition-all shadow-2xs text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200/80 flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue.trim()) {
                handleSendPrompt(inputValue);
                setInputValue('');
              }
            }}
            placeholder="Ask Nova a hospitality training question..."
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-300 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            onClick={() => {
              if (inputValue.trim()) {
                handleSendPrompt(inputValue);
                setInputValue('');
              }
            }}
            className="px-5 py-3 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>Ask</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
