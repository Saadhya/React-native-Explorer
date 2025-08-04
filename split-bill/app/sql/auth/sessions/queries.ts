export const ADD_NEW_SESSION= `INSERT INTO session (id, user_id) VALUES (?, ?)`;

export const DELETE_SESSION= `DELETE from session`;
export const GET_SESSION=`SELECT * FROM session`;