import React, {useState} from 'react';
import {View, TextInput, Button, Alert, Text} from 'react-native';
import {useAuth} from '../providers/AuthContext';

const RegisterPage: React.FC = ({navigation}: any) => {
  const {chatUser, login} = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [profilePic, setProfilePic] = useState<string>('');

  // Handle registration
  const handleRegister = async () => {
    if (username === '' || profilePic === '') {
      Alert.alert('Please fill in all fields');
      return;
    }

    // Save user data in AsyncStorage
    chatUser({username, profilePic});
    login(); // Set login state to true
    Alert.alert('Registration successful!');
    navigation.navigate('Home'); // Navigate to HomePage after registration
  };

 
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Register</Text>
      <TextInput
        style={{
          width: 200,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
        }}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />
       {/* <TextInput
        style={{
          width: 200,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
        }}
        textContentType='password'
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
      /> */}
      <TextInput
        style={{
          width: 200,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
        }}
        placeholder="Enter profile picture URL"
        value={profilePic}
        onChangeText={setProfilePic}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default RegisterPage;
