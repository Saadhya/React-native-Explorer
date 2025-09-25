import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Modal, Portal } from 'react-native-paper'
import SelectPercentage from './SelectPercentage';

interface User {
  id: string | number;
  name?: string;
}
const generateSplitData = (users: User[]): Record<string, number> => {
  const data: Record<string, number> = {};
  const initialSplit = 100 / users.length;
  users.forEach((user) => {
    data[String(user.id)] = initialSplit;
  });
  return data;
}
const SplitByPercentage = ({visible, closeModal, users}: {visible:boolean, closeModal:(data?: Record<string, number>)=>void, users:User[]}) => {
  const [splitData, setSplitData] = useState<Record<string, number>>({});
  // console.log("splitdata: ", splitData);

  useLayoutEffect(()=>{
    const data=generateSplitData(users);
    setSplitData(data);
  },[users])
  
  const onUpdateData=()=>{
    closeModal(splitData);
    console.log("splitData: ", splitData);
  }
  const checkIfPercentageOverlaps=()=>{
    let sum =0;
    Object.keys(splitData).forEach((key)=>{
      sum+=splitData[key];
    })
    if(sum>100 ||sum<100){
      return true;
    }
    return false;
  }

  
  return (
    <Portal>
        <Modal
        style={styles.modal}
        visible={visible}
        onDismiss={() => closeModal()}
        dismissable={true}
        dismissableBackButton
        >
          {/* <Text>Split {JSON.stringify(users)}</Text> */}
          {users.length>0 && splitData && (
            <FlatList
              data={users}
              keyExtractor={(item) => String(item.id)}
              renderItem={({item}) => (
                <SelectPercentage
                  user={item}
                  splitPercentage={splitData[String(item.id)] ?? 0}
                  updateSplitPercentage={(splitPercentage) => {
                    setSplitData(prev => ({
                      ...prev,
                      [String(item.id)]: splitPercentage,
                    }));
                  }}
                />
              )}
            />
          )}
          <Button onPress={onUpdateData} style={styles.button} mode='contained' disabled={checkIfPercentageOverlaps()}>Update</Button>
        </Modal>
    </Portal>
  )
}

export default SplitByPercentage

const styles = StyleSheet.create({
  modal:{
    flex:1,
    backgroundColor:"white",
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:300,
    marginVertical:10,
    marginHorizontal:10,
  }
})