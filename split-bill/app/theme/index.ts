import { MD3LightTheme, type MD3Theme } from 'react-native-paper';

// Central Paper theme for the app
// Primary color set to blue
export const appTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // You can tweak these as desired
    primary: '#1E88E5', // Blue 600
    primaryContainer: '#90CAF9',
    secondary: '#03DAC6',
    background: '#0f1311',
    surface: '#1e2420',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
  },
};
