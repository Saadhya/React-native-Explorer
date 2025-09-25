import Connection from "../../connection";
import { CREATE_USER, GET_ALL_USERS, GET_USER, GET_USER_BY_EMAIL, GET_USER_BY_PHONE } from "./queries";

export const createUser = async ({
  name,
  email,
  phone,
  password,
  is_registered = 1
}: {
  name: string;
  email: string | null;
  phone: string;
  password: string;
  is_registered?: number;
}) => {
  try {
    const db = await Connection.getConnection();
    
    // Check if a user with the same phone already exists
    const existingPhone = await db.getFirstAsync(GET_USER_BY_PHONE, [phone]);
    // Only check email uniqueness if an email is provided
    // const existingEmail = email ? await db.getFirstAsync(GET_USER_BY_EMAIL, [email]) : null;
    if (existingPhone) {
      throw new Error("A user with this phone number already exists.");
    }

    const result = await db.runAsync(CREATE_USER, [name, email, phone, password, is_registered]);

    const insertedId = result.lastInsertRowId;
    console.log("row id:", insertedId);

    return await getUserById(Number(insertedId)); // Convert to string if needed
  } catch (error) {
    console.log("Error creating user sql:", error);
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
    // console.log("All users:", result);
    return result;
  } catch (error) {
    console.log("Error fetching users:", error);
  }
};
