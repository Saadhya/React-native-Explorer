import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Theme } from '@/assets/theme'


const ForgetPassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
    </View>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
  title: {
    fontSize: 20,
    color: Theme.colors.primaryText,
    fontWeight: '600',
  },
})
