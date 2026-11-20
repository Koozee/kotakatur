import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export default function TabLayout() {
  const { isDarkMode } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? '#60A5FA' : '#0047AB',
        tabBarInactiveTintColor: isDarkMode ? '#6B7280' : '#9CA3AF',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: '#000',
          shadowOpacity: isDarkMode ? 0.4 : 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginBottom: 4,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="home-variant" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="format-list-checks" color={color} />,
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
