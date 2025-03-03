import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Book, UserBook } from '@/types';
import { useThemeStore } from '@/store/theme-store';
import BookCover from './BookCover';
import BookStatusBadge from './BookStatusBadge';
import ReadingProgressBar from './ReadingProgressBar';
import StarRating from './StarRating';

type BookCardProps = {
  book: Book;
  userBook?: UserBook;
  onPress?: () => void;
  showStatus?: boolean;
  showProgress?: boolean;
  showRating?: boolean;
};

export default function BookCard({
  book,
  userBook,
  onPress,
  showStatus = true,
  showProgress = true,
  showRating = true,
}: BookCardProps) {
  const { colors } = useThemeStore();
  
  return (
    <Pressable 
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <View style={styles.coverContainer}>
        <BookCover book={book} size="small" />
      </View>
      
      <View style={styles.detailsContainer}>
        <Text 
          style={[styles.title, { color: colors.text }]}
          numberOfLines={2}
        >
          {book.title}
        </Text>
        
        <Text 
          style={[styles.author, { color: colors.secondaryText }]}
          numberOfLines={1}
        >
          {book.author}
        </Text>
        
        {showRating && userBook?.rating && userBook.rating > 0 && (
          <View style={styles.ratingContainer}>
            <StarRating rating={userBook.rating} size={16} readonly />
          </View>
        )}
        
        {showStatus && userBook?.status && (
          <View style={styles.statusContainer}>
            <BookStatusBadge status={userBook.status} size="small" />
          </View>
        )}
        
        {showProgress && userBook?.status === 'reading' && (
          <View style={styles.progressContainer}>
            <ReadingProgressBar 
              userBook={userBook} 
              book={book} 
              showPercentage 
              showPages={false}
              height={6}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  coverContainer: {
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    marginBottom: 8,
  },
  ratingContainer: {
    marginBottom: 8,
  },
  statusContainer: {
    marginBottom: 8,
  },
  progressContainer: {
    width: '100%',
  },
});