import {  Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper'

interface User {
  id: string | number;
  name?: string;
}

const SelectPercentage = ({user, splitPercentage, updateSplitPercentage}:{user: User, splitPercentage: number, updateSplitPercentage: (splitPercentage: number) => void}) => {
  const [split, setSplit]=useState(splitPercentage.toFixed(2));
  const updatePercentage = (val: string) => {
    // Update the input state (string)
    setSplit(val);
    // Parse to number for the callback; fallback to 0 if empty/invalid
    const num = parseFloat(val);
    updateSplitPercentage(Number.isNaN(num) ? 0 : num);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{user.name}</Text>
      <TextInput style={styles.input} value={split} onChangeText={updatePercentage} keyboardType="numeric" />
      <Button onPress={()=>setSplit(splitPercentage.toFixed(2))}>OK</Button>
    </View>
  )
}

export default SelectPercentage

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical:10,
  },
  text:{
    width:130
  },
  input:{
    width:Dimensions.get("window").width /2
  }
})