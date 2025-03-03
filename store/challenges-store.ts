import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ReadingChallenge, Badge, Event } from '@/types';
import { readingChallenges, badges, events } from '@/mocks/challenges';

interface ChallengesState {
  challenges: ReadingChallenge[];
  badges: Badge[];
  events: Event[];
  
  // Actions
  addChallenge: (challenge: ReadingChallenge) => void;
  updateChallengeProgress: (challengeId: string, progress: number) => void;
  completeChallenge: (challengeId: string) => void;
  unlockBadge: (badgeId: string) => void;
  joinEvent: (eventId: string) => void;
  leaveEvent: (eventId: string) => void;
}

export const useChallengesStore = create<ChallengesState>()(
  persist(
    (set) => ({
      challenges: readingChallenges,
      badges: badges,
      events: events,
      
      // Actions
      addChallenge: (challenge: ReadingChallenge) =>
        set((state) => ({ challenges: [...state.challenges, challenge] })),
      
      updateChallengeProgress: (challengeId: string, progress: number) =>
        set((state) => ({
          challenges: state.challenges.map(challenge => 
            challenge.id === challengeId 
              ? { 
                  ...challenge, 
                  progress,
                  isCompleted: progress >= challenge.target,
                } 
              : challenge
          ),
        })),
      
      completeChallenge: (challengeId: string) =>
        set((state) => ({
          challenges: state.challenges.map(challenge => 
            challenge.id === challengeId 
              ? { ...challenge, isCompleted: true, progress: challenge.target } 
              : challenge
          ),
        })),
      
      unlockBadge: (badgeId: string) =>
        set((state) => ({
          badges: state.badges.map(badge => 
            badge.id === badgeId 
              ? { 
                  ...badge, 
                  isUnlocked: true,
                  unlockedAt: new Date().toISOString(),
                } 
              : badge
          ),
        })),
      
      joinEvent: (eventId: string) =>
        set((state) => ({
          events: state.events.map(event => 
            event.id === eventId 
              ? { 
                  ...event, 
                  isParticipating: true,
                  participantsCount: event.participantsCount + 1,
                } 
              : event
          ),
        })),
      
      leaveEvent: (eventId: string) =>
        set((state) => ({
          events: state.events.map(event => 
            event.id === eventId 
              ? { 
                  ...event, 
                  isParticipating: false,
                  participantsCount: event.participantsCount - 1,
                } 
              : event
          ),
        })),
    }),
    {
      name: 'bookish-challenges',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);