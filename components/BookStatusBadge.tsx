import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ReadingStatus } from '@/types';
import { statusColors } from '@/constants/colors';

type BookStatusBadgeProps = {
  status: ReadingStatus;
  size?: 'small' | 'medium';
};

export default function BookStatusBadge({ 
  status, 
  size = 'medium' 
}: BookStatusBadgeProps) {
  const getStatusLabel = () => {
    switch (status) {
      case 'reading':
        return 'Reading';
      case 'completed':
        return 'Completed';
      case 'toRead':
        return 'To Read';
      case 'dnf':
        return 'DNF';
      default:
        return '';
    }
  };
  
  const backgroundColor = statusColors[status];
  
  return (
    <View style={[
      styles.container, 
      { backgroundColor },
      size === 'small' ? styles.smallContainer : {}
    ]}>
      <Text style={[
        styles.text,
        size === 'small' ? styles.smallText : {}
      ]}>
        {getStatusLabel()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  smallContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  smallText: {
    fontSize: 12,
  },
});