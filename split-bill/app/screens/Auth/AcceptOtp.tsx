import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native'
import { Theme } from '@/assets/theme'

const AcceptOtp = () => {
  const [otp, setOtp] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Verify your phone</Text>
      <Text style={styles.subheading}>
        Enter the six-digit code we sent to your device. It expires in 02:13.
      </Text>

      <View style={styles.inputWrapper}>
        <TextInput
          value={otp}
          onChangeText={setOtp}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="••••••"
          placeholderTextColor={Theme.colors.secondaryText}
        />
      </View>

      <Pressable style={styles.action} android_ripple={{ color: '#ffffff20' }}>
        <Text style={styles.actionText}>Verify code</Text>
      </Pressable>

      <Pressable style={styles.resendButton}>
        <Text style={styles.resendText}>Resend code</Text>
      </Pressable>

      <Text style={styles.helper}>
        Having trouble receiving the code? Check your network or try a different
        number.
      </Text>
    </View>
  )
}

export default AcceptOtp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: Theme.colors.primaryText,
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    color: Theme.colors.secondaryText,
    lineHeight: 22,
    marginBottom: 28,
  },
  inputWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  input: {
    width: '60%',
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: Theme.colors.surface,
    color: Theme.colors.primaryText,
    letterSpacing: 12,
  },
  action: {
    backgroundColor: Theme.colors.primary,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  actionText: {
    color: Theme.colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  resendButton: {
    alignSelf: 'center',
    padding: 12,
  },
  resendText: {
    color: Theme.colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  helper: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    color: Theme.colors.secondaryText,
  },
})
