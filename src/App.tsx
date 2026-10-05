import React, { useState, useEffect } from 'react';
import { UserState, ActiveTab, SkyLeagueMember, Teammate } from './types';
import {
  loadUserState,
  saveUserState,
  resetUserState,
  loadLeaderboardState,
  saveLeaderboardState,
  loadTeammatesState,
  saveTeammatesState,
} from './utils/storage';
import { DEMO_UNITS, ScenarioData } from './data/scenarios';
import { AppShell } from './components/AppShell';
import { TasksView } from './components/TasksView';
import { MagpieCoachView } from './components/MagpieCoachView';
import { SkyLeagueView } from './components/SkyLeagueView';
import { TrainingView } from './components/TrainingView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';
import { MySkyView } from './components/MySkyView';
import { MagpieCreationModal } from './components/MagpieCreationModal';
import { MagpieCoachModal } from './components/MagpieCoachModal';
import { RewardSequence } from './components/RewardSequence';
import { FlightChallengeGame } from './components/FlightChallengeGame';
import { LevelUpModal } from './components/LevelUpModal';
import { OnboardingModal } from './components/OnboardingModal';

export function App() {
  const [userState, setUserState] = useState<UserState>(() => loadUserState());
  const [leaderboard, setLeaderboard] = useState<SkyLeagueMember[]>(() => loadLeaderboardState());
  const [teammates, setTeammates] = useState<Teammate[]>(() => loadTeammatesState());
  const [activeTab, setActiveTab] = useState<ActiveTab>('tasks');

  // Scenario Progression State
  const [unlockedScenarioIds, setUnlockedScenarioIds] = useState<string[]>(['sc-1', 'sc-2', 'sc-3']);
  const [completedScenarioIds, setCompletedScenarioIds] = useState<string[]>(['sc-1', 'sc-2']);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('sc-3');
  const [selectedScenario, setSelectedScenario] = useState<ScenarioData | null>(null);

  // Modals & Overlay States
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);
  const [isRewardOpen, setIsRewardOpen] = useState(false);
  const [isLevelUpOpen, setIsLevelUpOpen] = useState(false);
  const [isFlightGameOpen, setIsFlightGameOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [latestScore, setLatestScore] = useState(82);
  const [justOvertook, setJustOvertook] = useState(false);

  // Auto-save state
  useEffect(() => {
    saveUserState(userState);
  }, [userState]);

  useEffect(() => {
    saveLeaderboardState(leaderboard);
  }, [leaderboard]);

  useEffect(() => {
    saveTeammatesState(teammates);
  }, [teammates]);

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

    const nextLevelNum = userState.currentLevelNumber + 1;

    if (!completedScenarioIds.includes(activeScenarioId)) {
      setCompletedScenarioIds((prev) => [...prev, activeScenarioId]);
    }
    if (!unlockedScenarioIds.includes('sc-4')) {
      setUnlockedScenarioIds((prev) => [...prev, 'sc-4']);
      setActiveScenarioId('sc-4');
    }

    // Advance user's level position on map
    setUserState((prev) => ({
      ...prev,
      currentLevelNumber: nextLevelNum,
    }));

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

    setUserState((prev) => ({
      ...prev,
      xp: newXP,
      dailyGoal: {
        ...prev.dailyGoal,
        currentXP: newCurrentGoal,
      },
      magpie: {
        ...prev.magpie,
        level: newLevel,
        growth: Math.min(newGrowth, 100),
      },
      rewards: {
        eggs: newEggs,
        feathers: newFeathers,
        food: newFood,
      },
      scenariosCompletedCount: prev.scenariosCompletedCount + 1,
    }));

    if (didLevelUp) {
      setTimeout(() => {
        setIsLevelUpOpen(true);
      }, 900);
    }
  };

  const handleFinishFlightChallenge = (gainedFP: number) => {
    const newFP = userState.flightPower + gainedFP;
    setIsFlightGameOpen(false);

    // Update user flight power and rank bump (#4 -> #3)
    setUserState((prev) => ({
      ...prev,
      flightPower: newFP,
      rank: 3,
    }));

    // Update Sandalwood Leaderboard order
    const updatedBoard = leaderboard.map((m) => {
      if (m.isCurrentUser) {
        return { ...m, rank: 3, flightPower: newFP, xp: userState.xp };
      }
      if (m.id === 'usr-3') {
        return { ...m, rank: 4 };
      }
      return m;
    }).sort((a, b) => a.rank - b.rank);

    setLeaderboard(updatedBoard);
    setJustOvertook(true);
    setActiveTab('sky-league');
  };

  const handleUnlockSkyItem = (itemId: string, cost: number) => {
    setUserState((prev) => {
      const currentUnlocks = prev.mySkyUnlocks || ['nest-gold'];
      if (currentUnlocks.includes(itemId)) return prev;
      return {
        ...prev,
        rewards: {
          ...prev.rewards,
          eggs: Math.max(0, prev.rewards.eggs - cost),
        },
        mySkyUnlocks: [...currentUnlocks, itemId],
      };
    });
  };

  const handleResetData = () => {
    const fresh = resetUserState();
    setUserState(fresh);
    setLeaderboard(loadLeaderboardState());
    setTeammates(loadTeammatesState());
    setUnlockedScenarioIds(['sc-1', 'sc-2', 'sc-3']);
    setCompletedScenarioIds(['sc-1', 'sc-2']);
    setActiveScenarioId('sc-3');
  };

  return (
    <AppShell
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      userState={userState}
      onOpenProfile={() => setActiveTab('profile')}
      onOpenSettings={() => setActiveTab('settings')}
      onOpenCustomize={() => setIsCustomizeOpen(true)}
      onOpenFlightGame={() => setIsFlightGameOpen(true)}
      onSelectScenario={(scId) => handleStartScenario(scId)}
    >
      {/* View Router */}
      {activeTab === 'tasks' && (
        <TasksView
          userState={userState}
          teammates={teammates}
          unlockedScenarioIds={unlockedScenarioIds}
          completedScenarioIds={completedScenarioIds}
          activeScenarioId={activeScenarioId}
          onSelectScenario={(sc) => handleStartScenario(sc)}
          onNavigateToSkyLeague={() => setActiveTab('sky-league')}
        />
      )}

      {activeTab === 'my-sky' && (
        <MySkyView
          userState={userState}
          onUnlockItem={handleUnlockSkyItem}
          onNavigateToTasks={() => setActiveTab('tasks')}
        />
      )}

      {activeTab === 'coach' && (
        <MagpieCoachView
          userState={userState}
          onStartScenario={(scId) => handleStartScenario(scId)}
        />
      )}

      {activeTab === 'sky-league' && (
        <SkyLeagueView
          userState={userState}
          leaderboard={leaderboard}
          onOpenFlightChallenge={() => setIsFlightGameOpen(true)}
          justOvertook={justOvertook}
        />
      )}

      {activeTab === 'training' && (
        <TrainingView
          userState={userState}
          onStartScenario={() => handleStartScenario(activeScenarioId)}
        />
      )}

      {activeTab === 'profile' && (
        <ProfileView
          userState={userState}
          onUpdateUserState={(updated) => setUserState(updated)}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsView
          userState={userState}
          onResetState={handleResetData}
        />
      )}

      {/* Modals & Game Overlays */}
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
        onLaunchFlightChallenge={() => {
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
        <FlightChallengeGame
          userState={userState}
          onFinishChallenge={handleFinishFlightChallenge}
          onClose={() => setIsFlightGameOpen(false)}
        />
      )}

      <OnboardingModal
        isOpen={isOnboardingOpen}
        userState={userState}
        onClose={(updated) => {
          setIsOnboardingOpen(false);
          if (updated) {
            setUserState((prev) => ({
              ...prev,
              ...updated,
              magpie: {
                ...prev.magpie,
                ...(updated.magpie || {}),
              },
            }));
          }
        }}
      />
    </AppShell>
  );
}

export default App;
