import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { ActivityIndicator, Button } from 'react-native-paper';
import { getExpensesOfGroup, getExpenseSplits } from '@/app/sql/expenses/get';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/navigation/types';
import { paymentStatus } from '@/app/utils/constants';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/app/context/AuthProvider';
import { updatePaymentRecord } from '@/app/sql/payments/update';

const RenderItem=({data, expense, id}:{data:any, expense:any , id:any})=>{
    const isUserDuePending=()=>{
        if(data.user_id===id && data.status==paymentStatus.PENDING){
            return true;
        }
        return false;
    }
    const settleUserDues=async()=>{
        try {
            /**
             * update payment status
             * if other use has updated their payment
             * if that is the case, update the expense status to be settled
             *  
             */
            await updatePaymentRecord (expense.id, id);
            alert("success for settle user ")
            
        } catch (error) {
            alert("error for settle user")
        }
    } 
    return(
        <View style={[styles.renderSection, {backgroundColor: expense.status==paymentStatus.COMPLETED?'green':'red'}]}>
            <View>
                <Text>{data.name}</Text>
                <Text>{data.status}</Text>
                <Text>{data.amount_owed}</Text>

            </View>
            <View style={styles.rightSection}>
                <Feather name={data.status===paymentStatus.PENDING?'clock':'check'} size={20} color='#0b132b'/>
            </View>
            {isUserDuePending() && (<Button mode='elevated' textColor='black' onPress={settleUserDues}
                >Settle</Button>)}

            <Text>expense: {JSON.stringify(data)}</Text>
        </View>
    )
}

const GroupExpenseItem = ({ route }: NativeStackScreenProps<RootStackParamList, 'GroupExpenseItem'>) => {
    const { expense } = route.params;
    const {user:{id}}=useAuth();
    const [expenses, setExpenses]=useState<any>([]);
    const [loading, setLoading]=useState(false);
    const [expenseSplits, setExpenseSplits]=useState<any>([]);
    console.log("expense in item: ",expense);
    
    useLayoutEffect(()=>{
        getExpenseSplits(expense.id)
        .then((res)=>{
            console.log("Expense splits of expense: ",res);
            setExpenses(res);
            
            setLoading(false)})
        .catch(err=>console.log(err));
        // const fetchExpenses=async()=>{
        //     try {
        //         const expenses=await getExpensesOfGroup(expense.group_id);
        //         setExpenses(expenses);
        //         setLoading(false);
        //     } catch (error) {
        //         console.log("Error in fetchExpenses: ",error);
        //         setLoading(false);
        //     }
        // }
        // fetchExpens es();
    },[]);
    return loading?<ActivityIndicator size={30} style={{margin:'auto'}}/>:
  (
    <View>
        <Text style={styles.text}>Expense Amount: {expense.amount}</Text>
        <Text style={styles.text}>Expense Paid by: {expense.name}</Text>
        <Text style={styles.text}>Expense Description: {expense.description}</Text>
        <FlatList data={expenses} renderItem={(info)=><RenderItem data={info.item} expense={expense} id={id} />}/>
    </View>
  ) 
}


const styles = StyleSheet.create({
    text:{
        fontSize:20,
        fontWeight:'bold',
        padding:20
    },
    renderSection:{
        margin:10,
        borderWidth:1,
        borderRadius:10,
        padding:10,
        color:'#fff',
        flexDirection:'row',
        alignItems:'center',    
        justifyContent:'space-between',
         
    },
    leftSection:{
        flexDirection:'row',
        alignItems:'center',    
        justifyContent:'space-between',
    },
    rightSection:{
        padding: 10,
        gap:5,
        alignItems:'center',    
        justifyContent:'center',
        marginLeft:'auto'
    }
}) 
export default GroupExpenseItem
