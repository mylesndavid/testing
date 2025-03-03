import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Plus, Award } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useChallengesStore } from '@/store/challenges-store';
import ChallengeCard from '@/components/ChallengeCard';
import EventCard from '@/components/EventCard';
import BadgeItem from '@/components/BadgeItem';
import Button from '@/components/Button';

export default function ChallengesScreen() {
  const router = useRouter();
  const { colors } = useThemeStore();
  const { challenges, badges, events, joinEvent, leaveEvent } = useChallengesStore();
  const [activeTab, setActiveTab] = useState<'challenges' | 'events' | 'badges'>('challenges');

  const handleChallengePress = (challengeId: string) => {
    // Navigate to challenge details
    console.log('Challenge pressed:', challengeId);
  };

  const handleEventPress = (eventId: string) => {
    // Navigate to event details
    console.log('Event pressed:', eventId);
  };

  const handleParticipatePress = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      if (event.isParticipating) {
        leaveEvent(eventId);
      } else {
        joinEvent(eventId);
      }
    }
  };

  const handleCreateChallenge = () => {
    router.push('/create-challenge');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'challenges':
        return (
          <>
            {challenges.length > 0 ? (
              <FlatList
                data={challenges}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ChallengeCard
                    challenge={item}
                    onPress={() => handleChallengePress(item.id)}
                  />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.emptyState}>
                <Text style={[styles.emptyStateText, { color: colors.secondaryText }]}>
                  You don't have any reading challenges yet.
                </Text>
                <Button
                  title="Create a Challenge"
                  onPress={handleCreateChallenge}
                  variant="primary"
                  icon={<Plus size={16} color="white" />}
                  iconPosition="left"
                  style={styles.createButton}
                />
              </View>
            )}
          </>
        );
      
      case 'events':
        return (
          <>
            {events.length > 0 ? (
              <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <EventCard
                    event={item}
                    onPress={() => handleEventPress(item.id)}
                    onParticipatePress={() => handleParticipatePress(item.id)}
                  />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.emptyState}>
                <Text style={[styles.emptyStateText, { color: colors.secondaryText }]}>
                  There are no reading events right now.
                </Text>
              </View>
            )}
          </>
        );
      
      case 'badges':
        return (
          <>
            <View style={styles.badgesHeader}>
              <Text style={[styles.badgesTitle, { color: colors.text }]}>
                Your Badges
              </Text>
              <Text style={[styles.badgesSubtitle, { color: colors.secondaryText }]}>
                {badges.filter(b => b.isUnlocked).length} of {badges.length} unlocked
              </Text>
            </View>
            
            <ScrollView 
              contentContainerStyle={styles.badgesList}
              showsVerticalScrollIndicator={false}
            >
              {badges.map(badge => (
                <BadgeItem key={badge.id} badge={badge} />
              ))}
            </ScrollView>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Challenges</Text>
        {activeTab === 'challenges' && (
          <Pressable 
            style={[styles.iconButton, { backgroundColor: colors.card }]}
            onPress={handleCreateChallenge}
          >
            <Plus size={20} color={colors.text} />
          </Pressable>
        )}
      </View>

      <View style={styles.tabsContainer}>
        <Pressable 
          style={[
            styles.tab, 
            activeTab === 'challenges' && [styles.activeTab, { borderColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('challenges')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'challenges' ? colors.primary : colors.secondaryText }
            ]}
          >
            Challenges
          </Text>
        </Pressable>
        
        <Pressable 
          style={[
            styles.tab, 
            activeTab === 'events' && [styles.activeTab, { borderColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('events')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'events' ? colors.primary : colors.secondaryText }
            ]}
          >
            Events
          </Text>
        </Pressable>
        
        <Pressable 
          style={[
            styles.tab, 
            activeTab === 'badges' && [styles.activeTab, { borderColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('badges')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'badges' ? colors.primary : colors.secondaryText }
            ]}
          >
            Badges
          </Text>
        </Pressable>
      </View>

      {renderContent()}
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
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  listContent: {
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
  badgesHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  badgesTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  badgesSubtitle: {
    fontSize: 14,
  },
  badgesList: {
    padding: 16,
    paddingTop: 0,
  },
});