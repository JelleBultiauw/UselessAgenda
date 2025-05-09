import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, Clock } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import { useAgenda } from '@/context/AgendaContext';
import { formatDate } from '@/utils/dateHelpers';
import Animated, { FadeIn } from 'react-native-reanimated';
import DateTimePickerModal from '@/components/DateTimePickerModal';

export default function AddScreen() {
  const router = useRouter();
  const { addItem } = useAgenda();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  
  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    // Format date as 'YYYY-MM-DD'
    const formattedDate = formatDate(date, 'yyyy-MM-dd');
    
    await addItem({
      title: title.trim(),
      description: description.trim(),
      date: formattedDate,
      startTime,
      endTime,
      completed: false
    });
    
    // Navigate back to the week view
    router.push('/');
  };
  
  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    setShowDatePicker(false);
  };
  
  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    setShowStartTimePicker(false);
  };
  
  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
    setShowEndTimePicker(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.scrollView}>
        <Animated.View entering={FadeIn.duration(300)} style={styles.formContainer}>
          <Text style={styles.header}>Add New Item</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter title"
              placeholderTextColor={COLORS.textMuted}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
              placeholderTextColor={COLORS.textMuted}
              multiline
              numberOfLines={4}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.datePickerText}>
                {formatDate(date, 'EEEE, MMMM d, yyyy')}
              </Text>
              <Calendar size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.timeContainer}>
            <View style={[styles.formGroup, styles.timeGroup]}>
              <Text style={styles.label}>Start Time (Optional)</Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowStartTimePicker(true)}
              >
                <Text style={styles.datePickerText}>
                  {startTime || 'Select time'}
                </Text>
                <Clock size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            
            <View style={[styles.formGroup, styles.timeGroup]}>
              <Text style={styles.label}>End Time (Optional)</Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowEndTimePicker(true)}
              >
                <Text style={styles.datePickerText}>
                  {endTime || 'Select time'}
                </Text>
                <Clock size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Add to Agenda</Text>
          </TouchableOpacity>
          
          <DateTimePickerModal
            visible={showDatePicker}
            mode="date"
            onConfirm={handleDateChange}
            onCancel={() => setShowDatePicker(false)}
            date={date}
          />
          
          <DateTimePickerModal
            visible={showStartTimePicker}
            mode="time"
            onConfirm={handleStartTimeChange}
            onCancel={() => setShowStartTimePicker(false)}
          />
          
          <DateTimePickerModal
            visible={showEndTimePicker}
            mode="time"
            onConfirm={handleEndTimeChange}
            onCancel={() => setShowEndTimePicker(false)}
          />
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  header: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.text,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.text,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  datePickerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.text,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeGroup: {
    flex: 0.48,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#fff',
  },
});