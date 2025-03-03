import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { Book } from '@/types';
import { useThemeStore } from '@/store/theme-store';

type BookCoverProps = {
  book: Book;
  size?: 'small' | 'medium' | 'large';
  showTitle?: boolean;
  showAuthor?: boolean;
};

export default function BookCover({ 
  book, 
  size = 'medium', 
  showTitle = false,
  showAuthor = false
}: BookCoverProps) {
  const { colors } = useThemeStore();
  
  const getDimensions = () => {
    switch (size) {
      case 'small':
        return { width: 80, height: 120 };
      case 'large':
        return { width: 160, height: 240 };
      case 'medium':
      default:
        return { width: 120, height: 180 };
    }
  };

  const dimensions = getDimensions();

  return (
    <View style={styles.container}>
      <View style={[
        styles.coverContainer, 
        { 
          width: dimensions.width, 
          height: dimensions.height,
          backgroundColor: colors.card,
          borderColor: colors.border,
        }
      ]}>
        <Image
          source={{ uri: book.coverImage }}
          style={styles.cover}
          contentFit="cover"
          transition={200}
        />
      </View>
      
      {showTitle && (
        <Text 
          style={[styles.title, { color: colors.text }]} 
          numberOfLines={2}
        >
          {book.title}
        </Text>
      )}
      
      {showAuthor && (
        <Text 
          style={[styles.author, { color: colors.secondaryText }]} 
          numberOfLines={1}
        >
          {book.author}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  coverContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
    maxWidth: 120,
  },
  author: {
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
    maxWidth: 120,
  },
});