import Connection from "../../connection";
import { CREATE_USER, GET_ALL_USERS, GET_USER } from "./queries";

export const createUser = async ({
  name,
  email,
  phone,
  password,
}: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  try {
    const db = await Connection.getConnection();
    
    // Check if a user with the same phone already exists
    const existingPhone = await db.getFirstAsync("SELECT * FROM users WHERE phone = ?", [phone]);
    const existingEmail = await db.getFirstAsync("SELECT * FROM users WHERE email = ?", [email]);
    if (existingPhone) {
      throw new Error("A user with this phone number already exists.");
    }

    const result = await db.runAsync(CREATE_USER, [name, email, phone, password]);

    const insertedId = result.lastInsertRowId;
    console.log("row id:", insertedId);

    return await getUserById(Number(insertedId)); // Convert to string if needed
  } catch (error) {
    console.log("Error creating user:", error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    const db = await Connection.getConnection();
    const result = await db.getFirstAsync(GET_USER, [id]);
    return result;
  } catch (error) {
    console.log("Error while fetching user by id:", error);
    throw error;
  }
};

export const deleteUserById = async (id: string) => {
  try {
    const db = await Connection.getConnection();
    const result = await db.getFirstAsync(GET_USER, [id]);
    // console.log(`Deleted ${result.rowsAffected} user(s) with id: ${id}`);
    return result;
  } catch (error) {
    console.log("Error deleting user:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const db = await Connection.getConnection();
    const result = await db.getAllAsync(GET_ALL_USERS);
    console.log("All users:", result);
    return result;
  } catch (error) {
    console.log("Error fetching users:", error);
  }
};
