import { ReadingChallenge, Badge, Event } from '@/types';

export const readingChallenges: ReadingChallenge[] = [
  {
    id: 'challenge1',
    title: '2023 Reading Challenge',
    description: 'Read 50 books in 2023',
    target: 50,
    progress: 12,
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    isCompleted: false,
  },
  {
    id: 'challenge2',
    title: 'Genre Explorer',
    description: 'Read books from 10 different genres',
    target: 10,
    progress: 4,
    startDate: '2023-01-15',
    endDate: '2023-12-31',
    isCompleted: false,
  },
  {
    id: 'challenge3',
    title: 'Classics Club',
    description: 'Read 5 classic novels',
    target: 5,
    progress: 1,
    startDate: '2023-02-01',
    endDate: '2023-12-31',
    isCompleted: false,
  },
];

export const badges: Badge[] = [
  {
    id: 'badge1',
    title: 'Bookworm',
    description: 'Read 10 books',
    icon: '📚',
    unlockedAt: '2022-12-15',
    isUnlocked: true,
  },
  {
    id: 'badge2',
    title: 'Night Owl',
    description: 'Log reading sessions after midnight 5 times',
    icon: '🦉',
    unlockedAt: '2023-01-20',
    isUnlocked: true,
  },
  {
    id: 'badge3',
    title: 'Genre Explorer',
    description: 'Read books from 5 different genres',
    icon: '🧭',
    unlockedAt: '2023-02-05',
    isUnlocked: true,
  },
  {
    id: 'badge4',
    title: 'Reviewer',
    description: 'Write 10 book reviews',
    icon: '✍️',
    isUnlocked: false,
  },
  {
    id: 'badge5',
    title: 'Book Club Enthusiast',
    description: 'Join 3 book clubs',
    icon: '👥',
    isUnlocked: false,
  },
];

export const events: Event[] = [
  {
    id: 'event1',
    title: 'Spring 24-Hour Readathon',
    description: 'Join us for a full day of reading! Share your progress, participate in mini-challenges, and connect with other readers.',
    startDate: '2023-04-15T08:00:00Z',
    endDate: '2023-04-16T08:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    participantsCount: 156,
    isParticipating: true,
  },
  {
    id: 'event2',
    title: 'Fantasy February',
    description: 'A month-long celebration of fantasy books. Read as many fantasy books as you can and participate in themed discussions.',
    startDate: '2023-02-01T00:00:00Z',
    endDate: '2023-02-28T23:59:59Z',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    participantsCount: 243,
    isParticipating: true,
  },
  {
    id: 'event3',
    title: 'Summer Reading Bingo',
    description: 'Complete reading challenges to fill your bingo card and win prizes!',
    startDate: '2023-06-01T00:00:00Z',
    endDate: '2023-08-31T23:59:59Z',
    coverImage: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    participantsCount: 0,
    isParticipating: false,
  },
];