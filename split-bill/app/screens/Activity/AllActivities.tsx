import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useAuth } from '@/app/context/AuthProvider';
import { getActivitiesOfUser } from '@/app/sql/activity/get';
import { useFocusEffect } from '@react-navigation/native';

const RenderActivityItem= ({data}: {data: any})=>{
  return(
    <View style={styles.itemContainer}>
      <Text style={styles.text}>{data.activity}</Text>
    </View>
  )
}
const AllActivities = () => {
  const [activities, setActivities] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const {user:{id}} = useAuth();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      if (!id) {
        setHasFetched(true);
        return () => {
          isActive = false;
        };
      }

      setHasFetched(false);
      getActivitiesOfUser(id)
        .then((res:any)=>{
          if (!isActive) return;
          // console.log("respon activit : ", res);
          setActivities(res);
        })
        .catch((err:any)=>{
          if (!isActive) return;
          console.log("Error in getActivitiesOfUser: ", err);
        })
        .finally(()=>{
          if (!isActive) return;
          setHasFetched(true);
        });

      return () => {
        isActive = false;
      };
    }, [id])
  );
  return (
    <View>
      {hasFetched && activities?.length === 0 && <Text>No activities found</Text>}
      <FlatList<any>
      keyExtractor={(item)=>String(item?.id+item?.created_at)}
      data={activities} renderItem={({item})=><RenderActivityItem data={item}/>}
      />
    </View>
  )
}

export default AllActivities

const styles = StyleSheet.create({
  itemContainer:{
    margin:10,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    backgroundColor:'#e1ddddff',
    fontSize:15,
    margin:5,
    borderColor:'black',
    borderWidth:1,
    borderRadius:10,
    padding:10,
  }
})