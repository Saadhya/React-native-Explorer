import * as SQLite from "expo-sqlite";
import { DatabaseName } from "../../utils/constants";

export default class Connection {
  private static connection: SQLite.SQLiteDatabase | null = null;
  static async getConnection(): Promise<SQLite.SQLiteDatabase> {
    try {
      if (!Connection.connection) {
        Connection.connection = await SQLite.openDatabaseAsync(DatabaseName);
      }
      return Connection.connection;
    } catch (error) {
      console.error("Failed to open database:", error);
      throw error;
    }
  }
}
