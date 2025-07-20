import { Box, Button,Text,Menu,Portal,Icon,Avatar} from '@chakra-ui/react';
import { Tooltip } from '../src/components/ui/tooltip';
import React, { useState } from 'react'
import { FaSearch,FaBell,FaChevronDown} from "react-icons/fa";
import { chatState } from '../../Context/chatProvider.jsx';
import ProfileModal from './ProfileModal';

const SideDrawer = () => {
const [search,setSearch]=useState("");
const [searchResult,setSearchResult] = useState([]);
const [loading,setLoading]= useState(false);
const [loadingChat,setLoadingChat]=useState(false);
const {user}=chatState()


  return (
    <>
    <Box 
    display={"flex"}
    justifyContent={"space-between"}
    alignItems={"center"}
    bg={"white"}
    width="100%"
    p={"5px 10px 5px 10px"}
    borderWidth={"2 px"}
    >
        <Tooltip content="Search users" showArrow >
        <Button variant="ghost" color={"black"} _hover={{color:"white", bgColor:"gray.500"}}>
         <FaSearch />
         <Text 
         display={{base:"none",md:"flex"}}
         px={"4"}
         >Search User</Text>
        </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily={"Work Sans"} color={"black"}>
            Guff-Gaff
        </Text>
        <div>
            <Menu.Root>
      <Menu.Trigger asChild>
        <Button size="sm" p={"1"}>
          <Icon>
            <FaBell />
          </Icon>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {/* <Menu.Item value="new-txt">Notifications to be added later</Menu.Item> */}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button size="sm" p={"1"} color={"black"}>
            <Avatar.Root size="sm">
        <Avatar.Image  size="sm" cursor="pointer" src={user?.avatar}/>
        <Avatar.Fallback/>
      </Avatar.Root>
          <Icon>
            <FaChevronDown />
          </Icon>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content bgColor={"white"} color={"black"}>
            <ProfileModal user={user}>
            <Button value="profile" color={"black"} _hover={{bgColor:"grey"}}>My Profile</Button>
            </ProfileModal>
            <Menu.Separator />
            <Button value="logout" color={"black"} _hover={{bgColor:"grey"}}>Logout</Button>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
        </div>
    </Box>
    </>
  )
}

export default SideDrawer;