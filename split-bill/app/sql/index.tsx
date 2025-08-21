import Connection from "./connection";
import { SessionTable } from "./tables/session";
import { alterTableUsers, UserTable } from "./tables/users";

export const getAllTables = async () => {
  try {
    const db = await Connection.getConnection();
    const QUERY = `SELECT name FROM sqlite_master WHERE type='table';`;
    const result = await db.getAllAsync(QUERY);
    console.log(JSON.stringify(result));
    
  } catch (error) {
    console.log("Error fetching tables: ", error);
  }
};

export const onInitDatabase = async () => {
  alert("Database initialized");
  try {
    const db = await Connection.getConnection();
    // await db.execAsync(UserTable + ";" + SessionTable);
    await db.execAsync(UserTable);
    await db.execAsync(SessionTable);
    // await db.execAsync(alterTableUsers);
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
