import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Star } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';

type StarRatingProps = {
  rating: number;
  maxRating?: number;
  size?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
};

export default function StarRating({
  rating,
  maxRating = 5,
  size = 24,
  onRatingChange,
  readonly = false,
}: StarRatingProps) {
  const { colors } = useThemeStore();
  
  const handlePress = (selectedRating: number) => {
    if (readonly) return;
    
    // If user taps the same star twice, clear the rating
    if (selectedRating === rating && onRatingChange) {
      onRatingChange(0);
      return;
    }
    
    if (onRatingChange) {
      onRatingChange(selectedRating);
    }
  };
  
  return (
    <View style={styles.container}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;
        
        return (
          <Pressable
            key={index}
            onPress={() => handlePress(starValue)}
            disabled={readonly}
            style={styles.starContainer}
          >
            <Star
              size={size}
              fill={isFilled ? colors.primary : 'transparent'}
              color={isFilled ? colors.primary : colors.secondaryText}
              strokeWidth={1.5}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  starContainer: {
    padding: 2,
  },
});