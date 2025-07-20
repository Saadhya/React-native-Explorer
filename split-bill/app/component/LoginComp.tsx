import {  Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Theme } from '@/assets/theme'
import { TextInput, Button } from 'react-native-paper'

const LoginComp = () => {
  const [userId, setUserId]= useState('');
  const [password, setPassword]= useState('');
  const handleLogin=()=>{
    alert('loggedin');
  }
  const handleSignup=()=>{
    alert('loggedin');
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.infoText}>Welcome back, Login</Text>
      <TextInput style={styles.inputText} placeholder='User id' 
      value={userId}
      onChange={()=>setUserId}/>

      <TextInput style={styles.inputText} placeholder='Password' 
      value={password}
      onChange={()=>setPassword}/>

      <Button onPress={handleLogin} mode='contained' style={styles.loginBtn}>Login</Button>
      <Text>New User? <Button onPress={handleSignup} mode='outlined'>Signup</Button></Text>
      
    </SafeAreaView>
  )
}

export default LoginComp

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:40,
    },
    infoText:{
        fontWeight:500,
        fontSize:Theme.fonts.sizes.medium
    },
    inputText:{
      width:Dimensions.get("window").width-100,
      padding:5,
      borderRadius:12,
      marginBottom:10,
      fontSize:15
    },
    loginBtn:{
      width:Dimensions.get("window").width-100,
      // fontSize:20
    }
})