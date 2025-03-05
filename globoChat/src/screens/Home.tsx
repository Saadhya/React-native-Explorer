import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import Layout from '../components/Layout';
import {useAuth} from '../providers/AuthContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const Home: React.FC = () => {
  const {isLoggedIn, login, logout} = useAuth();
  const navigation = useNavigation<NavigationProp<any>>();
  const {chatDisconnect, isConnected} = useAuth();
  useEffect(() => {
    if (isConnected) {
      chatDisconnect();
    }
  }, [isLoggedIn, navigation]);

  return (
    <Layout navigation={navigation}>
      <View style={styles.screenContainer}>
        <Image
          source={require('../assets/logo.jpg')}
          style={[styles.banner, {width: 50, height: 50}]}
        />
        <Text style={styles.text}>
          {isLoggedIn
            ? 'Welcome to the Globo Home Screen!'
            : 'You are not logged in!'}
        </Text>
        <Button
          title={isLoggedIn ? 'Logout' : 'Login'}
          onPress={isLoggedIn ? logout : login}
        />
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

export default Home;
