import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {View, StyleSheet, ScrollView} from 'react-native';
import Header from '../screens/Header';
import Footer from '../screens/Footer';

type LayoutProps = {
  children: React.ReactNode;
  navigation: any; // Pass navigation to the header
};

const Layout: React.FC<LayoutProps> = ({children, navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Static Header */}
      <Header navigation={navigation} />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {children}
      </ScrollView>

      {/* Static Footer */}
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  contentContainer: {
    paddingBottom: 80, // To ensure the footer doesn't overlap the content
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Layout;
