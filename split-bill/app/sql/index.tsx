import Connection from "./connection";
import { CreateActivitiesTable } from "./tables/activities";
import { CreateExpenseSplitsTable } from "./tables/expense_splits";
import { CreateExpensesTable } from "./tables/expenses";
import { CreateFriendsTable } from "./tables/friends";
import { CreateGroupMembersTable } from "./tables/group_members";
import { CreateGroupsTable } from "./tables/groups";
import { CreatePaymentsTable } from "./tables/payments";
import { SessionTable } from "./tables/session";
import { alterTableUsers, UserTable } from "./tables/users";

export const getAllTables = async () => {
  try {
    const db = await Connection.getConnection();
    const QUERY = `SELECT name FROM sqlite_master WHERE type='table';`;
    const result = await db.getAllAsync(QUERY);
    console.log("ALL TABLES: "+ JSON.stringify(result));
    
  } catch (error) {
    console.log("Error fetching tables: ", error);
  }
};

export const onInitDatabase = async () => {
  alert("Database initialized");
  try {
    const db = await Connection.getConnection();
    
    console.log("Creating UserTable...");
    await db.execAsync(UserTable);
    
    console.log("Creating SessionTable...");
    await db.execAsync(SessionTable);
    
    console.log("Creating GroupsTable...");
    await db.execAsync(CreateGroupsTable);
    
    console.log("Creating GroupMembersTable...");
    await db.execAsync(CreateGroupMembersTable);
    
    console.log("Creating ActivitiesTable...");
    await db.execAsync(CreateActivitiesTable);
    
    console.log("Creating PaymentsTable...");
    await db.execAsync(CreatePaymentsTable);
    
    console.log("Creating ExpensesTable...");
    await db.execAsync(CreateExpensesTable);
    
    console.log("Creating ExpenseSplitsTable...");
    await db.execAsync(CreateExpenseSplitsTable);
    
    console.log("Creating FriendsTable...");
    await db.execAsync(CreateFriendsTable);
    
    await getAllTables();
  } catch (error) {
    console.log("Error while initializing database: ", error);
    throw error;
  }
};

export const onErrorInitialisingDatabase = async () => {
  try {
    // console.log("abd");
    // alert("Error initializing database");
  } catch (error) {
    console.log("Error on initializing database: ", error);
    throw error;
  }
};
