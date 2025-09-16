import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute, RouteProp } from '@react-navigation/native';

type GroupItemRouteProp = RouteProp<{GroupItem: {group: any}}, 'GroupItem'>;

const GroupItem = () => {
  /**
   * target
   * 1 Add new participants(select contacts of the groups, add those contact in db, unique mobile, unregistered users, )
   * 2 share expense
   * 3 see details, history of payments
   */

const route = useRoute<GroupItemRouteProp>();
const {group} = route.params || {};  
// const {params:{group}}= useRoute(); old version

  return (
    <View>
      <Text>{group?.group_name || 'No group'}</Text>
    </View>
  )
}

export default GroupItem

const styles = StyleSheet.create({})