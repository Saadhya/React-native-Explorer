export const CREATE_USER = `INSERT INTO users(name, email, phone, password, is_registered) VALUES(?,?,?,?,?);`;

export const GET_USER = `SELECT * FROM users WHERE id = ?`;
export const GET_ALL_USERS = `SELECT * FROM users;`;
export const GET_USER_BY_PHONE = `SELECT * FROM users WHERE phone=?;`;
export const GET_USER_BY_EMAIL = `SELECT * FROM users WHERE email=?;`;
