import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TreasureCardProps {
  title: string;
  location: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  participants: number;
  reward: string;
  timeEstimate: string;
  imageUrl: string;
  onPress: () => void;
}

export function TreasureCard({
  title,
  location,
  difficulty,
  participants,
  reward,
  timeEstimate,
  imageUrl,
  onPress
}: TreasureCardProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Facile': return '#10B981';
      case 'Moyen': return '#F59E0B';
      case 'Difficile': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() }]}>
            <Text style={styles.difficultyText}>{difficulty}</Text>
          </View>
        </View>
        
        <View style={styles.locationRow}>
          <Ionicons name="location" size={16} color="#6B7280" />
          <Text style={styles.locationText}>{location}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Ionicons name="people" size={16} color="#6B7280" />
            <Text style={styles.statText}>{participants}</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="trophy" size={16} color="#F59E0B" />
            <Text style={styles.statText}>{reward}</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="time" size={16} color="#6B7280" />
            <Text style={styles.statText}>{timeEstimate}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#D1D5DB',
    marginLeft: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#D1D5DB',
    marginLeft: 4,
    fontWeight: '500',
  },
});