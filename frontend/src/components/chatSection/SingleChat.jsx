import { Box, IconButton, Text, Spinner, Field, Input } from "@chakra-ui/react";
import { chatState } from "../../Context/ChatProvider.jsx";
import { IoIosArrowRoundBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { getSender, getSenderInfo } from "../../config/chatLogic.js";
import ProfileModal from "./ProfileModal.jsx";
import { FaRegEye } from "react-icons/fa";
import UpdateGroupChatModal from "./updateGroupChatModal.jsx";
import { toaster } from "../ui/toaster.jsx";
import ScrollableChat from "./ScrollableChat.jsx";
import axios from "axios";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = chatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  //   const [socketConnected, setSocketConnected] = useState(false);
  //   const [typing, setTyping] = useState(false);
  //   const [istyping, setIsTyping] = useState(false);
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

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
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

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
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
                {getSender(user, selectedChat.users)}
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
              <div>
                <ScrollableChat messages={messages} />
              </div>
            )}
            <Field.Root id="messagebox" onKeyDown={sendMessage}>
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
