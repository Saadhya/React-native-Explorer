import { CREATE_NEW_PAYMENT } from "./queries";

export const addNewPaymentRecord=async(db: any, payerId: number, payeeId: number, amount: number, expenseId: number, status: string)=>{
    try{
        const newPayment = await db.runAsync(CREATE_NEW_PAYMENT  , [payerId, payeeId, amount, expenseId, status])
        console.log("Payment record created: ", JSON.stringify(newPayment));
        
        return newPayment?.lastInsertRowId;
    }catch(error){
        console.log("Error in addNewPaymentRecord: ", error);
        throw error;
    }
    
}
