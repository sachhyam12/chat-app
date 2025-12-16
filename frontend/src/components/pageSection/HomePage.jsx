import { Box, Container, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Tabs } from "@chakra-ui/react";
import {
  LuFolder,
  LuFolderInput,
  LuLogIn,
  LuSquareCheck,
  LuUser,
} from "react-icons/lu";
import Login from "../formAuthentication/login.jsx";
import Signup from "../formAuthentication/Signup.jsx";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chat");
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        textAlign="center"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" color="black">
          Guff-Gaff
        </Text>
      </Box>
      <Box
        d="flex"
        textAlign="center"
        bgColor={"whiteAlpha.900"}
        w="100%"
        p={4}
        borderRadius="md"
        borderWidth="1px"
      >
        <Tabs.Root defaultValue="login" variant="solid">
          <Tabs.List
            bg="bg.muted"
            rounded="xl"
            p="3"
            color={"white"}
            bgColor={"ButtonHighlight"}
            variant="outline"
          >
            <Tabs.Trigger value="login" color>
              <LuLogIn />
              login
            </Tabs.Trigger>
            <Tabs.Trigger value="register">
              <LuFolderInput />
              SignUp/Register
            </Tabs.Trigger>
            <Tabs.Indicator rounded="l2" />
          </Tabs.List>
          <Tabs.Content value="login" color="black">
            <Login />
          </Tabs.Content>
          <Tabs.Content value="register" color="black">
            <Signup />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
}

export default HomePage;
