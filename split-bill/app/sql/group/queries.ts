export const CREATE_NEW_GROUP= `INSERT INTO groups (group_name, created_by) VALUES (?, ?);`;
export const GET_ALL_GROUPS= `SELECT * FROM groups;`;
export const GET_GROUP_CREATOR= `SELECT * FROM users WHERE id = ?;`