import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { AgendaItem } from '@/context/AgendaContext';
import AgendaItemComponent from './AgendaItemComponent';
import { COLORS } from '@/constants/colors';
import EmptyState from './EmptyState';
import PastDayMessage from './PastDayMessage';
import FutureDayMessage from './FutureDayMessage';
import { isPast, isToday } from '@/utils/dateHelpers';

interface DayDetailProps {
  date: Date;
  items: AgendaItem[];
  isPastDay: boolean;
}

export default function DayDetail({ date, items, isPastDay }: DayDetailProps) {
  const isFutureDay = !isPast(date) && !isToday(date);

  if (isPastDay) {
    return <PastDayMessage />;
  }

  if (isFutureDay) {
    return <FutureDayMessage />;
  }
  
  if (items.length === 0) {
    return <EmptyState />;
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AgendaItemComponent item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 80,
  },
  separator: {
    height: 12,
  },
});