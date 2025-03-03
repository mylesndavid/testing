export type User = {
  id: string;
  username: string;
  name: string;
  bio?: string;
  profileImage?: string;
  favoriteQuote?: string;
  booksRead: number;
  following: number;
  followers: number;
  joinDate: string;
  preferences?: {
    favoriteGenres: string[];
    theme: 'light' | 'dark' | 'system';
  };
};

export type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  publishedDate: string;
  genres: string[];
  pageCount: number;
  averageRating: number;
  ratingsCount: number;
};

export type ReadingStatus = 'reading' | 'completed' | 'toRead' | 'dnf';

export type UserBook = {
  id: string;
  bookId: string;
  userId: string;
  status: ReadingStatus;
  currentPage: number;
  startDate?: string;
  finishDate?: string;
  rating?: number;
  review?: {
    text: string;
    containsSpoilers: boolean;
    createdAt: string;
    updatedAt?: string;
  };
  notes?: string[];
  isWishlisted: boolean;
};

export type BookClub = {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  memberCount: number;
  currentBook?: Book;
  upcomingBooks?: Book[];
  isPrivate: boolean;
  createdBy: string;
  createdAt: string;
};

export type Discussion = {
  id: string;
  bookClubId: string;
  bookId?: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: string;
  commentsCount: number;
  likesCount: number;
};

export type Comment = {
  id: string;
  discussionId: string;
  content: string;
  createdBy: string;
  createdAt: string;
  likesCount: number;
};

export type ReadingChallenge = {
  id: string;
  title: string;
  description: string;
  target: number;
  progress: number;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
};

export type Badge = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  coverImage: string;
  participantsCount: number;
  isParticipating: boolean;
};

export type FeedItem = {
  id: string;
  type: 'review' | 'progress' | 'challenge' | 'badge' | 'club';
  userId: string;
  username: string;
  userImage?: string;
  timestamp: string;
  content: {
    text?: string;
    book?: Book;
    progress?: number;
    rating?: number;
    challenge?: ReadingChallenge;
    badge?: Badge;
    club?: BookClub;
  };
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
};