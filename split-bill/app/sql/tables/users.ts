export const UserTable= `CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
email TEXT NOT NULL UNIQUE,
phone TEXT NOT NULL UNIQUE,
created_at DATETIME  DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
isregistered INTEGER DEFAULT 0
);
`;
// alter commands, delete, index
// friend TEXT DEFAULT '[]',
export const alterTableUsers= `ALTER TABLE users ADD COLUMN isregistered INTEGER DEFAULT 0;`;

export const tableDefUsers= "pragma table_info(users);";