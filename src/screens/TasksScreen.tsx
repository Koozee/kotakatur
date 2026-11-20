import React, { useState, useMemo } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/context/ThemeContext';
import { Task, TaskPriority } from '@/types/task';
import { HeaderCommon } from '@/components/headers/header-common';
import { TaskCard } from '@/components/tasks/task-card';
import { AddTaskModal } from '@/components/tasks/add-task-modal';
import { formatTaskDate } from '@/utils/date';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Selesaikan Laporan Proyek',
    description: 'Finalize the smart home automation logic document.',
    createdAt: '20 Nov 2026, 09:00',
    priority: 'sangat mendesak',
    completed: false,
  },
  {
    id: '2',
    title: 'Update Kitchen Hub',
    description: 'Synchronize the smart fridge inventory with shopping list.',
    createdAt: '20 Nov 2026, 11:30',
    priority: 'mendesak',
    completed: false,
  },
  {
    id: '3',
    title: 'Check Security Cameras',
    description: 'Verify perimeter sensors and backyard camera feed.',
    createdAt: '19 Nov 2026, 16:45',
    priority: 'santai',
    completed: false,
  },
  {
    id: '4',
    title: 'Beli Lampu Cadangan',
    description: 'Cadangan LED indikator panel kontrol.',
    createdAt: '18 Nov 2026, 10:20',
    priority: 'santai',
    completed: true,
  },
  {
    id: '5',
    title: 'Reset Router Wi-Fi',
    description: 'Refresh DHCP lease untuk modul ESP32.',
    createdAt: '17 Nov 2026, 21:00',
    priority: 'mendesak',
    completed: true,
  },
];

type FilterType = 'semua' | TaskPriority;

