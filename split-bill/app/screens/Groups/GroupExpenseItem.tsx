import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { ActivityIndicator, Button } from 'react-native-paper';
import { getExpensesOfGroup, getExpenseSplits } from '@/app/sql/expenses/get';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/navigation/types';
import { paymentStatus } from '@/app/utils/constants';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/app/context/AuthProvider';
import { updatePaymentRecord } from '@/app/sql/payments/update';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const RenderItem=({data, expense, id}:{data:any, expense:any, id:any})=>{
    const isUserDuePending=()=>{
        if(data.user_id===id && data.status === paymentStatus.PENDING)
            return true;
        return false;
    }
    console.log("isUserDuePending: ",isUserDuePending());
    console.log(`id and data.user_id: ${id} and ${data.user_id}`);
    
    const settleUserDues=async()=>{
        try {
            /**
             * update payment status
             * if other use has updated their payment
             * if that is the case, update the expense status to be settled
             */
            await updatePaymentRecord(expense.id, id);
            alert("success for settle user ")
            
        } catch (error) {
            alert("error for settle user")
        }
    } 
    return(
        <View style={[styles.renderSection,{backgroundColor: expense.status==paymentStatus.COMPLETED?'#34813fff':'#a73131ff'} ]}>
            <View style={styles.leftSection}>
                <Text style={styles.leftSectionText}>{data.name}</Text>
                <Text style={styles.leftSectionText}>{data.status}</Text>
                <Text style={styles.leftSectionText}>{data.amount_owed.toFixed(2)}</Text>

            </View>
            <View style={styles.rightSection}>
                <Feather name={data.status===paymentStatus.PENDING?'clock':'check'} size={20} color='#0b132b'/>
            </View>
            {isUserDuePending() && (<Button mode='elevated' textColor='black' onPress={settleUserDues}
                >Settle</Button>
            )}
        </View>
    )
}

const GroupExpenseItem = ({ route }: NativeStackScreenProps<RootStackParamList, 'GroupExpenseItem'>) => {
    const { expense } = route.params;
    const {user:{id}}=useAuth();
    const [expenses, setExpenses]=useState<any>([]);
    const [loading, setLoading]=useState(false);
    // const [expenseSplits, setExpenseSplits]=useState<any>([]);
    console.log("expense in item: ",expense);
    // update this with focuseffect
    // useLayoutEffect(()=>{
    //     getExpenseSplits(expense.id)
    //     .then((res)=>{
    //         console.log("Expense splits of expense: ",res);
    //         setExpenses(res);
    //         setLoading(false)})
    //     .catch(err=>console.log(err));

    //     nav.addListener('focus', () => {
    //         getExpenseSplits(expense.id)
    //     .then((res)=>{
    //         console.log("Expense splits of expense: ",res);
    //         setExpenses(res);
            
    //         setLoading(false)})
    //     .catch(err=>console.log(err));
    //     });
        
    // },[]);

    useFocusEffect(
        useCallback(() => {
            // This runs when the screen comes into focus
            getExpenseSplits(expense.id)
                .then((res) => {
                    console.log("Expense splits of expense: ", res);
                    setExpenses(res);
                    setLoading(false);
                })
                .catch(err => {
                    console.log("Error fetching expense splits: ", err);
                    setLoading(false);
                });
        }, [expense.id])
    );

    return loading?<ActivityIndicator size={30} style={{margin:'auto'}}/>:
  (
    <View>
        <Text style={styles.text}>Expense Amount: {expense.amount}</Text>
        <Text style={styles.text}>Expense Paid by: {expense.name}</Text>
        <Text style={styles.text}>Expense Description: {expense.description}</Text>
        <FlatList data={expenses} renderItem={(info)=>
            <RenderItem data={info.item} expense={expense} id={id} />
        }/>
    </View>
  ) 
}


const styles = StyleSheet.create({
    text:{
        fontSize:20,
        fontWeight:'bold',
        padding:15
    },
    renderSection:{
        margin:10,
        borderWidth:1,
        borderRadius:10,
        padding:10,
        flexDirection:'row',
        alignItems:'center',    
        justifyContent:'space-between',
    },
    leftSection:{
        flexDirection:'column',
        // alignItems:'center',    
        justifyContent:'center',
        // color:'#34813fff'
    },
    // add this style to the text element inside leftSection
    leftSectionText:{
        color:'#fff',
        fontSize:16,
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
