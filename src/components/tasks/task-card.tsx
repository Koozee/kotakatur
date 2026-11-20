import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Task, TaskPriority } from '@/types/task';
import { useTheme } from '@/context/ThemeContext';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

interface PriorityConfig {
  label: string;
  lightBg: string;
  darkBg: string;
  lightText: string;
  darkText: string;
}

const PRIORITY_STYLES: Record<TaskPriority, PriorityConfig> = {
  'sangat mendesak': {
    label: 'HIGH PRIORITY',
    lightBg: '#FFDBCF',
    darkBg: '#451A1A',
    lightText: '#802900',
    darkText: '#FCA5A5',
  },
  'mendesak': {
    label: 'MEDIUM',
    lightBg: '#D6E5EF',
    darkBg: '#1E293B',
    lightText: '#0F1D25',
    darkText: '#93C5FD',
  },
  'santai': {
    label: 'ROUTINE',
    lightBg: '#DAE2FF',
    darkBg: '#172554',
    lightText: '#001946',
    darkText: '#BFDBFE',
  },
};

export function TaskCard({ task, onToggleComplete, onDelete }: TaskCardProps) {
  const { isDarkMode } = useTheme();
  const priorityConfig = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES['santai'];

  // Card theme colors
  const cardBg = task.completed
    ? isDarkMode
      ? '#1A1D1E'
      : '#F3F4F5'
    : isDarkMode
    ? '#1E1E1E'
    : '#FFFFFF';

  const titleColor = task.completed
    ? isDarkMode
      ? '#6B7280'
      : '#9CA3AF'
    : isDarkMode
    ? '#F8F9FA'
    : '#191C1D';

  const descColor = isDarkMode ? '#9CA3AF' : '#56656E';
  const metaColor = isDarkMode ? '#6B7280' : '#8A9197';

  const badgeBg = isDarkMode ? priorityConfig.darkBg : priorityConfig.lightBg;
  const badgeText = isDarkMode ? priorityConfig.darkText : priorityConfig.lightText;

  // Checkbox border / background
  const checkboxBorder = isDarkMode ? '#4B5563' : '#C3C6D5';
  const activeCheckboxBg = isDarkMode ? '#3B82F6' : '#00327D';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: cardBg,
          borderColor: isDarkMode ? '#2D3748' : '#ECEEF0',
          opacity: task.completed ? 0.7 : 1,
        },
      ]}>
      {/* Checkbox Rounded Rectangle (w-6 h-6 rounded-lg) */}
      <TouchableOpacity
        onPress={() => onToggleComplete(task.id)}
        style={[
          styles.checkbox,
          {
            borderColor: task.completed ? activeCheckboxBg : checkboxBorder,
            backgroundColor: task.completed ? activeCheckboxBg : 'transparent',
          },
        ]}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        {task.completed && (
          <MaterialCommunityIcons name="check" size={16} color="#FFFFFF" />
        )}
      </TouchableOpacity>

      {/* Task Content */}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.title,
              {
                color: titleColor,
                textDecorationLine: task.completed ? 'line-through' : 'none',
              },
            ]}>
            {task.title}
          </Text>

          {/* Priority Badge */}
          {!task.completed && (
            <View style={[styles.priorityBadge, { backgroundColor: badgeBg }]}>
              <Text style={[styles.priorityText, { color: badgeText }]}>
                {priorityConfig.label}
              </Text>
            </View>
          )}
        </View>

        {/* Description jika ada */}
        {task.description ? (
          <Text
            style={[
              styles.description,
              {
                color: descColor,
                textDecorationLine: task.completed ? 'line-through' : 'none',
              },
            ]}
            numberOfLines={2}>
            {task.description}
          </Text>
        ) : null}

        {/* Waktu Buat */}
        <View style={styles.timeRow}>
          <MaterialCommunityIcons name="clock-outline" size={12} color={metaColor} />
          <Text style={[styles.timeText, { color: metaColor }]}>{task.createdAt}</Text>
        </View>
      </View>

      {/* Delete Button (Stitch Red Button Style) */}
      <TouchableOpacity
        onPress={() => onDelete(task.id)}
        style={[
          styles.deleteButton,
          {
            backgroundColor: isDarkMode ? '#3B1818' : '#FFDAD6',
          },
        ]}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <MaterialCommunityIcons
          name="delete"
          size={18}
          color={isDarkMode ? '#FFB4AB' : '#93000A'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  deleteButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
