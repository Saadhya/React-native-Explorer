import Connection from "../connection"
import { GET_GROUPS_OF_USER } from "./queries";

export const getGroupOfUser=async(user_id:any)=>{
    const db = await Connection.getConnection();
    const result= db.getAllAsync(GET_GROUPS_OF_USER, +user_id);
    console.log("Group of users: ", result);

    return result;
}