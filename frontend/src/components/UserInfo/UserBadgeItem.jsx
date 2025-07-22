import { Box } from '@chakra-ui/react'
import { IoCloseOutline } from "react-icons/io5";
import React from 'react'

const UserBadgeItem = ({user,handleFunction}) => {
  return (
    <Box
    display={"flex"}
    px={2}
    py={1}
    borderRadius={"lg"}
    color={"white"}
    bgColor={"#95A8E0"}
    m={1}
    mb={2}
    variant="solid"
    fontSize={12}
    cursor={"pointer"}
    onClick={handleFunction}
    >
     {user.name}
     <IoCloseOutline />
    </Box>
  )
}

export default UserBadgeItem