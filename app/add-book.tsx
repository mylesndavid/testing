import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, X, Plus, BookOpen, CheckCheck, Clock } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useBooksStore } from '@/store/books-store';
import { Book, ReadingStatus, UserBook } from '@/types';
import Button from '@/components/Button';
import { books as mockBooks } from '@/mocks/books';

export default function AddBookScreen() {
  const router = useRouter();
  const { colors } = useThemeStore();
  const { addUserBook } = useBooksStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readingStatus, setReadingStatus] = useState<ReadingStatus>('toRead');
  const [currentPage, setCurrentPage] = useState('0');
  
  // Filter books based on search query
  const filteredBooks = searchQuery.length > 0
    ? mockBooks.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setSearchQuery('');
    setCurrentPage('0');
  };
  
  const handleAddBook = () => {
    if (!selectedBook) return;
    
    const newUserBook: UserBook = {
      id: `userbook-${Date.now()}`,
      bookId: selectedBook.id,
      userId: 'user1', // Current user ID
      status: readingStatus,
      currentPage: parseInt(currentPage) || 0,
      startDate: readingStatus === 'reading' ? new Date().toISOString() : undefined,
      finishDate: readingStatus === 'completed' ? new Date().toISOString() : undefined,
      isWishlisted: false,
    };
    
    addUserBook(newUserBook);
    router.back();
  };
  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchSection}>
          <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Search size={20} color={colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search for a book or author"
              placeholderTextColor={colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={clearSearch}>
                <X size={20} color={colors.secondaryText} />
              </Pressable>
            )}
          </View>
          
          {searchQuery.length > 0 && filteredBooks.length > 0 && (
            <View style={[styles.searchResults, { backgroundColor: colors.card }]}>
              {filteredBooks.map(book => (
                <Pressable 
                  key={book.id}
                  style={[styles.searchResultItem, { borderBottomColor: colors.border }]}
                  onPress={() => handleBookSelect(book)}
                >
                  <Text style={[styles.searchResultTitle, { color: colors.text }]}>
                    {book.title}
                  </Text>
                  <Text style={[styles.searchResultAuthor, { color: colors.secondaryText }]}>
                    by {book.author}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
          
          {searchQuery.length > 0 && filteredBooks.length === 0 && (
            <View style={[styles.noResults, { backgroundColor: colors.card }]}>
              <Text style={[styles.noResultsText, { color: colors.secondaryText }]}>
                No books found. Try a different search.
              </Text>
            </View>
          )}
        </View>
        
        {selectedBook && (
          <View style={styles.selectedBookSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Selected Book</Text>
            
            <View style={[styles.selectedBookContainer, { backgroundColor: colors.card }]}>
              <View style={styles.selectedBookInfo}>
                <Text style={[styles.selectedBookTitle, { color: colors.text }]}>
                  {selectedBook.title}
                </Text>
                <Text style={[styles.selectedBookAuthor, { color: colors.secondaryText }]}>
                  by {selectedBook.author}
                </Text>
                <Text style={[styles.selectedBookDetails, { color: colors.secondaryText }]}>
                  {selectedBook.pageCount} pages • {selectedBook.publishedDate.split('-')[0]}
                </Text>
              </View>
            </View>
            
            <View style={styles.statusSection}>
              <Text style={[styles.statusTitle, { color: colors.text }]}>Reading Status</Text>
              
              <View style={styles.statusButtons}>
                <Pressable 
                  style={[
                    styles.statusButton, 
                    readingStatus === 'reading' && [styles.activeStatusButton, { borderColor: colors.primary }],
                    { backgroundColor: colors.card }
                  ]}
                  onPress={() => setReadingStatus('reading')}
                >
                  <BookOpen 
                    size={18} 
                    color={readingStatus === 'reading' ? colors.primary : colors.secondaryText} 
                  />
                  <Text 
                    style={[
                      styles.statusButtonText, 
                      { color: readingStatus === 'reading' ? colors.primary : colors.secondaryText }
                    ]}
                  >
                    Reading
                  </Text>
                </Pressable>
                
                <Pressable 
                  style={[
                    styles.statusButton, 
                    readingStatus === 'completed' && [styles.activeStatusButton, { borderColor: colors.primary }],
                    { backgroundColor: colors.card }
                  ]}
                  onPress={() => setReadingStatus('completed')}
                >
                  <CheckCheck 
                    size={18} 
                    color={readingStatus === 'completed' ? colors.primary : colors.secondaryText} 
                  />
                  <Text 
                    style={[
                      styles.statusButtonText, 
                      { color: readingStatus === 'completed' ? colors.primary : colors.secondaryText }
                    ]}
                  >
                    Completed
                  </Text>
                </Pressable>
                
                <Pressable 
                  style={[
                    styles.statusButton, 
                    readingStatus === 'toRead' && [styles.activeStatusButton, { borderColor: colors.primary }],
                    { backgroundColor: colors.card }
                  ]}
                  onPress={() => setReadingStatus('toRead')}
                >
                  <Clock 
                    size={18} 
                    color={readingStatus === 'toRead' ? colors.primary : colors.secondaryText} 
                  />
                  <Text 
                    style={[
                      styles.statusButtonText, 
                      { color: readingStatus === 'toRead' ? colors.primary : colors.secondaryText }
                    ]}
                  >
                    To Read
                  </Text>
                </Pressable>
                
                <Pressable 
                  style={[
                    styles.statusButton, 
                    readingStatus === 'dnf' && [styles.activeStatusButton, { borderColor: colors.primary }],
                    { backgroundColor: colors.card }
                  ]}
                  onPress={() => setReadingStatus('dnf')}
                >
                  <X 
                    size={18} 
                    color={readingStatus === 'dnf' ? colors.primary : colors.secondaryText} 
                  />
                  <Text 
                    style={[
                      styles.statusButtonText, 
                      { color: readingStatus === 'dnf' ? colors.primary : colors.secondaryText }
                    ]}
                  >
                    DNF
                  </Text>
                </Pressable>
              </View>
            </View>
            
            {readingStatus === 'reading' && (
              <View style={styles.progressSection}>
                <Text style={[styles.progressTitle, { color: colors.text }]}>Current Progress</Text>
                
                <View style={styles.progressInputContainer}>
                  <TextInput
                    style={[styles.progressInput, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                    placeholder="0"
                    placeholderTextColor={colors.secondaryText}
                    value={currentPage}
                    onChangeText={setCurrentPage}
                    keyboardType="number-pad"
                  />
                  <Text style={[styles.progressInputLabel, { color: colors.secondaryText }]}>
                    / {selectedBook.pageCount} pages
                  </Text>
                </View>
              </View>
            )}
            
            <View style={styles.addButtonContainer}>
              <Button
                title="Add to My Books"
                onPress={handleAddBook}
                variant="primary"
                icon={<Plus size={18} color="white" />}
                iconPosition="left"
                fullWidth
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  searchSection: {
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  searchResults: {
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  searchResultItem: {
    padding: 12,
    borderBottomWidth: 1,
  },
  searchResultTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  searchResultAuthor: {
    fontSize: 14,
  },
  noResults: {
    marginTop: 8,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 14,
  },
  selectedBookSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  selectedBookContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  selectedBookInfo: {
    flex: 1,
  },
  selectedBookTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  selectedBookAuthor: {
    fontSize: 16,
    marginBottom: 8,
  },
  selectedBookDetails: {
    fontSize: 14,
  },
  statusSection: {
    marginBottom: 24,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  statusButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    width: '48%',
  },
  activeStatusButton: {
    borderWidth: 1,
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  progressInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressInput: {
    width: 80,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  progressInputLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  addButtonContainer: {
    marginTop: 8,
  },
});