export const CREATE_NEW_EXPENSE= `INSERT INTO expenses (description, amount, paid_by, group_id, is_settled) VALUES (?, ?, ?, ?, ?)`

export const CREATE_NEW_EXPENSE_SPLIT= `INSERT INTO expense_splits (expense_id, user_id, amount_owed) VALUES (?, ?, ?)`;

export const GET_EXPENSES_OF_GROUP= `SELECT e.*, u.name FROM expenses e 
INNER JOIN users u ON e.paid_by = u.id WHERE group_id = ?`;

export const GET_EXPENSE_SPLIT_OF_EXPENSE= `SELECT es.*, u.name, p.status, p.amount FROM expense_splits es
INNER JOIN users u ON es.user_id = u.id
INNER JOIN payments p ON p.payer_id = es.user_id
WHERE es.expense_id = ? AND p.expense_id = ?`;

export const UPDATE_EXPENSE_STATEMENT=`UPDATE expenses SET is_settled = 1 WHERE id = ?`

export const DELETE_PAYMENTS_FOR_EXPENSE = `DELETE FROM payments WHERE expense_id = ?`;
export const DELETE_EXPENSE_SPLITS_FOR_EXPENSE = `DELETE FROM expense_splits WHERE expense_id = ?`;
export const DELETE_EXPENSE = `DELETE FROM expenses WHERE id = ?`;