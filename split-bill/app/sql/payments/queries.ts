import { paymentStatus } from "@/app/utils/constants"

export const CREATE_NEW_PAYMENT = `INSERT INTO payments (payer_id, payee_id, amount, expense_id, status) VALUES (?, ?, ?, ?, ?)` 

export const UPDATE_PAYMENT_STATEMENT = `UPDATE payments SET status = '${paymentStatus.COMPLETED}' WHERE expense_id = ? AND payer_id=?`

export const GET_PAYMENT_STATUS_OF_EXPENSE_QUERY=`SELECT * FROM payments WHERE expense_id = ? `;

export const GET_SETTLEMENT_BETWEEN_FRIENDS=`SELECT * FROM payments p 
INNER JOIN expenses e ON p.expense_id=e.id 
INNER JOIN users u ON e.paid_by=u.id
where e.group_id IS NULL
AND ((p.payer_id=? AND p.payee_id=?) OR (p.payer_id=? AND p.payee_id=?))`;
// u1 and u2 or u2 and u1