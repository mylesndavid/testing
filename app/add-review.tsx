import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useThemeStore } from '@/store/theme-store';
import { useBooksStore } from '@/store/books-store';
import StarRating from '@/components/StarRating';
import Button from '@/components/Button';
import BookCover from '@/components/BookCover';

export default function AddReviewScreen() {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const router = useRouter();
  const { colors } = useThemeStore();
  const { books, userBooks, addReview } = useBooksStore();
  
  const book = books.find(b => b.id === bookId);
  const userBook = userBooks.find(ub => ub.bookId === bookId);
  
  const [rating, setRating] = useState(userBook?.rating || 0);
  const [reviewText, setReviewText] = useState(userBook?.review?.text || '');
  const [containsSpoilers, setContainsSpoilers] = useState(userBook?.review?.containsSpoilers || false);
  
  if (!book || !userBook) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Book not found</Text>
      </View>
    );
  }

  const handleSubmit = () => {
    if (userBook) {
      addReview(userBook.id, reviewText, rating, containsSpoilers);
      router.back();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bookSection}>
          <View style={styles.bookContainer}>
            <BookCover book={book} size="small" />
            <View style={styles.bookInfo}>
              <Text style={[styles.bookTitle, { color: colors.text }]}>
                {book.title}
              </Text>
              <Text style={[styles.bookAuthor, { color: colors.secondaryText }]}>
                by {book.author}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.ratingSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Rating</Text>
          <View style={styles.ratingContainer}>
            <StarRating 
              rating={rating} 
              onRatingChange={setRating} 
              size={36}
            />
          </View>
        </View>
        
        <View style={styles.reviewSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Review</Text>
          <TextInput
            style={[
              styles.reviewInput, 
              { 
                backgroundColor: colors.card, 
                color: colors.text,
                borderColor: colors.border,
              }
            ]}
            placeholder="Write your review here..."
            placeholderTextColor={colors.secondaryText}
            value={reviewText}
            onChangeText={setReviewText}
            multiline
            textAlignVertical="top"
          />
        </View>
        
        <View style={styles.spoilersSection}>
          <View style={styles.spoilersContainer}>
            <Text style={[styles.spoilersText, { color: colors.text }]}>
              Contains spoilers
            </Text>
            <Switch
              value={containsSpoilers}
              onValueChange={setContainsSpoilers}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="white"
            />
          </View>
          {containsSpoilers && (
            <Text style={[styles.spoilersWarning, { color: colors.secondaryText }]}>
              Your review will be marked as containing spoilers and will be hidden by default.
            </Text>
          )}
        </View>
        
        <View style={styles.submitSection}>
          <Button
            title="Submit Review"
            onPress={handleSubmit}
            variant="primary"
            disabled={rating === 0 || reviewText.trim().length === 0}
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
  bookSection: {
    marginBottom: 24,
  },
  bookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookInfo: {
    flex: 1,
    marginLeft: 16,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 16,
  },
  ratingSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  reviewSection: {
    marginBottom: 24,
  },
  reviewInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 150,
  },
  spoilersSection: {
    marginBottom: 24,
  },
  spoilersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  spoilersText: {
    fontSize: 16,
  },
  spoilersWarning: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  submitSection: {
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
  },
});