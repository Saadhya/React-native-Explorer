import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { FriendsStackParamList } from '@/app/navigation/types'
import { ActivityIndicator, FAB } from 'react-native-paper'
import { FriendsScreen } from '@/app/utils/constants'
import { getSettlementBetweenFriend } from '@/app/sql/payments/get'
import GroupExpenseList from '@/app/component/groups/GroupExpenseList'

const FriendPage = () => {
  const route = useRoute<RouteProp<FriendsStackParamList, 'FriendPage'>>()
  const { users } = route.params;
  const [loading, setLoading]= useState(true);
  const [expenses, setExpenses]=useState([]);

  const nav = useNavigation();
  const navToFriendAddExpense = () => {
    (nav as any).navigate(FriendsScreen.FriendAddExpense, { users })
  }
  useLayoutEffect(()=>{
      getSettlementBetweenFriend(+users[0].id, +users[1].id)
      .then((res:any)=>{
          setExpenses(res);
      })
      .then(()=>{
          setLoading(false);
      })
      .catch((e)=>{
          console.log("error in getting expenses", e);
      })
  },[] )
  return loading? <ActivityIndicator size={30} style={{margin:'auto'}} /> 
  : (
    <View style={styles.container}>
      <Text style={styles.title}>Friends page and Expenses</Text>
      <Text>{JSON.stringify(expenses)}</Text>
      <GroupExpenseList expenses={expenses} isFriend={true}/>
      <FAB icon="wallet-plus-outline" label='Add Expense' 
      style={styles.fab} onPress={ navToFriendAddExpense} />
    </View>
  )
}

export default FriendPage

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    marginVertical:20
  },
  fab:{
    position:'absolute',
    right:5,
    bottom:15,
  }
})