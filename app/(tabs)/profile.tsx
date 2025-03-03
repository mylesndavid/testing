import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings, BookOpen, Users, Award, Calendar, Moon, Sun } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useUserStore } from '@/store/user-store';
import { useBooksStore } from '@/store/books-store';
import { useSocialStore } from '@/store/social-store';
import { useChallengesStore } from '@/store/challenges-store';
import Button from '@/components/Button';

export default function ProfileScreen() {
  const router = useRouter();
  const { colors, theme, setTheme, isDark } = useThemeStore();
  const { user } = useUserStore();
  const { userBooks } = useBooksStore();
  const { joinedBookClubs } = useSocialStore();
  const { badges } = useChallengesStore();
  
  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>User not found</Text>
      </View>
    );
  }

  const completedBooks = userBooks.filter(book => book.status === 'completed').length;
  const unlockedBadges = badges.filter(badge => badge.isUnlocked).length;
  
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const navigateToSettings = () => {
    router.push('/settings');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        <View style={styles.headerActions}>
          <Pressable 
            style={[styles.iconButton, { backgroundColor: colors.card }]}
            onPress={toggleTheme}
          >
            {isDark ? (
              <Sun size={20} color={colors.text} />
            ) : (
              <Moon size={20} color={colors.text} />
            )}
          </Pressable>
          <Pressable 
            style={[styles.iconButton, { backgroundColor: colors.card }]}
            onPress={navigateToSettings}
          >
            <Settings size={20} color={colors.text} />
          </Pressable>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          {user.profileImage ? (
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={[styles.profileImagePlaceholder, { backgroundColor: colors.primary }]}>
              <Text style={styles.profileImageText}>
                {user.name.charAt(0)}
              </Text>
            </View>
          )}
          
          <Text style={[styles.userName, { color: colors.text }]}>{user.name}</Text>
          <Text style={[styles.userUsername, { color: colors.secondaryText }]}>@{user.username}</Text>
          
          {user.bio && (
            <Text style={[styles.userBio, { color: colors.text }]}>{user.bio}</Text>
          )}
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>{user.booksRead}</Text>
              <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Books Read</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>{user.following}</Text>
              <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Following</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>{user.followers}</Text>
              <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Followers</Text>
            </View>
          </View>
          
          <Button
            title="Edit Profile"
            onPress={() => console.log('Edit profile')}
            variant="outline"
            size="small"
            style={styles.editButton}
          />
        </View>
        
        {user.favoriteQuote && (
          <View style={[styles.quoteContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.quoteText, { color: colors.text }]}>
              {user.favoriteQuote}
            </Text>
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Reading Activity</Text>
          
          <View style={[styles.activityContainer, { backgroundColor: colors.card }]}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIconContainer, { backgroundColor: colors.highlight }]}>
                <BookOpen size={20} color={colors.primary} />
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityValue, { color: colors.text }]}>{completedBooks}</Text>
                <Text style={[styles.activityLabel, { color: colors.secondaryText }]}>Books Completed</Text>
              </View>
            </View>
            
            <View style={[styles.activityDivider, { backgroundColor: colors.border }]} />
            
            <View style={styles.activityItem}>
              <View style={[styles.activityIconContainer, { backgroundColor: colors.highlight }]}>
                <Users size={20} color={colors.primary} />
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityValue, { color: colors.text }]}>{joinedBookClubs.length}</Text>
                <Text style={[styles.activityLabel, { color: colors.secondaryText }]}>Book Clubs</Text>
              </View>
            </View>
            
            <View style={[styles.activityDivider, { backgroundColor: colors.border }]} />
            
            <View style={styles.activityItem}>
              <View style={[styles.activityIconContainer, { backgroundColor: colors.highlight }]}>
                <Award size={20} color={colors.primary} />
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityValue, { color: colors.text }]}>{unlockedBadges}</Text>
                <Text style={[styles.activityLabel, { color: colors.secondaryText }]}>Badges Earned</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Reading Preferences</Text>
          
          {user.preferences?.favoriteGenres && user.preferences.favoriteGenres.length > 0 && (
            <View style={styles.genresContainer}>
              <Text style={[styles.genresTitle, { color: colors.secondaryText }]}>Favorite Genres</Text>
              <View style={styles.genresList}>
                {user.preferences.favoriteGenres.map((genre, index) => (
                  <View 
                    key={index} 
                    style={[styles.genreTag, { backgroundColor: colors.highlight }]}
                  >
                    <Text style={[styles.genreText, { color: colors.text }]}>{genre}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          <View style={[styles.joinDateContainer, { backgroundColor: colors.card }]}>
            <Calendar size={20} color={colors.secondaryText} />
            <Text style={[styles.joinDateText, { color: colors.secondaryText }]}>
              Joined {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </Text>
          </View>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userUsername: {
    fontSize: 16,
    marginBottom: 12,
  },
  userBio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  statDivider: {
    width: 1,
    height: '80%',
    alignSelf: 'center',
  },
  editButton: {
    marginTop: 8,
  },
  quoteContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  activityContainer: {
    borderRadius: 12,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityValue: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityLabel: {
    fontSize: 14,
  },
  activityDivider: {
    height: 1,
    width: '100%',
  },
  genresContainer: {
    marginBottom: 16,
  },
  genresTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  genresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontSize: 14,
    fontWeight: '500',
  },
  joinDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  joinDateText: {
    fontSize: 14,
    marginLeft: 8,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
  },
});