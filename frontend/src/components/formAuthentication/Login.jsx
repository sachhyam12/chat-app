import React,{useState}from 'react'
import { Fieldset, VStack,Stack, Input,Field,Button} from '@chakra-ui/react'
import { PasswordInput } from '../src/components/ui/password-input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toaster } from '../ui/toaster.jsx';
const Login = () => {
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [loading,setLoading] = useState(false)
    const navigate=useNavigate()
 
const submitHandler=async (e)=>{
setLoading(true);
if(!email || !password){
      toaster.create(
    {
      title:"Please fill all the fields",
      status:"error",
      duration:5000,
      isClosable:true,     
    }
  );
  setLoading(false);
  return;
}


try {
  const config ={
    headers:{
      "Content-type":"application/json"
    },
  };
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const payload ={
    email,password
  };
  const {data} = await axios.post(`${BASE_URL}/api/v1/user/login`,payload,config);
  toaster.create({
    title:"Login successful",
    type:"success",
    duration:5000,
    closable: true,
    
  });
  localStorage.setItem('userInfo',JSON.stringify(data));
  setLoading(false);
  navigate("/chat");
} catch (error) {
      toaster.create({
      title:"Error!!!",
      description: error.response.data.message,
      status:"error",
      duration:5000,
      isClosable:true,
    });
    setLoading(false);
}
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