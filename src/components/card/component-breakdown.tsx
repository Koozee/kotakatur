import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { CardLayout, CardPadding } from './layout';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ComponentBreakdownCardProps {
  title?: string;
  statusMessage?: string;
  onlineCount?: number;
  totalCount?: number;
}

export function ComponentBreakdownCard({
  title = 'System Status',
  statusMessage = 'Semua perangkat dalam keadaan baik.',
  onlineCount = 4,
}: ComponentBreakdownCardProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.2,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, [fadeAnim]);

  return (
    <CardLayout backgroundColor="#0047AB" paddingSize={CardPadding.LARGE}>
      <View style={styles.titleSystem}>
        <MaterialCommunityIcons name="rocket-launch" size={24} color="white" />
        <Text style={styles.titleSystemText}>{title}</Text>
      </View>

      <Text style={styles.statusDeviceText}>{statusMessage}</Text>

      <View style={styles.devicesOnlineRow}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <MaterialCommunityIcons name="circle" size={16} color="#90EE90" />
        </Animated.View>
        <Text style={styles.devicesOnlineText}>{onlineCount} Devices Online</Text>
      </View>
    </CardLayout>
  );
}

const styles = StyleSheet.create({
  titleSystem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    opacity: 0.8,
  },
  titleSystemText: {
    color: '#E3F2FD',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusDeviceText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 12,
    lineHeight: 34,
  },
  devicesOnlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
  },
  devicesOnlineText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
