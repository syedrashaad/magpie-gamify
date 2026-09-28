import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface IphoneFrameProps {
  children: React.ReactNode;
  enabled: boolean;
  onToggle: () => void;
}

export const IphoneFrame: React.FC<IphoneFrameProps> = ({
  children,
  enabled,
  onToggle,
}) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-start relative">
      
      {/* Presentation Top Bar */}
      <div className="w-full bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs z-50">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-serif font-bold tracking-wider text-slate-200">MAGPIE AI</span>
          <span className="text-[10px] text-purple-400 font-semibold uppercase bg-purple-950 px-2 py-0.5 rounded-md border border-purple-800">
            iPhone Mobile App Demo
          </span>
        </div>

        <button
          onClick={onToggle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-colors shadow-xs"
        >
          {enabled ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5 text-purple-400" />}
          <span>{enabled ? 'Full Width Mode' : 'iPhone Demo Frame'}</span>
        </button>
      </div>

      {/* Content Canvas */}
      {enabled ? (
        <div className="py-6 px-2 flex-1 w-full flex items-center justify-center">
          {/* iPhone 15 Pro Device Outer Frame */}
          <div className="relative w-[390px] h-[844px] bg-[#FAF8F5] text-slate-900 rounded-[50px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-[10px] border-slate-800 overflow-hidden flex flex-col">
            
            {/* Dynamic Island Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-slate-950 rounded-full z-50 flex items-center justify-end px-2.5 gap-1.5 pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500/80" />
              <span className="w-2 h-2 rounded-full bg-blue-500/80" />
            </div>

            {/* Inner Scrollable Screen Content */}
            <div className="w-full h-full pt-8 overflow-y-auto no-scrollbar flex flex-col justify-between">
              {children}
            </div>

            {/* iOS Home Indicator Line */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900/30 rounded-full pointer-events-none z-50" />
          </div>
        </div>
      ) : (
        <div className="w-full flex-1 bg-[#FAF8F5] text-slate-900">
          {children}
        </div>
      )}

    </div>
  );
};
