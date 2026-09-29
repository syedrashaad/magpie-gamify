import React from 'react';

// 1. HOTEL ENTRANCE / LOBBY (Level 01)
export const HotelEntranceIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hotel Arch Facade */}
    <rect x="20" y="30" width="80" height="70" rx="8" fill="#F3EFE6" stroke="#D1C7B7" strokeWidth="2" />
    <path d="M 20 50 Q 60 20 100 50 L 100 30 Q 60 10 20 30 Z" fill="#7C3AED" opacity="0.85" />
    {/* Revolving Entrance Door */}
    <path d="M 45 60 A 15 15 0 0 1 75 60 L 75 100 L 45 100 Z" fill="#EAE4D9" stroke="#948570" strokeWidth="2" />
    <line x1="60" y1="60" x2="60" y2="100" stroke="#7C3AED" strokeWidth="2" />
    {/* Welcome Carpet Runner */}
    <polygon points="50,100 70,100 75,118 45,118" fill="#B91C1C" opacity="0.9" />
    {/* Lantern Lights */}
    <circle cx="32" cy="55" r="4" fill="#F59E0B" />
    <circle cx="88" cy="55" r="4" fill="#F59E0B" />
    {/* Potted Plant */}
    <path d="M 12 85 Q 16 70 20 85" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
    <rect x="13" y="85" width="6" height="10" rx="2" fill="#92400E" />
  </svg>
);

// 2. CONCIERGE DESK (Level 02)
export const ConciergeDeskIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Concierge Counter */}
    <rect x="25" y="60" width="70" height="35" rx="6" fill="#F5F2EB" stroke="#C4B7A5" strokeWidth="2" />
    <rect x="20" y="52" width="80" height="10" rx="4" fill="#7C3AED" />
    {/* Golden Crossed Keys Emblem */}
    <circle cx="60" cy="35" r="14" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
    <path d="M 54 35 L 66 35 M 60 29 L 60 41" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    {/* Concierge Service Bell */}
    <path d="M 40 52 C 40 45 50 45 50 52 Z" fill="#F59E0B" />
    <rect x="42" y="52" width="6" height="2" fill="#78350F" />
    {/* Guest Board Clipboard */}
    <rect x="70" y="40" width="12" height="16" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
    <line x1="73" y1="45" x2="79" y2="45" stroke="#7C3AED" strokeWidth="1.5" />
    <line x1="73" y1="49" x2="79" y2="49" stroke="#94A3B8" strokeWidth="1.5" />
  </svg>
);

// 3. CHECKOUT COUNTER (Level 03 - Hero Current Destination)
export const CheckoutCounterIllustration: React.FC<{ className?: string }> = ({ className = 'w-28 h-28' }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Marble Front Desk Counter */}
    <rect x="15" y="55" width="90" height="40" rx="8" fill="#FAFAF9" stroke="#7C3AED" strokeWidth="2.5" />
    <rect x="10" y="47" width="100" height="10" rx="4" fill="#0F172A" />
    {/* Folio Terminal Screen */}
    <rect x="30" y="25" width="24" height="22" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
    <rect x="33" y="28" width="18" height="12" rx="1" fill="#7C3AED" opacity="0.8" />
    {/* Payment Terminal */}
    <rect x="65" y="36" width="14" height="12" rx="2" fill="#334155" />
    <rect x="68" y="32" width="8" height="4" fill="#10B981" />
    {/* Room Key Badge */}
    <circle cx="90" cy="72" r="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
    <path d="M 88 72 L 94 72 M 92 70 L 92 74" stroke="#D97706" strokeWidth="1.5" />
  </svg>
);

// 4. GUEST SERVICES (Level 04)
export const GuestServicesIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Service Desk */}
    <rect x="25" y="58" width="70" height="35" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
    <rect x="20" y="50" width="80" height="10" rx="3" fill="#0F172A" />
    {/* Telephone Handset */}
    <path d="M 35 44 Q 40 38 45 44" stroke="#7C3AED" strokeWidth="3" fill="none" strokeLinecap="round" />
    <rect x="34" y="43" width="4" height="6" rx="1" fill="#7C3AED" />
    <rect x="42" y="43" width="4" height="6" rx="1" fill="#7C3AED" />
    {/* Guest Care Emblem */}
    <circle cx="75" cy="35" r="10" fill="#EEF2FF" stroke="#6366F1" strokeWidth="1.5" />
    <path d="M 71 35 L 74 38 L 79 32" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 5. NIGHT ARRIVAL (Level 05)
