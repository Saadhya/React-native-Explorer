import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useAuth } from '@/app/context/AuthProvider'
import { Avatar, Button, Divider, IconButton, List, Switch, useTheme } from 'react-native-paper'

const SectionCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme()
  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      {children}
    </View>
  )
}

const SectionRow: React.FC<{
  title: string
  description?: string
  icon: string
  accent?: boolean
  right?: React.ReactNode
}> = ({ title, description, icon, accent, right }) => (
  <View style={styles.sectionRow}>
    <List.Icon icon={icon} color={accent ? '#3c7dff' : '#5c5c5c'} />
    <View style={styles.sectionText}>
      <Text style={[styles.sectionTitle, accent && styles.sectionTitleAccent]}>{title}</Text>
      {!!description && <Text style={styles.sectionDesc}>{description}</Text>}
    </View>
    <View style={styles.sectionRight}>{right}</View>
  </View>
)

const AccountComp = () => {
  const theme = useTheme()
  const { logout, user } = useAuth()
  const [twoFA, setTwoFA] = useState(true)
  const [loginAlerts, setLoginAlerts] = useState(true)
  const [pushNotif, setPushNotif] = useState(true)
  const [emailPref, setEmailPref] = useState(false)
  const [profileVisibility, setProfileVisibility] = useState(false)

  const userLogout = async () => {
    await logout()
  }

  const infoFields = useMemo(
    () => [
      { title: 'Full Name', description: user?.name ?? '—', icon: 'account' },
      { title: 'Email', description: user?.email ?? '—', icon: 'email' },
      { title: 'Phone', description: user?.phone ?? '—', icon: 'phone' },
    ],
    [user?.email, user?.name, user?.phone]
  )

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* <View style={styles.hero}>
        <Text style={styles.heroTitle}>Account</Text>
        <Text style={styles.heroSubtitle}>Manage your split-bill profile, preferences, and security in one airy place.</Text>
        <View style={styles.heroActions}>
          <Button mode="contained" style={styles.heroButton}>
            Share Split Link
          </Button>
          <Button mode="text" textColor={theme.colors.primary} style={styles.heroButton}>
            View Transactions
          </Button>
        </View>
      </View> */}

      <SectionCard>
        <View style={styles.profileTop}>
          <Avatar.Text
            label={(user?.name?.[0] ?? 'U').toUpperCase()}
            size={56}
            style={{ backgroundColor: theme.colors.primary }}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{user?.name ?? 'User'}</Text>
            <Text style={styles.profileEmail}>{user?.email ?? 'No email set'}</Text>
          </View>
          <IconButton 
            icon="share-variant"
            size={24}
            iconColor='white'
            style={{position: 'absolute', right: 0}}
            onPress={() => console.log('user shared app')}
          />
        </View>
        <View style={styles.profileActions}>
          <Button mode="outlined" compact style={styles.profileActionChip}>
            Change Photo
          </Button>
          <Button mode="contained" compact style={styles.profileActionChip}>
            Edit Profile
          </Button>
        </View>
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionLabel}>Personal Info</Text>
        {infoFields.map((field, index) => (
          <React.Fragment key={field.title}>
            <SectionRow {...field} right={<List.Icon icon="chevron-right" />} />
            {index !== infoFields.length - 1 && <Divider style={styles.divider} />}
          </React.Fragment>
        ))}
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionLabel}>Security & Alerts</Text>
        <SectionRow
          title="Password"
          description="Last changed • 3 months ago"
          icon="lock"
          right={<Button compact mode="text">Update</Button>}
        />
        <Divider style={styles.divider} />
        <SectionRow
          title="Two-Factor Authentication"
          icon="shield-check"
          right={<Switch value={twoFA} onValueChange={setTwoFA} />}
        />
        <Divider style={styles.divider} />
        <SectionRow
          title="Login Alerts"
          description="Notify me about new device sign-ins"
          icon="bell"
          right={<Switch value={loginAlerts} onValueChange={setLoginAlerts} />}
        />
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionLabel}>Preferences</Text>
        <SectionRow
          title="Push Notifications"
          icon="bell-ring"
          right={<Switch value={pushNotif} onValueChange={setPushNotif} />}
        />
        <Divider style={styles.divider} />
        <SectionRow
          title="Email Preferences"
          icon="email-alert"
          right={<Switch value={emailPref} onValueChange={setEmailPref} />}
        />
        <Divider style={styles.divider} />
        <SectionRow
          title="Profile Visibility"
          description="Show notifications on your profile"
          icon="eye-off"
          right={<Switch value={profileVisibility} onValueChange={setProfileVisibility} />}
        />
      </SectionCard>

     

      <View style={styles.bottomActions}>
        <Button mode="outlined" style={styles.actionBtn} onPress={userLogout}>
          Sign Out
        </Button>
        <Button mode="contained" style={[styles.actionBtn, styles.saveBtn]}>
          Save Changes
        </Button>
      </View>
    </ScrollView>
  )
}

export default AccountComp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    // backgroundColor: '#ffffff',
  },
  content: {
    // padding: 16,
    gap: 16,
  },
  hero: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#f4f6fb',
    shadowColor: '#c9d8ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
    lineHeight: 20,
  },
  heroActions: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  heroButton: {
    borderRadius: 12,
    flex: 1,
  },
  card: {
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#d8d8d8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileDetails: {
    marginLeft: 4,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f5f2f2ff',
  },
  profileEmail: {
    fontSize: 12,
    color: '#c2bfbfff',
  },
  profileActions: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
  },
  profileActionChip: {
    borderRadius: 999,
    minWidth: 100,
    paddingHorizontal: 10,
    },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d4cfcfff',
    marginBottom: 8,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 14,
  },
  sectionText: {
    flex: 1,
    marginLeft: -6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#c4bfbfff',
  },
  sectionTitleAccent: {
    color: '#ff6b6b',
  },
  sectionDesc: {
    fontSize: 12,
    color: '#969393ff',
    marginTop: 2,
  },
  sectionRight: {
    marginLeft: 4,
  },
  divider: {
    backgroundColor: '#ededed',
    marginHorizontal: -8,
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  actionBtn: {
    borderRadius: 12,
    flex: 1,
  },
  saveBtn: {
    backgroundColor: '#1d4ed7',
  },
})