import { StyleSheet, Text, View } from "react-native";
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";
import MultiSelect from "react-native-multiple-select";
import { Button } from "react-native-paper";

const getContactsPermission = async () => {
  // get means we already have permission, we are just fetching it
  const permission = await Contacts.getPermissionsAsync();
  if (permission.granted) {
    return true;
  }

  // otherwise we have to ask for permission
  const firstPermission = await Contacts.requestPermissionsAsync();
  if (firstPermission.granted) {
    return true;
  }
  if (!firstPermission.granted && !firstPermission.canAskAgain) {
    return false;
  }
  const secondPermission = await Contacts.requestPermissionsAsync();
  if (secondPermission.granted) {
    return true;
  }
};

export const SelectContacts = ({selectedContacts,setSelectedContacts }:{selectedContacts:any, setSelectedContacts:any}) => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  // const [selectedContacts, setSelectedContacts] = useState<Contacts.Contact[]>(
  //   []
  // );

  const onItemChange = (data: any) => {
    console.log(data);
    setSelectedContacts(data);
  };
  useEffect(() => {
    async function getContacts() {
      const hasPermissions = await getContactsPermission();
      if (!hasPermissions) {
        return;
      }
      // const contacts = await Contacts.getContactsAsync({fields:["name", "phoneNumbers", "emails"]});
      const contacts = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      const validContacts = (contacts.data || []).filter(
        (contact) => contact.id
      );
      if (validContacts.length === 0) return;
      setContacts(validContacts);
      // console.log(validContacts[8].firstName);
    }
    getContacts();
    console.log("contacts: ",selectedContacts);
    
  }, []);

  return (
    <View>
      <Text>Select Contacts</Text>
     
      {contacts.length > 0 && (
        <MultiSelect
          styleItemsContainer={{
            height: 400,
          }}
          uniqueKey="id"
          items={contacts}
          onSelectedItemsChange={onItemChange}
          selectedItems={selectedContacts}
        />
      )}
    </View>
  );
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    width:'100%'
  }
});
