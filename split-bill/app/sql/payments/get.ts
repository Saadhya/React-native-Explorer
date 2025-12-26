import Connection from "../connection";
import { GET_SETTLEMENT_BETWEEN_FRIENDS } from "./queries";

export const getSettlementBetweenFriend= async (user1:number, user2:number) => {
    try{
        const db = await Connection.getConnection();
        const result = db.getAllAsync(GET_SETTLEMENT_BETWEEN_FRIENDS , [+user1, +user2, +user2, +user1])
        console.log("settlement between friends: ", JSON.stringify(result));
        return result;
    }catch(e){
        console.log("error in settlement between friends ", e);
        throw console.error(e);
        
    }
}; 