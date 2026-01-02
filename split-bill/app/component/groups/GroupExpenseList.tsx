import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FriendsScreen, GroupScreen } from '@/app/utils/constants';
import { Expense } from '@/app/sql/expenses/get';

const RenderItem = ({data, expenses, isFriend}: {data: Expense, expenses: any[], isFriend?: boolean}) => {
    const nav = useNavigation();
    const onExpenseClick=()=>{
      (nav as any).navigate(
        isFriend?FriendsScreen.FriendExpenseItem :GroupScreen.GroupExpenseItem,
        { expense: data },
      );
        // const tabNav = nav.getParent();
        // if (tabNav) {
        //     tabNav.navigate(Tabs.Groups, {
        //         screen: GroupScreen.GroupExpenseItem,
        //         params: { expense: data },
        //     });
        // }
    }
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return(
        <TouchableOpacity style={styles.container} onPress={()=>{onExpenseClick()}}>
            <View style={styles.calendar}>
                {(() => {
                    const d = data.created_at ? new Date(data.created_at) : undefined;
                    const month = d ? monthNames[d.getMonth()] : '';
                    const day = d ? d.getDate() : '';
                    return (
                        <>
                          <Text style={styles.textColor}>{month}</Text>
                          <Text style={styles.textColor}>{day}</Text>
                        </>
                    );
                })()}
            </View>
            {/* <View style={{marginHorizontal:5}}>
                <Feather name="file-text" size={30} color="white"/>
            </View> */}
            <View style={styles.descpContainer}>
                <Text style={styles.desc}>{data.description}</Text>
                <Text style={styles.amount}>{data.name} Paid {data.amount}</Text>
            </View>
            <View style={styles.descpContainer}>
                <Feather name={data.is_settled?'check-square':'x-square'} size={24} color={data.is_settled?'green':'red'}/>
                {/* <Chip style={{backgroundColor:¸, marginLeft:'auto'}} icon="wallet" /> */}
                <Text style={styles.textStatus}>{data.is_settled?'Settled':'Not Settled'}</Text>
            </View>
        </TouchableOpacity>
    )
}
const GroupExpenseList = ({expenses, isFriend }: {expenses:  any[], isFriend?: boolean}) => {
  return (
    <View>
      <FlatList<any>
        data={expenses}
        renderItem={(info)=>{return <RenderItem data={info.item} expenses={expenses} isFriend={isFriend} />}}
        keyExtractor={(item)=>String(item.id+item.created_at)}
      />
    </View>
  )
}

export default GroupExpenseList

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#1e2420',
    width: Dimensions.get('window').width - 40,
    marginHorizontal: 'auto',
    borderRadius: 15,
    padding: 20,
    // gap: 2,
    marginVertical: 10,
  },
   textStatus:{
    color:'white',
  },
  calendar: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 5,
  },
  textColor: {
    color: 'white',
  },
  descpContainer: {
    width: Dimensions.get('window').width /2,
    padding: 5,
  },
  desc: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  amount: {
    color: 'white',
    fontWeight: '600',
  },
 
});