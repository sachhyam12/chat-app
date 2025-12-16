import {
  Box,
  Button,
  Text,
  Menu,
  Portal,
  Icon,
  Avatar,
  Input,
  Spinner,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { Tooltip } from "../src/components/ui/tooltip";
import React, { useState } from "react";
import { FaSearch, FaBell, FaChevronDown } from "react-icons/fa";
import { chatState } from "../../Context/ChatProvider.jsx";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import { Drawer } from "@chakra-ui/react";
import { toaster } from "../ui/toaster.jsx";
import ChatLoading from "./ChatLoading.jsx";
import axios from "axios";
import UserListItem from "../UserInfo/UserListItem.jsx";
import { getSender } from "@/config/chatLogic";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = chatState();
  const count = notification.length;
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toaster.create({
        title: "Nothing entered to search",
        type: "warning",
        duration: 5000,
        closable: true,
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user.data.accessToken}`,
        },
        withCredentials: true,
      };
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const { data } = await axios.get(
        `${BASE_URL}/api/v1/user?search=${search?.trim()}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toaster.create({
        title: "Error Encountered in api call",
        description: "Failed to load the search results",
        type: "error",
        closable: true,
      });
      console.log(error);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          authorization: `Bearer ${user.data.accessToken}`,
          "Content-type": "application/json",
        },
        withCredentials: true,
      };
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/chat`,
        { userId },
        config
      );
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      setOpen(false);
    } catch (error) {
      toaster.create({
        title: "Error fetching the chat",
        description: error.message,
        type: "error",
        duration: 5000,
        closable: true,
      });
    }
  };
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
        <Tooltip content="Search users" showArrow>
          <Button
            variant="ghost"
            color={"black"}
            _hover={{ color: "white", bgColor: "gray.500" }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <FaSearch />
            <Text display={{ base: "none", md: "flex" }} px={"4"}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily={"Work Sans"} color={"black"}>
          Guff-Gaff
        </Text>
        <div>
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton size="sm" p={"1"}>
                {count > 0 && (
                  <Badge
                    position="absolute"
                    top="0"
                    right="0"
                    transform="translate(25%, -25%)"
                    borderRadius="full"
                    bg="red.500"
                    color="white"
                    fontSize="0.7em"
                    px={2}
                  >
                    {count > 99 ? "99+" : count}
                  </Badge>
                )}
                <FaBell />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="notification" pl={3}>
                    {!notification.length && "No New Messages"}
                    {notification.map((msg) => (
                      <Menu.Item
                        key={msg._id}
                        onClick={() => {
                          setSelectedChat(msg.chat);
                          setNotification(
                            notification.filter((n) => n !== msg)
                          );
                        }}
                      >
                        {msg.chat.isGroupChat
                          ? `New message in ${notification.chat.chatName}`
                          : `New Message from ${getSender(
                              user,
                              msg.chat.users
                            )}`}
                      </Menu.Item>
                    ))}
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button size="sm" p={"1"} color={"black"}>
                <Avatar.Root size="sm">
                  <Avatar.Image
                    size="sm"
                    cursor="pointer"
                    src={user?.data.user.avatar}
                  />
                  <Avatar.Fallback />
                </Avatar.Root>
                <Icon>
                  <FaChevronDown />
                </Icon>
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content bgColor={"white"} color={"black"}>
                  <ProfileModal user={user.data.user}>
                    <Button
                      value="profile"
                      color={"black"}
                      _hover={{ bgColor: "grey" }}
                    >
                      My Profile
                    </Button>
                  </ProfileModal>
                  <Menu.Separator />
                  <Button
                    value="logout"
                    color={"black"}
                    _hover={{ bgColor: "grey" }}
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </div>
      </Box>

      <Drawer.Root
        placement={"start"}
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <Drawer.Backdrop />
        <Drawer.Trigger />
        <Drawer.Positioner>
          <Drawer.Content bgColor={"aliceblue"}>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Title
                borderBottomWidth={"1px"}
                fontFamily={"Work Sans"}
                color="teal"
              >
                Search Users
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Box display={"flex"} pb={2}>
                <Input
                  color={"black"}
                  placeholder={"Search by name or email"}
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch} bgColor={"gray"}>
                  Search
                </Button>
              </Box>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
              {loadingChat && <Spinner ml="auto" display="flex" />}
            </Drawer.Body>
            <Drawer.Footer />
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  );
};

export default SideDrawer;
