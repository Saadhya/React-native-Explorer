import { getFormattedPhoneNumber } from "@/app/utils/helpers";
import * as Contacts from "expo-contacts";
import { GET_USER_BY_PHONE } from "./queries";
import Connection from "../../connection";
import { createUser } from ".";

export const isUserAlreadyRegistered = async (phone: any) => {
  try {
    const db = await Connection.getConnection();
    const result = await db.getAllAsync(GET_USER_BY_PHONE, [phone]);
    console.log(
      "checking if user is already registered: ",
      JSON.stringify(result)
    );

    return result;
  } catch (err) {
    console.log("error while checking if user is already registered: ", err);
    throw err;
  }
};
export const getContactDetailsById = async (id: any) => {
  try {
    const contact = await Contacts.getContactByIdAsync(id, [
      Contacts.Fields.PhoneNumbers,
      Contacts.Fields.Name,
    ]);
    // contact
    if (!contact || !contact.phoneNumbers?.length || !contact.name) {
      return null;
    }
    console.log("contact details fetched: ", contact);
    return {
      name: contact.name,
      phone: getFormattedPhoneNumber(contact.phoneNumbers[0].number),
      // phone: contact.phoneNumbers[0].number
    };
  } catch (err) {
    console.log("error while fetching contact details by id: ", err);
    throw err;
  }
};
export const registerUserUnOfficial = async (contactIds: Array<string | number>) => {
    let userIds = []; //real user ids which are present in users table
    for (const id of contactIds) {
        // Expo Contacts expects string IDs; normalize here
        const contactId = String(id);
        const contact = await getContactDetailsById(contactId);
        if (!contact) {
        continue;
        }
        let user = await isUserAlreadyRegistered(contact.phone);
         
        let userdata: any;
        
        if (user && user.length > 0) {
        console.log("User already registered");
        userdata = user[0];
        } else {
        userdata = await createUser({
            name: contact.name,
            email: null,
            phone: contact.phone,
            password: contact.phone,
            is_registered: 0
        });
        }
        if (userdata?.id) {
        userIds.push(userdata.id);
        }
    }
    return userIds;
};
