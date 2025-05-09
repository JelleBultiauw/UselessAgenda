import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Clock } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import Animated, { FadeIn } from 'react-native-reanimated';

const pastQuotes = [
  "Yesterday is history, tomorrow is a mystery, but today is a gift! 🎁",
  "The past is like a rearview mirror - look back but keep moving forward! 🚗",
  "Time flies like an arrow, fruit flies like a banana! 🍌",
  "The past is a foreign country - they do things differently there! 🌍",
  "Yesterday's the past, tomorrow's the future, today is a gift! 🎯",
  "The past is like a good book - you can read it but can't change it! 📚",
  "Time travel not available - please stay in the present! ⏰",
  "The past is like a shadow - always following but never catching up! 👻",
];

export default function PastDayMessage() {
  const randomQuote = pastQuotes[Math.floor(Math.random() * pastQuotes.length)];

  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(400)}
    >
      <Clock size={48} color={COLORS.pastDayText} />
      <Text style={styles.title}>Past Days</Text>
      <Text style={styles.subtitle}>{randomQuote}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: COLORS.pastDay,
    borderRadius: 12,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.pastDayText,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.pastDayText,
    textAlign: 'center',
  },
});