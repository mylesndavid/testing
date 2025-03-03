import React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { Users } from 'lucide-react-native';
import { BookClub } from '@/types';
import { useThemeStore } from '@/store/theme-store';
import Button from './Button';

type BookClubCardProps = {
  club: BookClub;
  onPress?: () => void;
  isJoined?: boolean;
  onJoinPress?: () => void;
};

export default function BookClubCard({
  club,
  onPress,
  isJoined = false,
  onJoinPress,
}: BookClubCardProps) {
  const { colors } = useThemeStore();
  
  return (
    <Pressable 
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <View style={styles.header}>
        {club.coverImage && (
          <Image 
            source={{ uri: club.coverImage }} 
            style={styles.coverImage}
          />
        )}
        
        <View style={styles.overlay} />
        
        <View style={styles.headerContent}>
          <Text style={styles.name}>{club.name}</Text>
          
          <View style={styles.memberCount}>
            <Users size={16} color="white" />
            <Text style={styles.memberCountText}>
              {club.memberCount} members
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text 
          style={[styles.description, { color: colors.text }]}
          numberOfLines={2}
        >
          {club.description}
        </Text>
        
        {club.currentBook && (
          <View style={styles.currentBook}>
            <Text style={[styles.currentReadingLabel, { color: colors.secondaryText }]}>
              Currently reading:
            </Text>
            <Text 
              style={[styles.bookTitle, { color: colors.text }]}
              numberOfLines={1}
            >
              {club.currentBook.title}
            </Text>
          </View>
        )}
        
        <View style={styles.footer}>
          <Button
            title={isJoined ? "Joined" : "Join Club"}
            onPress={onJoinPress || (() => {})}
            variant={isJoined ? "outline" : "primary"}
            size="small"
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  header: {
    height: 120,
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
    padding: 12,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
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
  content: {
    padding: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  currentBook: {
    marginBottom: 16,
  },
  currentReadingLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});