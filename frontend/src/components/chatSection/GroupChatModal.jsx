import React, { useEffect, useState } from 'react'
import {Button, Dialog,IconButton,Image,Portal,Input,Field} from '@chakra-ui/react'
import { toaster } from '../ui/toaster'
import { chatState } from '../../Context/ChatProvider.jsx'
import axios from 'axios'
import UserListItem from '../UserInfo/UserListItem'
import UserBadgeItem from '../UserInfo/UserBadgeItem.jsx'

const GroupChatModal = ({children}) => {
    const [groupChatName,setGroupChatName] = useState("")
    const [selectedUsers,setSelectedUsers] = useState([])
    const [search,setSearch]=useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

    const {user,chats,setChats}=chatState()

    const handleSearch = async (query)=>{
        setSearch(query)
        
        if(!query){
            return;
        }
        try {
            setLoading(true)
            const config={
                headers:{
                    authorization:`Bearer ${user?.data.accessToken}`
                }
            }
            const BASE_URL = import.meta.env.VITE_API_BASE_URL;
       const {data} = await axios.get(`${BASE_URL}/api/v1/user?search=${search?.trim()}`,config);
       setLoading(false)
       setSearchResult(data);
       
      } catch (error) {
        toaster.create({
                    title:"Error Encountered in api call",
                    description:"Failed to load the search results",
                    type:"error",
                    closable:true,
        })
      }
    }
    const handleSubmit = async ()=>{
        if(!groupChatName || !selectedUsers){
            toaster.create({
                title:"Please fill all the fields",
                type:"info",
                duration:5000,
                closable:true,
            });
            return; 
}
try {
     const config={
                headers:{
                    authorization:`Bearer ${user?.data.accessToken}`
                }
            };
             const BASE_URL = import.meta.env.VITE_API_BASE_URL;
       const {data} = await axios.post(`${BASE_URL}/api/v1/chat/group`,
        {
        name: groupChatName,
        users:JSON.stringify(selectedUsers.map((u)=> u._id))
       },config);
       setChats([data,...chats]);
       toaster.create({
                    title:"Group Chat created",
                    description:"A new group chat has been created succcessfully",
                    type:"success",
                    closable:true,
        })
} catch (error) {
    toaster.create({
                title:"Failed to create the group chat",
                description:error.response.data,
                type:"error",
                duration:5000,
                closable:true,
            });
}
    }
    const handleDelete = (remUser)=>{
   setSelectedUsers(selectedUsers.filter(u=>u._id !== remUser._id))
    }

    const handleGroup = (userToAdd)=>{
       if(selectedUsers.includes(userToAdd)){
        toaster.create({
            title:"User already added to group",
            type:"info",
            duration:5000,
            closable:true,
        });
        return;
       }

       setSelectedUsers([...selectedUsers,userToAdd])
    }

  return (
    <>
    <Dialog.Root>
      <Dialog.Trigger asChild>
         {
            children ? (
            <span>{children}</span>
        ):(
            <IconButton
            display={{base:"flex"}}
            >
                <FaRegEye />
            </IconButton>
            )
        }
      </Dialog.Trigger>
      <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content color={"black"} bgColor={"azure"}>
            <Dialog.Header display={"flex"} justifyContent={"center"}>
                <Dialog.Title fontSize={"30px"} fontFamily={"Work sans"}>Create a group</Dialog.Title>
            </Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body display={"flex"} flexDir={"column"} alignItems={"center"}>
            <Field.Root id="groupchat" required>
                                <Field.Label>Enter chat name</Field.Label>
                                <Input 
                                placeholder='Enter chat name' 
                                name="groupchat"
                                type="text"
                                mb={3}
                                value={groupChatName}
                                onChange={(e)=>{
                                    setGroupChatName(e.target.value)
                                }}
                                />
                            </Field.Root>
                            <Field.Root id="users" required>
                                <Field.Label>Select Users</Field.Label>
                                <Input 
                                placeholder='Add users' 
                                name="users"
                                mb={1}
                                value={search}
                                type="text"
                                onChange={(e)=>{
                                    handleSearch(e.target.value)
                                }}
                                />
                            </Field.Root>

                {selectedUsers.map((user)=>(
                    <UserBadgeItem key={user._id} user={user} handleFunction={()=>handleDelete(user)}/>
                ))}
                {
                    loading?(
                         <div>loading...</div>
                    ):(searchResult?.slice(0,4).map((user)=>(
                        <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>
                    )))
                }
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
                <Button variant="ghost" bgColor={"blue"} color={"white"} onClick={handleSubmit}>Create Chat</Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
    </>
  )
}

export default GroupChatModal