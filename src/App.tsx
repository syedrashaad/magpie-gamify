import React, { useState, useEffect } from 'react';
import { UserState, ActiveTab } from './types';
import {
  loadUserState,
  saveUserState,
  resetUserState,
  calculateLane,
} from './utils/storage';
import { DEMO_UNITS, ScenarioData } from './data/scenarios';
import { AppShell } from './components/AppShell';
import { TasksView } from './components/TasksView';
import { MagpieCoachView } from './components/MagpieCoachView';
import { TrainingView } from './components/TrainingView';
import { MagpieCreationModal } from './components/MagpieCreationModal';
import { MagpieCoachModal } from './components/MagpieCoachModal';
import { RewardSequence } from './components/RewardSequence';
import { PersonalFlightGame } from './components/PersonalFlightGame';
import { LevelUpModal } from './components/LevelUpModal';
import { UserProfileModal } from './components/UserProfileModal';

export function App() {
  const [userState, setUserState] = useState<UserState>(() => loadUserState());
  const [activeTab, setActiveTab] = useState<ActiveTab>('tasks');

  // Scenario Progression State
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

  // Auto-save state
  useEffect(() => {
    saveUserState(userState);
  }, [userState]);

  const handleSaveCustomize = (updated: UserState) => {
    setUserState(updated);
  };

  const handleStartScenario = (scenarioData?: ScenarioData | string) => {
    let target: ScenarioData | undefined;
    if (typeof scenarioData === 'string') {
      target = DEMO_UNITS.flatMap((u) => u.scenarios).find((s) => s.id === scenarioData);
    } else {
      target = scenarioData;
    }
    if (!target) {
      target = DEMO_UNITS[0].scenarios[2];
    }
    setSelectedScenario(target);
    setIsScenarioModalOpen(true);
  };

  const handleCompleteScenario = (score: number) => {
    setLatestScore(score);
    setIsScenarioModalOpen(false);

    if (!completedScenarioIds.includes(activeScenarioId)) {
      setCompletedScenarioIds((prev) => [...prev, activeScenarioId]);
    }
    if (!unlockedScenarioIds.includes('sc-4')) {
      setUnlockedScenarioIds((prev) => [...prev, 'sc-4']);
      setActiveScenarioId('sc-4');
    }

    setTimeout(() => {
      setIsRewardOpen(true);
    }, 400);
  };

  const handleFeedMagpie = () => {
    const newXP = userState.xp + 20;
    const newCurrentGoal = Math.min(userState.dailyGoal.currentXP + 20, userState.dailyGoal.targetXP);
    const newFood = userState.rewards.food + 3;
    const newFeathers = userState.rewards.feathers + 2;
    const newEggs = userState.rewards.eggs + 1;

    let newGrowth = userState.magpie.growth + 12;
    let newLevel = userState.magpie.level;
    let didLevelUp = false;

    if (newGrowth >= 100 && newLevel < 5) {
      newGrowth = newGrowth - 100;
      newLevel = (newLevel + 1) as 1 | 2 | 3 | 4 | 5;
      didLevelUp = true;
    }

    const newStreak = userState.streak + 1;
    const newLane = calculateLane(newEggs);

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
      flight: {
        ...userState.flight,
        lane: newLane,
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

  return (
    <AppShell
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      userState={userState}
      onOpenProfile={() => setIsProfileOpen(true)}
      onOpenCustomize={() => setIsCustomizeOpen(true)}
      onOpenFlightGame={() => setIsFlightGameOpen(true)}
      onSelectScenario={(scId) => handleStartScenario(scId)}
    >
      {/* Main View Router */}
      {(activeTab === 'tasks' || activeTab === 'home' || activeTab === 'courses') && (
        <TasksView
          userState={userState}
          unlockedScenarioIds={unlockedScenarioIds}
          completedScenarioIds={completedScenarioIds}
          activeScenarioId={activeScenarioId}
          onSelectScenario={(sc) => handleStartScenario(sc)}
        />
      )}

      {activeTab === 'coach' && (
        <MagpieCoachView
          userState={userState}
          onStartScenario={(scId) => handleStartScenario(scId)}
        />
      )}

      {activeTab === 'training' && (
        <TrainingView
          userState={userState}
          onStartScenario={() => handleStartScenario(activeScenarioId)}
        />
      )}

      {/* Modals */}
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

      {isFlightGameOpen && (
        <PersonalFlightGame
          userState={userState}
          onFinishFlight={handleFinishFlightGame}
          onReturnHome={() => setIsFlightGameOpen(false)}
        />
      )}
    </AppShell>
  );
}

export default App;
