import {Button, Dialog,IconButton,Image,Portal,Text,useDisclosure} from '@chakra-ui/react'
import { FaRegEye } from "react-icons/fa";
import {useState} from "react"
const UpdateGroupChatModal=({fetchAgain,setFetchAgain,children})=>{
     const [open,setOpen] = useState(false)
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
            <Dialog.Title fontSize={"30px"} fontFamily={"Work sans"}>dialog title</Dialog.Title>
        </Dialog.Header>
      <Dialog.CloseTrigger />
      <Dialog.Body display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"space-between"}>
        Dialog body
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

export default UpdateGroupChatModal;