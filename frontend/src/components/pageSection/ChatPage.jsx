import React from 'react'
import { chatState } from '../../Context/ChatProvider.jsx'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../chatSection/SideDrawer.jsx';
import ChatBox from '../chatSection/ChatBox.jsx';
import MyChats from '../chatSection/MyChats.jsx';
const ChatPage = () => {
const {user} =chatState();
  return (
    <div style = {{width: "100%"}}>
    {user && <SideDrawer />}
    <Box
    display="flex"
    justifyContent={"space-between"}
    w={"100%"}
    h="93vh"
    p={"10px"}
    >
      {user && <MyChats />}
      {user && <ChatBox />}
    </Box>
    </div>
  )
}

export default ChatPage