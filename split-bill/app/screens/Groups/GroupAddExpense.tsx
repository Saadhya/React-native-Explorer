import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Chip, PaperProvider, TextInput } from "react-native-paper";
import SplitByPercentage from "@/app/component/expense/SplitByPercentage";
import { getMembersOfGroup } from "@/app/sql/group-members/get";
import { useAppState } from "@/app/context/AppStateProvider";
import { Feather } from "@expo/vector-icons";
import ExpenseDetails from "@/app/component/expense/ExpenseDetails";
import { User } from "@/app/utils/interface";
import { addNewExpense } from "@/app/sql/expenses/add";
import { useAuth } from "@/app/context/AuthProvider";

const SplitType = {
  percentage: "percentage",
  equally: "equaly",
};
const GroupAddExpense = () => {
  const [users, setUsers] = useState<User[]>([]);
  const groupId = useAppState().selectedGroup?.id;
  const [expenseDesc, setExpenseDesc] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseData, setexpenseData] = useState<Record<string, number>>({});

  const [modalVisible, setModalVisible] = useState(false);
  const [splitType, setSplitType] = useState(SplitType.equally);
  const {user:{id}}= useAuth();
  useLayoutEffect(() => {
    if (groupId === undefined) return;
    getMembersOfGroup(groupId)
      .then((data) => {
        setUsers(data as User[]);
      })
      .catch(console.log);
  }, [groupId]);

  const splitByEqually = () => {
    setSplitType(SplitType.equally);
  };
  const splitByPercentage = () => {
    setSplitType(SplitType.percentage);
    setModalVisible(true)
  };
  const onCloseModal = (data?: Record<string, number>) => {
    setModalVisible(false);
    setexpenseData(data ?? {});
  };

  const createSplitHandler=async()=>{
    // console.log("splitData handler: ", expenseData);
    console.log("users handler: ",users.map((user)=>user.name));
    if (groupId === undefined) {
      Alert.alert("No group selected", "Please select a group before adding an expense.");
      return;
    }
    try{
        await addNewExpense(expenseData, +expenseAmount, expenseDesc, +id, groupId);
        alert("success");
    }catch(error){
        console.log("Error in createSplitHandler: ", error);
        alert("Failed to createSplit");
    }
  }
  return (
    <PaperProvider>
        {splitType === SplitType.percentage && 
        <SplitByPercentage closeModal={onCloseModal}
        users={users} visible={modalVisible}/>}

      <View style={styles.selectionView}>
        <Chip
          icon={splitType === SplitType.equally ? "check" : ""}
          onPress={splitByEqually}
        >
          Equally
        </Chip>
        <Chip
          icon={splitType === SplitType.percentage ? "check" : ""}
          onPress={splitByPercentage}
        >
          Percentage
        </Chip>
      </View>
      <View style={styles.inputBox}>
        <Feather name="folder" size={30} color="black" />
        <TextInput style={styles.input} mode="flat" placeholder="Expense Name" value={expenseDesc} onChangeText={setExpenseDesc}/>
      </View> 

      <View style={styles.inputBox}>
        <Feather name="dollar-sign" size={30} color="black" />
        <TextInput style={styles.input} keyboardType="number-pad" mode="flat" placeholder="Expense Amount" 
        value={expenseAmount} onChangeText={setExpenseAmount}/>
      </View>
      <Button onPress={createSplitHandler} mode="text">Create Split</Button>
      {expenseData && users && 
      <ExpenseDetails expenseData={expenseData} totalAmount={expenseAmount} users={users}/>
      }
    </PaperProvider>
  );
};

export default GroupAddExpense;

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  selectionView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
    marginVertical: 10,
  },
  inputBox:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:10,
  },
  input:{
    width:Dimensions.get("window").width -150,
  }

});