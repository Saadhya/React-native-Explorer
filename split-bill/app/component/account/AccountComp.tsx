import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/app/context/AuthProvider'
import { Avatar, Button, Divider, List, Switch, useTheme } from 'react-native-paper'

const SectionCard: React.FC<{ children: React.ReactNode }>=({children})=>{
  const theme = useTheme()
  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      {children}
    </View>
  )
}

const AccountComp = () => {
  const theme = useTheme()
  const { logout, user } = useAuth();
  const [twoFA, setTwoFA] = useState(true)
  const [loginAlerts, setLoginAlerts] = useState(true)
  const [pushNotif, setPushNotif] = useState(true)
  const [emailPref, setEmailPref] = useState(false)
  const [profileVisibility, setProfileVisibility] = useState(false)

  const userLogout = async () => {
    await logout();
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#0f1311' }]} contentContainerStyle={styles.content}>
      {/* Header */}
      <Text style={[styles.header, { color: theme.colors.onBackground }]}>Account Settings</Text>

      {/* Profile Card */}
      <SectionCard>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Avatar.Text label={(user?.name?.[0] ?? 'U').toUpperCase()} size={56} style={{ backgroundColor: theme.colors.primary }} />
            <View style={{ marginLeft: 12 }}>
              <Text style={[styles.title, { color: theme.colors.onSurface }]}>{user?.name ?? 'User'}</Text>
              <Text style={[styles.caption, { color: theme.colors.onSurface }]}>{user?.email ?? ''}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Button mode="outlined" style={styles.chipBtn}>Change Photo</Button>
            <Button mode="contained" style={{ marginLeft: 8 }}>Edit Profile</Button>
          </View>
        </View>
      </SectionCard>

      {/* Personal Info */}
      <SectionCard>
        <List.Subheader style={styles.subheader}>Personal Info</List.Subheader>
        <List.Item title="Full Name" description={user?.name ?? '—'} left={props => <List.Icon {...props} icon="account" />} right={props => <List.Icon {...props} icon="chevron-right" />} />
        <Divider />
        <List.Item title="Email" description={user?.email ?? '—'} left={props => <List.Icon {...props} icon="email" />} right={props => <List.Icon {...props} icon="chevron-right" />} />
        <Divider />
        <List.Item title="Phone" description={user?.phone ?? '—'} left={props => <List.Icon {...props} icon="phone" />} right={props => <List.Icon {...props} icon="chevron-right" />} />
      </SectionCard>

      {/* Security */}
      <SectionCard>
        <List.Subheader style={styles.subheader}>Security</List.Subheader>
        <List.Item title="Password" description="Last changed • 3 months ago" left={props => <List.Icon {...props} icon="lock" />} right={props => <Button compact mode="text">Update</Button>} />
        <Divider />
        <List.Item title="Two-Factor Authentication" left={props => <List.Icon {...props} icon="shield-check" />} right={() => <Switch value={twoFA} onValueChange={setTwoFA} />} />
        <Divider />
        <List.Item title="Login Alerts" description="Notify me about new device sign-ins" left={props => <List.Icon {...props} icon="bell" />} right={() => <Switch value={loginAlerts} onValueChange={setLoginAlerts} />} />
      </SectionCard>

      {/* Preferences */}
      <SectionCard>
        <List.Subheader style={styles.subheader}>Preferences</List.Subheader>
        <List.Item title="Theme" description="Light / Dark" left={props => <List.Icon {...props} icon="theme-light-dark" />} right={props => <List.Icon {...props} icon="chevron-right" />} />
        <Divider />
        <List.Item title="Push Notifications" left={props => <List.Icon {...props} icon="bell-ring" />} right={() => <Switch value={pushNotif} onValueChange={setPushNotif} />} />
        <Divider />
        <List.Item title="Email Preferences" left={props => <List.Icon {...props} icon="email-alert" />} right={() => <Switch value={emailPref} onValueChange={setEmailPref} />} />
      </SectionCard>

      {/* Privacy & Data */}
      <SectionCard>
        <List.Subheader style={styles.subheader}>Privacy & Data</List.Subheader>
        <List.Item title="Profile Visibility" description="Show notifications on your profile" left={props => <List.Icon {...props} icon="eye-off" />} right={() => <Switch value={profileVisibility} onValueChange={setProfileVisibility} />} />
        <Divider />
        <List.Item title="Export Data" description="Download your data archive" left={props => <List.Icon {...props} icon="download" />} right={props => <Button compact mode="text">Request</Button>} />
        <Divider />
        <List.Item title="Delete Account" description="This is permanent and cannot be undone" left={props => <List.Icon {...props} icon="alert" />} right={props => <Button compact mode="outlined" textColor="#ff6b6b">Start</Button>} />
      </SectionCard>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <Button mode="outlined" style={styles.actionBtn} onPress={userLogout}>Sign Out</Button>
        <Button mode="contained" style={[styles.actionBtn, { flex: 1 }]}>Save Changes</Button>
      </View>
    </ScrollView>
  )
}

export default AccountComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 12,
  },
  header: {
    marginBottom: 4,
    fontWeight: '600',
    color: '#fff',
    fontSize: 20,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  caption: {
    opacity: 0.7,
    fontSize: 12,
  },
  card: {
    borderRadius: 16,
    padding: 12,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chipBtn: {
    borderRadius: 999,
  },
  subheader: {
    opacity: 0.7,
    marginTop: 4,
    marginBottom: 4,
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  actionBtn: {
    borderRadius: 10,
  },
})