import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Check, Clock } from 'lucide-react-native';
import { AgendaItem, useAgenda } from '@/context/AgendaContext';
import { COLORS } from '@/constants/colors';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface AgendaItemProps {
  item: AgendaItem;
}

export default function AgendaItemComponent({ item }: AgendaItemProps) {
  const { completeItem, deleteItem } = useAgenda();
  const scale = useSharedValue(1);
  
  const handlePress = () => {
    scale.value = withTiming(0.95, { duration: 100 });
    setTimeout(() => {
      scale.value = withTiming(1, { duration: 200 });
      completeItem(item.id);
    }, 200);
  };
  
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });
  
  const hasTimeInfo = item.startTime || item.endTime;
  
  return (
    <Animated.View 
      style={[
        styles.container, 
        item.completed && styles.completedContainer,
        animatedStyles
      ]}
      entering={FadeIn.duration(300).delay(100)}
    >
      <TouchableOpacity 
        style={styles.checkbox}
        onPress={handlePress}
      >
        <View style={[
          styles.checkboxInner,
          item.completed && styles.checkboxChecked
        ]}>
          {item.completed && <Check size={16} color="#fff" />}
        </View>
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text 
          style={[
            styles.title,
            item.completed && styles.completedText
          ]}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        
        {item.description ? (
          <Text 
            style={[
              styles.description,
              item.completed && styles.completedText
            ]}
            numberOfLines={2}
          >
            {item.description}
          </Text>
        ) : null}
        
        {hasTimeInfo && (
          <View style={styles.timeContainer}>
            <Clock size={14} color={COLORS.textLight} />
            <Text style={styles.timeText}>
              {item.startTime ? item.startTime : ''}
              {item.startTime && item.endTime ? ' - ' : ''}
              {item.endTime ? item.endTime : ''}
            </Text>
          </View>
        )}
      </View>
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deleteItem(item.id)}
      >
        <Text style={styles.deleteText}>Remove</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.itemBackground,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    shadowColor: COLORS.itemShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.itemBorder,
  },
  completedContainer: {
    backgroundColor: COLORS.pastDay,
    borderColor: COLORS.pastDay,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
  },
  completedText: {
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: COLORS.error,
  },
});