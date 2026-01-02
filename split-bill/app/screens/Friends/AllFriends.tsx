import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, Button, FAB } from 'react-native-paper'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { FriendsScreen } from '@/app/utils/constants'
import { getFriendsOfUser } from '@/app/sql/friends/get'
import { useAuth } from '@/app/context/AuthProvider'
import FriendsList from '@/app/component/friends/FriendsList'

const AllFriends = () => {
  const nav = useNavigation();
  const {
    user:{id},
  } = useAuth();
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState<any[]>([]);

  const navToAddFriends=()=>{
    (nav as any).navigate (FriendsScreen.AddFriend);
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setLoading(true);

      getFriendsOfUser(id)
        .then((frnds)=>{
          if (!isActive) return;
          setFriends(frnds);
        })
        .catch((error)=>{
          if (!isActive) return;
          console.log("Error in getFriendsOfUser: ", error);
        })
        .finally(()=>{
          if (!isActive) return;
          setLoading(false);
        });

      return () => {
        isActive = false;
      };
    }, [id])
  );

  return loading?
  <ActivityIndicator/>
  :
  (
    <View style={styles.container}>
      <Text style={styles.title}>All Friends</Text>
      <FriendsList friends={friends}/>
      <Button style={styles.btn} onPress={navToAddFriends} mode='outlined'>Add more Friends</Button>
      {/* <FAB style={styles.fab} onPress={navToAddExpense} label='Add Friends ' icon={"wallet-plus-outline"}/> */}
    </View>
  )
}

export default AllFriends;

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
  },
  btn:{
    width:200,
    marginVertical:20,
    marginHorizontal:'auto'
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