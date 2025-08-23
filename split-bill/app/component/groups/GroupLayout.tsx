import { StyleSheet, Text, View , ScrollView} from 'react-native'
import React from 'react'
import GroupAppBar from './GroupAppBar'

const GroupLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <View style={styles.container}>
     <GroupAppBar/>
     <Text style={styles.text}>All groups</Text>
     <ScrollView style={styles.container}>{children}</ScrollView>
    </View>
  )
}

export default GroupLayout;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    text:{
        fontWeight:500
    }
})