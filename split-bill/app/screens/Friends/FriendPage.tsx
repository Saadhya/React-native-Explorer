import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { FriendsStackParamList } from '@/app/navigation/types'
import { FAB } from 'react-native-paper'
import { FriendsScreen } from '@/app/utils/constants'

const FriendPage = () => {
  const route = useRoute<RouteProp<FriendsStackParamList, 'FriendPage'>>()
  const { users } = route.params;
const nav = useNavigation();
  const navToFriendAddExpense = () => {
    (nav as any).navigate(FriendsScreen.FriendAddExpense, { users })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends page and Expenses</Text>
      <Text>{JSON.stringify(users)}</Text>
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