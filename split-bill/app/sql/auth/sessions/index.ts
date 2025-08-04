import Connection from "../../connection";
import { ADD_NEW_SESSION, DELETE_SESSION, GET_SESSION } from "./queries";


export const createNewSession = async (userId: number) => {
  try {
const db = await Connection.getConnection();
    const result = await db.runAsync(ADD_NEW_SESSION, userId);
    console.log("New session created with ID: ", JSON.stringify(result));
    return result;
  } catch (error) {
    console.log("Error creating new session: ", error);
  }
};

export const deleteSessions = async () => {
  try {
const db = await Connection.getConnection();
    const result = await db.runAsync(DELETE_SESSION);
    console.log("All sessions deleted: ", JSON.stringify(result));
    return result;
  } catch (error) {
    console.log("Error deleting sessions: ", error);
  }
};

export const getSession= async()=>{
    try{
const db = await Connection.getConnection();
        const result = await db.getAllAsync(GET_SESSION);
        console.log("Fetched sessions: ", JSON.stringify(result));
        return result;
    }catch(error){

    }
}