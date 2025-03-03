import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Plus, Search } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useSocialStore } from '@/store/social-store';
import BookClubCard from '@/components/BookClubCard';
import Button from '@/components/Button';

export default function BookClubsScreen() {
  const router = useRouter();
  const { colors } = useThemeStore();
  const { bookClubs, joinedBookClubs, joinBookClub, leaveBookClub } = useSocialStore();
  const [activeTab, setActiveTab] = useState<'joined' | 'discover'>('joined');

  const filteredBookClubs = activeTab === 'joined'
    ? bookClubs.filter(club => joinedBookClubs.includes(club.id))
    : bookClubs;

  const handleBookClubPress = (clubId: string) => {
    router.push(`/book-club/${clubId}`);
  };

  const handleJoinPress = (clubId: string) => {
    const isJoined = joinedBookClubs.includes(clubId);
    if (isJoined) {
      leaveBookClub(clubId);
    } else {
      joinBookClub(clubId);
    }
  };

  const handleCreateBookClub = () => {
    router.push('/create-book-club');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Book Clubs</Text>
        <View style={styles.headerActions}>
          <Pressable 
            style={[styles.iconButton, { backgroundColor: colors.card }]}
            onPress={() => console.log('Search pressed')}
          >
            <Search size={20} color={colors.text} />
          </Pressable>
          <Pressable 
            style={[styles.iconButton, { backgroundColor: colors.card }]}
            onPress={handleCreateBookClub}
          >
            <Plus size={20} color={colors.text} />
          </Pressable>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <Pressable 
          style={[
            styles.tab, 
            activeTab === 'joined' && [styles.activeTab, { borderColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('joined')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'joined' ? colors.primary : colors.secondaryText }
            ]}
          >
            My Book Clubs
          </Text>
        </Pressable>
        
        <Pressable 
          style={[
            styles.tab, 
            activeTab === 'discover' && [styles.activeTab, { borderColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('discover')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'discover' ? colors.primary : colors.secondaryText }
            ]}
          >
            Discover
          </Text>
        </Pressable>
      </View>

      {filteredBookClubs.length > 0 ? (
        <FlatList
          data={filteredBookClubs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BookClubCard
              club={item}
              onPress={() => handleBookClubPress(item.id)}
              isJoined={joinedBookClubs.includes(item.id)}
              onJoinPress={() => handleJoinPress(item.id)}
            />
          )}
          contentContainerStyle={styles.bookClubsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateText, { color: colors.secondaryText }]}>
            {activeTab === 'joined' 
              ? "You haven't joined any book clubs yet." 
              : "No book clubs to discover right now."}
          </Text>
          {activeTab === 'joined' && (
            <Button
              title="Create a Book Club"
              onPress={handleCreateBookClub}
              variant="primary"
              icon={<Plus size={16} color="white" />}
              iconPosition="left"
              style={styles.createButton}
            />
          )}
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
  bookClubsList: {
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
  createButton: {
    marginTop: 8,
  },
});