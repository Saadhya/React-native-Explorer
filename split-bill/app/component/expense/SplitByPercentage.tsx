import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Modal, Portal } from 'react-native-paper'

const SplitByPercentage = ({visible, closeModal, users}: {visible:boolean, closeModal:()=>void, users:[]}) => {
  return (
    <Portal>
        <Modal
        visible={visible}
        onDismiss={closeModal}
        dismissable={true}
        dismissableBackButton
        >{users}</Modal>
    </Portal>>
  )
}

export default SplitByPercentage

const styles = StyleSheet.create({})