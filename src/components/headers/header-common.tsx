import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/context/ThemeContext';

export interface HeaderCommonProps {
  title?: string;
  username?: string;
  subtitle?: string;
  showAvatar?: boolean;
  avatarSource?: any;
  showThemeToggle?: boolean;
  rightAction?: React.ReactNode;
  backgroundColor?: string;
}

export function HeaderCommon({
  title,
  username,
  subtitle,
  showAvatar = true,
  avatarSource = require('@/images/icon.png'),
  showThemeToggle = true,
  rightAction,
  backgroundColor,
}: HeaderCommonProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Pagi';
    if (hours < 18) return 'Siang';
    return 'Malam';
  };

  const defaultSubtitle = `Selamat ${getGreeting()},`;
  const displaySubtitle = subtitle ?? defaultSubtitle;
  const displayTitle = title ?? username ?? 'Koozee';

  const headerBg = backgroundColor || (isDarkMode ? '#121212' : '#FFFFFF');

  const handleToggleTheme = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    toggleTheme();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: headerBg,
          paddingTop: Math.max(insets.top + 8, 24),
          borderBottomColor: isDarkMode ? '#1F2937' : '#F3F4F6',
        },
      ]}>
      {/* Profil User / Info Kiri */}
      <View style={styles.userInfoContainer}>
        {showAvatar && (
          <View style={[styles.avatarWrapper, { borderColor: isDarkMode ? '#374151' : '#E5E7EB' }]}>
            <Image source={avatarSource} style={styles.avatar} />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.subtitle, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
            {displaySubtitle}
          </Text>
          <Text style={[styles.title, { color: isDarkMode ? '#F9FAFB' : '#111827' }]}>
            {displayTitle}
          </Text>
        </View>
      </View>

      {/* Aksi Kanan (Theme Toggle / Custom Action) */}
      <View style={styles.actionContainer}>
        {rightAction}

        {showThemeToggle && (
          <TouchableOpacity
            style={[
              styles.toggleButton,
              { backgroundColor: isDarkMode ? '#2D3748' : '#FFFBEB' },
            ]}
            activeOpacity={0.7}
            onPress={handleToggleTheme}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons
              name={isDarkMode ? 'moon' : 'sunny'}
              size={22}
              color="#F59E0B"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    overflow: 'hidden',
    backgroundColor: '#DAE2FF',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
});
