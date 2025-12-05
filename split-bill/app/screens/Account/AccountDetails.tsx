import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/app/context/AuthProvider';
import AccountComp from '@/app/component/account/AccountComp';

const AccountDetails = () => {
  const auth = useAuth();

  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(auth?.user)}</Text> */}
      <AccountComp/>
    </View>
  )
}

export default AccountDetails

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    marginVertical:10
  }
})