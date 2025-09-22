import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Modal, Portal } from 'react-native-paper'
import SelectPercentage from './SelectPercentage';

interface User {
  id: string | number;
  name?: string;
}

const SplitByPercentage = ({visible, closeModal, users}: {visible:boolean, closeModal:()=>void, users:User[]}) => {
  console.log("users: ", users);
  
  return (
    <Portal>
        <Modal
        visible={visible}
        onDismiss={closeModal}
        dismissable={true}
        dismissableBackButton
        >
          {/* <Text>Split {JSON.stringify(users)}</Text> */}
          <FlatList data={users} renderItem={({item})=> <SelectPercentage user={item}/>}/>
         
        </Modal>
    </Portal>
  )
}

export default SplitByPercentage

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  }
})