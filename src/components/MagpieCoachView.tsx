import React, { useState } from 'react';
import { UserState } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { Sparkles, ArrowRight, Bot, User, Send, ShieldAlert } from 'lucide-react';

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
      text: `Good morning ${userState.name.split(' ')[0]}! I reviewed your recent guest interaction metrics at The Sandalwood Grand. Your Communication score is outstanding (91/100). How can I help you prepare today?`,
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const promptSuggestions = [
    'How do I handle an angry guest?',
    'Tips for VIP check-in protocol',
    'Why did my empathy score dip?',
    'Start Mr. Iyer wrong charges scenario',
  ];

  const handleSendPrompt = (text: string) => {
    setMessages((prev) => [...prev, { sender: 'user', text }]);

    setTimeout(() => {
      let coachReply = `In luxury 5-star hospitality at Sandalwood Grand, always lead with empathy before stating policy. Taking personal ownership is what turns guest complaints into lifelong brand loyalty.`;

      if (text.toLowerCase().includes('angry')) {
        coachReply = `When handling an angry guest: 1) Listen attentively without interrupting. 2) Validate their emotional state ("I completely understand why you're upset"). 3) Provide immediate direct action (e.g., hold refund or room upgrade).`;
      } else if (text.toLowerCase().includes('vip') || text.toLowerCase().includes('check-in')) {
        coachReply = `For VIP guest check-in: Greet by surname, acknowledge loyalty tier status, offer complimentary lounge seating during early arrivals, and coordinate luggage handling seamlessly.`;
      } else if (text.toLowerCase().includes('scenario') || text.toLowerCase().includes('iyer')) {
        coachReply = `Launching Mr. Iyer's wrong charges scenario! He is waiting at reception regarding a ₹18,000 room service dispute.`;
      }

      setMessages((prev) => [...prev, { sender: 'nova', text: coachReply }]);
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
            AI Hospitality Mentor • Sandalwood Grand
          </span>
        </div>
        <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
          Magpie Coach
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
          Real-time AI coaching and roleplay advice synchronized with your live skill performance.
        </p>
      </div>

      {/* Performance Focus Alert Card */}
      <div className="bg-white border border-amber-300 rounded-2xl p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0 mt-0.5">
            ⚠️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                Skill Focus Alert
              </span>
              <span className="text-xs text-slate-500 font-medium">Empathy Rating: 82/100</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mt-1">
              "Practice billing disputes to raise Empathy score back to 90+"
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Mr. Iyer's checkout dispute scenario is recommended for your current skill focus.
            </p>
          </div>
        </div>

        <button
          onClick={() => onStartScenario('sc-3')}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>START PRACTICE</span>
        </button>
      </div>

      {/* Clean Linear/Raycast Style Chat Interface */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden flex flex-col min-h-[460px]">
        
        {/* Chat Header */}
        <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 overflow-hidden rounded-xl bg-purple-100 flex items-center justify-center border border-purple-200">
              <MagpieCharacter
                bodyColor={userState.magpie.bodyColor}
                featherStyle={userState.magpie.featherStyle}
                accessory={userState.magpie.accessory}
                level={userState.magpie.level}
                size="sm"
              />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">{userState.magpie.name}</h3>
              <p className="text-[10px] text-slate-500 font-medium">Level {userState.magpie.level} AI Companion • Active Mentor</p>
            </div>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[380px]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.sender === 'nova' ? (
                <div className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-300 flex items-center justify-center text-sm shrink-0">
                  🐦
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {userState.name.charAt(0)}
                </div>
              )}

              <div
                className={`max-w-md p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                  msg.sender === 'nova'
                    ? 'bg-purple-50/70 text-slate-900 border border-purple-200/60 shadow-2xs'
                    : 'bg-slate-900 text-white shadow-2xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Prompt Suggestions */}
        <div className="p-3 px-6 bg-slate-50/70 border-t border-slate-100 space-y-2">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Suggested Prompts:
          </span>
          <div className="flex flex-wrap gap-2">
            {promptSuggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(prompt)}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-purple-300 hover:bg-purple-50 transition-all shadow-2xs text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
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
            placeholder="Ask Nova a hospitality coaching question..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            onClick={() => {
              if (inputValue.trim()) {
                handleSendPrompt(inputValue);
                setInputValue('');
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-2xs transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5 text-purple-400" />
          </button>
        </div>

      </div>

    </div>
  );
};
