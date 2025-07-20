// components/Title.tsx
import { Theme } from '@/assets/theme';
import React from 'react';
import { Text, StyleSheet } from 'react-native';
// import { Theme } from '../config/theme';

export const Title = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.title}>{children}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: Theme.fonts.sizes.xlarge,
    color: Theme.colors.primary,
    fontFamily: Theme.fonts.bold,
  },
});
