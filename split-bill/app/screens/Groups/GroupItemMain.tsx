import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { GroupScreen } from '@/app/utils/constants'

const GroupItemMain = () => {
  const nav = useNavigation();
  const navToGroupExpense= ()=>{
    (nav as any).navigate(GroupScreen.GroupAddExpense);
  }

  return (
    <View>
      <Text>GroupItemMain</Text>
      <FAB onPress={navToGroupExpense} label='Add Expense' icon={"wallet-plus-outline"}/>
    </View>
  )
}

export default GroupItemMain

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  fab:{
    position:'absolute',
    right:5,
    bottom:15,
  }
})