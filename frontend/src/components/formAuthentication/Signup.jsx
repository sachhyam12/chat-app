import { Fieldset, VStack,Stack, Input,Field,Button,FileUpload} from '@chakra-ui/react'
import { HiUpload } from "react-icons/hi";
import React,{useState} from 'react'
import { PasswordInput } from '../src/components/ui/password-input';
const Signup = () => {

const [name,setName]= useState();
const [email,setEmail]= useState();
const [password,setPassword]= useState();
const [confirmpassword,setConfirmpassword]= useState();
const [avatar,setAvatar]= useState();

const postDetails=(avatar)=>{

};

const submitHandler=(e)=>{

}
  return (
    <VStack spacing='5px' color="black">
    <Fieldset.Root size="lg" maxW="md">
        <Stack>
            <Fieldset.Legend color="black">Registration Form</Fieldset.Legend>
            <Fieldset.HelperText>
                Please fill the form below to register
            </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
            <Field.Root id="name" required>
                <Field.Label >Name</Field.Label>
                <Input 
                placeholder='Enter your name' 
                name="name"
                value={name}
                onChange={(e)=>{
                    setName(e.target.value)
                }}
                />
            </Field.Root>
        
            <Field.Root id="email" required>
                <Field.Label>Email Address</Field.Label>
                <Input 
                placeholder='Enter your email' 
                name="email"
                value={email}
                type="email"
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                />
            </Field.Root>
      
            <Field.Root id="password" required>
                <Field.Label>Password</Field.Label>
                <PasswordInput
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={((e)=>{
                     setPassword(e.target.value)
                })}

                />
            </Field.Root>
            <Field.Root id="confirmpassword" required>
                <Field.Label>Confirm Password</Field.Label>
                <PasswordInput
                name="password"
                value={confirmpassword}
                placeholder="Enter password again"
                onChange={((e)=>{
                     setConfirmpassword(e.target.value)
                })}

                />
            </Field.Root>
            <Field.Root>
              <FileUpload.Root id="avatar">
      <FileUpload.HiddenInput />
      <FileUpload.Trigger>
        <Field.Label>Upload your profile pic</Field.Label>
        
        <Button variant="outline" size="sm" color={"black"} marginTop={"12px"}>
          <HiUpload /> Upload avatar
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>
</Field.Root>
            
        </Fieldset.Content>
    </Fieldset.Root>
    <Button
    colorPalette="blue"
    width="100%"
    style={{marginTop:15}}
    onClick={submitHandler}
    >
      Signup
    </Button>
    </VStack>
  )
}

export default Signup