import {  StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput, Button } from 'react-native-paper'

const SelectPercentage = ({user}:{user:any}) => {
  return (
    <View style={styles.container}>
      <Text>{user.name}</Text>
      <TextInput />
      <Button>OK</Button>
    </View>
  )
}

export default SelectPercentage

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:10,
    margin:10,
    borderRadius:5,
    borderWidth:1,
    borderColor:'#ccc'
  }
})