import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Layout from '../components/Layout';

import { NavigationProp, useNavigation } from '@react-navigation/native';

const Profile: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <Layout navigation={navigation}>
      <View style={styles.screenContainer}>
        <Image
          source={require('../assets/logo.jpg')}
          style={[styles.banner, {width: 50, height: 50}]}
        />

        <Text style={styles.text}>This is the Profile Screen!</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  banner: {
    width: '100%',
    height: 300,
    resizeMode: 'stretch',
  },
});

export default Profile;
