import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { useAuth } from '../providers/AuthContext';

const LoginPage: React.FC = ({ navigation }: any) => {
  const { login, chatUser, getUser, isLoggedIn } = useAuth();
  const [username, setUsername] = useState<string>('');

  // Handle login
  const handleLogin = async () => {
    if (username === '') {
      Alert.alert('Please enter a username');
      return;
    }

    // Check if user data exists in AsyncStorage
    await getUser(); // Get user from AsyncStorage
    if (username === 'existingUsername') { // For example, match username logic
      login();
      navigation.navigate('Home'); // Redirect to HomePage after login
    } else {
      Alert.alert('User not found. Please register first.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginPage;
