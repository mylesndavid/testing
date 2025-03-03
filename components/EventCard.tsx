import React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { Calendar, Users } from 'lucide-react-native';
import { Event } from '@/types';
import { useThemeStore } from '@/store/theme-store';
import Button from './Button';

type EventCardProps = {
  event: Event;
  onPress?: () => void;
  onParticipatePress?: () => void;
};

export default function EventCard({
  event,
  onPress,
  onParticipatePress,
}: EventCardProps) {
  const { colors } = useThemeStore();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const isUpcoming = new Date(event.startDate) > new Date();
  
  return (
    <Pressable 
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <View style={styles.header}>
        {event.coverImage && (
          <Image 
            source={{ uri: event.coverImage }} 
            style={styles.coverImage}
          />
        )}
        
        <View style={styles.overlay} />
        
        <View style={styles.headerContent}>
          <Text style={styles.title}>{event.title}</Text>
          
          {isUpcoming && (
            <View style={[styles.upcomingBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.upcomingText}>Upcoming</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.content}>
        <Text 
          style={[styles.description, { color: colors.text }]}
          numberOfLines={3}
        >
          {event.description}
        </Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Calendar size={16} color={colors.secondaryText} />
            <Text style={[styles.infoText, { color: colors.secondaryText }]}>
              {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Users size={16} color={colors.secondaryText} />
            <Text style={[styles.infoText, { color: colors.secondaryText }]}>
              {event.participantsCount} participants
            </Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Button
            title={event.isParticipating ? "Participating" : "Participate"}
            onPress={onParticipatePress || (() => {})}
            variant={event.isParticipating ? "outline" : "primary"}
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
    height: 140,
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
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  upcomingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  upcomingText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});