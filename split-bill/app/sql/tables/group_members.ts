export const CreateGroupMembersTable = `CREATE TABLE IF NOT EXISTS group_members (
group_id INTEGER NOT NULL, 
user_id INTEGER NOT NULL, 
joined_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
PRIMARY KEY (group_id, user_id),
FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE, 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`