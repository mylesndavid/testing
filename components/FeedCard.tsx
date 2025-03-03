import React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { Heart, MessageCircle, BookOpen, Award, Users } from 'lucide-react-native';
import { FeedItem } from '@/types';
import { useThemeStore } from '@/store/theme-store';
import BookCover from './BookCover';
import StarRating from './StarRating';
import ReadingProgressBar from './ReadingProgressBar';
import { useBooksStore } from '@/store/books-store';

type FeedCardProps = {
  item: FeedItem;
  onPress?: () => void;
  onLikePress?: () => void;
  onCommentPress?: () => void;
};

export default function FeedCard({
  item,
  onPress,
  onLikePress,
  onCommentPress,
}: FeedCardProps) {
  const { colors } = useThemeStore();
  const { books } = useBooksStore();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const renderFeedContent = () => {
    switch (item.type) {
      case 'review':
        return (
          <View>
            {item.content.text && (
              <Text style={[styles.contentText, { color: colors.text }]}>
                {item.content.text}
              </Text>
            )}
            
            {item.content.book && (
              <View style={styles.bookContainer}>
                <BookCover book={item.content.book} size="small" />
                <View style={styles.bookDetails}>
                  <Text style={[styles.bookTitle, { color: colors.text }]}>
                    {item.content.book.title}
                  </Text>
                  <Text style={[styles.bookAuthor, { color: colors.secondaryText }]}>
                    {item.content.book.author}
                  </Text>
                  {item.content.rating && (
                    <StarRating rating={item.content.rating} size={16} readonly />
                  )}
                </View>
              </View>
            )}
          </View>
        );
        
      case 'progress':
        if (item.content.book) {
          const userBook = {
            id: 'temp',
            bookId: item.content.book.id,
            userId: item.userId,
            status: 'reading' as const,
            currentPage: Math.round((item.content.progress || 0) * item.content.book.pageCount / 100),
          };
          
          return (
            <View>
              {item.content.text && (
                <Text style={[styles.contentText, { color: colors.text }]}>
                  {item.content.text}
                </Text>
              )}
              
              <View style={styles.bookContainer}>
                <BookCover book={item.content.book} size="small" />
                <View style={styles.bookDetails}>
                  <Text style={[styles.bookTitle, { color: colors.text }]}>
                    {item.content.book.title}
                  </Text>
                  <Text style={[styles.bookAuthor, { color: colors.secondaryText }]}>
                    {item.content.book.author}
                  </Text>
                  <View style={styles.progressContainer}>
                    <ReadingProgressBar 
                      userBook={userBook} 
                      book={item.content.book} 
                      showPercentage 
                      height={6}
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        }
        return null;
        
      case 'challenge':
        return (
          <View>
            {item.content.text && (
              <Text style={[styles.contentText, { color: colors.text }]}>
                {item.content.text}
              </Text>
            )}
            
            {item.content.challenge && (
              <View style={[styles.challengeContainer, { backgroundColor: colors.highlight }]}>
                <BookOpen size={20} color={colors.primary} />
                <View style={styles.challengeDetails}>
                  <Text style={[styles.challengeTitle, { color: colors.text }]}>
                    {item.content.challenge.title}
                  </Text>
                  <Text style={[styles.challengeDescription, { color: colors.secondaryText }]}>
                    {item.content.challenge.description}
                  </Text>
                  <View style={styles.challengeProgress}>
                    <View 
                      style={[
                        styles.progressBar, 
                        { backgroundColor: colors.border }
                      ]}
                    >
                      <View 
                        style={[
                          styles.progressFill, 
                          { 
                            backgroundColor: colors.primary,
                            width: `${(item.content.challenge.progress / item.content.challenge.target) * 100}%`
                          }
                        ]}
                      />
                    </View>
                    <Text style={[styles.progressText, { color: colors.secondaryText }]}>
                      {item.content.challenge.progress} / {item.content.challenge.target}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        );
        
      case 'badge':
        return (
          <View>
            {item.content.text && (
              <Text style={[styles.contentText, { color: colors.text }]}>
                {item.content.text}
              </Text>
            )}
            
            {item.content.badge && (
              <View style={[styles.badgeContainer, { backgroundColor: colors.highlight }]}>
                <Text style={styles.badgeIcon}>{item.content.badge.icon}</Text>
                <View style={styles.badgeDetails}>
                  <Text style={[styles.badgeTitle, { color: colors.text }]}>
                    {item.content.badge.title}
                  </Text>
                  <Text style={[styles.badgeDescription, { color: colors.secondaryText }]}>
                    {item.content.badge.description}
                  </Text>
                </View>
              </View>
            )}
          </View>
        );
        
      case 'club':
        return (
          <View>
            {item.content.text && (
              <Text style={[styles.contentText, { color: colors.text }]}>
                {item.content.text}
              </Text>
            )}
            
            {item.content.club && (
              <View style={[styles.clubContainer, { backgroundColor: colors.highlight }]}>
                {item.content.club.coverImage && (
                  <Image 
                    source={{ uri: item.content.club.coverImage }} 
                    style={styles.clubImage}
                  />
                )}
                <View style={styles.clubDetails}>
                  <Text style={[styles.clubTitle, { color: colors.text }]}>
                    {item.content.club.name}
                  </Text>
                  <Text style={[styles.clubDescription, { color: colors.secondaryText }]}>
                    {item.content.club.description}
                  </Text>
                  <View style={styles.clubStats}>
                    <Users size={14} color={colors.secondaryText} />
                    <Text style={[styles.clubMembers, { color: colors.secondaryText }]}>
                      {item.content.club.memberCount} members
                    </Text>
                  </View>
                </View>
              </View>
            )}
            
            {item.content.book && (
              <View style={styles.bookContainer}>
                <BookCover book={item.content.book} size="small" />
                <View style={styles.bookDetails}>
                  <Text style={[styles.bookTitle, { color: colors.text }]}>
                    {item.content.book.title}
                  </Text>
                  <Text style={[styles.bookAuthor, { color: colors.secondaryText }]}>
                    {item.content.book.author}
                  </Text>
                </View>
              </View>
            )}
          </View>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Pressable 
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.userInfo}>
          {item.userImage ? (
            <Image source={{ uri: item.userImage }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>
                {item.username.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          
          <View>
            <Text style={[styles.username, { color: colors.text }]}>
              {item.username}
            </Text>
            <Text style={[styles.timestamp, { color: colors.secondaryText }]}>
              {formatDate(item.timestamp)}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        {renderFeedContent()}
      </View>
      
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Pressable 
          style={styles.actionButton}
          onPress={onLikePress}
        >
          <Heart 
            size={20} 
            color={item.isLiked ? colors.primary : colors.secondaryText}
            fill={item.isLiked ? colors.primary : 'transparent'}
          />
          <Text 
            style={[
              styles.actionText, 
              { color: item.isLiked ? colors.primary : colors.secondaryText }
            ]}
          >
            {item.likesCount}
          </Text>
        </Pressable>
        
        <Pressable 
          style={styles.actionButton}
          onPress={onCommentPress}
        >
          <MessageCircle size={20} color={colors.secondaryText} />
          <Text style={[styles.actionText, { color: colors.secondaryText }]}>
            {item.commentsCount}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
  },
  content: {
    padding: 12,
    paddingTop: 0,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  bookContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  bookDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressContainer: {
    width: '100%',
  },
  challengeContainer: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  challengeDetails: {
    flex: 1,
    marginLeft: 12,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  challengeProgress: {
    width: '100%',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    width: '100%',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'right',
  },
  badgeContainer: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  badgeIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  badgeDetails: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 14,
  },
  clubContainer: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  clubImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  clubDetails: {
    flex: 1,
  },
  clubTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  clubDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  clubStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clubMembers: {
    fontSize: 12,
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    fontSize: 14,
    marginLeft: 6,
  },
});