import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/app/context/AuthProvider'
import { FriendsScreen } from '@/app/utils/constants'
import { useNavigation } from 'expo-router'


const RenderItem =({data, user, navigation}:any)=>{
    return(
        <View style={styles.renderBox} 
        onTouchEnd={()=>navigation.navigate(FriendsScreen.FriendPage, 
          {users:[{...data}, {...user}]
        })}>
            <Text>{data.name}</Text>
        </View>
    )
}

const FriendsList = ({friends}:any) => {
   const {user}= useAuth();
   const nav = useNavigation();
  return (
    <View style={styles.listContainer}>
      <FlatList
      data={friends}
      renderItem={(info:any)=><RenderItem data={info.item} user={user} navigation={nav}/>}
      keyExtractor={(item:any)=>item.id}
      />
    </View>
  )
}

export default FriendsList

const styles = StyleSheet.create({
  listContainer:{
    flex:1,
    padding:20,
    margin:10
  },
  renderBox:{
    borderWidth:1,
    borderColor:'black',
    padding:10,
    margin:4,
    borderRadius:10
  }
})