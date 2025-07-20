import {Button, Dialog,IconButton,Portal,useDisclosure} from '@chakra-ui/react'
import { FaRegEye } from "react-icons/fa";
import {useState} from "react"
const ProfileModal=({user,children})=>{
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
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title color={"white"}>{user.email}</Dialog.Title>
        </Dialog.Header>
      <Dialog.CloseTrigger />
      <Dialog.Body>
        {user.name}
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.ActionTrigger asChild>
            <Button variant="ghost" bgColor={"blue"} color={"white"}>Okay</Button>
        </Dialog.ActionTrigger>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Positioner>
  </Portal>
</Dialog.Root>
</>
)
}

export default ProfileModal;