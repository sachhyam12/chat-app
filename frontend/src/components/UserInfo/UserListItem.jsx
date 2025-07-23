import { chatState } from "../../Context/ChatProvider.jsx";
import {
  Avatar,
  AvatarImage,
  Box,
  Text,
  useRadioCardContext,
} from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "teal",
        color: "white",
      }}
      width="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar.Root size="sm">
        <Avatar.Image
          size="sm"
          cursor="pointer"
          src={user.avatar}
          alt={user.name}
        />
        <Avatar.Fallback />
      </Avatar.Root>
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
