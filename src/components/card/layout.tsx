import React, { ReactNode } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export enum CardPadding {
  SMALL = 16,
  LARGE = 24,
}

export interface CardLayoutProps {
  children: ReactNode;
  backgroundColor?: string;
  isFixedWidth?: boolean;
  isFixedWidthHeight?: boolean;
  paddingSize?: CardPadding;
  style?: StyleProp<ViewStyle>;
}

export function CardLayout({
  children,
  backgroundColor,
  isFixedWidth,
  isFixedWidthHeight,
  paddingSize = CardPadding.SMALL,
  style,
}: CardLayoutProps) {
  const { isDarkMode } = useTheme();
  const defaultBg = isDarkMode ? '#1E1E1E' : '#FFFFFF';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor || defaultBg,
          width: isFixedWidth ? 160 : undefined,
          height: isFixedWidthHeight ? 160 : 'auto',
          padding: paddingSize,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
