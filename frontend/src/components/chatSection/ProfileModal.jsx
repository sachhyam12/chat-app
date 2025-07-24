import {
  Button,
  Dialog,
  IconButton,
  Image,
  Portal,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";
const ProfileModal = ({ user, children }) => {
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
                  {user.name}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.CloseTrigger />
              <Dialog.Body
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Image
                  borderRadius={"full"}
                  boxSize={"150px"}
                  src={user.avatar}
                  alt={user.name}
                />
                <Text fontSize={{ base: "30px", md: "32px" }}>
                  Email:{user.email}
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="ghost" bgColor={"blue"} color={"white"}>
                    Okay
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

export default ProfileModal;
