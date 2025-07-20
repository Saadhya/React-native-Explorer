import Connection from "./connection";
import { SessionTable } from "./tables/session";
import { UserTable } from "./tables/users";

export const onInitDatabase = async () => {
  alert("Database initialized");
  try {
    const db = await Connection.getConnection();
    // await db.execAsync(UserTable + ";" + SessionTable);
    await db.execAsync(UserTable);
    await db.execAsync(SessionTable);
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
    console.log("Error while initializing database: ", error);
    throw error;
  }
};

export const getAllTables = async () => {
  try {
    const db = await Connection.getConnection();
    const QUERY = `SELECT name FROM sqlite_master WHERE type='table';`;
    const result = await db.getAllAsync(QUERY);
    console.log(result);
    
  } catch (error) {
    console.log("Error fetching tables: ", error);
  }
};
