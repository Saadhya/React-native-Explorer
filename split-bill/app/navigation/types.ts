import { Expense } from '@/app/sql/expenses/get';
import { FriendsScreen } from '@/app/utils/constants';
import { User } from '@/app/utils/interface';

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

export type FriendsStackParamList = {
  [FriendsScreen.AllFriends]: undefined;
  [FriendsScreen.AddFriend]: undefined;
  [FriendsScreen.FriendPage]: { users: User[] };
  [FriendsScreen.FriendAddExpense]: { users: User[] };
  [FriendsScreen.FriendExpenseItem]: { expense: Expense };
};
