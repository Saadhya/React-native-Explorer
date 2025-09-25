export const CREATE_GROUP_MEMBER= `INSERT INTO group_members (group_id, user_id) VALUES (?, ?);`;

export const GET_ALL_GROUP_MEMBERS_BY_ID= `SELECT * from group_members gm 
INNER JOIN users u ON gm.user_id = u.id WHERE group_id = ?;`;

//here gm and g is variable
export const GET_GROUPS_OF_USER= `SELECT * from group_members gm
INNER JOIN groups g ON gm.group_id = g.id WHERE user_id = ?;`;

export const GET_GROUP_MEMBER_COUNT_BY_GROUP_ID = `SELECT COUNT(*) as memberCount FROM group_members WHERE group_id = ?;`;
