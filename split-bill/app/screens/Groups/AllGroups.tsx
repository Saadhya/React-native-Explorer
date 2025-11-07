import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GroupContent from '@/app/component/groups'

const AllGroups = () => {
  return (
    <View style={styles.container}>
      <GroupContent/>
    </View>
  )
}

export default AllGroups

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    // alignItems:"center",
    padding:20,
  }
})