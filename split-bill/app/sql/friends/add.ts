import { registerUserUnOfficial } from "../auth/user/create-user-account";
import Connection from "../connection";
import { CREATE_FRIEND } from "./queries";

export const createFriends =async(arrOfUserIds:number[], adderId:number , db:any)=>{
        if(!arrOfUserIds || arrOfUserIds===null)
            throw new Error("Invalid user ids");
    try{
        for(const id of arrOfUserIds){
        const result = db.runAsync(CREATE_FRIEND, [adderId, id]);
        console.log("Friend added successfully: ", result);
        return result;
        }
    }catch(e){
        console.log("error in creating friends", e);
    }
}
export const createFriendTransaction=async(contactIds:number[], adderId:number)=>{
    const db = await Connection.getConnection();
    try{
        console.log("transaction started");
        await db.execAsync("begin transaction");

        const userIds = await registerUserUnOfficial(contactIds);
        if(userIds.length >0){
            await createFriends(userIds, adderId, db);
        }
        await db.execAsync("commit");
    
    }catch(e){
        console.log("txn failed in creating friends", e);
        db.execAsync("rollback");
        throw e;
    }
}