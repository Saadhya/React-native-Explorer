import Connection from "../connection";
import { GET_FRIENDS_OF_USER } from "./queries";

export const getFriendsOfUser = async (userId: number) => {
    try{
        const db = await Connection.getConnection();
        const result = db.getAllAsync(GET_FRIENDS_OF_USER, [+userId, +userId])
        console.log("friends of user", result);
        return result;
    }catch(e){
        console.log("error in getting frnds of user ", e);
        throw console.error(e);
        
    }
}; 