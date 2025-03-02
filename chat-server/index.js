import {Server} from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:8081",
    methods: ["GET", "POST"],
  },
});
const genMsgId = () => Math.random().toString(36).substr(2, 10);
let chatRooms = [
  {
    roomId: "12345",
    name: "Tech Talk",
    description:
      "A room for discussing the latest in technology and software development.",
    messages: [
      {
        user: "john_doe",
        timestamp: "2025-03-02T10:00:00Z",
        message:
          "Hey everyone, has anyone tried the new AI model released today?",
      },
      {
        user: "jane_smith",
        timestamp: "2025-03-02T10:05:00Z",
        message:
          "Yes, I have. It's pretty impressive! The responses are more natural than ever.",
      },
      {
        user: "tech_guru",
        timestamp: "2025-03-02T10:10:00Z",
        message:
          "Definitely! The ability to handle complex queries is a game changer.",
      },
      {
        user: "john_doe",
        timestamp: "2025-03-02T10:15:00Z",
        message:
          "Do you think it will replace some of the manual coding we do?",
      },
    ],
  },
];
console.log("globochat server started");
io.on("connection", (socket) => {
  console.log(`connect: ${socket.id}`, socket.request.headers);

  socket.on("disconnect", () => {
    console.log(`disconnect: ${socket.id}`);
  });

  socket.on("getChatRooms", () => {
    console.log(`returning room list: `, chatRooms);    
    socket.emit("chatRooms", chatRooms);
  });

  socket.on("connectRoom", (id) => {
    const choosenRoom = chatRooms.filter((room) => room.roomId === id);
    socket.join(choosenRoom[0].name);
    console.log(`joined room : ${choosenRoom[0].name}`);
    socket.emit("chatRoom", choosenRoom[0].messages);
  });

  socket.on('newPost', (data) => {
    const {userMessage, room_id, sender, messageTime}= data;
    let selectedroom = chatRooms.filter((room)=>room.roomId === room_id);
    const addMessage={
        room_id:genMsgId(),
        content:userMessage,
        user:sender,
        sent:messageTime
    }
    console.log('new post ', addMessage);
    socket.to(selectedroom[0].name).emit('channel message', addMessage);
    selectedroom[0].messages.push(addMessage);
    io.to(selectedroom[0].name).emit('chatRoom', selectedroom[0].messages);
    console.log('emit new message', addMessage);
  });

//   socket.on("createChatRoom", (chatRoom) => {
//     chatRooms.push(chatRoom);
//     io.emit("chatRooms", chatRooms);
//   });
//   socket.on("sendMessage", (message) => {
//     const chatRoom = chatRooms.find((room) => room.roomId === message.roomId);
//     if (chatRoom) {
//       chatRoom.messages.push(message);
//       io.emit("chatRoom", chatRoom);
//     }
//   });
});
io.listen(3000);