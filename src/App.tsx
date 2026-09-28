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
import { SkyRaceGame } from './components/SkyRaceGame';
import { LevelUpModal } from './components/LevelUpModal';
import { MyCoursesView } from './components/MyCoursesView';
import { MyTrainingView } from './components/MyTrainingView';

export function App() {
  const [userState, setUserState] = useState<UserState>(() => loadUserState());
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isCoachOpen, setIsCoachOpen] = useState(false);
  const [isRewardOpen, setIsRewardOpen] = useState(false);
  const [isLevelUpOpen, setIsLevelUpOpen] = useState(false);
  const [latestScore, setLatestScore] = useState(8);

  // Save state to localStorage
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

    // Open Cinematic Reward Sequence
    setTimeout(() => {
      setIsRewardOpen(true);
    }, 400);
  };

  const handleFeedMagpie = () => {
    // Rewards boost: +3 Food, +2 Feathers, +1 Egg
    const newFood = userState.rewards.food + 3;
    const newFeathers = userState.rewards.feathers + 2;
    const newEggs = userState.rewards.eggs + 1;

    let newGrowth = userState.magpie.growth + 12; // 82% -> 94%
    let newLevel = userState.magpie.level;

    let didLevelUp = false;
    if (newGrowth >= 100 && newLevel < 3) {
      newGrowth = newGrowth - 100;
      newLevel = (newLevel + 1) as 1 | 2 | 3;
      didLevelUp = true;
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

    if (didLevelUp) {
      setTimeout(() => {
        setIsLevelUpOpen(true);
      }, 1000);
    }
  };

  const handleFinishSkyRace = (newDistance: number, eggsEarned: number, feathersEarned: number) => {
    const newEggs = userState.rewards.eggs + eggsEarned;
    const newFeathers = userState.rewards.feathers + feathersEarned;
    const newLane = calculateLane(newEggs);

    setUserState({
      ...userState,
      rewards: {
        ...userState.rewards,
        eggs: newEggs,
        feathers: newFeathers,
      },
      flight: {
        ...userState.flight,
        currentDistance: newDistance,
        personalBest: Math.max(userState.flight.personalBest, newDistance),
        lane: newLane,
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
      {activeTab !== 'sky-race' && (
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userState={userState}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
        />
      )}

      {/* Main Content Router */}
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

        {/* Full-screen Playable Sky Race State */}
        {activeTab === 'sky-race' && (
          <SkyRaceGame
            userState={userState}
            onFinishRace={handleFinishSkyRace}
            onReturnHome={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Modals & Visual Events */}
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

      <LevelUpModal
        isOpen={isLevelUpOpen}
        userState={userState}
        onClose={() => setIsLevelUpOpen(false)}
      />

      {/* Footer */}
      {activeTab !== 'sky-race' && (
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
      )}

    </div>
  );
}

export default App;
