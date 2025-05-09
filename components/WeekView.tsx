import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '@/constants/colors';
import { formatDate, isToday, isPast } from '@/utils/dateHelpers';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';

interface WeekViewProps {
  weekDates: Date[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function WeekView({ weekDates, selectedDate, onSelectDate }: WeekViewProps) {
  const scrollViewRef = React.useRef<ScrollView>(null);
  
  React.useEffect(() => {
    // Scroll to center the selected date
    const todayIndex = weekDates.findIndex(date => isToday(date));
    if (todayIndex >= 0 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ 
        x: todayIndex * 60 - 120, // Center the item
        animated: true 
      });
    }
  }, [weekDates]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {weekDates.map((date, index) => {
        const isSelected = formatDate(date, 'yyyy-MM-dd') === formatDate(selectedDate, 'yyyy-MM-dd');
        const isTodayDate = isToday(date);
        const isPastDate = isPast(date) && !isTodayDate;
        
        return (
          <DayItem
            key={index}
            date={date}
            isSelected={isSelected}
            isToday={isTodayDate}
            isPast={isPastDate}
            onSelect={() => onSelectDate(date)}
          />
        );
      })}
    </ScrollView>
  );
}

interface DayItemProps {
  date: Date;
  isSelected: boolean;
  isToday: boolean;
  isPast: boolean;
  onSelect: () => void;
}

function DayItem({ date, isSelected, isToday, isPast, onSelect }: DayItemProps) {
  const scale = useSharedValue(1);
  
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });
  
  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };
  
  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };
  
  const dayName = formatDate(date, 'EEE');
  const dayNumber = formatDate(date, 'd');
  
  let containerStyle = [styles.dayContainer];
  let textStyle = [styles.dayText];
  let numberStyle = [styles.dayNumber];
  
  if (isSelected) {
    containerStyle.push(styles.selectedDayContainer);
    textStyle.push(styles.selectedDayText);
    numberStyle.push(styles.selectedDayNumber);
  }
  
  if (isToday) {
    containerStyle.push(styles.todayContainer);
    textStyle.push(styles.todayText);
    numberStyle.push(styles.todayNumber);
  }
  
  if (isPast) {
    containerStyle.push(styles.pastDayContainer);
    textStyle.push(styles.pastDayText);
    numberStyle.push(styles.pastDayNumber);
  }
  
  return (
    <TouchableOpacity
      onPress={onSelect}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View style={[containerStyle, animatedStyles]}>
        <Text style={textStyle}>{dayName}</Text>
        <Text style={numberStyle}>{dayNumber}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  dayContainer: {
    width: 48,
    height: 72,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    backgroundColor: COLORS.surface,
    shadowColor: COLORS.itemShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedDayContainer: {
    backgroundColor: COLORS.primary,
  },
  todayContainer: {
    backgroundColor: COLORS.todayBackground,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  pastDayContainer: {
    backgroundColor: COLORS.pastDay,
  },
  dayText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  selectedDayText: {
    color: '#fff',
  },
  todayText: {
    color: COLORS.todayText,
  },
  pastDayText: {
    color: COLORS.pastDayText,
  },
  dayNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.text,
  },
  selectedDayNumber: {
    color: '#fff',
  },
  todayNumber: {
    color: COLORS.todayText,
  },
  pastDayNumber: {
    color: COLORS.pastDayText,
  },
});