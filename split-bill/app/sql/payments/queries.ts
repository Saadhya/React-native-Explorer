import { paymentStatus } from "@/app/utils/constants"

export const CREATE_NEW_PAYMENT = `INSERT INTO payments (payer_id, payee_id, amount, expense_id, status) VALUES (?, ?, ?, ?, ?)` 

export const UPDATE_PAYMENT_STATEMENT = `UPDATE payments SET status = '${paymentStatus.COMPLETED}' WHERE expense_id = ? AND payer_id=?`

export const GET_PAYMENT_STATUS_OF_EXPENSE_QUERY=`SELECT * FROM payments WHERE expense_id = ? `;