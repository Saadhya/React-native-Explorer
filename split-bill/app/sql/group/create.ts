import { registerUserUnOfficial } from "../auth/user/create-user-account";
import Connection from "../connection";
import { createGroupMembers } from "../group-members/create";
import { CREATE_NEW_GROUP, GET_GROUP_CREATOR } from "./queries";

export const createNewGroup = async ({
  name,
  creatorId,
}: {
  name: string;
  creatorId: number;
}) => {
  const db = await Connection.getConnection();
  try {
    // verify if creator of the group is already present in users table
    console.log("starting transaction");
    await db.execAsync("BEGIN");

    // create new group query
    const group = await db.runAsync(CREATE_NEW_GROUP, [name, creatorId]);
    console.log("group created with id: ", JSON.stringify(group));
    const groupId = group.lastInsertRowId;

    await createGroupMembers({ arrOfUserId: [creatorId], groupId, db });
    // console.log("group members created");

    await db.execAsync("COMMIT");
    // console.log("transaction commited ");
    console.log(`group id to be returned: ${groupId}`);

    return groupId;
  } catch (error) {
    console.log("transaction failed");
    await db.execAsync("ROLLBACK");
    console.log("Error while creating new group: ", error);
    throw error;
  }
};


export const createNewGroupMembersTransaction = async ({
 contactIds,groupId
}: {
  contactIds: any[];
  groupId: any;
}) => {
  const db = await Connection.getConnection();
  try {
    // verify if creator of the group is already present in users table
    console.log("starting transaction");
    await db.execAsync("BEGIN");

    const userIds = await registerUserUnOfficial(contactIds) || [];
    if(userIds.length > 0){
        await createGroupMembers({ arrOfUserId: userIds, groupId, db });
    }

    await db.execAsync("COMMIT");
    console.log(`group id to be returned: ${groupId}`);

    // return groupId;
  } catch (error) {
    console.log("transaction failed");
    await db.execAsync("ROLLBACK");
    console.log("Error while creating new group: ", error);
    throw error;
  }
};
 