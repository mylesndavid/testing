import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Badge } from '@/types';
import { useThemeStore } from '@/store/theme-store';

type BadgeItemProps = {
  badge: Badge;
};

export default function BadgeItem({ badge }: BadgeItemProps) {
  const { colors } = useThemeStore();
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: badge.isUnlocked ? colors.highlight : colors.card,
          borderColor: colors.border,
        }
      ]}
    >
      <Text style={styles.icon}>{badge.icon}</Text>
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          {badge.title}
        </Text>
        
        <Text style={[styles.description, { color: colors.secondaryText }]}>
          {badge.description}
        </Text>
        
        {badge.isUnlocked ? (
          <Text style={[styles.unlockedText, { color: colors.primary }]}>
            Unlocked
          </Text>
        ) : (
          <Text style={[styles.lockedText, { color: colors.secondaryText }]}>
            Locked
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 6,
  },
  unlockedText: {
    fontSize: 12,
    fontWeight: '600',
  },
  lockedText: {
    fontSize: 12,
  },
});