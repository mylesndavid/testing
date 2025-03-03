import { User } from '@/types';

export const currentUser: User = {
  id: 'user1',
  username: 'bookworm_emma',
  name: 'Emma Wilson',
  bio: 'Book lover, tea drinker, and aspiring writer. I read mostly fantasy and literary fiction.',
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  favoriteQuote: '"A reader lives a thousand lives before he dies." - George R.R. Martin',
  booksRead: 87,
  following: 142,
  followers: 98,
  joinDate: '2022-03-15',
  preferences: {
    favoriteGenres: ['Fantasy', 'Literary Fiction', 'Historical Fiction'],
    theme: 'light',
  },
};

export const users: User[] = [
  currentUser,
  {
    id: 'user2',
    username: 'literary_sophie',
    name: 'Sophie Chen',
    bio: 'English professor with a passion for classics and contemporary fiction.',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    favoriteQuote: '"That is part of the beauty of all literature. You discover that your longings are universal longings." - F. Scott Fitzgerald',
    booksRead: 215,
    following: 89,
    followers: 312,
    joinDate: '2021-11-08',
    preferences: {
      favoriteGenres: ['Classics', 'Literary Fiction', 'Poetry'],
      theme: 'dark',
    },
  },
  {
    id: 'user3',
    username: 'bookish_maya',
    name: 'Maya Johnson',
    bio: 'YA and fantasy enthusiast. Bibliophile since childhood.',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    favoriteQuote: '"Stories are wild creatures." - Patrick Ness',
    booksRead: 132,
    following: 201,
    followers: 178,
    joinDate: '2022-01-22',
    preferences: {
      favoriteGenres: ['Young Adult', 'Fantasy', 'Science Fiction'],
      theme: 'light',
    },
  },
  {
    id: 'user4',
    username: 'readwithlaura',
    name: 'Laura Martinez',
    bio: 'Book blogger and reviewer. I love discovering new voices in fiction.',
    profileImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    favoriteQuote: '"Books are a uniquely portable magic." - Stephen King',
    booksRead: 167,
    following: 312,
    followers: 1243,
    joinDate: '2021-08-14',
    preferences: {
      favoriteGenres: ['Contemporary Fiction', 'Thriller', 'Memoir'],
      theme: 'light',
    },
  },
];