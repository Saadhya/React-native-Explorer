export const CREATE_NEW_EXPENSE= `INSERT INTO expenses (description, amount, paid_by, group_id, is_settled) VALUES (?, ?, ?, ?, ?)`

export const CREATE_NEW_EXPENSE_SPLIT= `INSERT INTO expense_splits (expense_id, user_id, amount_owed) VALUES (?, ?, ?)`;

export const GET_EXPENSES_OF_GROUP= `SELECT e.*, u.name FROM expenses e 
INNER JOIN users u ON e.paid_by = u.id WHERE group_id = ?`;