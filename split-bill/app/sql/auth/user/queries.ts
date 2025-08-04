export const CREATE_USER=`INSERT INTO users(name, email, phone, password) VALUES(?,?,?,?)`

export const GET_USER = `SELECT * FROM users WHERE id = ?`;
