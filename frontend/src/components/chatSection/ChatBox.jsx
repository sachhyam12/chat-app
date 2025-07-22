import { Box } from '@chakra-ui/react';
import { chatState } from '../../Context/ChatProvider';
import SingleChat from './SingleChat.jsx';
import React from 'react'

const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const {selectedChat}=chatState()
  return (
   <Box
   display={{base:selectedChat?"flex":"none",md:"flex"}}
   alignItems={"center"}
   flexDir={"column"}
   p={3}
   color={"black"}
   bgColor={"#95A8E0"}
   width={{base:"100%",md:"68%"}}
   borderRadius={"lg"}
   borderWidth={"1px"}
   >
    <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
   </Box>
  )
}

export default ChatBox;