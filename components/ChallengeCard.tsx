import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import { ReadingChallenge } from '@/types';
import { useThemeStore } from '@/store/theme-store';
import { LinearGradient } from 'expo-linear-gradient';
import { progressGradient } from '@/constants/colors';

type ChallengeCardProps = {
  challenge: ReadingChallenge;
  onPress?: () => void;
};

export default function ChallengeCard({
  challenge,
  onPress,
}: ChallengeCardProps) {
  const { colors } = useThemeStore();
  
  const progress = challenge.target > 0 
    ? (challenge.progress / challenge.target) 
    : 0;
  
  const percentage = Math.round(progress * 100);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  return (
    <Pressable 
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <BookOpen size={24} color={colors.primary} />
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          {challenge.title}
        </Text>
        
        <Text style={[styles.description, { color: colors.secondaryText }]}>
          {challenge.description}
        </Text>
        
        <View style={styles.dateRange}>
          <Text style={[styles.dateText, { color: colors.secondaryText }]}>
            {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
          </Text>
        </View>
        
        <View style={styles.progressContainer}>
          <View 
            style={[
              styles.progressBar, 
              { backgroundColor: colors.border }
            ]}
          >
            <LinearGradient
              colors={[progressGradient.start, progressGradient.end]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.progressFill,
                { width: `${percentage}%` }
              ]}
            />
          </View>
          
          <View style={styles.progressStats}>
            <Text style={[styles.progressText, { color: colors.text }]}>
              {challenge.progress} / {challenge.target}
            </Text>
            <Text style={[styles.percentageText, { color: colors.primary }]}>
              {percentage}%
            </Text>
          </View>
        </View>
        
        {challenge.isCompleted && (
          <View style={[styles.completedBadge, { backgroundColor: colors.success }]}>
            <Text style={styles.completedText}>Completed</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  iconContainer: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  dateRange: {
    marginBottom: 12,
  },
  dateText: {
    fontSize: 12,
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    width: '100%',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
  },
  completedBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  completedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});