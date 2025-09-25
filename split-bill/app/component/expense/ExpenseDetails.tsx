import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { User } from '@/app/utils/interface'
import { Avatar } from 'react-native-paper';
import { useAuth } from '@/app/context/AuthProvider';

const RenderUserShareItem=({loggedInUserId,totalAmount, expenseData, users, dataKey}: {loggedInUserId: number, totalAmount: any, expenseData: Record<string, number>, users: User[], dataKey: string})=>{
    const user = users.find((user)=>user.id=== +dataKey);
    return(
        <View style={styles.user}>
            {/* + user?.name[user?.name?.length-1].toUpperCase() */}
            <Avatar.Text size={40} label={user?.name && user?.name[0].toUpperCase()  || "U"} />
            {loggedInUserId === user?.id && <Text>Paid by you: {totalAmount}</Text>}
            {loggedInUserId !== user?.id && <Text>You owe {user?.name}: Rs.{(totalAmount*expenseData[dataKey]/100).toFixed(2)}</Text>}
        </View>
    )
    
}
const ExpenseDetails = ({expenseData, totalAmount, users}: {expenseData: Record<string, number>, totalAmount: any, users: User[]}) => {
    const {user:{id}}= useAuth();
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Split Details</Text>
      <FlatList data={Object.keys(expenseData)} renderItem={({item}) => (
        <RenderUserShareItem loggedInUserId={id} totalAmount={totalAmount} expenseData={expenseData} 
        users={users} dataKey={item}/>
      )}/>
    </View>
  )
}

export default ExpenseDetails

const styles = StyleSheet.create({
    container:{
        maxHeight:300,
        width:Dimensions.get("window").width-50,
        padding:20,
        marginVertical:20,
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginVertical:10,
    },
    user:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        margin:10,
        padding:4,
        gap:4
    }
})