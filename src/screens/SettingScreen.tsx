import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { HeaderCommon } from '@/components/headers/header-common';

export function SettingScreen() {
  const { isDarkMode, toggleTheme } = useTheme();

  const bgColor = isDarkMode ? '#121212' : '#F8F9FA';
  const cardBg = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDarkMode ? '#F9FAFB' : '#111827';
  const subtextColor = isDarkMode ? '#9CA3AF' : '#6B7280';
  const borderColor = isDarkMode ? '#2D3748' : '#F3F4F6';
  const primaryBrand = isDarkMode ? '#60A5FA' : '#0047AB';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Header Konsisten */}
      <HeaderCommon />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Judul Halaman */}
        <View style={styles.titleSection}>
          <Text style={[styles.sectionCaption, { color: primaryBrand }]}>PENGATURAN</Text>
          <Text style={[styles.mainTitle, { color: textColor }]}>Preferensi & Sistem</Text>
        </View>

        {/* Grup 1: Tampilan & Tema */}
        <View style={styles.sectionGroup}>
          <Text style={[styles.groupTitle, { color: subtextColor }]}>TAMPILAN</Text>
          <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: isDarkMode ? '#374151' : '#E0E7FF' },
                  ]}>
                  <MaterialCommunityIcons
                    name={isDarkMode ? 'weather-night' : 'weather-sunny'}
                    size={22}
                    color={isDarkMode ? '#F59E0B' : '#0047AB'}
                  />
                </View>
                <View>
                  <Text style={[styles.itemTitle, { color: textColor }]}>Mode Gelap</Text>
                  <Text style={[styles.itemSubtitle, { color: subtextColor }]}>
                    {isDarkMode ? 'Tema gelap aktif' : 'Tema terang aktif'}
                  </Text>
                </View>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: '#D1D5DB', true: '#0047AB' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Grup 2: Konektivitas Kotakatur */}
        <View style={styles.sectionGroup}>
          <Text style={[styles.groupTitle, { color: subtextColor }]}>KONEKTIVITAS IOT</Text>
          <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
              <View style={styles.settingItemLeft}>
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: isDarkMode ? '#1E3A5F' : '#E0F2FE' },
                  ]}>
                  <MaterialCommunityIcons name="wifi" size={22} color="#0284C7" />
                </View>
                <View>
                  <Text style={[styles.itemTitle, { color: textColor }]}>Koneksi WiFi ESP32</Text>
                  <Text style={[styles.itemSubtitle, { color: subtextColor }]}>Terhubung: KotakAtur-Network</Text>
                </View>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={22} color={subtextColor} />
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: borderColor }]} />

            <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
              <View style={styles.settingItemLeft}>
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: isDarkMode ? '#14532D' : '#DCFCE7' },
                  ]}>
                  <MaterialCommunityIcons name="server-network" size={22} color="#16A34A" />
                </View>
                <View>
                  <Text style={[styles.itemTitle, { color: textColor }]}>MQTT Broker Status</Text>
                  <Text style={[styles.itemSubtitle, { color: subtextColor }]}>Online (Latency: 28ms)</Text>
                </View>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={22} color={subtextColor} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Grup 3: Notifikasi & Keamanan */}
        <View style={styles.sectionGroup}>
          <Text style={[styles.groupTitle, { color: subtextColor }]}>NOTIFIKASI & PERINGATAN</Text>
          <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: isDarkMode ? '#7F1D1D' : '#FEE2E2' },
                  ]}>
                  <MaterialCommunityIcons name="bell-ring-outline" size={22} color="#DC2626" />
                </View>
                <View>
                  <Text style={[styles.itemTitle, { color: textColor }]}>Peringatan Suhu Ekstrem</Text>
                  <Text style={[styles.itemSubtitle, { color: subtextColor }]}>Notifikasi jika suhu &gt; 35°C</Text>
                </View>
              </View>
              <Switch
                value={true}
                trackColor={{ false: '#D1D5DB', true: '#0047AB' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Grup 4: Tentang Aplikasi */}
        <View style={styles.sectionGroup}>
          <Text style={[styles.groupTitle, { color: subtextColor }]}>TENTANG</Text>
          <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: isDarkMode ? '#2D3748' : '#F3F4F6' },
                  ]}>
                  <MaterialCommunityIcons name="information-outline" size={22} color={subtextColor} />
                </View>
                <View>
                  <Text style={[styles.itemTitle, { color: textColor }]}>Versi Aplikasi</Text>
                  <Text style={[styles.itemSubtitle, { color: subtextColor }]}>KotakAtur v1.0.0 (Build 2026)</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  titleSection: {
    marginBottom: 20,
    paddingHorizontal: 4,
    gap: 4,
  },
  sectionCaption: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  sectionGroup: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  itemSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginLeft: 70,
  },
});
