import { Box, IconButton, Text, Spinner, Field, Input } from "@chakra-ui/react";
import { chatState } from "../../Context/ChatProvider.jsx";
import { IoIosArrowRoundBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { getSender, getSenderInfo } from "../../config/chatLogic.js";
import ProfileModal from "./ProfileModal.jsx";
import { FaRegEye } from "react-icons/fa";
import UpdateGroupChatModal from "./UpdateGroupChatModal.jsx";
import { toaster } from "../ui/toaster.jsx";
import ScrollableChat from "./ScrollableChat.jsx";
import axios from "axios";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:3000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    chatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user?.data.accessToken}`,
        },
      };
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const { data } = await axios.get(
        `${BASE_URL}/api/v1/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toaster.create({
        title: "Error fetching messages",
        description: error.message,
        type: "error",
        duration: 5000,
        closable: true,
      });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ["websocket"], // force using websocket
    });

    socket.on("connection", () => {
      console.log("✅ Connected to Socket.IO server");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
    });
    socket.emit("setup", user.data.user);
    socket.on("connected", () => setSocketConnected(true));

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user?.data.accessToken}`,
          },
        };
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        setNewMessage("");
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/message`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toaster.create({
          title: "Error sending message",
          description: error.message,
          type: "error",
          duration: 5000,
          closable: true,
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 2000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
        setIsTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            width={"100%"}
            display={"flex"}
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              onClick={() => setSelectedChat("")}
              bgColor={"#95A8E0"}
            >
              <IoIosArrowRoundBack />
            </IconButton>
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user.data.user, selectedChat.users)}
                <ProfileModal user={getSenderInfo(user, selectedChat.users)}>
                  <IconButton bgColor={"#95A8E0"}>
                    <FaRegEye />
                  </IconButton>
                </ProfileModal>
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                ></UpdateGroupChatModal>
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            p={2}
            width={"100%"}
            height={"100%"}
            bgColor={"#E9E9E9"}
            borderRadius={"lg"}
            overflowY={"hidden"}
          >
            {loading ? (
              <>
                <Spinner
                  color="colorPalette.600"
                  size={"xl"}
                  width={20}
                  height={20}
                  margin="auto"
                />
                <Text fontSize={"2xl"}>Loading chats....</Text>
              </>
            ) : (
              <Box
                display={"flex"}
                overflowY={"auto"}
                flex={1}
                px={3}
                py={2}
                className="hide-scrollbar"
              >
                <ScrollableChat messages={messages} />
              </Box>
            )}
            <Field.Root id="messagebox" onKeyDown={sendMessage}>
              {isTyping ? <div>Loading...</div> : <></>}
              <Input
                placeholder="Enter message..."
                name="messagebox"
                type="text"
                mb={3}
                value={newMessage}
                onChange={typingHandler}
              />
            </Field.Root>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
        >
          <Text
            fontSize={"3xl"}
            pb={3}
            fontFamily={"Work sans"}
            color={"black"}
          >
            Click on a user to start chatting....
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
