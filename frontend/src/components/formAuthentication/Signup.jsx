import {
  Fieldset,
  VStack,
  Stack,
  Input,
  Field,
  Button,
  FileUpload,
  Box,
} from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import React, { useState } from "react";
import { PasswordInput } from "../src/components/ui/password-input";
import { toaster } from "../ui/toaster";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const postDetails = (avatar) => {
    setLoading(true);
    if (avatar == undefined) {
      toaster.create({
        title: "Upload unsuccessful",
        description: "File couldn't be saved. Something went wrong",
        duration: 5000,
        closable: true,
        placement: "top-end",
        overlap: true,
      });
      return;
    }

    if (avatar.type === "image/jpeg" || avatar.type === "image/png") {
      const data = new FormData();
      data.append("file", avatar);
      data.append("upload_preset", "guff-gaff");
      data.append("cloud_name", "dq4q2iqk1");
      fetch("https://api.cloudinary.com/v1_1/dq4q2iqk1/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setAvatar(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toaster.create({
        title: "Upload unsuccessful",
        description: "File couldn't be saved. Something went wrong",
        duration: 5000,
        closable: true,
        placement: "top-end",
        overlap: true,
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async (e) => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toaster.create({
        title: "Please fill all the fields",
        type: "error",
        duration: 5000,
        closable: true,
        placement: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toaster.create({
        title: "Passwords do not match",
        type: "error",
        duration: 5000,
        closable: true,
        placement: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const payload = {
        name: name || "",
        email: email || "",
        password: password || "",
      };
      if (avatar) payload.avatar = avatar;

      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user`,
        payload,
        config
      );
      console.log(data);
      toaster.create({
        title: "Registration Successful",
        type: "success",
        duration: 5000,
        closable: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chat");
    } catch (error) {
      toaster.create({
        title: "Error!!!",
        description: error.response.data.message,
        type: "error",
        duration: 5000,
        closable: true,
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing="5px" color="black">
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend color="black">Registration Form</Fieldset.Legend>
          <Fieldset.HelperText>
            Please fill the form below to register
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root id="name" required>
            <Field.Label>Name</Field.Label>
            <Input
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Email Address</Field.Label>
            <Input
              placeholder="Enter your email"
              name="email"
              value={email}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Password</Field.Label>
            <PasswordInput
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Field.Root>
          <Field.Root id="confirmpassword" required>
            <Field.Label>Confirm Password</Field.Label>
            <PasswordInput
              name="confirmpassword"
              value={confirmpassword}
              placeholder="Enter password again"
              onChange={(e) => {
                setConfirmpassword(e.target.value);
              }}
            />
          </Field.Root>
          <Field.Root>
            <FileUpload.Root
              id="avatar"
              onChange={(e) => postDetails(e.target.files[0])}
            >
              <FileUpload.HiddenInput />
              <FileUpload.Trigger>
                <Field.Label>Upload your profile pic</Field.Label>

                <Box
                  as="span"
                  display="inline-flex"
                  alignItems="center"
                  px="4"
                  py="2"
                  borderWidth="1px"
                  borderRadius="md"
                  bg="black"
                  color="white"
                  mt="3"
                  cursor="pointer"
                  _hover={{ bg: "gray.700" }}
                >
                  <HiUpload style={{ marginRight: "8px" }} />
                  Upload avatar
                </Box>
              </FileUpload.Trigger>
              <FileUpload.List />
            </FileUpload.Root>
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
      <Button
        type="submit"
        colorPalette="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        loading={loading}
        loadingText="Registering...."
      >
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
