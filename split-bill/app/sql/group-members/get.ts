import Connection from "../connection";
import { GET_ALL_GROUP_MEMBERS_BY_ID, GET_GROUPS_OF_USER, GET_GROUP_MEMBER_COUNT_BY_GROUP_ID } from "./queries";

export const getGroupOfUser = async (user_id: any) => {
  try {
    const db = await Connection.getConnection();
    const result = db.getAllAsync(GET_GROUPS_OF_USER, +user_id);
    // console.log("Group of users: ", result);

    return result;
  } catch (error) {
    console.log("Error in getGroupOfUser: " + error);
    throw error;
  }
};

export const getMembersOfGroup = async (groupId: any) => {
  try {
    const db = await Connection.getConnection();
    console.log("Fetching members of group id: ", groupId);
    
    const result = db.getAllAsync(GET_ALL_GROUP_MEMBERS_BY_ID, + groupId);
    console.log("Group of members: ", JSON.stringify(result));
    return result;
  } catch (error) {
    console.log("Error in getMembersOfGroup: " + error);
    throw error;
  }
};

export const getMemberCountOfGroup = async (groupId: any): Promise<number> => {
  try {
    const db = await Connection.getConnection();
    console.log("Fetching member count for group id:", groupId);
    const row: any = await db.getFirstAsync(
      GET_GROUP_MEMBER_COUNT_BY_GROUP_ID,
      +groupId
    );
    // row should look like { memberCount: number }
    return row?.memberCount ?? 0;
  } catch (error) {
    console.log("Error in getMemberCountOfGroup: " + error);
    throw error;
  }
};
