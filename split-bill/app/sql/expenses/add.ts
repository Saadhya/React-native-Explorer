import { User } from "@/app/utils/interface";
import { CREATE_NEW_EXPENSE, CREATE_NEW_EXPENSE_SPLIT } from "./queries";
import Connection from "../connection";
import { addNewPaymentRecord } from "../payments/add";
import { paymentStatus } from "@/app/utils/constants";
import { addNewActivityRecord } from "../activity/add";

export const addNewExpense=async (expenseData: Record<string, number>, amount: any, description: string, loggedInUserId: number, groupId: number)=>{
    // loggedin userids
    // expense record
    const db = await Connection.getConnection();
    try {
        await db.execAsync("BEGIN TRANSACTION");
        const expense = await addExpenseRecord(db, description, amount, loggedInUserId, groupId, false);
        if (typeof expense !== "number") {
            throw new Error("Failed to create expense record: missing ID");
        }
        console.log("Expense record created with id: ", JSON.stringify(expense));

        const activityTextMainUser=`Added new expense in group id ${groupId}  with payment of amount ${amount}`
        await addNewActivityRecord(db, activityTextMainUser, loggedInUserId);
        
        // user 1 is paying and user 2 or 3 has to pay to user 1 
        // 2 split record
        const userIds = Object.keys(expenseData).filter((uid)=>+uid!== loggedInUserId);
        for (const userId of userIds){
            const sharedAmount= amount * (expenseData[userId]/100);
            await addExpenseSplitRecord(db, expense, +userId, sharedAmount);
            console.log("split record created successfully: ");

            const activityText=`Added new expense in group id ${groupId} with payment of amount ${amount}`
            await addNewActivityRecord(db, activityText , +userId);
        
            await addNewPaymentRecord(db, +userId, loggedInUserId, sharedAmount, expense, paymentStatus.PENDING);
            console.log("payment record created successfully: ");
            
        } 
        await db.execAsync("COMMIT");
        console.log("Expense Txn complete");
    } catch (error) {
        await db.execAsync("ROLLBACK")
        console.log("Txn failed in addNewExpense: ", error);
    }
}
export const addExpenseRecord=async(db: any, description: string, amount: number, paidBy: number, groupId: number, isSettled: boolean)=>{
    try{
        const newExpense = await db.runAsync(CREATE_NEW_EXPENSE, [description, amount, paidBy, groupId, 0 ])
        console.log("Expense record created: ", JSON.stringify(newExpense));
        
        return newExpense?.lastInsertRowId;
    }catch(error){
        console.log("Error in addExpenseRecord: ", error);
        throw error;
    }
}
export const addExpenseSplitRecord=async (db: any, expenseId: number, userId: number, amountOwed: number)=>{
    try{
        const newExpenseSplit = await db.runAsync(CREATE_NEW_EXPENSE_SPLIT, [expenseId, userId, amountOwed])
        console.log("Expense split record created: ", JSON.stringify(newExpenseSplit));
        
        return newExpenseSplit?.lastInsertRowId;
    }catch(error){
        console.log("Error in addExpenseSplitRecord: ", error);
        throw error;
    }
}