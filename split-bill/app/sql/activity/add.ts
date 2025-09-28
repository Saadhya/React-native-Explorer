import { CREATE_NEW_ACTIVITY } from "./queries";

export const addNewActivityRecord=async(db: any, activity: string, userId: number)=>{
    try{
        const newActivity = await db.runAsync(CREATE_NEW_ACTIVITY, [activity, userId])
        console.log("Activity record created: ", JSON.stringify(newActivity));
        
        return newActivity?.lastInsertRowId;
    }catch(error){
        console.log("Error in addNewActivityRecord: ", error);
    }
}