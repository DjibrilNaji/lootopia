import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

interface QuickActionCardProps {
  title: string;
  subtitle: string;
  iconName: string;
  iconFamily: 'Ionicons' | 'MaterialIcons' | 'FontAwesome5';
  color: string;
  onPress: () => void;
}

export function QuickActionCard({ title, subtitle, iconName, iconFamily, color, onPress }: QuickActionCardProps) {
  const IconComponent = iconFamily === 'Ionicons' ? Ionicons : 
                       iconFamily === 'MaterialIcons' ? MaterialIcons : FontAwesome5;

  return (
    <Pressable style={[styles.card, { backgroundColor: color }]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <IconComponent name={iconName as any} size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 6,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});