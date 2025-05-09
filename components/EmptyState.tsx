import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function EmptyState() {
  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(400)}
    >
      <Calendar size={48} color={COLORS.textLight} />
      <Text style={styles.title}>No Items</Text>
      <Text style={styles.subtitle}>
        Add items to your agenda by tapping the + button
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});