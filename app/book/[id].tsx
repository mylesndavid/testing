import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Share2, BookOpen, CheckCheck, Clock, X, Edit3 } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useBooksStore } from '@/store/books-store';
import BookCover from '@/components/BookCover';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import StarRating from '@/components/StarRating';
import Button from '@/components/Button';
import { LinearGradient } from 'expo-linear-gradient';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useThemeStore();
  const { books, userBooks, updateReadingStatus, toggleWishlist, updateReadingProgress } = useBooksStore();
  
  const book = books.find(b => b.id === id);
  const userBook = userBooks.find(ub => ub.bookId === id);
  
  const [expandDescription, setExpandDescription] = useState(false);
  const [showUpdateProgress, setShowUpdateProgress] = useState(false);
  const [progress, setProgress] = useState(userBook?.currentPage || 0);
  
  if (!book) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Book not found</Text>
      </View>
    );
  }

  const handleStatusChange = (status: 'reading' | 'completed' | 'toRead' | 'dnf') => {
    if (userBook) {
      updateReadingStatus(userBook.id, status);
    }
  };

  const handleWishlistToggle = () => {
    if (userBook) {
      toggleWishlist(userBook.id);
    }
  };

  const handleUpdateProgress = () => {
    if (userBook) {
      updateReadingProgress(userBook.id, progress);
      setShowUpdateProgress(false);
    }
  };

  const handleWriteReview = () => {
    router.push(`/add-review?bookId=${book.id}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.coverContainer}>
            <BookCover book={book} size="large" />
          </View>
          
          <View style={styles.bookInfo}>
            <Text style={[styles.title, { color: colors.text }]}>{book.title}</Text>
            <Text style={[styles.author, { color: colors.secondaryText }]}>by {book.author}</Text>
            
            <View style={styles.ratingContainer}>
              <StarRating rating={book.averageRating} size={20} readonly />
              <Text style={[styles.ratingText, { color: colors.secondaryText }]}>
                {book.averageRating.toFixed(1)} ({book.ratingsCount} ratings)
              </Text>
            </View>
            
            <View style={styles.genresContainer}>
              {book.genres.map((genre, index) => (
                <View 
                  key={index} 
                  style={[styles.genreTag, { backgroundColor: colors.highlight }]}
                >
                  <Text style={[styles.genreText, { color: colors.text }]}>{genre}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.actionsContainer}>
              <Pressable 
                style={[styles.iconButton, { backgroundColor: colors.card }]}
                onPress={handleWishlistToggle}
              >
                <Heart 
                  size={20} 
                  color={userBook?.isWishlisted ? colors.primary : colors.text}
                  fill={userBook?.isWishlisted ? colors.primary : 'transparent'}
                />
              </Pressable>
              
              <Pressable 
                style={[styles.iconButton, { backgroundColor: colors.card }]}
                onPress={() => console.log('Share pressed')}
              >
                <Share2 size={20} color={colors.text} />
              </Pressable>
            </View>
          </View>
        </View>
        
        {userBook?.status === 'reading' && (
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Progress</Text>
              <Pressable onPress={() => setShowUpdateProgress(!showUpdateProgress)}>
                <Text style={[styles.updateText, { color: colors.primary }]}>
                  {showUpdateProgress ? 'Cancel' : 'Update'}
                </Text>
              </Pressable>
            </View>
            
            {showUpdateProgress ? (
              <View style={styles.updateProgressContainer}>
                <View style={styles.progressInputContainer}>
                  <Text style={[styles.progressInputLabel, { color: colors.secondaryText }]}>
                    Current page:
                  </Text>
                  <View style={[styles.progressInput, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Text style={[styles.progressInputText, { color: colors.text }]}>
                      {progress}
                    </Text>
                  </View>
                  <Text style={[styles.progressInputTotal, { color: colors.secondaryText }]}>
                    / {book.pageCount}
                  </Text>
                </View>
                
                <View style={styles.progressSliderContainer}>
                  <LinearGradient
                    colors={['transparent', colors.card, 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.progressSliderTrack}
                  />
                  <View 
                    style={[
                      styles.progressSliderFill, 
                      { 
                        backgroundColor: colors.primary,
                        width: `${(progress / book.pageCount) * 100}%`
                      }
                    ]}
                  />
                  <View 
                    style={[
                      styles.progressSliderThumb, 
                      { 
                        backgroundColor: colors.primary,
                        left: `${(progress / book.pageCount) * 100}%`
                      }
                    ]}
                  />
                </View>
                
                <View style={styles.progressActions}>
                  <Button
                    title="Save Progress"
                    onPress={handleUpdateProgress}
                    variant="primary"
                    size="small"
                  />
                </View>
              </View>
            ) : (
              <ReadingProgressBar 
                userBook={userBook} 
                book={book} 
                showPercentage 
                showPages
                height={10}
              />
            )}
          </View>
        )}
        
        <View style={styles.statusSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Reading Status</Text>
          
          <View style={styles.statusButtons}>
            <Pressable 
              style={[
                styles.statusButton, 
                userBook?.status === 'reading' && [styles.activeStatusButton, { borderColor: colors.primary }],
                { backgroundColor: colors.card }
              ]}
              onPress={() => handleStatusChange('reading')}
            >
              <BookOpen 
                size={18} 
                color={userBook?.status === 'reading' ? colors.primary : colors.secondaryText} 
              />
              <Text 
                style={[
                  styles.statusButtonText, 
                  { color: userBook?.status === 'reading' ? colors.primary : colors.secondaryText }
                ]}
              >
                Reading
              </Text>
            </Pressable>
            
            <Pressable 
              style={[
                styles.statusButton, 
                userBook?.status === 'completed' && [styles.activeStatusButton, { borderColor: colors.primary }],
                { backgroundColor: colors.card }
              ]}
              onPress={() => handleStatusChange('completed')}
            >
              <CheckCheck 
                size={18} 
                color={userBook?.status === 'completed' ? colors.primary : colors.secondaryText} 
              />
              <Text 
                style={[
                  styles.statusButtonText, 
                  { color: userBook?.status === 'completed' ? colors.primary : colors.secondaryText }
                ]}
              >
                Completed
              </Text>
            </Pressable>
            
            <Pressable 
              style={[
                styles.statusButton, 
                userBook?.status === 'toRead' && [styles.activeStatusButton, { borderColor: colors.primary }],
                { backgroundColor: colors.card }
              ]}
              onPress={() => handleStatusChange('toRead')}
            >
              <Clock 
                size={18} 
                color={userBook?.status === 'toRead' ? colors.primary : colors.secondaryText} 
              />
              <Text 
                style={[
                  styles.statusButtonText, 
                  { color: userBook?.status === 'toRead' ? colors.primary : colors.secondaryText }
                ]}
              >
                To Read
              </Text>
            </Pressable>
            
            <Pressable 
              style={[
                styles.statusButton, 
                userBook?.status === 'dnf' && [styles.activeStatusButton, { borderColor: colors.primary }],
                { backgroundColor: colors.card }
              ]}
              onPress={() => handleStatusChange('dnf')}
            >
              <X 
                size={18} 
                color={userBook?.status === 'dnf' ? colors.primary : colors.secondaryText} 
              />
              <Text 
                style={[
                  styles.statusButtonText, 
                  { color: userBook?.status === 'dnf' ? colors.primary : colors.secondaryText }
                ]}
              >
                DNF
              </Text>
            </Pressable>
          </View>
        </View>
        
        <View style={styles.descriptionSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
          
          <Text 
            style={[styles.description, { color: colors.text }]}
            numberOfLines={expandDescription ? undefined : 5}
          >
            {book.description}
          </Text>
          
          {book.description.length > 150 && (
            <Pressable onPress={() => setExpandDescription(!expandDescription)}>
              <Text style={[styles.expandText, { color: colors.primary }]}>
                {expandDescription ? 'Show less' : 'Show more'}
              </Text>
            </Pressable>
          )}
        </View>
        
        <View style={styles.detailsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Book Details</Text>
          
          <View style={[styles.detailsContainer, { backgroundColor: colors.card }]}>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>Published</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {new Date(book.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </Text>
            </View>
            
            <View style={[styles.detailDivider, { backgroundColor: colors.border }]} />
            
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>Pages</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>{book.pageCount}</Text>
            </View>
            
            <View style={[styles.detailDivider, { backgroundColor: colors.border }]} />
            
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>Genres</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>{book.genres.join(', ')}</Text>
            </View>
          </View>
        </View>
        
        {userBook?.review ? (
          <View style={styles.reviewSection}>
            <View style={styles.reviewHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Review</Text>
              <Pressable onPress={handleWriteReview}>
                <Edit3 size={18} color={colors.primary} />
              </Pressable>
            </View>
            
            <View style={[styles.reviewContainer, { backgroundColor: colors.card }]}>
              <StarRating rating={userBook.rating || 0} size={20} readonly />
              
              {userBook.review.containsSpoilers && (
                <View style={[styles.spoilerTag, { backgroundColor: colors.error }]}>
                  <Text style={styles.spoilerText}>Contains Spoilers</Text>
                </View>
              )}
              
              <Text style={[styles.reviewText, { color: colors.text }]}>
                {userBook.review.text}
              </Text>
              
              <Text style={[styles.reviewDate, { color: colors.secondaryText }]}>
                {new Date(userBook.review.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </Text>
            </View>
          </View>
        ) : (
          userBook?.status === 'completed' && (
            <View style={styles.addReviewSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Add Your Review</Text>
              <Button
                title="Write a Review"
                onPress={handleWriteReview}
                variant="primary"
                icon={<Edit3 size={18} color="white" />}
                iconPosition="left"
              />
            </View>
          )
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
  header: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  coverContainer: {
    marginRight: 16,
  },
  bookInfo: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 8,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  genreTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  updateText: {
    fontSize: 14,
    fontWeight: '600',
  },
  updateProgressContainer: {
    marginBottom: 8,
  },
  progressInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressInputLabel: {
    fontSize: 14,
    marginRight: 8,
  },
  progressInput: {
    width: 60,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressInputText: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressInputTotal: {
    fontSize: 14,
    marginLeft: 8,
  },
  progressSliderContainer: {
    height: 30,
    justifyContent: 'center',
    marginBottom: 16,
  },
  progressSliderTrack: {
    height: 4,
    borderRadius: 2,
    width: '100%',
  },
  progressSliderFill: {
    height: 4,
    borderRadius: 2,
    position: 'absolute',
  },
  progressSliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 5,
    marginLeft: -10,
  },
  progressActions: {
    alignItems: 'flex-end',
  },
  statusSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
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
  descriptionSection: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  expandText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  detailsSection: {
    marginBottom: 24,
  },
  detailsContainer: {
    borderRadius: 12,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailDivider: {
    height: 1,
    width: '100%',
  },
  reviewSection: {
    marginBottom: 24,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewContainer: {
    borderRadius: 12,
    padding: 16,
  },
  spoilerTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginVertical: 8,
  },
  spoilerText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  reviewText: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 8,
  },
  reviewDate: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'right',
  },
  addReviewSection: {
    marginBottom: 24,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
  },
});