import Connection from "../../connection";
import { CREATE_USER, GET_USER } from "./queries";

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
    const db = Connection.getConnection();
    const result = (await db).runAsync(CREATE_USER, [
      name,
      email,
      phone,
      password,
    ]);
    console.log((await result).lastInsertRowId);
    return await getUserById((await result).lastInsertRowId);
  } catch (error) {
    console.log("Error creating user: ", error);
  }
};

export const getUserById= async(id: number) => {
  try {
    const db = Connection.getConnection();
    const result = (await db).getFirstAsync(GET_USER, [id]);
    return result;
  } catch (error) {
    console.log("Error while fetching user by id: ", error);
  }
}
