import Connection from "../connection";
import { GET_EXPENSES_OF_GROUP } from "./queries";

// NOTE: This shape reflects the columns selected in GET_EXPENSES_OF_GROUP
// Adjust as your schema evolves. Extra columns from the DB are allowed.
export interface Expense {
  id: number;
  description: string;
  amount: number;
  paid_by: number;
  group_id: number;
  is_settled: number; // 0/1 as stored in SQLite; consider mapping to boolean in the UI layer
  name: string; // from the JOIN: u.name
  created_at?: string;
}

export const getExpensesOfGroup = async (groupId: number): Promise<Expense[]> => {
  try {
    const db = await Connection.getConnection();
    const result = (await db.getAllAsync(
      GET_EXPENSES_OF_GROUP,
      [groupId]
    )) as unknown as Expense[];
    console.log("Expenses of group: ", groupId, JSON.stringify(result));

    return result;
  } catch (error) {
    console.log("Error in getExpensesOfGroup: ", error);
    throw error;
  }
};