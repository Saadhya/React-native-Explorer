import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Theme } from "@/assets/theme";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthScreen } from "../utils/constants";

const LoginComp = () => {
  const nav = useNavigation();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const handleLogin = (e: any) => {
    console.log(`User ID: ${userId}, Password: ${password}`);
  };
  const switchToSignup = () => {
    // @ts-ignore
    nav.navigate(AuthScreen.Signup as never);
  };
  const togglePasswordVisibility = () => {
    setShowPwd((prev) => !prev);
    console.log(showPwd);
    
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.infoText}>Welcome back, Login</Text>
      <TextInput
        style={styles.inputText}
        placeholder="User id"
        value={userId}
        onChange={(e) => setUserId(e.nativeEvent.text)}
        textContentType="username"
      />

      <TextInput
        style={styles.inputText}
        placeholder="Password"
        value={password}
        textContentType="password"
        secureTextEntry={!showPwd}
        maxLength={15}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        right={
          <TextInput.Icon
            onPress={togglePasswordVisibility}
            icon={showPwd ? "eye-off" : "eye"}
          />
        }
      />

      <Button onPress={handleLogin} mode="contained" style={styles.loginBtn}>
        Login
      </Button>
      <Button onPress={switchToSignup} mode="text">
        New User? Signup
      </Button>
    </SafeAreaView>
  );
};

export default LoginComp;

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
