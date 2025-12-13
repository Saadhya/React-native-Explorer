import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { Theme } from '@/assets/theme'

const ResetPassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reset Password</Text>
      <Text style={styles.subheading}>
        We’ll email you a link to reset your password.
      </Text>
      <Pressable style={styles.action}>
        <Text style={styles.actionText}>Send reset link</Text>
      </Pressable>
    </View>
  )
}

export default ResetPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Theme.colors.background,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: Theme.colors.primaryText,
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    color: Theme.colors.secondaryText,
    textAlign: 'center',
    marginBottom: 24,
  },
  action: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 999,
  },
  actionText: {
    color: Theme.colors.white,
    fontWeight: '600',
  },
})
