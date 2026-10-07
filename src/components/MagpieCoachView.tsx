import React, { useState } from 'react';
import { UserState } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { Sparkles, ArrowRight, Send } from 'lucide-react';

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
      text: `Good morning ${userState.name.split(' ')[0]}! I reviewed your recent guest interaction metrics at ${userState.property}. Your Communication score is outstanding (91/100). How can I help you prepare today?`,
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
      let coachReply = `In luxury 5-star hospitality at ${userState.property}, always lead with empathy before stating policy. Taking personal ownership is what turns guest complaints into lifelong brand loyalty.`;

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
          <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-0.5 rounded-full">
            AI Hospitality Mentor • {userState.property}
          </span>
        </div>
        <h1 className="font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
          Magpie Coach
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
          Real-time AI coaching and roleplay advice synchronized with your live skill performance.
        </p>
      </div>

      {/* Performance Focus Alert Card */}
      <div className="bg-amber-100/90 border-2 border-amber-300 rounded-3xl p-5 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-200 text-amber-950 flex items-center justify-center font-black shrink-0 mt-0.5 border border-amber-300">
            ⚠️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-amber-950 bg-amber-400 px-2.5 py-0.5 rounded-full">
                Live Skill Focus Alert
              </span>
              <span className="text-xs text-slate-700 font-bold">
                Empathy: {userState.skills.empathy}/100 · Ownership: {userState.skills.ownership}/100
              </span>
            </div>
            <h4 className="font-black text-slate-900 text-sm mt-1">
              "Practice billing dispute de-escalation to raise Empathy score back to 90+"
            </h4>
            <p className="text-xs text-slate-700 mt-0.5 font-medium">
              {userState.magpie.name} identified a minor drop in Empathy during dispute handling. Scenario "Mr. Iyer Wrong Charges" is recommended.
            </p>
          </div>
        </div>

        <button
          onClick={() => onStartScenario('sc-3')}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 shrink-0 border border-amber-300"
        >
          <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
          <span>START PRACTICE (+20 XP)</span>
        </button>
      </div>

      {/* Chat Interface */}
      <div className="bg-white/90 border-2 border-sky-100 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[460px]">
        
        {/* Chat Header */}
        <div className="p-4 px-6 border-b border-sky-100 flex items-center justify-between bg-sky-50/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 shrink-0 overflow-hidden rounded-2xl bg-white border-2 border-sky-200 shadow-sm">
              <img src="/assets/nova_thinking.jpg" alt="Nova Coach" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900">{userState.magpie.name}</h3>
              <p className="text-[10px] text-sky-800 font-bold uppercase tracking-wider">Level {userState.magpie.level} AI Companion • Active Mentor</p>
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
                <div className="w-8 h-8 rounded-xl overflow-hidden border border-sky-300 shadow-sm shrink-0">
                  <img src="/assets/nova_thinking.jpg" alt="Nova" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {userState.name.charAt(0)}
                </div>
              )}

              <div
                className={`max-w-md p-4 rounded-2xl text-xs font-semibold leading-relaxed ${
                  msg.sender === 'nova'
                    ? 'bg-sky-50 text-slate-900 border border-sky-200 shadow-sm'
                    : 'bg-slate-900 text-white shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Prompt Suggestions */}
        <div className="p-3 px-6 bg-sky-50/50 border-t border-sky-100 space-y-2">
          <span className="block text-[10px] font-black uppercase tracking-wider text-sky-800">
            Suggested Prompts:
          </span>
          <div className="flex flex-wrap gap-2">
            {promptSuggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(prompt)}
                className="px-3 py-1.5 rounded-xl bg-white border border-sky-200 text-xs font-bold text-slate-800 hover:border-amber-400 hover:bg-amber-50 transition-all shadow-sm text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-sky-100 flex items-center gap-3">
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
            className="flex-1 px-4 py-3 rounded-2xl border border-sky-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            onClick={() => {
              if (inputValue.trim()) {
                handleSendPrompt(inputValue);
                setInputValue('');
              }
            }}
            className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 shrink-0 border border-amber-300"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5 text-slate-950" />
          </button>
        </div>

      </div>

    </div>
  );
};
