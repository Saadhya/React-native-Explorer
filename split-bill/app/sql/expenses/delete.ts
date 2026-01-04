import Connection from "../connection";
import {
  DELETE_EXPENSE,
  DELETE_EXPENSE_SPLITS_FOR_EXPENSE,
  DELETE_PAYMENTS_FOR_EXPENSE,
} from "./queries";

export const deleteExpenseById = async (expenseId: number) => {
  const db = await Connection.getConnection();
  try {
    await db.execAsync("BEGIN TRANSACTION");
    await db.runAsync(DELETE_PAYMENTS_FOR_EXPENSE, [expenseId]);
    await db.runAsync(DELETE_EXPENSE_SPLITS_FOR_EXPENSE, [expenseId]);
    await db.runAsync(DELETE_EXPENSE, [expenseId]);
    await db.execAsync("COMMIT");
    console.log(`Deleted expense ${expenseId}`);
  } catch (error) {
    await db.execAsync("ROLLBACK");
    console.log("Error deleting expense: ", error);
    throw error;
  }
};
