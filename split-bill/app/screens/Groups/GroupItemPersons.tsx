import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useAppState } from "@/app/context/AppStateProvider";
import { getMembersOfGroup } from "@/app/sql/group-members/get";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { GroupScreen } from "@/app/utils/constants";
import { Feather } from "@expo/vector-icons";

const RenderGroupItem=({data}: {data:any})=>{

  return(
    <View style={styles.itemContainer}>
      <Feather name="user" size={24} color="black" />
      <View style={styles.row}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.caption}>{data.phone}</Text>
      </View>
    </View>
  )
}
const GroupItemPersons = () => {
  const nav = useNavigation();
  // const [members, setMembers] = useState<any[]>([]);
  const { selectedGroup, setGroupMembers, groupMembers } = useAppState();
  console.log("item persons: " + selectedGroup?.id);

  useLayoutEffect(() => {
    // fetch group members from db using selectedGroup
    if(selectedGroup?.id){
      getMembersOfGroup(+selectedGroup?.id)
        .then(setGroupMembers)
        .catch((err) => {
          console.log("error while fetching group members: ", err);
        }); //  + unary + operator to convert string to number
    }
    nav.addListener('focus',()=>{
      (selectedGroup?.id) &&
        getMembersOfGroup(+selectedGroup?.id)
            .then(setGroupMembers)
            .catch((err) => {
              console.log("error while fetching group members: ", err);
            }); 
        })
  }, []);

  const navToAddMembers = () => {
    (nav as any).navigate(GroupScreen.AddGroupMembers, {groupMembers});
  }

  return (
    <View>
      <Button mode="contained" onPress={navToAddMembers} style={styles.addBtn}>Add New Members</Button>
      <FlatList data={groupMembers} 
        keyExtractor={(item)=>item.id+item.created_at}
        renderItem={({item})=><RenderGroupItem data={item}/>}
      />
    </View>
  );
};

export default GroupItemPersons;

const styles = StyleSheet.create({
  addBtn:{
    width:300,
    marginVertical:10, 
    marginHorizontal:'auto',
  },
  itemContainer:{
    padding:20,
    marginVertical:5,
    marginHorizontal:10,
    borderRadius:10,
    backgroundColor:'#fff',
    elevation:2,
    gap:15,
    flexDirection:'row',
  },
  row:{
    gap:5
  },
  title:{
    fontWeight:'bold',
    fontSize:16
  },
  caption:{
    fontSize:12,
    opacity:0.7
  }
});
