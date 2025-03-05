import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {AuthContext, useAuth} from '../providers/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type HeaderProps = {
  navigation: any;
};

const Header: React.FC<HeaderProps> = ({navigation}) => {
  const {isLoggedIn, login, logout, chatUser} = useAuth();
  const [username, setUsername] = React.useState<string>('');
  const [profilePic, setProfilePic] = React.useState<string>('');
  // Handle login and user data
  const handleLogin = () => {
    login();
    chatUser({username, profilePic});
  };

  let userDisplay = isLoggedIn ? (
    <TouchableOpacity onPress={() => logout()}>
      <Icon name="account-circle" size={30} color="#fff" />
    </TouchableOpacity>
  ) : (
    <Icon name="account-off" size={30} color="#fff" />
  );
  return (
    <View style={styles.headerContainer}>
      <Image style={styles.logo} source={require('../assets/logo.jpg')} />
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navButton}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navButton}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chats')}>
          <Text style={styles.navButton}>GloboChat</Text>
        </TouchableOpacity>
        {isLoggedIn ? (
          ''
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.navButton}>Register</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.menu}>{userDisplay}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    height: 100,
    top: 50,
    width: '100%',
    paddingHorizontal: 5,
  },
  logo: {
    height: 40,
    width: '25%',
    resizeMode: 'stretch',
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
  navButtons: {
    flexDirection: 'row',
  },
  navButton: {
    marginLeft: 20,
    color: '#fff',
    fontSize: 16,
  },
  menu: {
    fontSize:16,
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
});

export default Header;
