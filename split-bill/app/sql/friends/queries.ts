export const GET_FRIENDS_OF_USER = `SELECT u.id, u.name, u.email 
FROM users u JOIN friends f ON u.id = f.added_id WHERE f.adder_id = ?

UNION

SELECT u.id, u.name, u.email 
FROM users u JOIN 
friends f ON u.id = f.adder_id WHERE f.added_id = ?`;

export const CREATE_FRIEND = `INSERT INTO friends (adder_id, added_id) VALUES (?, ?)`;

export const deleteFriend = `DELETE FROM friends WHERE user_id = ? AND friend_id = ?`;

export const updateFriend = `UPDATE friends SET user_id = ?, friend_id = ? WHERE user_id = ? AND friend_id = ?`;
