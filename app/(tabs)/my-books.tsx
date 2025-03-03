import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Plus, Search, BookOpen, CheckCheck, Clock, X } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useBooksStore } from '@/store/books-store';
import BookCard from '@/components/BookCard';
import BookCover from '@/components/BookCover';
import Button from '@/components/Button';

export default function MyBooksScreen() {
  const router = useRouter();
  const { colors } = useThemeStore();
  const { books, userBooks } = useBooksStore();
  const [activeTab, setActiveTab] = useState<'reading' | 'completed' | 'toRead' | 'dnf'>('reading');

  const getUserBookWithBook = (userBookId: string) => {
    const userBook = userBooks.find(ub => ub.id === userBookId);
    if (!userBook) return null;
    
    const book = books.find(b => b.id === userBook.bookId);
    if (!book) return null;
    
    return { userBook, book };
  };

  const filteredUserBooks = userBooks.filter(ub => ub.status === activeTab);
  
  const currentlyReadingBooks = userBooks
    .filter(ub => ub.status === 'reading')
    .map(ub => {
      const book = books.find(b => b.id === ub.bookId);
      return book ? { userBook: ub, book } : null;
    })
    .filter(Boolean);

  const handleBookPress = (bookId: string) => {
    router.push(`/book/${bookId}`);
  };

  const handleAddBook = () => {
    router.push('/add-book');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>My Books</Text>
        <View style={styles.headerActions}>
          <Pressable 
            style={[styles.iconButton, { backgroundColor: colors.card }]}
            onPress={() => console.log('Search pressed')}
          >
            <Search size={20} color={colors.text} />
          </Pressable>
          <Pressable 
            style={[styles.iconButton, { backgroundColor: colors.card }]}
            onPress={handleAddBook}
          >
            <Plus size={20} color={colors.text} />
          </Pressable>
        </View>
      </View>

      {currentlyReadingBooks.length > 0 && (
        <View style={styles.currentlyReadingSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Currently Reading
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.currentlyReadingList}
          >
            {currentlyReadingBooks.map(item => (
              item && (
                <Pressable 
                  key={item.book.id}
                  style={styles.currentlyReadingItem}
                  onPress={() => handleBookPress(item.book.id)}
                >
                  <BookCover book={item.book} size="medium" showTitle showAuthor />
                </Pressable>
              )
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.tabsContainer}>
        <Pressable 
          style={[
            styles.tab, 
            activeTab === 'reading' && [styles.activeTab, { borderColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('reading')}
        >
          <BookOpen 
            size={18} 
            color={activeTab === 'reading' ? colors.primary : colors.secondaryText} 
          />
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'reading' ? colors.primary : colors.secondaryText }
            ]}
          >
            Reading
          </Text>
        </Pressable>
        
        <Pressable 
          style={[
            styles.tab, 
            activeTab === 'completed' && [styles.activeTab, { borderColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('completed')}
        >
          <CheckCheck 
            size={18} 
            color={activeTab === 'completed' ? colors.primary : colors.secondaryText} 
          />
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'completed' ? colors.primary : colors.secondaryText }
            ]}
          >
            Completed
          </Text>
        </Pressable>
        
        <Pressable 
          style={[
            styles.tab, 
            activeTab === 'toRead' && [styles.activeTab, { borderColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('toRead')}
        >
          <Clock 
            size={18} 
            color={activeTab === 'toRead' ? colors.primary : colors.secondaryText} 
          />
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'toRead' ? colors.primary : colors.secondaryText }
            ]}
          >
            To Read
          </Text>
        </Pressable>
        
        <Pressable 
          style={[
            styles.tab, 
            activeTab === 'dnf' && [styles.activeTab, { borderColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('dnf')}
        >
          <X 
            size={18} 
            color={activeTab === 'dnf' ? colors.primary : colors.secondaryText} 
          />
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'dnf' ? colors.primary : colors.secondaryText }
            ]}
          >
            DNF
          </Text>
        </Pressable>
      </View>

      {filteredUserBooks.length > 0 ? (
        <FlatList
          data={filteredUserBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const book = books.find(b => b.id === item.bookId);
            if (!book) return null;
            
            return (
              <BookCard
                book={book}
                userBook={item}
                onPress={() => handleBookPress(book.id)}
              />
            );
          }}
          contentContainerStyle={styles.booksList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateText, { color: colors.secondaryText }]}>
            {activeTab === 'reading' && "You're not reading any books right now."}
            {activeTab === 'completed' && "You haven't completed any books yet."}
            {activeTab === 'toRead' && "You don't have any books on your to-read list."}
            {activeTab === 'dnf' && "You don't have any DNF books."}
          </Text>
          <Button
            title="Add a Book"
            onPress={handleAddBook}
            variant="primary"
            icon={<Plus size={16} color="white" />}
            iconPosition="left"
            style={styles.addBookButton}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  currentlyReadingSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  currentlyReadingList: {
    paddingRight: 16,
  },
  currentlyReadingItem: {
    marginRight: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  booksList: {
    padding: 16,
    paddingTop: 0,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  addBookButton: {
    marginTop: 8,
  },
});