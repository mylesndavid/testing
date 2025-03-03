import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Book, UserBook } from '@/types';
import { useThemeStore } from '@/store/theme-store';
import { progressGradient } from '@/constants/colors';

type ReadingProgressBarProps = {
  userBook: UserBook;
  book: Book;
  showPercentage?: boolean;
  showPages?: boolean;
  height?: number;
};

export default function ReadingProgressBar({
  userBook,
  book,
  showPercentage = true,
  showPages = false,
  height = 8,
}: ReadingProgressBarProps) {
  const { colors, isDark } = useThemeStore();
  
  const progress = book.pageCount > 0 
    ? (userBook.currentPage / book.pageCount) 
    : 0;
  
  const percentage = Math.round(progress * 100);
  
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.progressContainer, 
          { 
            height, 
            backgroundColor: isDark ? colors.border : colors.card,
          }
        ]}
      >
        <LinearGradient
          colors={[progressGradient.start, progressGradient.end]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.progressBar,
            { width: `${percentage}%` }
          ]}
        />
      </View>
      
      <View style={styles.statsContainer}>
        {showPercentage && (
          <Text style={[styles.percentage, { color: colors.text }]}>
            {percentage}%
          </Text>
        )}
        
        {showPages && (
          <Text style={[styles.pages, { color: colors.secondaryText }]}>
            {userBook.currentPage} / {book.pageCount} pages
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  progressContainer: {
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  percentage: {
    fontSize: 12,
    fontWeight: '600',
  },
  pages: {
    fontSize: 12,
  },
});