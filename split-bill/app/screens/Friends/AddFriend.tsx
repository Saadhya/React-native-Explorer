import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SelectContacts } from '@/app/component/friends/SelectContacts';
import { Button } from 'react-native-paper';
import { useAuth } from '@/app/context/AuthProvider';
import { createFriendTransaction } from '@/app/sql/friends/add';
import { useNavigation } from '@react-navigation/native';
import { FriendsScreen } from '@/app/utils/constants';

const AddFriend = () => {
  const {user:{id}}= useAuth();
  const nav = useNavigation();
  const [selectedContacts, setSelectedContacts] = useState([]);
  console.log(selectedContacts);
  
  const addAsFriends=async()=>{
    console.log("add as friends", selectedContacts);
    try{
      const res = await createFriendTransaction(selectedContacts, +id);
      // console.log("friends added successfully: ", res);
      alert("friend added");
      (nav as any).navigate(FriendsScreen.AllFriends)
    }catch(e){
      console.log("error in adding friends", e);
    }
  }
  return (
    <View style={styles.container}>
      <Button mode='contained' onPress={addAsFriends} style={styles.addButton}>Add Friends</Button>
      <SelectContacts selectedContacts={selectedContacts} 
      setSelectedContacts={setSelectedContacts}/>
    </View>
  )
}

export default AddFriend;

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
  },
  addButton:{
    width:200,
    marginHorizontal:'auto',
    marginTop:20
  }
})