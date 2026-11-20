import { DeviceItem, SensorMetrics } from '@/types/device';

export const INITIAL_DEVICES: DeviceItem[] = [
  { id: '1', title: 'FAN', icon: 'fan', status: false, room: 'Living Room' },
  { id: '2', title: 'LED RGB', icon: 'led-strip-variant', status: false, room: 'Bedroom' },
  { id: '3', title: 'TERMINAL 1', icon: 'power-socket-eu', status: false, room: 'Office' },
  { id: '4', title: 'TERMINAL 2', icon: 'power-socket-eu', status: false, room: 'Kitchen' },
];

export const DEFAULT_SENSOR_METRICS: SensorMetrics = {
  temperature: 24.5,
  unit: '°C',
  status: 'OPTIMAL',
  airQuality: 'Good',
  indoorLabel: 'Indoor Temperature',
};
