import React,{useState}from 'react'
import { Fieldset, VStack,Stack, Input,Field,Button,FileUpload} from '@chakra-ui/react'
import { HiUpload } from "react-icons/hi";

import { PasswordInput } from '../src/components/ui/password-input';


const Login = () => {
    const [email,setEmail]= useState();
    const [password,setPassword]= useState();

const submitHandler=(e)=>{

}
  return (
    <VStack spacing='5px' color="black">
        <Fieldset.Root size="lg" maxW="md">
            <Stack>
                <Fieldset.Legend color="black">Login Form</Fieldset.Legend>
                <Fieldset.HelperText>
                    Please fill the form below to login
                </Fieldset.HelperText>
            </Stack>
    
            <Fieldset.Content>
            
                <Field.Root id="email" required>
                    <Field.Label>Email Address</Field.Label>
                    <Input 
                    placeholder='Enter your email' 
                    name="email"
                    type="email"
                    value={email}
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
                
            </Fieldset.Content>
        </Fieldset.Root>
        <Button
        colorPalette="blue"
        width="100%"
        style={{marginTop:15}}
        onClick={submitHandler}
        >
          Login
        </Button>
        <Button
        colorPalette={"red"}
        variant="solid"
        width={"100%"}
        onClick={()=>{
            setEmail("guest@example.com")
            setPassword("123456")
        }}
        >
        Try as a guest User
        </Button>
        </VStack>
  )
}

export default Login