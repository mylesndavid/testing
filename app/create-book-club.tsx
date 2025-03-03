import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, X, Image as ImageIcon, Lock, Globe } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useSocialStore } from '@/store/social-store';
import { useBooksStore } from '@/store/books-store';
import { BookClub } from '@/types';
import Button from '@/components/Button';
import BookCover from '@/components/BookCover';

export default function CreateBookClubScreen() {
  const router = useRouter();
  const { colors } = useThemeStore();
  const { bookClubs, joinedBookClubs } = useSocialStore();
  const { books } = useBooksStore();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1529148482759-b35b25c5f217?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  
  // Filter books based on search query
  const filteredBooks = searchQuery.length > 0
    ? books.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  const selectedBook = selectedBookId ? books.find(book => book.id === selectedBookId) : null;
  
  const isFormValid = name.trim().length > 0 && 
                      description.trim().length > 0 && 
                      coverImage.trim().length > 0 &&
                      selectedBookId;
  
  const handleBookSelect = (bookId: string) => {
    setSelectedBookId(bookId);
    setSearchQuery('');
  };
  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  const handleCreateBookClub = () => {
    if (!isFormValid || !selectedBook) return;
    
    const newBookClub: BookClub = {
      id: `club-${Date.now()}`,
      name,
      description,
      coverImage,
      memberCount: 1, // Starting with the creator
      currentBook: selectedBook,
      isPrivate,
      createdBy: 'user1', // Current user ID
      createdAt: new Date().toISOString(),
    };
    
    // In a real app, we would add this to the store
    console.log('Creating book club:', newBookClub);
    
    router.back();
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formSection}>
          <Text style={[styles.label, { color: colors.text }]}>Club Name</Text>
          <TextInput
            style={[
              styles.input, 
              { 
                backgroundColor: colors.card, 
                color: colors.text,
                borderColor: colors.border,
              }
            ]}
            placeholder="e.g., Literary Ladies"
            placeholderTextColor={colors.secondaryText}
            value={name}
            onChangeText={setName}
          />
        </View>
        
        <View style={styles.formSection}>
          <Text style={[styles.label, { color: colors.text }]}>Description</Text>
          <TextInput
            style={[
              styles.textArea, 
              { 
                backgroundColor: colors.card, 
                color: colors.text,
                borderColor: colors.border,
              }
            ]}
            placeholder="Describe your book club..."
            placeholderTextColor={colors.secondaryText}
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>
        
        <View style={styles.formSection}>
          <Text style={[styles.label, { color: colors.text }]}>Cover Image URL</Text>
          <View style={[
            styles.imageInput, 
            { 
              backgroundColor: colors.card, 
              borderColor: colors.border,
            }
          ]}>
            <ImageIcon size={18} color={colors.secondaryText} />
            <TextInput
              style={[styles.imageTextInput, { color: colors.text }]}
              placeholder="Enter image URL"
              placeholderTextColor={colors.secondaryText}
              value={coverImage}
              onChangeText={setCoverImage}
            />
          </View>
        </View>
        
        <View style={styles.privacySection}>
          <Text style={[styles.label, { color: colors.text }]}>Privacy</Text>
          
          <View style={styles.privacyOptions}>
            <Pressable 
              style={[
                styles.privacyOption, 
                !isPrivate && [styles.activePrivacyOption, { borderColor: colors.primary }],
                { backgroundColor: colors.card }
              ]}
              onPress={() => setIsPrivate(false)}
            >
              <Globe 
                size={18} 
                color={!isPrivate ? colors.primary : colors.secondaryText} 
              />
              <Text 
                style={[
                  styles.privacyOptionText, 
                  { color: !isPrivate ? colors.primary : colors.secondaryText }
                ]}
              >
                Public
              </Text>
            </Pressable>
            
            <Pressable 
              style={[
                styles.privacyOption, 
                isPrivate && [styles.activePrivacyOption, { borderColor: colors.primary }],
                { backgroundColor: colors.card }
              ]}
              onPress={() => setIsPrivate(true)}
            >
              <Lock 
                size={18} 
                color={isPrivate ? colors.primary : colors.secondaryText} 
              />
              <Text 
                style={[
                  styles.privacyOptionText, 
                  { color: isPrivate ? colors.primary : colors.secondaryText }
                ]}
              >
                Private
              </Text>
            </Pressable>
          </View>
        </View>
        
        <View style={styles.bookSection}>
          <Text style={[styles.label, { color: colors.text }]}>Current Book</Text>
          
          <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Search size={20} color={colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search for a book"
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
                  onPress={() => handleBookSelect(book.id)}
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
          
          {selectedBook && (
            <View style={[styles.selectedBookContainer, { backgroundColor: colors.card }]}>
              <BookCover book={selectedBook} size="small" />
              <View style={styles.selectedBookInfo}>
                <Text style={[styles.selectedBookTitle, { color: colors.text }]}>
                  {selectedBook.title}
                </Text>
                <Text style={[styles.selectedBookAuthor, { color: colors.secondaryText }]}>
                  by {selectedBook.author}
                </Text>
              </View>
            </View>
          )}
        </View>
        
        <View style={styles.submitSection}>
          <Button
            title="Create Book Club"
            onPress={handleCreateBookClub}
            variant="primary"
            disabled={!isFormValid}
            fullWidth
          />
        </View>
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
  formSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },
  imageInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  imageTextInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  privacySection: {
    marginBottom: 20,
  },
  privacyOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    width: '48%',
  },
  activePrivacyOption: {
    borderWidth: 1,
  },
  privacyOptionText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  bookSection: {
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  searchResults: {
    marginBottom: 12,
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
  selectedBookContainer: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
  },
  selectedBookInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  selectedBookTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  selectedBookAuthor: {
    fontSize: 14,
  },
  submitSection: {
    marginTop: 10,
    marginBottom: 16,
  },
});