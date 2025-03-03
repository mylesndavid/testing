import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Book, UserBook, ReadingStatus } from '@/types';
import { books as mockBooks, userBooks as mockUserBooks } from '@/mocks/books';

interface BooksState {
  books: Book[];
  userBooks: UserBook[];
  currentlyReading: UserBook[];
  completed: UserBook[];
  toRead: UserBook[];
  dnf: UserBook[];
  wishlisted: UserBook[];
  
  // Actions
  addBook: (book: Book) => void;
  updateBook: (bookId: string, updates: Partial<Book>) => void;
  addUserBook: (userBook: UserBook) => void;
  updateUserBook: (userBookId: string, updates: Partial<UserBook>) => void;
  updateReadingStatus: (userBookId: string, status: ReadingStatus) => void;
  updateReadingProgress: (userBookId: string, currentPage: number) => void;
  addReview: (userBookId: string, text: string, rating: number, containsSpoilers: boolean) => void;
  toggleWishlist: (userBookId: string) => void;
  addNote: (userBookId: string, note: string) => void;
  removeNote: (userBookId: string, noteIndex: number) => void;
}

export const useBooksStore = create<BooksState>()(
  persist(
    (set) => ({
      books: mockBooks,
      userBooks: mockUserBooks,
      
      // Computed properties
      get currentlyReading() {
        return mockUserBooks.filter(book => book.status === 'reading');
      },
      get completed() {
        return mockUserBooks.filter(book => book.status === 'completed');
      },
      get toRead() {
        return mockUserBooks.filter(book => book.status === 'toRead');
      },
      get dnf() {
        return mockUserBooks.filter(book => book.status === 'dnf');
      },
      get wishlisted() {
        return mockUserBooks.filter(book => book.isWishlisted);
      },
      
      // Actions
      addBook: (book: Book) => 
        set((state) => ({ books: [...state.books, book] })),
      
      updateBook: (bookId: string, updates: Partial<Book>) =>
        set((state) => ({
          books: state.books.map(book => 
            book.id === bookId ? { ...book, ...updates } : book
          ),
        })),
      
      addUserBook: (userBook: UserBook) =>
        set((state) => ({ userBooks: [...state.userBooks, userBook] })),
      
      updateUserBook: (userBookId: string, updates: Partial<UserBook>) =>
        set((state) => ({
          userBooks: state.userBooks.map(userBook => 
            userBook.id === userBookId ? { ...userBook, ...updates } : userBook
          ),
        })),
      
      updateReadingStatus: (userBookId: string, status: ReadingStatus) =>
        set((state) => ({
          userBooks: state.userBooks.map(userBook => 
            userBook.id === userBookId 
              ? { 
                  ...userBook, 
                  status,
                  ...(status === 'completed' ? { finishDate: new Date().toISOString() } : {}),
                  ...(status === 'reading' && !userBook.startDate ? { startDate: new Date().toISOString() } : {}),
                } 
              : userBook
          ),
        })),
      
      updateReadingProgress: (userBookId: string, currentPage: number) =>
        set((state) => ({
          userBooks: state.userBooks.map(userBook => 
            userBook.id === userBookId 
              ? { 
                  ...userBook, 
                  currentPage,
                  ...(userBook.status !== 'reading' ? { status: 'reading' as ReadingStatus } : {}),
                  ...(userBook.status !== 'reading' && !userBook.startDate ? { startDate: new Date().toISOString() } : {}),
                } 
              : userBook
          ),
        })),
      
      addReview: (userBookId: string, text: string, rating: number, containsSpoilers: boolean) =>
        set((state) => ({
          userBooks: state.userBooks.map(userBook => 
            userBook.id === userBookId 
              ? { 
                  ...userBook, 
                  rating,
                  review: {
                    text,
                    containsSpoilers,
                    createdAt: new Date().toISOString(),
                  },
                } 
              : userBook
          ),
        })),
      
      toggleWishlist: (userBookId: string) =>
        set((state) => ({
          userBooks: state.userBooks.map(userBook => 
            userBook.id === userBookId 
              ? { ...userBook, isWishlisted: !userBook.isWishlisted } 
              : userBook
          ),
        })),
      
      addNote: (userBookId: string, note: string) =>
        set((state) => ({
          userBooks: state.userBooks.map(userBook => 
            userBook.id === userBookId 
              ? { 
                  ...userBook, 
                  notes: [...(userBook.notes || []), note],
                } 
              : userBook
          ),
        })),
      
      removeNote: (userBookId: string, noteIndex: number) =>
        set((state) => ({
          userBooks: state.userBooks.map(userBook => 
            userBook.id === userBookId && userBook.notes
              ? { 
                  ...userBook, 
                  notes: userBook.notes.filter((_, index) => index !== noteIndex),
                } 
              : userBook
          ),
        })),
    }),
    {
      name: 'bookish-books',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);