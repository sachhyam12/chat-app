import { Box,IconButton,Text } from '@chakra-ui/react'
import { chatState } from '../../Context/ChatProvider.jsx'
import { IoIosArrowRoundBack } from "react-icons/io";
import React from 'react'
import { getSender,getSenderInfo } from '../../config/chatLogic.js';
import ProfileModal from './ProfileModal.jsx';
import { FaRegEye } from "react-icons/fa";
import UpdateGroupChatModal from './updateGroupChatModal.jsx';

const SingleChat = ({fetchAgain,setFetchAgain}) => {
    const {user,selectedChat,setSelectedChat} = chatState()
  return (
   <>
   {selectedChat?(
<>
<Text
fontSize={{base:"28px",md:"30px"}}
pb={3}
px={2}
width={"100%"}
display={"flex"}
justifyContent={{base:"space-between"}}
alignItems={"center"}
>
<IconButton
display={{base:"flex", md:"none"}}
onClick={()=>setSelectedChat("")}
bgColor={"#95A8E0"}
>
<IoIosArrowRoundBack />
</IconButton>
{!selectedChat.isGroupChat?(
<>
{getSender(user,selectedChat.users)}
<ProfileModal user={getSenderInfo(user,selectedChat.users)}>
    <IconButton bgColor={"#95A8E0"}>
<FaRegEye />
    </IconButton>
</ProfileModal>
</>
):(
<>
{selectedChat.chatName.toUpperCase()}
<UpdateGroupChatModal
fetchAgain={fetchAgain}
setFetchAgain={setFetchAgain}
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
    {/* Messages here */}
</Box>
</>
   ):(
    <Box
    display={"flex"}
    alignItems={"center"}
    justifyContent={"center"}
    h={"100%"}
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
  )
}

export default SingleChat