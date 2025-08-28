import { CREATE_GROUP_MEMBER } from "./queries";

export const createGroupMembers=async({arrOfUserId, groupId, db}:{arrOfUserId: number[], groupId:any, db:any})=>{
   
    if (!Array.isArray(arrOfUserId) || arrOfUserId.length === 0) {
        throw new Error("No user IDs present in group");
    }

    try {         
        for(const id of arrOfUserId){
            console.log(id);
            // insert to group members table
            const result = await db.runAsync(CREATE_GROUP_MEMBER, [groupId, id]);
            console.log("new group member added", result);        
        }
    } catch (error) {
        console.log("Error while creating group members: ", error);
        throw error;        
    }
}