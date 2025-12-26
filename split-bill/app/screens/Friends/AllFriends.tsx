import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { ActivityIndicator, Button, FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { FriendsScreen } from '@/app/utils/constants'
import { getFriendsOfUser } from '@/app/sql/friends/get'
import { useAuth } from '@/app/context/AuthProvider'
import FriendsList from '@/app/component/friends/FriendsList'
 
const AllFriends = () => {
  const nav = useNavigation();
const {user:{id}}=useAuth();
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState<any[]>([]);
  const navToAddExpense= ()=>{
    (nav as any).navigate(FriendsScreen.FriendAddExpense, { users: friends });
  }
  const navToAddFriends=()=>{
    (nav as any).navigate (FriendsScreen.AddFriend);
  }

  useLayoutEffect(()=>{
    getFriendsOfUser(id)
     .then((frnds)=>{
      setFriends(frnds);
      setLoading(false)
      console.log("Friends of user: ", friends);
    })
    .catch((error)=>{
      console.log("Error in getFriendsOfUser: ", error);
    })
  },[])
  return loading?
  <ActivityIndicator/>
  :
  (
    <View style={styles.container}>
      <Text style={styles.title}>AllFriends</Text>
      <FriendsList friends={friends}/>
      <Button style={{width:200}} onPress={navToAddFriends} mode='outlined'>Add more Friends</Button>
      <FAB style={styles.fab} onPress={navToAddExpense} label='Add Friends ' icon={"wallet-plus-outline"}/>
 
    </View>
  )
}

export default AllFriends;

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20
  },
  fab:{
    position:'absolute',
    right:5, 
    bottom:15,
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    marginVertical:20
  }
})