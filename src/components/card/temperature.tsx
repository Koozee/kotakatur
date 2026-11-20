import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CardLayout, CardPadding } from './layout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { SensorMetrics } from '@/types/device';

interface TemperatureCardProps {
  metrics?: Partial<SensorMetrics>;
}

export function TemperatureCard({ metrics }: TemperatureCardProps) {
  const { isDarkMode } = useTheme();

  const temperature = metrics?.temperature ?? 24.5;
  const unit = metrics?.unit ?? '°C';
  const status = metrics?.status ?? 'OPTIMAL';
  const airQuality = metrics?.airQuality ?? 'Good';
  const indoorLabel = metrics?.indoorLabel ?? 'Indoor Temperature';

  return (
    <CardLayout paddingSize={CardPadding.LARGE}>
      <View style={styles.titleSystem}>
        <MaterialCommunityIcons
          name="thermometer"
          size={24}
          color={isDarkMode ? '#60A5FA' : '#0047AB'}
        />
        <Text
          style={[
            styles.statusTemperature,
            isDarkMode && { backgroundColor: '#333333', color: '#9CA3AF' },
          ]}>
          {status}
        </Text>
      </View>

      <View>
        <View style={styles.temperatureContainer}>
          <Text style={[styles.temperature, { color: isDarkMode ? '#F9FAFB' : '#111827' }]}>
            {temperature.toFixed(1)}
          </Text>
          <Text style={[styles.temperatureUnit, { color: isDarkMode ? '#60A5FA' : '#0047AB' }]}>
            {unit}
          </Text>
        </View>
        <Text style={[styles.indoorTemperatureText, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
          {indoorLabel}
        </Text>
      </View>

      <View style={styles.airQualityContainer}>
        <Text style={[styles.airQualityTitle, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
          AIR QUALITY
        </Text>
        <Text style={[styles.airQualityText, { color: isDarkMode ? '#F9FAFB' : '#111827' }]}>
          {airQuality}
        </Text>
      </View>
    </CardLayout>
  );
}

const styles = StyleSheet.create({
  titleSystem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'space-between',
  },
  statusTemperature: {
    color: '#0047AB',
    fontSize: 14,
    fontWeight: '800',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  temperature: {
    fontSize: 54,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  temperatureUnit: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  indoorTemperatureText: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  airQualityContainer: {
    marginTop: 16,
    gap: 2,
  },
  airQualityTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  airQualityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
