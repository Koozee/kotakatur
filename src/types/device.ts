import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface DeviceItem {
  id: string;
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  status: boolean;
  category?: string;
  room?: string;
}

export interface SensorMetrics {
  temperature: number;
  unit: string;
  status: 'OPTIMAL' | 'NORMAL' | 'WARNING';
  airQuality: 'Good' | 'Moderate' | 'Poor';
  indoorLabel: string;
}
