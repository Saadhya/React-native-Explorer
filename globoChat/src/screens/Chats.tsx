import React, {useEffect} from 'react';
import {useAuth} from '../providers/AuthContext';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const Chats: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const {
    isLoggedIn,
    chatUser,
    login,
    globoConnection,
    fetchRooms,
    listRooms,
    isConnected,
    transport,
    roomsListing,
    loggedUser,
  } = useAuth();
  const user = {
    username: 'abc',
    profilePic: 'https://randomuser.me/api/portraits',
  };
  useEffect(() => {
    chatUser(user);
    globoConnection();
    fetchRooms();
    listRooms();
  }, [isLoggedIn]);

  const RoomComponent = (roomId: string, roomName: string, desc: string) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ChatRoom', {
            roomId,
            roomName,
            sender: loggedUser,
          })
        }>
        <View style={styles.roomItem}>
          <Text style={styles.roomtitle}>{roomName}</Text>
          <Text style={styles.roomdesc}>{desc}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {/* can be removed in production, or can be used for troubleshooting purposes */}
      <View style={styles.statusBox}>
        <Text style={styles.statusLabel}>
          Status:{isConnected ? 'connected' : 'disconnected'}
        </Text>
        <Text style={styles.statusLabel}>Transport:{transport}</Text>
      </View>
      <FlatList
        data={roomsListing}
        //   renderItem={({item}) => <RoomComponent {...item} />}
        renderItem={({item}) =>
          RoomComponent(item.roomId, item.name, item.description)
        }
        keyExtractor={item => item.roomId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  roomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  roomtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    paddingBottom: 10,
  },
  roomdesc: {
    fontSize: 20,
    color: '#666',
  },
  container: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  statusBox: {
    alignSelf: 'flex-start',
  },
  statusLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
export default Chats;
