import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, Bell } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useSocialStore } from '@/store/social-store';
import { useUserStore } from '@/store/user-store';
import FeedCard from '@/components/FeedCard';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useThemeStore();
  const { feed, toggleLike } = useSocialStore();
  const { user } = useUserStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // In a real app, we would fetch new data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleFeedItemPress = (itemId: string) => {
    // Navigate to the appropriate screen based on the feed item type
    console.log('Feed item pressed:', itemId);
  };

  const handleLikePress = (itemId: string) => {
    toggleLike(itemId);
  };

  const handleCommentPress = (itemId: string) => {
    // Navigate to comments screen or open comments modal
    console.log('Comment pressed:', itemId);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text }]}>
          Hello, {user?.name.split(' ')[0] || 'Reader'}
        </Text>
        <View style={styles.headerActions}>
          <Pressable 
            style={[styles.iconButton, { backgroundColor: colors.card }]}
            onPress={() => console.log('Search pressed')}
          >
            <Search size={20} color={colors.text} />
          </Pressable>
          <Pressable 
            style={[styles.iconButton, { backgroundColor: colors.card }]}
            onPress={() => console.log('Notifications pressed')}
          >
            <Bell size={20} color={colors.text} />
          </Pressable>
        </View>
      </View>

      <FlatList
        data={feed}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeedCard
            item={item}
            onPress={() => handleFeedItemPress(item.id)}
            onLikePress={() => handleLikePress(item.id)}
            onCommentPress={() => handleCommentPress(item.id)}
          />
        )}
        contentContainerStyle={styles.feedContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      />
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
  greeting: {
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
  feedContainer: {
    padding: 16,
    paddingTop: 0,
  },
});