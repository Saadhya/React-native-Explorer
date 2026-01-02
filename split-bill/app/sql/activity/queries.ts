export const CREATE_NEW_ACTIVITY = `INSERT INTO activities (activity,user_id) VALUES (?, ?)`

export const GET_ACTVITIES_OF_USER = `SELECT u.name, a.* FROM activities a 
INNER JOIN users u ON a.user_id = u.id 
WHERE user_id = ?`;