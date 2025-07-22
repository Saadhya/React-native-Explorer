import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SignupComp from '@/app/component/SignupComp'
import { Theme } from '@/assets/theme'

const Signup = () => {
  return (
    <View style={styles.container}>
      <SignupComp/>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background    
  },
})