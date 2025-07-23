import {
  Box,
  Button,
  Dialog,
  IconButton,
  Portal,
  Field,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";
import { chatState } from "../../Context/ChatProvider.jsx";
import { toaster } from "../ui/toaster.jsx";
import UserBadgeItem from "../UserInfo/UserBadgeItem";
import axios from "axios";
import UserListItem from "../UserInfo/UserListItem.jsx";

const UpdateGroupChatModal = ({
  fetchAgain,
  setFetchAgain,
  fetchMessages,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const { selectedChat, setSelectedChat, user } = chatState();

  const handleAddUser = async (newuser) => {
    if (selectedChat.users.find((u) => u._id === newuser._id)) {
      toaster.create({
        title: "User already in the group",
        type: "info",
        duration: 4000,
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user.data.user._id) {
      toaster.create({
        title: "Only admins are allowed to add the user",
        type: "error",
        duration: 5000,
        closable: true,
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user?.data.accessToken}`,
        },
      };
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/chat/addUser`,
        {
          chatId: selectedChat._id,
          userId: newuser._id,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toaster.create({
        title: "Error occurred adding the user to group",
        description: error.response.data.message,
        type: "error",
        duration: 5000,
        closable: true,
      });
    }
  };

  const handleRemove = async (remUser) => {
    const userId = user.data.user._id;
    if (remUser === user) {
      remUser._id = userId;
    }

    if (selectedChat.groupAdmin._id !== userId && remUser._id !== userId) {
      toaster.create({
        title: "Only admins are allowed to remove the user",
        type: "error",
        duration: 5000,
        closable: true,
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user?.data.accessToken}`,
        },
      };
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/chat/removeUser`,
        {
          chatId: selectedChat._id,
          userId: remUser._id,
        },
        config
      );
      remUser._id === userId ? setSelectedChat("") : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toaster.create({
        title: "Error occurred removing the user from group",
        description: error.response.data.message,
        type: "error",
        duration: 5000,
        closable: true,
      });
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user.data.accessToken}`,
        },
        withCredentials: true,
      };
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toaster.create({
        title: "Couldn't rename the group chat",
        description: error.response.data.message,
        type: "error",
        duration: 5000,
        closable: true,
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);

    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user?.data.accessToken}`,
        },
      };
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/user?search=${search?.trim()}`,
        config
      );
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toaster.create({
        title: "Error Encountered in api call",
        description: "Failed to load the search results",
        type: "error",
        closable: true,
      });
    }
  };

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          {children ? (
            <span>{children}</span>
          ) : (
            <IconButton display={{ base: "flex" }}>
              <FaRegEye />
            </IconButton>
          )}
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content color={"black"} bgColor={"azure"}>
              <Dialog.Header display={"flex"} justifyContent={"center"}>
                <Dialog.Title fontSize={"30px"} fontFamily={"Work sans"}>
                  {selectedChat.chatName}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.CloseTrigger />
              <Dialog.Body
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box width={"100%"} display="flex" flexWrap={"wrap"} pb={3}>
                  {selectedChat.users.map((user) => (
                    <UserBadgeItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleRemove(user)}
                    />
                  ))}
                </Box>
                <Field.Root
                  id="updatechatname"
                  display={"flex"}
                  flexDir={"row"}
                  required
                >
                  <Input
                    placeholder="Enter new group chat name"
                    name="updatechatname"
                    type="text"
                    mb={3}
                    value={groupChatName}
                    onChange={(e) => {
                      setGroupChatName(e.target.value);
                    }}
                  />
                  <Button
                    variant="solid"
                    bgColor={"teal"}
                    ml={1}
                    loading={renameLoading}
                    onClick={handleRename}
                  >
                    Update
                  </Button>
                </Field.Root>
                <Field.Root id="users" required>
                  <Field.Label>Select Users</Field.Label>
                  <Input
                    placeholder="Add users to group"
                    name="users"
                    mb={1}
                    value={search}
                    type="text"
                    onChange={(e) => {
                      handleSearch(e.target.value);
                    }}
                  />
                </Field.Root>
                {loading ? (
                  <VStack colorPalette="teal">
                    <Spinner color="colorPalette.600" />
                    <Text color="colorPalette.600">Loading....</Text>
                  </VStack>
                ) : (
                  searchResult?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleAddUser(user)}
                    />
                  ))
                )}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant="ghost"
                    bgColor={"red"}
                    color={"white"}
                    onClick={() => handleRemove(user)}
                  >
                    Leave group
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default UpdateGroupChatModal;
