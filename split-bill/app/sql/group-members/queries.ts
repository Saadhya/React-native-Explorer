export const CREATE_GROUP_MEMBER= `INSERT INTO group_members (group_id, user_id) VALUES (?, ?);`;
export const GET_GROUP_MEMBERS_BY_ID= `SELECT * from group_members WHERE group_id = ?;`;
export const GET_GROUPS_OF_USER= `SELECT * from group_members gm
INNER JOIN groups g ON gm.group_id = g.id


WHERE user_id = ?;`;
//gm and g is variable

