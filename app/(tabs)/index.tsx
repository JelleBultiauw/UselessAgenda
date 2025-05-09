import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import WeekView from '@/components/WeekView';
import DayDetail from '@/components/DayDetail';
import { formatDate, getCurrentWeekDates, isSameDay, isToday, isPast } from '@/utils/dateHelpers';
import { COLORS } from '@/constants/colors';
import { useAgenda } from '@/context/AgendaContext';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function WeekScreen() {
  // Get current week dates (Sunday to Saturday)
  const [weekDates, setWeekDates] = useState(getCurrentWeekDates());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { items, loading } = useAgenda();

  // Update selected date to today at midnight
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setSelectedDate(today);
  }, []);

  // Filter items for the selected date
  const selectedDateItems = items.filter((item) => {
    // Only show items for today or past days
    const itemDate = new Date(item.date);
    const isItemToday = isToday(itemDate);
    const isItemPast = isPast(itemDate);
    
    return (isItemToday || isItemPast) && 
           isSameDay(itemDate, selectedDate);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.duration(300)} style={styles.weekContainer}>
        <WeekView 
          weekDates={weekDates} 
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </Animated.View>
      
      <View style={styles.dayHeaderContainer}>
        <Text style={styles.dateText}>{formatDate(selectedDate, 'EEEE, MMMM d')}</Text>
        {isToday(selectedDate) && (
          <View style={styles.todayBadge}>
            <Text style={styles.todayText}>Today</Text>
          </View>
        )}
      </View>
      
      <DayDetail 
        date={selectedDate} 
        items={selectedDateItems} 
        isPastDay={isPast(selectedDate) && !isToday(selectedDate)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  weekContainer: {
    paddingVertical: 16,
    backgroundColor: COLORS.backgroundDark,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dayHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dateText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.text,
  },
  todayBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  todayText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#fff',
  },
});