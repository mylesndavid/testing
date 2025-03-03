import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { FeedItem, BookClub, Discussion, Comment } from '@/types';
import { feedItems } from '@/mocks/feed';
import { bookClubs, discussions } from '@/mocks/bookClubs';

interface SocialState {
  feed: FeedItem[];
  bookClubs: BookClub[];
  joinedBookClubs: string[];
  discussions: Discussion[];
  comments: Comment[];
  
  // Actions
  addFeedItem: (item: FeedItem) => void;
  toggleLike: (feedItemId: string) => void;
  joinBookClub: (bookClubId: string) => void;
  leaveBookClub: (bookClubId: string) => void;
  addDiscussion: (discussion: Discussion) => void;
  addComment: (comment: Comment) => void;
}

export const useSocialStore = create<SocialState>()(
  persist(
    (set) => ({
      feed: feedItems,
      bookClubs: bookClubs,
      joinedBookClubs: ['club1', 'club2'], // For demo purposes
      discussions: discussions,
      comments: [],
      
      // Actions
      addFeedItem: (item: FeedItem) =>
        set((state) => ({ feed: [item, ...state.feed] })),
      
      toggleLike: (feedItemId: string) =>
        set((state) => ({
          feed: state.feed.map(item => 
            item.id === feedItemId 
              ? { 
                  ...item, 
                  isLiked: !item.isLiked,
                  likesCount: item.isLiked ? item.likesCount - 1 : item.likesCount + 1,
                } 
              : item
          ),
        })),
      
      joinBookClub: (bookClubId: string) =>
        set((state) => ({
          joinedBookClubs: [...state.joinedBookClubs, bookClubId],
          bookClubs: state.bookClubs.map(club => 
            club.id === bookClubId 
              ? { ...club, memberCount: club.memberCount + 1 } 
              : club
          ),
        })),
      
      leaveBookClub: (bookClubId: string) =>
        set((state) => ({
          joinedBookClubs: state.joinedBookClubs.filter(id => id !== bookClubId),
          bookClubs: state.bookClubs.map(club => 
            club.id === bookClubId 
              ? { ...club, memberCount: club.memberCount - 1 } 
              : club
          ),
        })),
      
      addDiscussion: (discussion: Discussion) =>
        set((state) => ({ discussions: [discussion, ...state.discussions] })),
      
      addComment: (comment: Comment) =>
        set((state) => ({ 
          comments: [...state.comments, comment],
          discussions: state.discussions.map(discussion => 
            discussion.id === comment.discussionId 
              ? { ...discussion, commentsCount: discussion.commentsCount + 1 } 
              : discussion
          ),
        })),
    }),
    {
      name: 'bookish-social',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);