export function TasksScreen() {
  const { isDarkMode } = useTheme();

  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('semua');
  const [modalVisible, setModalVisible] = useState(false);

  const triggerHaptic = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  // Filter & Search tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchFilter = filter === 'semua' || task.priority === filter;
      const matchSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchFilter && matchSearch;
    });
  }, [tasks, filter, searchQuery]);

  const activeTasks = useMemo(() => filteredTasks.filter((t) => !t.completed), [filteredTasks]);
  const completedTasks = useMemo(() => filteredTasks.filter((t) => t.completed), [filteredTasks]);

  const filterCounts = useMemo(() => {
    return {
      semua: tasks.length,
      'sangat mendesak': tasks.filter((t) => t.priority === 'sangat mendesak').length,
      mendesak: tasks.filter((t) => t.priority === 'mendesak').length,
      santai: tasks.filter((t) => t.priority === 'santai').length,
    };
  }, [tasks]);

  const handleToggleComplete = (id: string) => {
    triggerHaptic();
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    Alert.alert(
      'Hapus Tugas',
      `Apakah Anda yakin ingin menghapus "${taskToDelete?.title || 'tugas ini'}"?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            triggerHaptic();
            setTasks((prev) => prev.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  const handleAddTask = (title: string, description: string, priority: TaskPriority) => {
    triggerHaptic();
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description: description || undefined,
      createdAt: formatTaskDate(new Date()),
      priority,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Colors matching Stitch theme
  const bgColor = isDarkMode ? '#121212' : '#F8F9FA';
  const textColor = isDarkMode ? '#F8F9FA' : '#191C1D';
  const secondaryColor = isDarkMode ? '#9CA3AF' : '#526069';
  const inputBg = isDarkMode ? '#2A2D30' : '#E7E8E9';
  const inputTextColor = isDarkMode ? '#FFFFFF' : '#191C1D';
  const placeholderColor = isDarkMode ? '#8A9197' : '#737784';
  const primaryBrand = isDarkMode ? '#60A5FA' : '#0047AB';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Header Konsisten */}
      <HeaderCommon />

      <FlatList
        data={[]}
        renderItem={null}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <>
            {/* Hero Section: Title & Search Bar & Add Button */}
            <View style={styles.heroSection}>
              <View style={styles.titleGroup}>
                <Text style={[styles.managementBadge, { color: secondaryColor }]}>
                  MANAGEMENT
                </Text>
                <Text style={[styles.pageTitle, { color: textColor }]}>
                  My Task List
                </Text>
              </View>

              <View style={styles.searchRow}>
                <View style={[styles.searchContainer, { backgroundColor: inputBg }]}>
                  <MaterialCommunityIcons
                    name="magnify"
                    size={22}
                    color={placeholderColor}
                  />
                  <TextInput
                    style={[styles.searchInput, { color: inputTextColor }]}
                    placeholder="Search tasks..."
                    placeholderTextColor={placeholderColor}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  {searchQuery ? (
                    <TouchableOpacity
                      onPress={() => setSearchQuery('')}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                      <MaterialCommunityIcons
                        name="close-circle"
                        size={18}
                        color={placeholderColor}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>

                {/* Circular Gradient-styled Add Button */}
                <TouchableOpacity
                  style={[styles.addButton, { backgroundColor: primaryBrand }]}
                  onPress={() => setModalVisible(true)}
                  activeOpacity={0.85}>
                  <MaterialCommunityIcons name="plus" size={28} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
            {/* Filter Chips Horisontal */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScroll}>
              {[
                { key: 'semua' as FilterType, label: 'Semua', count: filterCounts.semua },
                {
                  key: 'sangat mendesak' as FilterType,
                  label: 'High Priority',
                  count: filterCounts['sangat mendesak'],
                  activeColor: '#BA1A1A',
                },
                {
                  key: 'mendesak' as FilterType,
                  label: 'Medium',
                  count: filterCounts.mendesak,
                  activeColor: isDarkMode ? '#3B82F6' : '#0047AB',
                },
                {
                  key: 'santai' as FilterType,
                  label: 'Routine',
                  count: filterCounts.santai,
                  activeColor: '#00327D',
                },
              ].map((item) => {
                const isActive = filter === item.key;
                const activeBg = item.activeColor || primaryBrand;

                return (
                  <TouchableOpacity
                    key={item.key}
                    style={[
                      styles.filterChip,
                      {
                        backgroundColor: isActive
                          ? activeBg
                          : isDarkMode
                            ? '#1E1E1E'
                            : '#ECEEF0',
                      },
                    ]}
                    onPress={() => {
                      triggerHaptic();
                      setFilter(item.key);
                    }}
                    activeOpacity={0.7}>
                    <Text
                      style={[
                        styles.filterChipText,
                        {
                          color: isActive
                            ? '#FFFFFF'
                            : isDarkMode
                              ? '#D1D5DB'
                              : '#526069',
                          fontWeight: isActive ? '800' : '600',
                        },
                      ]}>
                      {item.label}
                    </Text>
                    <View
                      style={[
                        styles.filterCountBadge,
                        {
                          backgroundColor: isActive
                            ? 'rgba(255, 255, 255, 0.25)'
                            : isDarkMode
                              ? '#2E2E2E'
                              : '#D9DADB',
                        },
                      ]}>
                      <Text
                        style={[
                          styles.filterCountText,
                          {
                            color: isActive
                              ? '#FFFFFF'
                              : isDarkMode
                                ? '#9CA3AF'
                                : '#526069',
                          },
                        ]}>
                        {item.count}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Section: ACTIVE TASKS */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: secondaryColor }]}>
                ACTIVE TASKS
              </Text>
            </View>

            {activeTasks.length > 0 ? (
              activeTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons
                  name="check-all"
                  size={42}
                  color={isDarkMode ? '#374151' : '#D1D5DB'}
                />
                <Text style={[styles.emptyText, { color: secondaryColor }]}>
                  {searchQuery
                    ? 'Tidak ada tugas aktif yang cocok dengan pencarian.'
                    : 'Tidak ada tugas aktif saat ini. Bagus!'}
                </Text>
              </View>
            )}

            {/* Section: COMPLETED TASKS */}
            {completedTasks.length > 0 && (
              <View style={styles.completedSection}>
                <View style={styles.completedHeaderRow}>
                  <Text style={[styles.sectionTitle, { color: secondaryColor }]}>
                    COMPLETED TASKS
                  </Text>
                  <View
                    style={[
                      styles.completedDivider,
                      { backgroundColor: isDarkMode ? '#333' : '#E1E3E4' },
                    ]}
                  />
                </View>

                {completedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </View>
            )}
          </>
        }
      />

      {/* Modal Tambah Tugas */}
      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddTask={handleAddTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    gap: 16,
  },
  titleGroup: {
    gap: 4,
  },
  managementBadge: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -1,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    height: '100%',
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0047AB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  filterChipText: {
    fontSize: 12,
    letterSpacing: 0.2,
  },
  filterCountBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  filterCountText: {
    fontSize: 10,
    fontWeight: '700',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  completedSection: {
    marginTop: 24,
  },
  completedHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 12,
  },
  completedDivider: {
    flex: 1,
    height: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 8,
  },
  emptyText: {
    fontSize: 13,
    textAlign: 'center',
  },
});
