import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { CardLayout, CardPadding } from './layout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ToggleSwitch } from '../ui/toogle-switch';
import { useTheme } from '@/context/ThemeContext';
import { DeviceItem } from '@/types/device';

export interface DeviceCardProps {
  device?: DeviceItem;
  title?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  status?: boolean;
  onToggle?: (id: string) => void;
  isGridItem?: boolean;
}

export function DeviceCard({
  device,
  title = device?.title ?? 'Device',
  icon = device?.icon ?? 'power-socket-eu',
  status = device?.status ?? false,
  onToggle,
  isGridItem = false,
}: DeviceCardProps) {
  const { isDarkMode } = useTheme();
  const isEnabled = device ? device.status : status;
  const colorAnim = useRef(new Animated.Value(isEnabled ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(colorAnim, {
      toValue: isEnabled ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isEnabled, colorAnim]);

  const toggleSwitch = () => {
    if (device && onToggle) {
      onToggle(device.id);
    }
  };

  const iconBgColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [isDarkMode ? '#2D3748' : '#F3F4F6', isDarkMode ? '#1E40AF' : '#0047AB'],
  });

  const iconColor = isEnabled ? '#FFFFFF' : isDarkMode ? '#9CA3AF' : '#6B7280';
  const cardBg = isDarkMode ? '#1E1E1E' : '#FFFFFF';

  return (
    <CardLayout
      isFixedWidth={!isGridItem}
      isFixedWidthHeight
      paddingSize={CardPadding.SMALL}
      backgroundColor={cardBg}
      style={isGridItem ? styles.gridCard : undefined}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Animated.View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
            <MaterialCommunityIcons name={icon} size={28} color={iconColor} />
          </Animated.View>
          <ToggleSwitch isEnabled={isEnabled} toggleSwitch={toggleSwitch} />
        </View>

        <View style={styles.footer}>
          <Text
            style={[styles.textTitle, { color: isDarkMode ? '#F9FAFB' : '#111827' }]}
            numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.textStatus, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
            Status:{' '}
            <Text
              style={{
                color: isEnabled
                  ? isDarkMode
                    ? '#60A5FA'
                    : '#0047AB'
                  : isDarkMode
                  ? '#9CA3AF'
                  : '#6B7280',
                fontWeight: '800',
              }}>
              {isEnabled ? 'ON' : 'OFF'}
            </Text>
          </Text>
        </View>
      </View>
    </CardLayout>
  );
}

const styles = StyleSheet.create({
  gridCard: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 6,
    width: undefined,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    padding: 12,
    borderRadius: 16,
  },
  footer: {
    gap: 4,
  },
  textTitle: {
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  textStatus: {
    fontSize: 13,
    fontWeight: '600',
  },
});
