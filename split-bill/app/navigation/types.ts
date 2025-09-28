import { Expense } from '@/app/sql/expenses/get';

// Central navigation param list for the Group stack
// Use these types with useNavigation<NavigationProp<RootStackParamList>>()
export type RootStackParamList = {
  AllGroups: undefined;
  GroupItem: { groupId: number } | undefined;
  AddGroupMembers: undefined;
  AddGroup: undefined;
  GroupItemPersons: undefined;
  GroupItemMain: undefined;
  GroupAddExpense: undefined;
  GroupExpenseItem: { expense: Expense };
};