export const NightArrivalIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Night Backdrop Portal */}
    <rect x="20" y="30" width="80" height="65" rx="10" fill="#0F172A" stroke="#334155" strokeWidth="2" />
    {/* Moon & Stars */}
    <path d="M 75 42 A 8 8 0 1 1 65 34 A 10 10 0 0 0 75 42 Z" fill="#FDE047" />
    <circle cx="35" cy="42" r="1.5" fill="#FFFFFF" opacity="0.8" />
    <circle cx="48" cy="36" r="1" fill="#FFFFFF" opacity="0.6" />
    {/* Street Lamp Post */}
    <line x1="30" y1="60" x2="30" y2="90" stroke="#94A3B8" strokeWidth="2" />
    <circle cx="30" cy="58" r="5" fill="#FEF08A" />
    {/* Night Clock 3:00 AM */}
    <circle cx="60" cy="65" r="10" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
    <line x1="60" y1="65" x2="60" y2="59" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="60" y1="65" x2="65" y2="65" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 6. DINING RESTAURANT (Unit 2 / Level 07)
export const DiningRestaurantIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Dining Table */}
    <ellipse cx="60" cy="75" rx="35" ry="15" fill="#FAFAF9" stroke="#D6D3D1" strokeWidth="2" />
    <rect x="56" y="75" width="8" height="25" fill="#78716C" />
    {/* Chef Cloche Dish */}
    <path d="M 45 70 C 45 55 75 55 75 70 Z" fill="#E7E5E4" stroke="#A8A29E" strokeWidth="1.5" />
    <circle cx="60" cy="54" r="3" fill="#D97706" />
    {/* Wine Glass */}
    <path d="M 82 62 L 86 70 L 84 70 L 84 75 M 82 75 L 86 75" stroke="#B91C1C" strokeWidth="1.5" />
    <path d="M 81 60 A 4 4 0 0 0 87 60 Z" fill="#DC2626" />
  </svg>
);

// 7. GUEST SUITES (Unit 3 / Level 11)
export const GuestSuitesIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Suite Door Frame */}
    <rect x="35" y="25" width="50" height="75" rx="4" fill="#F5F5F4" stroke="#78716C" strokeWidth="2" />
    <rect x="42" y="32" width="36" height="68" fill="#44403C" />
    {/* Keycard Lock Indicator */}
    <rect x="45" y="60" width="6" height="10" rx="1" fill="#10B981" />
    <circle cx="48" cy="63" r="1.5" fill="#FFFFFF" />
    {/* Room Plate */}
    <rect x="52" y="40" width="16" height="8" rx="2" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
    <text x="60" y="46" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#78350F">402</text>
  </svg>
);

// 8. SPA & POOL DECK (Unit 3 / Level 15)
export const SpaPoolDeckIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Pool Water Wave */}
    <rect x="20" y="55" width="80" height="40" rx="8" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
    <path d="M 25 70 Q 45 62 65 70 T 105 70" stroke="#38BDF8" strokeWidth="3" fill="none" />
    <path d="M 25 80 Q 45 72 65 80 T 105 80" stroke="#0284C7" strokeWidth="2" fill="none" />
    {/* Lounge Parasol */}
    <path d="M 60 25 L 40 45 L 80 45 Z" fill="#F43F5E" />
    <line x1="60" y1="45" x2="60" y2="70" stroke="#94A3B8" strokeWidth="2.5" />
  </svg>
);

// 9. VIP LOUNGE (Unit 4 / Level 16)
export const VIPLoungeIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Velvet Stanchion Rope */}
    <line x1="30" y1="50" x2="30" y2="90" stroke="#D97706" strokeWidth="3" />
    <line x1="90" y1="50" x2="90" y2="90" stroke="#D97706" strokeWidth="3" />
    <circle cx="30" cy="48" r="4" fill="#F59E0B" />
    <circle cx="90" cy="48" r="4" fill="#F59E0B" />
    <path d="M 30 55 Q 60 75 90 55" stroke="#DC2626" strokeWidth="4" fill="none" />
    {/* Crown Emblem */}
    <path d="M 48 42 L 53 32 L 60 38 L 67 32 L 72 42 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
  </svg>
);

// 10. COMMAND CENTER (Unit 5 / Level 21)
export const CommandCenterIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Executive Desk */}
    <rect x="25" y="60" width="70" height="32" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="2" />
    {/* Blueprint Operations Chart */}
    <rect x="35" y="32" width="30" height="22" rx="2" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
    <line x1="40" y1="38" x2="60" y2="38" stroke="#FFFFFF" strokeWidth="1.5" />
    <line x1="40" y1="44" x2="55" y2="44" stroke="#FFFFFF" strokeWidth="1.5" />
    {/* Executive Briefcase */}
    <rect x="72" y="44" width="16" height="12" rx="2" fill="#78350F" />
    <path d="M 77 44 L 77 40 L 83 40 L 83 44" stroke="#D97706" strokeWidth="1.5" fill="none" />
  </svg>
);
