import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {socket} from '../components/socket';

// Define the type for the Auth Context
type AuthContextType = {
  isLoggedIn: boolean;
  user: {username: string; profilePic?: string} | null;
  login: () => void;
  logout: () => void;
  chatUser: (user: {username: string; profilePic?: string}) => void;
  getUser: () => void;
  loggedUser:string;
  setUserMessage: (value: string) => void;
  socket: any;

  isConnected: boolean;
  transport: string;
  chatConnect: () => void;
  chatDisconnect: () => void;
  roomsListing: RoomType[];
  globoConnection: () => void;
  fetchRooms: () => void;
  listRooms: () => void;
  chatMessages: MessageType[];
  handleChatmsg: (value: string) => void;
  sendMessage: (userMessage: string, room_id: string, user: any) => void;
  userMessage: string;
  joinRoom: (room: any, user: any) => void;
};
// Create the context with default values
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
type RoomType = {
  roomId: string;
  name: string;
  description: string;
  messages: MessageType[];
};
type MessageType = {
  user: string;
  message: string;
  timestamp: string;
};

// Create the AuthProvider to provide authentication state
const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [transport, setTransport] = useState<any>('N/A');
  const [roomsListing, setRoomsListing] = useState<RoomType[]>([]);
  const [chatMessages, setChatMessages] = useState<MessageType[]>([]);
  const [userMessage, setUserMessage] = useState<string>('');
  const [loggedUser, setLoggedUser] = useState<string>('');

  const [user, setUser] = useState<{
    username: string;
    profilePic?: string;
  } | null>(null);

  // Check AsyncStorage on app startup to set login state and user data
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (loggedIn === 'true') {
          setIsLoggedIn(true);
          await getUser(); // Retrieve user data if logged in
        }
      } catch (e) {
        console.error('Failed to load login status:', e);
      }
    };

    checkLoginStatus();
  }, []);

  // Login function
  const login = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    } catch (e) {
      console.error('Failed to save login state:', e);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('chatUser'); // Remove user data on logout
      setIsLoggedIn(false);
      setUser(null);
    } catch (e) {
      console.error('Failed to remove login state:', e);
    }
  };
  // const getUser=async()=>{
  //   AsyncStorage.getItem('userLoggedIn').then((user)=>{
  //       if(user==='none'){
  //           Alert.alert('User not found')
  //       }else if(user===null){
  //           AsyncStorage.setItem('userLoggedIn', 'none', ()=>{
  //               console.log('set user to None');
  //           });
  //       }else{
  //           setIsLoggedIn(true)
  //           setUserLoggedIn(JSON.parse(user))

  //       }
  //   }).catch((e)=>{
  //     console.error('Failed to get user:', e);
  //   })
  // }
  // Function to retrieve user data
  // Function to save user data
  const chatUser = async (userData: {
    username: string;
    profilePic?: string;
  }) => {
    try {
      await AsyncStorage.setItem('chatUser', JSON.stringify(userData)); // Save user data to AsyncStorage
      setUser(userData); // Update state with user data
    } catch (e) {
      console.error('Failed to save user data:', e);
    }
  };
  const getUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('chatUser');
      if (userData) {
        setUser(JSON.parse(userData)); // Set user data in state
      }
    } catch (e) {
      console.error('Failed to load user data:', e);
    }
  };
  const chatConnect = () => {
    setIsConnected(true);
    setTransport(socket.io.engine.transport.name);
    socket.io.engine.on('upgrade', transport => {
      setTransport(transport.name);
    });
  };
  const chatDisconnect = () => {
    socket.disconnect();
    setIsConnected(false);
    setTransport('N/A');
    socket.io.engine.close();
  };
  const globoConnection = () => {
    if (socket.connected) {
      chatConnect();
    } else {
      socket.connect();
    }
    // socket.on('connect', () => {
    //   chatConnect();
    // });
    socket.on('connect', chatConnect);
    socket.on('disconnect', chatDisconnect);
    return () => {
      socket.off('connect', chatConnect);
      socket.off('disconnect', chatDisconnect);
    };
  };
  const fetchRooms = () => {
    socket.emit('getRooms');
  };
  const listRooms = () => {
    socket.on('returnRooms', rooms => {
      setRoomsListing(rooms);
    });
  };
  const joinRoom = (room: any, user: any) => {
    const msgTime = new Date().toLocaleString();
    let joinMessage = `${user?.username} joined the chat @${msgTime}`;
    socket.emit('connectRoom', room);
    socket.on('joinedRoom', roomMsg => getChatMessage(roomMsg));
    sendMessage(joinMessage, room, user);
  };
  const handleChatmsg = (value: string) => {
    getChatMessage(value);
  };
  const sendMessage = (userMessage: string, room_id: string, user: any) => {
    if (userMessage) {
      const msgTime = new Date().toLocaleString();
      let message = {
        room: room_id,
        user: user,
        userMessage,
        time: msgTime,
      };
      socket.emit('newPost', message);
      setUserMessage('');
    } else {
      Alert.alert('Please enter a message');
    }
  };
  const getChatMessage = (msg: any) => {
    setChatMessages(prevMessages => [...prevMessages, msg]);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        loggedUser,
        chatUser,
        getUser,
        socket,
        isConnected,
        transport,
        chatConnect,
        chatDisconnect,
        roomsListing,
        globoConnection,
        fetchRooms,
        listRooms,
        joinRoom,
        chatMessages,
        handleChatmsg,
        sendMessage,
        userMessage,
        setUserMessage
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export {AuthProvider, useAuth};
