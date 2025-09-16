import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAuth } from '../context/AuthProvider'

const AccountComp = () => {
  const {logout}= useAuth();
  const userLogout = async () => {
    await logout();
  }

  return (
    <ScrollView>
      <Text>Account</Text>
      <View>
        {/* picture */}
        {/* username */}
        {/* email */}
        {/* edit button */}
      </View>
      <Text>Preferences</Text>
      <View>
        {/* email settings */}
        {/* device and push notification */}
        {/* security */}
      </View>
      <View>
        {/* rate splitwise */}
        {/* contact split-bill support */}
      </View>
      <View> 
        <TouchableOpacity style={styles.logoutBtn} onPress={userLogout}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>

      
    </ScrollView>
  )
}

export default AccountComp;

const styles = StyleSheet.create({
  logoutBtn:{
    backgroundColor:'red',
    padding:10,
    borderRadius:5,
    marginTop:20,
    alignItems:'center',
    justifyContent:'center',
    width:100
  },
  btnText:{
    color:'white',
    fontWeight:'bold',
    fontSize:16,
  }
})