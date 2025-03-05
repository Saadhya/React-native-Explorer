import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAuth} from '../providers/AuthContext';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import { useSearchParams } from 'react-router-dom';

const boundedHeight = Dimensions.get('window').height;

const Room = () => {
//   const [room_id, roomTitle, sender] = useSearchParams();
const [room_id, sender, roomTitle] = useState(new URLSearchParams(window.location.search));
  const {
    sendMessage,
    handleChatmsg,
    chatMessages,
    joinRoom,
    userMessage,
    socket,
    setUserMessage,
  } = useAuth();
  
  const flatRef = useRef<FlatList<any>>(null);
  useLayoutEffect(() => {
    joinRoom(room_id, sender);
    flatRef.current?.scrollToEnd({animated: true});
  }, []);
  useEffect(() => {
    socket.on('newMessage', handleChatmsg);
  }, [socket]);
  const sendPost = () => {
    sendMessage(userMessage, room_id, sender);
  };
  const MessageComponent = (
    content: string,
    sent: boolean,
    user: object,
    sender: object,
  ) => {
    const origin = user !== sender;
    return (
      <View style={origin ? styles.roomMsgContainer : styles.myMsgContainer}>
        <View style={origin ? styles.roomMsg : styles.myMsg}>
          <Text style={origin ? styles.roomText : styles.myText}>
            {content}
          </Text>
        </View>
        <View style={styles.userRow}>
          <Text style={styles.info}>{user}</Text>
          <Text style={styles.info}>{sent}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{roomTitle}</Text>
      <Text style={styles.user}>Chat user: {sender}</Text>
      <View style={styles.listView}>
        <FlatList
          ref={flatRef}
          data={chatMessages}
          // renderItem={(item)=><MessageComponent {...item} sender={sender}/>}
          renderItem={({item}) =>
            MessageComponent(item.message, item.sent, item.user, sender)
          }
          keyExtractor={item => item.id}
          inverted={true}
          onContentSizeChange={() =>
            flatRef.current?.scrollToEnd({animated: true})
          }
        />
      </View>
      <View style={styles.messaging}>
        <Text style={styles.user}>Enter a Message:</Text>
        <TextInput
          style={styles.formInput}
          value={userMessage}
          onChangeText={setUserMessage}
        />
        <TouchableOpacity onPress={sendPost}>
          <Text style={styles.btnLabel}>Send</Text>
        </TouchableOpacity>
        {/* <Button title="Send" onPress={sendPost} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  roomMsgContainer: {
    alignItems: 'flex-start',
    margin: 10,
    maxWidth: '80%',
  },
  roomMsg: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
  },
  roomText: {
    fontSize: 16,
  },
  myMsgContainer: {
    alignItems: 'flex-end',
    margin: 10,
    maxWidth: '80%',
  },
  myMsg: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 10,
  },
  myText: {
    fontSize: 16,
    color: '#fff',
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  info: {
    fontSize: 12,
    color: '#888',
  },
  container: {
    height: boundedHeight,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  user: {
    fontSize: 18,
    marginBottom: 10,
  },
  listView: {
    flex: 1,
  },
  messaging: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  btnLabel: {
    fontSize: 16,
    color: '#007bff',
  },
});
export default Room;