import { useState, useMemo, useCallback } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { DeviceItem, SensorMetrics } from '@/types/device';
import { INITIAL_DEVICES, DEFAULT_SENSOR_METRICS } from '@/constants/devices';

export function useHomeDashboard(initialDevices: DeviceItem[] = INITIAL_DEVICES) {
  const [devices, setDevices] = useState<DeviceItem[]>(initialDevices);
  const [sensorData] = useState<SensorMetrics>(DEFAULT_SENSOR_METRICS);

  const toggleDevice = useCallback((id: string) => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === id ? { ...device, status: !device.status } : device
      )
    );
  }, []);

  const onlineCount = useMemo(() => {
    return devices.filter((d) => d.status).length;
  }, [devices]);

  const totalCount = devices.length;

  const isAllDevicesNormal = useMemo(() => {
    return totalCount > 0;
  }, [totalCount]);

  return {
    devices,
    sensorData,
    onlineCount,
    totalCount,
    isAllDevicesNormal,
    toggleDevice,
    setDevices,
  };
}
