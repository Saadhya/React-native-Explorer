import { StyleSheet,  View } from 'react-native'
import React from 'react'
import LoginComp from '@/app/component/LoginComp'
import { Theme } from '@/assets/theme'

const Login = () => {
  return (
    <View style={styles.container}>
     <LoginComp/>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    backgroundColor: Theme.colors.background,    
    alignItems:"center",
  }
})