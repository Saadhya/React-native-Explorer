import Connection from "../connection";
import { UPDATE_EXPENSE_STATEMENT } from "./queries";

export const updateExpenseRecord=async(expenseId: number)=>{
    try {
        const db=await Connection.getConnection();
        const updatedExpense = await db.runAsync(UPDATE_EXPENSE_STATEMENT, [expenseId]);
        console.log("Expense record updated: ", JSON.stringify(updatedExpense));
        return updatedExpense;
    } catch (error) {
        console.log("Error in updateExpenseRecord: ", error);
        throw error;
    }
}