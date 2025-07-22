import React, { useEffect,useState } from 'react';
import { chatState } from '../../Context/ChatProvider.jsx';
import axios from "axios"
import { Box, Button, IconButton, Stack, Text } from '@chakra-ui/react';
import { IoMdAdd } from "react-icons/io";
import ChatLoading from './ChatLoading.jsx';
import { getSender } from '../../config/chatLogic.js';
import GroupChatModal from './GroupChatModal.jsx';

const MyChats = ({fetchAgain}) => {
    const [loggedUser,setLoggedUser]=useState();
    const {user,selectedChat,setSelectedChat,chats,setChats}=chatState()
    
    const fetchChats= async()=>{
        try {
            const config={
            headers:{
                authorization:`Bearer ${user.data.accessToken}`,
            },
            withCredentials:true
        }
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const {data} = await axios.get(`${BASE_URL}/api/v1/chat`,config)
        setChats(data)
    } catch (error) {
        toaster.create({
            title:"Error occurred",
            description:"Failed to load the chats",
            type:"error",
            closable:true,
})
    }
    }

    useEffect(()=>{
   setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
   fetchChats();
    },[fetchAgain]);
  return (
    <Box
    display={{base:selectedChat? "none" : "flex",md:"flex"}}
    flexDir={"column"}
    alignItems={"center"}
    p={4}
    bgColor={"white"}
    width={{base:"100%",md:"32%"}}
    borderRadius={"lg"}
    borderWidth={"1px"}
>
        <Box 
        pb={3}
        px={3}
        fontSize={{base:"28px",md:"30px"}}
        fontFamily={"Work sans"}
        display={"flex"}
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        color={"black"}
        >
        My Chats
        <GroupChatModal>
         <IconButton
         display={"flex"}
         fontSize={{base:"17px" ,md:"10px" ,lg:"17px"}}
         bgColor={"#95A8E0"}
         borderRadius={"10px"}
         >
          New Group Chat <IoMdAdd />
         </IconButton>
         </GroupChatModal>
        </Box>

        <Box
        display={"flex"}
        flexDir={"column"}
        p={3}
        bgColor={"#F8F8F8"}
        width={"100%"}
        height={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}

        >
            {chats?(
              <Stack overflowY={"scroll"}>
          {chats.map((chat)=>(
            <Box
            onClick={()=>setSelectedChat(chat)}
            cursor={"pointer"}
            bg={selectedChat === chat ? "#38B2AC" :" #E8E8E8"}
            color={selectedChat===chat? "white":"black"}
            px={3}
            py={2}
            borderRadius={"lg"}
            key={chat._id}
            >
             <Text>
                {!chat.isGroupChat?(
                    getSender(loggedUser,chat.users)
                ):(chat.chatName)}
             </Text>
            </Box>
          ))}
              </Stack>
            ):(
                <ChatLoading />
            )}
        </Box>
    </Box>
  )
}

export default MyChats;