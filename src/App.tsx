import React, { useState, useEffect } from 'react';
import { UserState, ActiveTab } from './types';
import {
  loadUserState,
  saveUserState,
  resetUserState,
  calculateLane,
} from './utils/storage';
import { DEMO_UNITS, ScenarioData } from './data/scenarios';
import { Navigation } from './components/Navigation';
import { MagpieHome } from './components/MagpieHome';
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
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Scenario Progression State
  const [unlockedScenarioIds, setUnlockedScenarioIds] = useState<string[]>(['sc-1', 'sc-2', 'sc-3']);
  const [completedScenarioIds, setCompletedScenarioIds] = useState<string[]>(['sc-1', 'sc-2']);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('sc-3');
  const [selectedScenario, setSelectedScenario] = useState<ScenarioData | null>(null);

  // Modals & Game States
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);
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

  const handleStartScenario = (scenarioId?: string) => {
    const targetId = scenarioId || activeScenarioId;
    const target = DEMO_UNITS.flatMap((u) => u.scenarios).find((s) => s.id === targetId) || DEMO_UNITS[0].scenarios[2];
    setSelectedScenario(target);
    setIsCoachModalOpen(true);
  };

  const handleCompleteScenario = (score: number) => {
    setLatestScore(score);
    setIsCoachModalOpen(false);

    // Mark current scenario completed & unlock next scenario (sc-4 Angry Guest)
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
    // Rewards boost: +20 XP, +3 Food 🍎, +2 Feathers 🪶, +1 Egg 🥚
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
    const newStreak = userState.flightDays + 1; // 🔥 12 -> 13 days streak

    setUserState({
      ...userState,
      flightDays: newStreak,
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
        power: userState.flight.power + 20,
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
      }, 900);
    }
  };

  const handleFinishFlightGame = (newDistance: number) => {
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
    setUnlockedScenarioIds(['sc-1', 'sc-2', 'sc-3']);
    setCompletedScenarioIds(['sc-1', 'sc-2']);
    setActiveScenarioId('sc-3');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans flex flex-col selection:bg-purple-200">
      
      {/* Navigation Header */}
      {!isFlightGameOpen && (
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userState={userState}
          onOpenProfile={() => setIsProfileOpen(true)}
        />
      )}

      {/* Main App View Router */}
      <main className="flex-1 pb-16">
        {/* TASKS / HOME VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <MagpieHome
              userState={userState}
              onStartScenario={() => handleStartScenario(activeScenarioId)}
              onOpenSkyRace={() => setIsFlightGameOpen(true)}
              onOpenCustomize={() => setIsCustomizeOpen(true)}
              onResetState={handleResetDemoState}
            />

            {/* Learning Path Preview */}
            <div className="pt-4 border-t border-slate-200/80">
              <TasksView
                userState={userState}
                unlockedScenarioIds={unlockedScenarioIds}
                completedScenarioIds={completedScenarioIds}
                activeScenarioId={activeScenarioId}
                onSelectScenario={(sc) => handleStartScenario(sc.id)}
              />
            </div>
          </div>
        )}

        {/* COURSES ROUTE FALLBACK */}
        {activeTab === 'courses' && (
          <TasksView
            userState={userState}
            unlockedScenarioIds={unlockedScenarioIds}
            completedScenarioIds={completedScenarioIds}
            activeScenarioId={activeScenarioId}
            onSelectScenario={(sc) => handleStartScenario(sc.id)}
          />
        )}

        {/* MAGPIE COACH VIEW */}
        {activeTab === 'coach' && (
          <MagpieCoachView
            userState={userState}
            onStartScenario={(id) => handleStartScenario(id)}
          />
        )}

        {/* TRAINING DASHBOARD VIEW */}
        {activeTab === 'training' && (
          <TrainingView
            userState={userState}
            onStartScenario={() => handleStartScenario(activeScenarioId)}
          />
        )}

        {/* PERSONAL FLIGHT MINI-GAME */}
        {isFlightGameOpen && (
          <PersonalFlightGame
            userState={userState}
            onFinishFlight={handleFinishFlightGame}
            onReturnHome={() => setIsFlightGameOpen(false)}
          />
        )}
      </main>

      {/* Modals & Overlay Sequences */}
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
        isOpen={isCoachModalOpen}
        onClose={() => setIsCoachModalOpen(false)}
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

      {/* Footer */}
      {!isFlightGameOpen && (
        <footer className="border-t border-slate-200/80 bg-white py-6 px-4 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-slate-800 text-sm">MAGPIE AI</span>
              <span>• Sandalwood Grand Hotel & Resorts Training System</span>
            </div>
            <div>
              <span>Powered by Magpie AI Gamified Hospitality Simulator</span>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}

export default App;
