import { paymentStatus } from "@/app/utils/constants";
import Connection from "../connection";
import { getPaymentStatusOfExpense } from "../expenses/get";
import { UPDATE_PAYMENT_STATEMENT } from "./queries";
import { updateExpenseRecord } from "../expenses/update";

export const updatePaymentRecord = async (expenseId: number, userId: number) => {
    const db = await Connection.getConnection();
    try {
        await db.execAsync('begin')
        const updatedPayment = await db.runAsync(UPDATE_PAYMENT_STATEMENT, [expenseId, userId]);
        console.log("Payment record updated: ", JSON.stringify(updatedPayment));

        // check other users payment
        const payments = await getPaymentStatusOfExpense(expenseId);
        if (payments.length == 0) {
            await db.runAsync(UPDATE_PAYMENT_STATEMENT, [expenseId, userId]);
        } else {
            let flag = 0;
            for (const payment of payments) {
                if (payment.status == paymentStatus.PENDING) {
                    flag = 1;
                }
            }
            if (flag === 0) {
                await updateExpenseRecord(expenseId);
            }
        }
        console.log("Payments of expense: ",expenseId,JSON.stringify(payments));
        db.execAsync("commit")
        return updatedPayment;
    } catch (error) {
        console.log("Error in updatePaymentRecord: ", error);
        db.execAsync("rollback")
        throw error; 
    }
}
    