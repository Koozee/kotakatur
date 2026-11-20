import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ComponentBreakdownCard } from '@/components/card/component-breakdown';
import { TemperatureCard } from '@/components/card/temperature';
import { SensorMetrics } from '@/types/device';

interface DashboardOverviewProps {
  onlineCount?: number;
  totalCount?: number;
  systemStatusMessage?: string;
  sensorData?: Partial<SensorMetrics>;
}

export function DashboardOverview({
  onlineCount,
  totalCount,
  systemStatusMessage,
  sensorData,
}: DashboardOverviewProps) {
  return (
    <View style={styles.container}>
      <ComponentBreakdownCard
        onlineCount={onlineCount}
        totalCount={totalCount}
        statusMessage={systemStatusMessage}
      />
      <TemperatureCard metrics={sensorData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    marginBottom: 8,
  },
});
