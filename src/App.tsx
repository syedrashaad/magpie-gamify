import React, { useState, useEffect } from 'react';
import { UserState, ActiveTab } from './types';
import {
  loadUserState,
  saveUserState,
  resetUserState,
} from './utils/storage';
import { DEMO_UNITS, ScenarioData } from './data/scenarios';
import { Navigation } from './components/Navigation';
import { TasksView } from './components/TasksView';
import { MagpieCoachView } from './components/MagpieCoachView';
import { TrainingView } from './components/TrainingView';
import { MagpieCreationModal } from './components/MagpieCreationModal';
import { MagpieCoachModal } from './components/MagpieCoachModal';
import { RewardSequence } from './components/RewardSequence';
import { PersonalFlightGame } from './components/PersonalFlightGame';
import { LevelUpModal } from './components/LevelUpModal';
import { UserProfileModal } from './components/UserProfileModal';
import { IphoneFrame } from './components/IphoneFrame';

export function App() {
  const [userState, setUserState] = useState<UserState>(() => loadUserState());
  const [activeTab, setActiveTab] = useState<ActiveTab>('tasks');
  const [useIphoneFrame, setUseIphoneFrame] = useState(true);

  // Learning Path Progression State
  const [unlockedScenarioIds, setUnlockedScenarioIds] = useState<string[]>(['sc-1', 'sc-2', 'sc-3']);
  const [completedScenarioIds, setCompletedScenarioIds] = useState<string[]>(['sc-1', 'sc-2']);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('sc-3');
  const [selectedScenario, setSelectedScenario] = useState<ScenarioData | null>(null);

  // Modals & Game Overlay States
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);
  const [isRewardOpen, setIsRewardOpen] = useState(false);
  const [isLevelUpOpen, setIsLevelUpOpen] = useState(false);
  const [isFlightGameOpen, setIsFlightGameOpen] = useState(false);
  const [latestScore, setLatestScore] = useState(8);

  // Auto-save to localStorage
  useEffect(() => {
    saveUserState(userState);
  }, [userState]);

  const handleSaveCustomize = (updated: UserState) => {
    setUserState(updated);
  };

  const handleStartScenario = (scenario: ScenarioData) => {
    setSelectedScenario(scenario);
    setIsScenarioModalOpen(true);
  };

  const handleCompleteScenario = (score: number) => {
    setLatestScore(score);
    setIsScenarioModalOpen(false);

    // Mark completed & unlock next scenario (sc-4 Angry Guest)
    if (!completedScenarioIds.includes(activeScenarioId)) {
      setCompletedScenarioIds((prev) => [...prev, activeScenarioId]);
    }
    if (!unlockedScenarioIds.includes('sc-4')) {
      setUnlockedScenarioIds((prev) => [...prev, 'sc-4']);
      setActiveScenarioId('sc-4');
    }

    // Trigger Reward Sequence
    setTimeout(() => {
      setIsRewardOpen(true);
    }, 400);
  };

  const handleFeedMagpie = () => {
    // Reward rewards: +20 XP, +3 Food 🍎, +2 Feathers 🪶, +1 Egg 🥚
    const newXP = userState.xp + 20;
    const newCurrentGoal = Math.min(userState.dailyGoal.currentXP + 20, userState.dailyGoal.targetXP);
    const newFood = userState.rewards.food + 3;
    const newFeathers = userState.rewards.feathers + 2;
    const newEggs = userState.rewards.eggs + 1;

    let newGrowth = userState.magpie.growth + 12; // 82% -> 94%
    let newLevel = userState.magpie.level;
    let didLevelUp = false;

    if (newGrowth >= 100 && newLevel < 5) {
      newGrowth = newGrowth - 100;
      newLevel = (newLevel + 1) as 1 | 2 | 3 | 4 | 5;
      didLevelUp = true;
    }

    const newStreak = userState.streak + 1; // 🔥 5 -> 6 days streak

    setUserState({
      ...userState,
      streak: newStreak,
      xp: newXP,
      dailyGoal: {
        ...userState.dailyGoal,
        currentXP: newCurrentGoal,
      },
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
      scenariosCompletedCount: userState.scenariosCompletedCount + 1,
    });

    if (didLevelUp) {
      setTimeout(() => {
        setIsLevelUpOpen(true);
      }, 900);
    }
  };

  const handleFinishFlightGame = (newDistance: number) => {
    setUserState({
      ...userState,
      flight: {
        ...userState.flight,
        lastFlightDistance: newDistance,
        personalBest: Math.max(userState.flight.personalBest, newDistance),
      },
    });
  };

  const handleResetDemoState = () => {
    const res = resetUserState();
    setUserState(res);
    setUnlockedScenarioIds(['sc-1', 'sc-2', 'sc-3']);
    setCompletedScenarioIds(['sc-1', 'sc-2']);
    setActiveScenarioId('sc-3');
  };

  return (
    <IphoneFrame enabled={useIphoneFrame} onToggle={() => setUseIphoneFrame(!useIphoneFrame)}>
      <div className="min-h-full bg-[#FAF8F5] text-slate-900 font-sans flex flex-col selection:bg-purple-200">
        
        {/* Navigation Top Header & Bottom Nav */}
        {!isFlightGameOpen && (
          <Navigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userState={userState}
            onOpenProfile={() => setIsProfileOpen(true)}
          />
        )}

        {/* Main Learning Canvas */}
        <main className="flex-1 pb-20">
          {(activeTab === 'tasks' || activeTab === 'home') && (
            <TasksView
              userState={userState}
              unlockedScenarioIds={unlockedScenarioIds}
              completedScenarioIds={completedScenarioIds}
              activeScenarioId={activeScenarioId}
              onSelectScenario={handleStartScenario}
              onOpenFlightGame={() => setIsFlightGameOpen(true)}
            />
          )}

          {activeTab === 'coach' && (
            <MagpieCoachView
              userState={userState}
              onStartScenario={(scId) => {
                const target = DEMO_UNITS.flatMap((u) => u.scenarios).find((s) => s.id === scId) || DEMO_UNITS[0].scenarios[2];
                handleStartScenario(target);
              }}
            />
          )}

          {activeTab === 'training' && (
            <TrainingView
              userState={userState}
              onStartScenario={() => {
                const target = DEMO_UNITS[0].scenarios[2];
                handleStartScenario(target);
              }}
            />
          )}

          {/* Personal Flight Celebration Mini-Game */}
          {isFlightGameOpen && (
            <PersonalFlightGame
              userState={userState}
              onFinishFlight={handleFinishFlightGame}
              onReturnHome={() => setIsFlightGameOpen(false)}
            />
          )}
        </main>

        {/* Modals & Visual Overlay Events */}
        <UserProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          userState={userState}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
        />

        <MagpieCreationModal
          isOpen={isCustomizeOpen}
          onClose={() => setIsCustomizeOpen(false)}
          userState={userState}
          onSave={handleSaveCustomize}
        />

        <MagpieCoachModal
          isOpen={isScenarioModalOpen}
          onClose={() => setIsScenarioModalOpen(false)}
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
            setIsFlightGameOpen(true);
          }}
        />

        <LevelUpModal
          isOpen={isLevelUpOpen}
          userState={userState}
          onClose={() => setIsLevelUpOpen(false)}
        />

      </div>
    </IphoneFrame>
  );
}

export default App;
