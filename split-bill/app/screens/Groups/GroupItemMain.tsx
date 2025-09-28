import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { ActivityIndicator, FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { GroupScreen } from '@/app/utils/constants'
import { useAppState } from '@/app/context/AppStateProvider'
import { getExpensesOfGroup, Expense } from '@/app/sql/expenses/get'
import GroupExpenseList from '@/app/component/groups/GroupExpenseList'

const GroupItemMain = () => {
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const {selectedGroup}=useAppState();
  const nav = useNavigation();
  const navToGroupExpense= ()=>{
    (nav as any).navigate(GroupScreen.GroupAddExpense);
  }
  useLayoutEffect(() => {
    if(!selectedGroup){
      return;
    }
    getExpensesOfGroup(selectedGroup?.id)
    .then((expense)=>{
      setExpenses(expense);
      setLoading(false);
    }).catch((error)=>{
      console.log("Error in getExpensesOfGroup: ", error);
    })
  
  }, [])
  return loading?(
    <ActivityIndicator style={styles.container}/>
  ):( 
    <View style={styles.container}>
      {/* <Text>GroupItemMain</Text> */}
      <GroupExpenseList expenses={expenses}/>
      <FAB style={styles.fab} onPress={navToGroupExpense} label='Add Expense' icon={"wallet-plus-outline"}/>
    </View>
  )
}

export default GroupItemMain

const styles = StyleSheet.create({
  container:{
    flex:1,
    // padding:20
  },
  fab:{
    position:'absolute',
    right:5,
    bottom:15,
  }
})