import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TaskPriority } from '@/types/task';
import { useTheme } from '@/context/ThemeContext';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAddTask: (title: string, description: string, priority: TaskPriority) => void;
}

const PRIORITIES: {
  value: TaskPriority;
  label: string;
  sublabel: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
}[] = [
  { value: 'santai', label: 'Routine', sublabel: 'Santai', icon: 'coffee-outline', color: '#0047AB' },
  { value: 'mendesak', label: 'Medium', sublabel: 'Mendesak', icon: 'clock-alert-outline', color: '#0F1D25' },
  { value: 'sangat mendesak', label: 'High Priority', sublabel: 'Mendesak', icon: 'fire', color: '#BA1A1A' },
];

export function AddTaskModal({ visible, onClose, onAddTask }: AddTaskModalProps) {
  const { isDarkMode } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority>('santai');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) {
      setError('Nama tugas tidak boleh kosong');
      return;
    }
    onAddTask(title.trim(), description.trim(), selectedPriority);
    setTitle('');
    setDescription('');
    setSelectedPriority('santai');
    setError('');
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setSelectedPriority('santai');
    setError('');
    onClose();
  };

  const modalBg = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDarkMode ? '#F8F9FA' : '#191C1D';
  const inputBg = isDarkMode ? '#2A2D30' : '#E7E8E9';
  const inputColor = isDarkMode ? '#FFFFFF' : '#191C1D';
  const placeholderColor = isDarkMode ? '#8A9197' : '#737784';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={handleClose} />

        <View style={[styles.modalCard, { backgroundColor: modalBg }]}>
          {/* Header Modal */}
          <View style={styles.modalHeader}>
            <View style={styles.titleContainer}>
              <MaterialCommunityIcons
                name="plus-circle"
                size={24}
                color={isDarkMode ? '#60A5FA' : '#0047AB'}
              />
              <Text style={[styles.modalTitle, { color: textColor }]}>
                Tambah Tugas Baru
              </Text>
            </View>
            <TouchableOpacity onPress={handleClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <MaterialCommunityIcons
                name="close"
                size={22}
                color={isDarkMode ? '#9CA3AF' : '#6B7280'}
              />
            </TouchableOpacity>
          </View>

          {/* Input Nama Tugas */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: isDarkMode ? '#D1D5DB' : '#374151' }]}>
              Nama Tugas *
            </Text>
            <TextInput
              style={[
                styles.textInput,
                { backgroundColor: inputBg, color: inputColor },
                error ? styles.inputError : null,
              ]}
              placeholder="Contoh: Selesaikan Laporan Proyek"
              placeholderTextColor={placeholderColor}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                if (error) setError('');
              }}
              autoFocus
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {/* Input Deskripsi Tugas */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: isDarkMode ? '#D1D5DB' : '#374151' }]}>
              Deskripsi (Opsional)
            </Text>
            <TextInput
              style={[
                styles.textInput,
                styles.textArea,
                { backgroundColor: inputBg, color: inputColor },
              ]}
              placeholder="Contoh: Finalize the smart home automation logic document."
              placeholderTextColor={placeholderColor}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={2}
            />
          </View>

          {/* Pilihan Tingkat Kepentingan */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: isDarkMode ? '#D1D5DB' : '#374151' }]}>
              Tingkat Kepentingan
            </Text>
            <View style={styles.prioritySelectorRow}>
              {PRIORITIES.map((item) => {
                const isSelected = selectedPriority === item.value;
                const activeBorder = item.value === 'sangat mendesak'
                  ? '#BA1A1A'
                  : item.value === 'mendesak'
                  ? (isDarkMode ? '#60A5FA' : '#0F1D25')
                  : (isDarkMode ? '#60A5FA' : '#0047AB');

                return (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.priorityOption,
                      {
                        borderColor: isSelected ? activeBorder : isDarkMode ? '#374151' : '#E5E7EB',
                        backgroundColor: isSelected
                          ? isDarkMode
                            ? '#2E3842'
                            : '#E8EDF5'
                          : isDarkMode
                          ? '#262626'
                          : '#FAFAFA',
                      },
                    ]}
                    onPress={() => setSelectedPriority(item.value)}
                    activeOpacity={0.7}>
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={18}
                      color={isSelected ? activeBorder : isDarkMode ? '#9CA3AF' : '#6B7280'}
                    />
                    <Text
                      style={[
                        styles.priorityOptionTitle,
                        {
                          color: isSelected ? activeBorder : isDarkMode ? '#F3F4F6' : '#1F2937',
                          fontWeight: isSelected ? '800' : '600',
                        },
                      ]}>
                      {item.label}
                    </Text>
                    <Text
                      style={[
                        styles.priorityOptionSubtitle,
                        { color: isDarkMode ? '#9CA3AF' : '#6B7280' },
                      ]}>
                      {item.sublabel}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Tombol Aksi */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[
                styles.cancelButton,
                { backgroundColor: isDarkMode ? '#333333' : '#E5E7EB' },
              ]}
              onPress={handleClose}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.cancelButtonText,
                  { color: isDarkMode ? '#E5E7EB' : '#4B5563' },
                ]}>
                Batal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: isDarkMode ? '#60A5FA' : '#0047AB' },
              ]}
              onPress={handleSubmit}
              activeOpacity={0.8}>
              <Text style={styles.submitButtonText}>Simpan Tugas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCard: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  textInput: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  textArea: {
    height: 64,
    textAlignVertical: 'top',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#BA1A1A',
  },
  errorText: {
    color: '#BA1A1A',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  prioritySelectorRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 2,
  },
  priorityOptionTitle: {
    fontSize: 11,
    textAlign: 'center',
  },
  priorityOptionSubtitle: {
    fontSize: 10,
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
    marginBottom: Platform.OS === 'ios' ? 16 : 0,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  submitButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
