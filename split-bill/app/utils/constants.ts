export const GroupScreen = {
  AllGroups: 'AllGroups',
  GroupItem:"GroupItem",
  AddGroupMembers:'AddGroupMembers',
  AddGroup: 'AddGroup',
  GroupItemPersons:'GroupItemPersons',
  GroupItemMain:'GroupItemMain',
  GroupAddExpense:'GroupAddExpense',
  GroupExpenseItem:'GroupExpenseItem'
} as const
export const Tabs = {
  Groups: 'Groups',
  Friends:"Friends",
  Activity:'Activity',
  Account: 'Account',
}
export const FriendsScreen = {
  AddFriend: 'AddFriend',
  AllFriends:"AllFriends",
  FriendPage:'FriendPage',
  FriendAddExpense:'FriendAddExpense'
} as const

export const ActivityScreen={
  AllActivities: 'AllActivities',
}
export const AccountScreen = {
  AccountDetails: 'AccountDetails',
}
export const AuthScreen={
  Login: 'Login',
  Signup: 'Signup',
  ForgotPassword: 'ForgotPassword',
}

export const DatabaseName = 'splitbill.db';

export const paymentStatus={
    PENDING:"PENDING",
    COMPLETED:"COMPLETED",
    FAILED:"FAILED"
}