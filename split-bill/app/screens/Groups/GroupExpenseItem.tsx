import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GroupExpenseItem = ({expense}: {expense: any}) => {
  return (
    <View>
      <Text>{expense.description}</Text>
    </View>
  )
}

export default GroupExpenseItem

const styles = StyleSheet.create({})