import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { HeaderCommon } from '@/components/headers/header-common';
import { DeviceCard } from '@/components/card/device';
import { DashboardOverview } from '@/components/home/dashboard-overview';
import { useHomeDashboard } from '@/hooks/use-home-dashboard';
import { useTheme } from '@/context/ThemeContext';

export function HomeScreen() {
  const { isDarkMode } = useTheme();
  const {
    devices,
    onlineCount,
    totalCount,
    sensorData,
    toggleDevice,
  } = useHomeDashboard();

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F9FAFB' }]}>
      <HeaderCommon />

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={
          <>
            <DashboardOverview
              onlineCount={onlineCount}
              totalCount={totalCount}
              sensorData={sensorData}
            />
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: isDarkMode ? '#9CA3AF' : '#526069' }]}>
                KONTROL PERANGKAT
              </Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <DeviceCard device={item} onToggle={toggleDevice} isGridItem />
        )}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 32,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  columnWrapper: {
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
});
