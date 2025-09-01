import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '@/app/context/AuthProvider';
import { getGroupOfUser } from '@/app/sql/group-members/get';

const GroupList = () => {
  const {user:{ id }} = useAuth();
  useEffect(() => {
    getGroupOfUser(+id);
  
    return () => {
      
    }
  }, [])
  
  return (
    <View>
      <Text>GroupList</Text>
    </View>
  )
}

export default GroupList

const styles = StyleSheet.create({})