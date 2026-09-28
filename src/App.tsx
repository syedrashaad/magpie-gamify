import React, { useState, useEffect } from 'react';
import { UserState, ActiveTab } from './types';
import {
  loadUserState,
  saveUserState,
  resetUserState,
  calculateLane,
} from './utils/storage';
import { Navigation } from './components/Navigation';
import { MagpieHome } from './components/MagpieHome';
import { MagpieCreationModal } from './components/MagpieCreationModal';
import { MagpieCoachModal } from './components/MagpieCoachModal';
import { RewardSequence } from './components/RewardSequence';
import { SkyRaceView } from './components/SkyRaceView';
import { MyCoursesView } from './components/MyCoursesView';
import { MyTrainingView } from './components/MyTrainingView';

export function App() {
  const [userState, setUserState] = useState<UserState>(() => loadUserState());
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isCoachOpen, setIsCoachOpen] = useState(false);
  const [isRewardOpen, setIsRewardOpen] = useState(false);
  const [latestScore, setLatestScore] = useState(8);

  // Save state whenever userState updates
  useEffect(() => {
    saveUserState(userState);
  }, [userState]);

  const handleSaveCustomize = (updated: UserState) => {
    setUserState(updated);
  };

  const handleStartScenario = () => {
    setIsCoachOpen(true);
  };

  const handleCompleteScenario = (score: number) => {
    setLatestScore(score);
    setIsCoachOpen(false);

    // Open Cinematic Reward Sequence after brief pause
    setTimeout(() => {
      setIsRewardOpen(true);
    }, 400);
  };

  const handleFeedMagpie = () => {
    // Add rewards: +3 Food, +2 Feathers, +1 Egg
    const newFood = userState.rewards.food + 3;
    const newFeathers = userState.rewards.feathers + 2;
    const newEggs = userState.rewards.eggs + 1;

    // Calculate growth boost: 82% + 10% = 92%
    let newGrowth = userState.magpie.growth + 10;
    let newLevel = userState.magpie.level;

    if (newGrowth >= 100 && newLevel < 4) {
      newGrowth = newGrowth - 100;
      newLevel = (newLevel + 1) as 1 | 2 | 3 | 4;
    }

    const newLane = calculateLane(newEggs);

    setUserState({
      ...userState,
      magpie: {
        ...userState.magpie,
        level: newLevel,
        growth: Math.min(newGrowth, 100),
      },
      rewards: {
        eggs: newEggs,
        feathers: newFeathers,
        food: newFood,
      },
      flight: {
        ...userState.flight,
        lane: newLane,
      },
      training: {
        ...userState.training,
        previousScore: userState.training.currentScore,
        currentScore: latestScore,
        scenariosCompleted: userState.training.scenariosCompleted + 1,
      },
    });
  };

  const handleUpdateDistance = (newDistance: number) => {
    setUserState({
      ...userState,
      flight: {
        ...userState.flight,
        currentDistance: newDistance,
        personalBest: Math.max(userState.flight.personalBest, newDistance),
      },
    });
  };

  const handleResetDemoState = () => {
    const res = resetUserState();
    setUserState(res);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans flex flex-col selection:bg-purple-200">
      
      {/* Navigation Header */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userState={userState}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {activeTab === 'home' && (
          <MagpieHome
            userState={userState}
            onStartScenario={handleStartScenario}
            onOpenSkyRace={() => setActiveTab('sky-race')}
            onOpenCustomize={() => setIsCustomizeOpen(true)}
            onResetState={handleResetDemoState}
          />
        )}

        {activeTab === 'courses' && (
          <MyCoursesView
            userState={userState}
            onStartScenario={handleStartScenario}
          />
        )}

        {activeTab === 'coach' && (
          <MagpieHome
            userState={userState}
            onStartScenario={handleStartScenario}
            onOpenSkyRace={() => setActiveTab('sky-race')}
            onOpenCustomize={() => setIsCustomizeOpen(true)}
            onResetState={handleResetDemoState}
          />
        )}

        {activeTab === 'training' && (
          <MyTrainingView
            userState={userState}
            onStartScenario={handleStartScenario}
          />
        )}

        {activeTab === 'sky-race' && (
          <SkyRaceView
            userState={userState}
            onUpdateDistance={handleUpdateDistance}
            onStartScenario={handleStartScenario}
          />
        )}
      </main>

      {/* Modals & Overlay Sequences */}
      <MagpieCreationModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        userState={userState}
        onSave={handleSaveCustomize}
      />

      <MagpieCoachModal
        isOpen={isCoachOpen}
        onClose={() => setIsCoachOpen(false)}
        userState={userState}
        onCompleteScenario={handleCompleteScenario}
      />

      <RewardSequence
        isOpen={isRewardOpen}
        score={latestScore}
        userState={userState}
        onFeedMagpie={handleFeedMagpie}
        onClose={() => setIsRewardOpen(false)}
        onGoToSkyRace={() => {
          setIsRewardOpen(false);
          setActiveTab('sky-race');
        }}
      />

      {/* Enterprise Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-slate-800 text-sm">MAGPIE AI</span>
            <span>• Sandalwood Grand Hotel & Resorts Training System</span>
          </div>
          <div>
            <span>Powered by Magpie AI Gamified Learning Engine</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
