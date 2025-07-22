import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Theme } from "@/assets/theme";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthScreen } from "../utils/constants";

const SignupComp = () => {
  const nav = useNavigation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleLogin = (e: any) => {
    console.log(`name: ${name}, Password: ${password}, Phone: ${phone}`);
  };
  const switchToLogin = () => {
    // @ts-ignore
    nav.navigate(AuthScreen.Login as never);
  };
  const togglePasswordVisibility = () => {
    setShowPwd((prev) => !prev);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.infoText}>Welcome, Register</Text>
      <TextInput
        style={styles.inputText}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.nativeEvent.text)}
        textContentType="name"
      />

      <TextInput
        style={styles.inputText}
        placeholder="phone"
        value={phone}
        onChange={(e) => setPhone(e.nativeEvent.text)}
        textContentType="telephoneNumber"
        keyboardType="numeric"
        maxLength={10}
      />

      <TextInput
        style={styles.inputText}
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        textContentType="emailAddress"
        maxLength={10}
      />

      <TextInput
        style={styles.inputText}
        placeholder="Password"
        value={password}
        textContentType="password"
        secureTextEntry={!showPwd}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        right={
          <TextInput.Icon
            onPress={togglePasswordVisibility}
            icon={showPwd ? "eye-off" : "eye"}
          />
        }
      />

      <Button onPress={handleLogin} mode="contained" style={styles.loginBtn}>
        Signup
      </Button>
      <Button onPress={switchToLogin} mode="text">
        Already a member? Login
      </Button>
    </SafeAreaView>
  );
};

export default SignupComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontWeight: 500,
    fontSize: Theme.fonts.sizes.medium,
    padding: 10,
  },
  inputText: {
    width: Dimensions.get("window").width - 100,
    padding: 3,
    borderRadius: 25,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    fontSize: 15,
  },
  loginBtn: {
    width: Dimensions.get("window").width - 100,
    backgroundColor: Theme.colors.button
    
  },
});
