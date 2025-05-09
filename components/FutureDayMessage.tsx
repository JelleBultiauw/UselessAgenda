import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import Animated, { FadeIn } from 'react-native-reanimated';

const futureQuotes = [
  "The future is like a box of chocolates - you never know what you're gonna get! 🍫",
  "Time travel not available yet, but you can plan ahead! ⏰",
  "The future is bright, but you can't schedule it yet! ✨",
  "Your future self will thank you for planning today! 🎯",
  "The future is unwritten, but you can start writing it today! 📝",
  "Can't schedule the future, but you can dream about it! 🌈",
  "The future is a mystery, but today is a gift! 🎁",
  "Your future is so bright, you gotta wear shades! 😎",
];

export default function FutureDayMessage() {
  const randomQuote = futureQuotes[Math.floor(Math.random() * futureQuotes.length)];

  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(400)}
    >
      <Sparkles size={48} color={COLORS.primary} />
      <Text style={styles.title}>Future Days</Text>
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
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.primary,
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