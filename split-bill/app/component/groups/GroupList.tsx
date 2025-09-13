import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/AuthProvider';
import { getGroupOfUser } from '@/app/sql/group-members/get';
import GroupListRenderItem from './GroupListRenderItem';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const {user:{ id }} = useAuth();
  
  useEffect(() => {
    // +id means converting from string to number- 
    // alternative- Number(id) or parseInt(id)
    getGroupOfUser(+id)
    .then(()=>setGroups([]))
    .catch((err)=>{
      console.log("Error while fetching groups of user: ", err);
    })
  
  }, [])
  
  return (
    groups.length>0&&(
      <FlatList style={styles.list} data={groups} renderItem={info=> <GroupListRenderItem group={info.item}/>}/>
    )
  )
}

export default GroupList

const styles = StyleSheet.create({
list:{
  paddingVertical:10,
  
}
})