import React, { useEffect } from 'react';
import { chatState } from '../../Context/ChatProvider.jsx';
import axios from "axios"

const MyChats = () => {
    const [loggedUser,setLoggedUser]=useState();
    const {user,setSelectedChat,chats,setChats}=chatState()
    
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
    },[]);
  return (
    <div>MyChats</div>
  )
}

export default MyChats;