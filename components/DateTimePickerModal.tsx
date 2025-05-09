import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '@/constants/colors';

interface DateTimePickerModalProps {
  visible: boolean;
  mode: 'date' | 'time';
  onConfirm: (value: any) => void;
  onCancel: () => void;
  date?: Date;
}

export default function DateTimePickerModal({
  visible,
  mode,
  onConfirm,
  onCancel,
  date = new Date(),
}: DateTimePickerModalProps) {
  const [selectedValue, setSelectedValue] = React.useState(date);

  // Only update selectedValue when the modal becomes visible
  React.useEffect(() => {
    if (visible) {
      setSelectedValue(date);
    }
  }, [visible]); // Remove date from dependencies

  const handleChange = (_: any, selected: Date | undefined) => {
    if (Platform.OS === 'android') {
      onCancel();
      if (selected) {
        if (mode === 'date') {
          onConfirm(selected);
        } else {
          // Format time as HH:MM
          const hours = selected.getHours().toString().padStart(2, '0');
          const minutes = selected.getMinutes().toString().padStart(2, '0');
          onConfirm(`${hours}:${minutes}`);
        }
      }
    } else {
      // On iOS, update the selected value
      if (selected) {
        setSelectedValue(selected);
      }
    }
  };

  const handleConfirm = () => {
    if (mode === 'date') {
      onConfirm(selectedValue);
    } else {
      // Format time as HH:MM
      const hours = selectedValue.getHours().toString().padStart(2, '0');
      const minutes = selectedValue.getMinutes().toString().padStart(2, '0');
      onConfirm(`${hours}:${minutes}`);
    }
  };

  // On Android, show the native date picker
  if (Platform.OS === 'android') {
    if (!visible) return null;
    return (
      <DateTimePicker
        value={selectedValue}
        mode={mode}
        is24Hour={true}
        onChange={handleChange}
      />
    );
  }

  // On iOS, show a modal with the date picker
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.title}>
              {mode === 'date' ? 'Select Date' : 'Select Time'}
            </Text>
            <TouchableOpacity onPress={handleConfirm}>
              <Text style={styles.confirmButton}>Confirm</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            value={selectedValue}
            mode={mode}
            display="spinner"
            onChange={handleChange}
            style={styles.picker}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.text,
  },
  cancelButton: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.textLight,
  },
  confirmButton: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.primary,
  },
  picker: {
    height: 200,
  },
});