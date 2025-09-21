import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Chip, PaperProvider } from "react-native-paper";
import SplitByPercentage from "@/app/component/expense/SplitByPercentage";
import { getMembersOfGroup } from "@/app/sql/group-members/get";
import { useAppState } from "@/app/context/AppStateProvider";
const SplitType = {
  percentage: "percentage",
  equally: "equaly",
};
const GroupAddExpense = () => {
  const [users, setUsers] = useState<any[]>([]);
  const groupId = useAppState().selectedGroup?.id;

  const [modalVisible, setModalVisible] = useState(false);
  const [splitType, setSplitType] = useState(SplitType.equally);
  useLayoutEffect(() => {
    getMembersOfGroup(groupId).then(setUsers).catch(console.log);
  }, []);

  const splitByEqually = () => {
    setSplitType(SplitType.equally);
  };
  const splitByPercentage = () => {
    setSplitType(SplitType.percentage);
    setModalVisible(true)
  };
  return (
    <PaperProvider>
        {splitType === SplitType.percentage && 
        <SplitByPercentage closeModal={()=>setModalVisible(false)}
        users={} visible={modalVisible}/>}
      <Text>Select Split Type</Text>

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
      <Text>GroupAddExpense</Text>
    </PaperProvider>
  );
};

export default GroupAddExpense;

const styles = StyleSheet.create({
  container: {},
  selectionView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
    marginVertical: 10,
  },
});
