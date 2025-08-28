export const CREATE_GROUP_MEMBER= `INSERT INTO group_members (group_id, user_id) VALUES (?, ?);`;
export const GET_GROUP_MEMBERS_BY_ID= `SELECT * from group_members WHERE group_id = ?;`;