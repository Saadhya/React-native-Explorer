export interface User {
  id: string;
  name: string;
}

export interface Group {
  id: string;
  name: string;
  members: string[];
}

export interface Expense {
  id: string;
  groupId: string;
  paidBy: string;
  amount: number;
  description: string;
}

export interface Balances {
  [userId: string]: {
    [otherUserId: string]: number;
  };
}

export const store = {
  users: [] as User[],
  groups: [] as Group[],
  expenses: [] as Expense[],
  balances: {} as Balances
};
