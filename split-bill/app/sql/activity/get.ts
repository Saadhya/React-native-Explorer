import Connection from "../connection";
import { GET_ACTVITIES_OF_USER } from "./queries";

export const getActivitiesOfUser = async (userId: number)=>{
    try{
        const db = await Connection.getConnection();
        const result = await db.getAllAsync(GET_ACTVITIES_OF_USER, [userId]);
        console.log("Activities of userid : ",userId, JSON.stringify(result));
        return result;
    }catch(error){
        console.log("Error in getActivitiesOfUser: ", error);
        throw error; 
    } 
}