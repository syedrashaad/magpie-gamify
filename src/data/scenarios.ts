export interface ScenarioChoice {
  text: string;
  quality: 'optimal' | 'neutral' | 'poor';
  scoreBonus: number;
  aiResponse: string;
  empathyImpact: number;
  communicationImpact: number;
  ownershipImpact: number;
  problemSolvingImpact: number;
}

export interface ScenarioTurn {
  id: number;
  guestLine: string;
  guestEmotion: string;
  coachAdvice: string;
  choices: ScenarioChoice[];
}

export interface ScenarioData {
  id: string;
  unitId: string;
  unitTitle: string;
  title: string;
  department: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedTime: string; // e.g. '3 min'
  xpReward: number; // e.g. 20
  primarySkill: 'Empathy' | 'Communication' | 'Ownership' | 'Problem Solving' | 'Guest Focus';
  description: string;
  guestName: string;
  guestRole: string;
  situationSummary: string;
  turns: ScenarioTurn[];
}

export interface UnitData {
  id: string;
  number: string;
  title: string;
  description: string;
  scenarios: ScenarioData[];
}

export const DEMO_UNITS: UnitData[] = [
  {
    id: 'unit-01',
    number: 'UNIT 01',
    title: 'FIRST IMPRESSIONS & CHECKOUT',
    description: 'Master front desk greetings, billing accuracy, and guest arrival protocols.',
    scenarios: [
      {
        id: 'sc-1',
        unitId: 'unit-01',
        unitTitle: 'FIRST IMPRESSIONS',
        title: 'Welcome a VIP Guest',
        department: 'Front Office',
        difficulty: 1,
        estimatedTime: '2 min',
        xpReward: 10,
        primarySkill: 'Guest Focus',
        description: 'Greet a high-tier Gold Loyalty guest arriving early for check-in.',
        guestName: 'Mrs. Kapoor',
        guestRole: 'Gold Loyalty Guest',
        situationSummary: 'Mrs. Kapoor arrives at 11:00 AM before standard 3:00 PM check-in.',
        turns: [
          {
            id: 1,
            guestLine: 'Good morning! I know I am early, but I had an overnight flight and I am exhausted. Is my room ready?',
            guestEmotion: 'Tired & Hopeful 🥱',
            coachAdvice: 'Acknowledge loyalty tier and offer immediate comfort while checking room status.',
            choices: [
              {
                text: 'Welcome to Sandalwood Grand, Mrs. Kapoor! Thank you for your Gold loyalty. Let me check your suite status immediately, and offer you a complimentary lounge beverage while you relax.',
                quality: 'optimal',
                scoreBonus: 3,
                aiResponse: 'Oh thank you so much! That lounge coffee sounds wonderful right now.',
                empathyImpact: 25,
                communicationImpact: 25,
                ownershipImpact: 25,
                problemSolvingImpact: 25,
              },
              {
                text: 'Check-in is not until 3:00 PM ma’am. You can leave your bags at the bell desk.',
                quality: 'poor',
                scoreBonus: 0,
                aiResponse: 'I understand check-in time, but surely you have something available for a Gold member?',
                empathyImpact: 5,
                communicationImpact: 10,
                ownershipImpact: 5,
                problemSolvingImpact: 10,
              },
            ],
          },
        ],
      },
      {
        id: 'sc-2',
        unitId: 'unit-01',
        unitTitle: 'FIRST IMPRESSIONS',
        title: 'Handling Special Luggage Requests',
        department: 'Concierge',
        difficulty: 2,
        estimatedTime: '3 min',
        xpReward: 15,
        primarySkill: 'Communication',
        description: 'Coordinate delicate baggage storage for a wedding party guest.',
        guestName: 'Mr. Sharma',
        guestRole: 'Wedding Guest',
        situationSummary: 'Fragile wedding attire needs special temperature-controlled storage.',
        turns: [
          {
            id: 1,
            guestLine: 'I have three designer sherwanis that cannot be creased. Can concierge hold them safely?',
            guestEmotion: 'Anxious 👔',
            coachAdvice: 'Assure garment care with specific concierge wardrobe protocols.',
            choices: [
              {
                text: 'Absolutely Mr. Sharma. We have a dedicated garment wardrobe in concierge with padded hangers and humidity control. I will hand-deliver them to your suite personally.',
                quality: 'optimal',
                scoreBonus: 3,
                aiResponse: 'That is such a relief. Thank you for taking extra care!',
                empathyImpact: 25,
                communicationImpact: 25,
                ownershipImpact: 25,
                problemSolvingImpact: 25,
              },
            ],
          },
        ],
      },
      {
        id: 'sc-3',
        unitId: 'unit-01',
        unitTitle: 'FIRST IMPRESSIONS',
        title: 'Wrong Charges at Checkout',
        department: 'Front Office',
        difficulty: 3,
        estimatedTime: '3 min',
        xpReward: 20,
        primarySkill: 'Empathy',
        description: 'Resolve a ₹18,000 billing discrepancy for a guest catching a flight in 90 minutes.',
        guestName: 'Mr. Iyer',
        guestRole: 'Executive Traveler',
        situationSummary: '₹18,000 room service dispute on pre-charged credit card.',
        turns: [
          {
            id: 1,
            guestLine: 'Look at this bill! There is an ₹18,000 charge for room service I NEVER ordered! My card was already charged, and my flight leaves in 90 minutes. I expect this resolved IMMEDIATELY!',
            guestEmotion: 'Frustrated & Rushed 😠',
            coachAdvice: 'Acknowledge the urgency immediately and take direct ownership without deflecting.',
            choices: [
              {
                text: 'I completely understand your urgency, Mr. Iyer. Let me pull up your folio right away and investigate this ₹18k discrepancy immediately.',
                quality: 'optimal',
                scoreBonus: 3,
                aiResponse: 'Thank you. I don’t have time to wait while you talk to kitchen staff. Can you refund this now?',
                empathyImpact: 28,
                communicationImpact: 26,
                ownershipImpact: 24,
                problemSolvingImpact: 25,
              },
              {
                text: 'Sir, please calm down. Room service charges are handled by dining, let me transfer you.',
                quality: 'poor',
                scoreBonus: 0,
                aiResponse: 'Transfer me? I have a flight in 90 minutes!',
                empathyImpact: 5,
                communicationImpact: 10,
                ownershipImpact: 5,
                problemSolvingImpact: 5,
              },
            ],
          },
          {
            id: 2,
            guestLine: 'Thank you. I don’t have time to wait while you talk to kitchen staff. Can you refund this now?',
            guestEmotion: 'Impatient ⏱️',
            coachAdvice: 'Proactive resolution! Instant credit authorization reassures high-tier loyalty guests.',
            choices: [
              {
                text: 'I have already placed a direct hold refund of ₹18,000 to your card, Mr. Iyer. Here is your revised zero-balance folio and bank receipt code.',
                quality: 'optimal',
                scoreBonus: 3,
                aiResponse: 'Appreciate the quick refund. But I still need to make my flight at BLR Airport in 90 minutes.',
                empathyImpact: 27,
                communicationImpact: 28,
                ownershipImpact: 26,
                problemSolvingImpact: 28,
              },
            ],
          },
          {
            id: 3,
            guestLine: 'Appreciate the quick refund. But I still need to make my flight at BLR Airport in 90 minutes. Is my airport transfer ready?',
            guestEmotion: 'Relieved but Rushed ✈️',
            coachAdvice: 'Turn a potential service crisis into a memorable hospitality triumph!',
            choices: [
              {
                text: 'Your executive sedan is waiting at the portico right now, Mr. Iyer. I’ve pre-loaded your luggage and packed a chilled beverage for the trip.',
                quality: 'optimal',
                scoreBonus: 4,
                aiResponse: 'Outstanding service. You really saved my morning.',
                empathyImpact: 27,
                communicationImpact: 27,
                ownershipImpact: 24,
                problemSolvingImpact: 27,
              },
            ],
          },
        ],
      },
      {
        id: 'sc-4',
        unitId: 'unit-01',
        unitTitle: 'FIRST IMPRESSIONS',
        title: 'Handling an Angry Guest',
        department: 'Front Office',
        difficulty: 4,
        estimatedTime: '4 min',
        xpReward: 25,
        primarySkill: 'Empathy',
        description: 'De-escalate a guest upset about air conditioning breakdown during peak summer.',
        guestName: 'Dr. Mehta',
        guestRole: 'Deluxe Suite Guest',
        situationSummary: 'A/C failed overnight in Suite 402 during 38°C BLR heatwave.',
        turns: [
          {
            id: 1,
            guestLine: 'I paid ₹35,000 for a Deluxe Suite and couldn’t sleep all night because the AC was blowing hot air! This is unpardonable for a 5-star hotel!',
            guestEmotion: 'Furious 😡',
            coachAdvice: 'Validate discomfort first before offering room move and service credit.',
            choices: [
              {
                text: 'Dr. Mehta, I am truly sorry for the awful night you experienced. Sleeping in that heat is unacceptable. Let me relocate you to our Presidential Suite right now and waive last night’s charge.',
                quality: 'optimal',
                scoreBonus: 4,
                aiResponse: 'Thank you for acknowledging the issue directly. That upgrade helps.',
                empathyImpact: 30,
                communicationImpact: 25,
                ownershipImpact: 28,
                problemSolvingImpact: 27,
              },
            ],
          },
        ],
      },
      {
        id: 'sc-5',
        unitId: 'unit-01',
        unitTitle: 'FIRST IMPRESSIONS',
        title: 'Late Night Check-In Protocol',
        department: 'Night Audit',
        difficulty: 3,
        estimatedTime: '3 min',
        xpReward: 20,
        primarySkill: 'Ownership',
        description: 'Handle a delayed international arrival at 3:00 AM with missing reservation info.',
        guestName: 'Ms. Vance',
        guestRole: 'International Traveler',
        situationSummary: '3 AM arrival with third-party booking confirmation glitch.',
        turns: [
          {
            id: 1,
            guestLine: 'I booked through an agency but your system says no reservation found. I have been traveling for 22 hours!',
            guestEmotion: 'Exhausted ✈️',
            coachAdvice: 'Assign temporary room first, resolve booking glitch in morning.',
            choices: [
              {
                text: 'Ms. Vance, please take this key card to Suite 204 and rest immediately. I will personally sort out the agency confirmation in the morning so you don’t have to wait.',
                quality: 'optimal',
                scoreBonus: 3,
                aiResponse: 'Bless you. That is the kindest thing anyone has said all day.',
                empathyImpact: 28,
                communicationImpact: 26,
                ownershipImpact: 30,
                problemSolvingImpact: 26,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'unit-02',
    number: 'UNIT 02',
    title: 'SERVICE RECOVERY & CONFLICTS',
    description: 'Turn service breakdowns into guest loyalty opportunities.',
    scenarios: [
      {
        id: 'sc-6',
        unitId: 'unit-02',
        unitTitle: 'SERVICE RECOVERY',
        title: 'Wrong Room Assignment',
        department: 'Front Office',
        difficulty: 3,
        estimatedTime: '3 min',
        xpReward: 20,
        primarySkill: 'Problem Solving',
        description: 'Guest assigned smoking room instead of requested non-smoking King suite.',
        guestName: 'Mr. Nambiar',
        guestRole: 'Corporate Client',
        situationSummary: 'Asthmatic guest assigned incorrect room type.',
        turns: [
          {
            id: 1,
            guestLine: 'I specifically requested a strict non-smoking suite. This room smells like tobacco and I have asthma!',
            guestEmotion: 'Upset 😷',
            coachAdvice: 'Immediate emergency room reassignment with air purification protocol.',
            choices: [
              {
                text: 'Mr. Nambiar, I apologize unreservedly. Please step back into the lobby; I am reassigning you to a freshly sanitized non-smoking Executive Suite on floor 7.',
                quality: 'optimal',
                scoreBonus: 3,
                aiResponse: 'Thank you for moving me quickly.',
                empathyImpact: 26,
                communicationImpact: 26,
                ownershipImpact: 26,
                problemSolvingImpact: 28,
              },
            ],
          },
        ],
      },
      {
        id: 'sc-7',
        unitId: 'unit-02',
        unitTitle: 'SERVICE RECOVERY',
        title: 'VIP Guest Dining Complaint',
        department: 'Food & Beverage',
        difficulty: 4,
        estimatedTime: '4 min',
        xpReward: 25,
        primarySkill: 'Ownership',
        description: 'Cold main course served during high-stakes business dinner.',
        guestName: 'Mr. Singhania',
        guestRole: 'Managing Director',
        situationSummary: 'Host disappointed during client dinner at hotel signature restaurant.',
        turns: [
          {
            id: 1,
            guestLine: 'My overseas clients were served lukewarm steaks after a 45-minute wait. This is embarrassing!',
            guestEmotion: 'Disappointed 🍷',
            coachAdvice: 'Executive Chef involvement & complete table dessert/beverage sponsorship.',
            choices: [
              {
                text: 'Mr. Singhania, I take full personal responsibility. Our Executive Chef is preparing fresh cuts right now, and tonight’s wine pairing is entirely on us.',
                quality: 'optimal',
                scoreBonus: 4,
                aiResponse: 'I appreciate you taking responsibility so swiftly.',
                empathyImpact: 27,
                communicationImpact: 27,
                ownershipImpact: 30,
                problemSolvingImpact: 28,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'unit-03',
    number: 'UNIT 03',
    title: 'GUEST EXCELLENCE & ESCALATIONS',
    description: 'Master high-stakes VIP escalations and executive leadership diplomacy.',
    scenarios: [
      {
        id: 'sc-8',
        unitId: 'unit-03',
        unitTitle: 'GUEST EXCELLENCE',
        title: 'Difficult Guest Escalation',
        department: 'General Management',
        difficulty: 5,
        estimatedTime: '5 min',
        xpReward: 30,
        primarySkill: 'Problem Solving',
        description: 'De-escalate a media personality threatening negative online reviews over noise.',
        guestName: 'Ms. Dupont',
        guestRole: 'Celebrity Guest',
        situationSummary: 'Late night banquet bass noise leaking into 5th floor luxury suites.',
        turns: [
          {
            id: 1,
            guestLine: 'The banquet bass has been thumping until 1 AM! I have 200,000 followers and I am posting a video right now!',
            guestEmotion: 'Outraged 📱',
            coachAdvice: 'De-escalate publicly, meet in person with General Manager voucher.',
            choices: [
              {
                text: 'Ms. Dupont, I completely understand your frustration. The banquet noise has been shut down immediately. Allow me to offer you a private spa day and quiet penthouse relocation.',
                quality: 'optimal',
                scoreBonus: 5,
                aiResponse: 'Okay, I appreciate the quiet penthouse move.',
                empathyImpact: 30,
                communicationImpact: 30,
                ownershipImpact: 30,
                problemSolvingImpact: 30,
              },
            ],
          },
        ],
      },
    ],
  },
];
