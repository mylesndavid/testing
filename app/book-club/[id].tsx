import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, MessageCircle, Plus, ChevronRight } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useSocialStore } from '@/store/social-store';
import BookCover from '@/components/BookCover';
import Button from '@/components/Button';

export default function BookClubDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useThemeStore();
  const { bookClubs, discussions, joinedBookClubs, joinBookClub, leaveBookClub } = useSocialStore();
  
  const bookClub = bookClubs.find(club => club.id === id);
  const clubDiscussions = discussions.filter(discussion => discussion.bookClubId === id);
  
  const [activeTab, setActiveTab] = useState<'discussions' | 'members' | 'books'>('discussions');
  
  if (!bookClub) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Book club not found</Text>
      </View>
    );
  }

  const isJoined = joinedBookClubs.includes(bookClub.id);

  const handleJoinPress = () => {
    if (isJoined) {
      leaveBookClub(bookClub.id);
    } else {
      joinBookClub(bookClub.id);
    }
  };

  const handleDiscussionPress = (discussionId: string) => {
    // Navigate to discussion details
    console.log('Discussion pressed:', discussionId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          {bookClub.coverImage && (
            <Image 
              source={{ uri: bookClub.coverImage }} 
              style={styles.coverImage}
            />
          )}
          
          <View style={styles.overlay} />
          
          <View style={styles.headerContent}>
            <Text style={styles.name}>{bookClub.name}</Text>
            
            <View style={styles.memberCount}>
              <Users size={16} color="white" />
              <Text style={styles.memberCountText}>
                {bookClub.memberCount} members
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.descriptionSection}>
          <Text style={[styles.description, { color: colors.text }]}>
            {bookClub.description}
          </Text>
          
          <Button
            title={isJoined ? "Leave Club" : "Join Club"}
            onPress={handleJoinPress}
            variant={isJoined ? "outline" : "primary"}
            style={styles.joinButton}
          />
        </View>
        
        {bookClub.currentBook && (
          <View style={styles.currentBookSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Currently Reading</Text>
            
            <View style={[styles.currentBookContainer, { backgroundColor: colors.card }]}>
              <BookCover book={bookClub.currentBook} size="medium" />
              
              <View style={styles.currentBookInfo}>
                <Text style={[styles.currentBookTitle, { color: colors.text }]}>
                  {bookClub.currentBook.title}
                </Text>
                
                <Text style={[styles.currentBookAuthor, { color: colors.secondaryText }]}>
                  by {bookClub.currentBook.author}
                </Text>
                
                <Button
                  title="View Book"
                  onPress={() => router.push(`/book/${bookClub.currentBook?.id}`)}
                  variant="outline"
                  size="small"
                  style={styles.viewBookButton}
                />
              </View>
            </View>
          </View>
        )}
        
        <View style={styles.tabsContainer}>
          <Pressable 
            style={[
              styles.tab, 
              activeTab === 'discussions' && [styles.activeTab, { borderColor: colors.primary }]
            ]}
            onPress={() => setActiveTab('discussions')}
          >
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'discussions' ? colors.primary : colors.secondaryText }
              ]}
            >
              Discussions
            </Text>
          </Pressable>
          
          <Pressable 
            style={[
              styles.tab, 
              activeTab === 'members' && [styles.activeTab, { borderColor: colors.primary }]
            ]}
            onPress={() => setActiveTab('members')}
          >
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'members' ? colors.primary : colors.secondaryText }
              ]}
            >
              Members
            </Text>
          </Pressable>
          
          <Pressable 
            style={[
              styles.tab, 
              activeTab === 'books' && [styles.activeTab, { borderColor: colors.primary }]
            ]}
            onPress={() => setActiveTab('books')}
          >
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'books' ? colors.primary : colors.secondaryText }
              ]}
            >
              Books
            </Text>
          </Pressable>
        </View>
        
        {activeTab === 'discussions' && (
          <View style={styles.discussionsSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Discussions</Text>
              
              {isJoined && (
                <Pressable 
                  style={[styles.addButton, { backgroundColor: colors.card }]}
                  onPress={() => console.log('Add discussion')}
                >
                  <Plus size={20} color={colors.text} />
                </Pressable>
              )}
            </View>
            
            {clubDiscussions.length > 0 ? (
              clubDiscussions.map(discussion => (
                <Pressable 
                  key={discussion.id}
                  style={[styles.discussionItem, { backgroundColor: colors.card }]}
                  onPress={() => handleDiscussionPress(discussion.id)}
                >
                  <View style={styles.discussionHeader}>
                    <Text style={[styles.discussionTitle, { color: colors.text }]}>
                      {discussion.title}
                    </Text>
                    <ChevronRight size={20} color={colors.secondaryText} />
                  </View>
                  
                  <Text 
                    style={[styles.discussionContent, { color: colors.secondaryText }]}
                    numberOfLines={2}
                  >
                    {discussion.content}
                  </Text>
                  
                  <View style={styles.discussionFooter}>
                    <Text style={[styles.discussionDate, { color: colors.secondaryText }]}>
                      {formatDate(discussion.createdAt)}
                    </Text>
                    
                    <View style={styles.discussionStats}>
                      <View style={styles.discussionStat}>
                        <MessageCircle size={14} color={colors.secondaryText} />
                        <Text style={[styles.discussionStatText, { color: colors.secondaryText }]}>
                          {discussion.commentsCount}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={[styles.emptyStateText, { color: colors.secondaryText }]}>
                  No discussions yet.
                </Text>
                {isJoined && (
                  <Button
                    title="Start a Discussion"
                    onPress={() => console.log('Start discussion')}
                    variant="primary"
                    icon={<Plus size={16} color="white" />}
                    iconPosition="left"
                    style={styles.emptyStateButton}
                  />
                )}
              </View>
            )}
          </View>
        )}
        
        {activeTab === 'members' && (
          <View style={styles.membersSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Members</Text>
            
            <Text style={[styles.memberCountText, { color: colors.secondaryText }]}>
              {bookClub.memberCount} members in this club
            </Text>
            
            {/* In a real app, we would fetch and display the members here */}
            <View style={styles.emptyState}>
              <Text style={[styles.emptyStateText, { color: colors.secondaryText }]}>
                Member list not available in this demo.
              </Text>
            </View>
          </View>
        )}
        
        {activeTab === 'books' && (
          <View style={styles.booksSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Reading History</Text>
            
            {bookClub.upcomingBooks && bookClub.upcomingBooks.length > 0 && (
              <View style={styles.upcomingBooksSection}>
                <Text style={[styles.subsectionTitle, { color: colors.text }]}>Upcoming Books</Text>
                
                {bookClub.upcomingBooks.map(book => (
                  <Pressable 
                    key={book.id}
                    style={[styles.bookItem, { backgroundColor: colors.card }]}
                    onPress={() => router.push(`/book/${book.id}`)}
                  >
                    <BookCover book={book} size="small" />
                    
                    <View style={styles.bookItemInfo}>
                      <Text style={[styles.bookItemTitle, { color: colors.text }]}>
                        {book.title}
                      </Text>
                      
                      <Text style={[styles.bookItemAuthor, { color: colors.secondaryText }]}>
                        by {book.author}
                      </Text>
                    </View>
                    
                    <ChevronRight size={20} color={colors.secondaryText} />
                  </Pressable>
                ))}
              </View>
            )}
            
            {/* In a real app, we would fetch and display past books here */}
            <View style={styles.pastBooksSection}>
              <Text style={[styles.subsectionTitle, { color: colors.text }]}>Past Books</Text>
              
              <View style={styles.emptyState}>
                <Text style={[styles.emptyStateText, { color: colors.secondaryText }]}>
                  No past books available in this demo.
                </Text>
              </View>
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
    paddingBottom: 24,
  },
  header: {
    height: 200,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  name: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  memberCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCountText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 6,
  },
  descriptionSection: {
    padding: 16,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  joinButton: {
    alignSelf: 'flex-start',
  },
  currentBookSection: {
    padding: 16,
    paddingTop: 0,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  currentBookContainer: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
  },
  currentBookInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  currentBookTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  currentBookAuthor: {
    fontSize: 14,
    marginBottom: 12,
  },
  viewBookButton: {
    alignSelf: 'flex-start',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  discussionsSection: {
    padding: 16,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discussionItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  discussionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  discussionTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  discussionContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  discussionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discussionDate: {
    fontSize: 12,
  },
  discussionStats: {
    flexDirection: 'row',
  },
  discussionStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  discussionStatText: {
    fontSize: 12,
    marginLeft: 4,
  },
  emptyState: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyStateButton: {
    marginTop: 8,
  },
  membersSection: {
    padding: 16,
    paddingTop: 0,
  },
  booksSection: {
    padding: 16,
    paddingTop: 0,
  },
  upcomingBooksSection: {
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
  bookItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  bookItemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  bookItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookItemAuthor: {
    fontSize: 14,
  },
  pastBooksSection: {
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
  },
});