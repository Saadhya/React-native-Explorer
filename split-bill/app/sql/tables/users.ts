export const UserTable= `CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
email TEXT NOT NULL UNIQUE,
phone TEXT NOT NULL UNIQUE,
password TEXT NOT NULL,
is_registered INTEGER DEFAULT 0,
created_at DATETIME  DEFAULT CURRENT_TIMESTAMP
);`;
// alter commands, delete, index
// friend TEXT DEFAULT '[]',

// to describe tables
export const tableDefUsers= "pragma table_info(users);";
export const alterTableUsers= `ALTER TABLE users ADD COLUMN password TEXT NOT NULL;`
