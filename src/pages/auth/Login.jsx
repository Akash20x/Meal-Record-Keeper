import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../services/authServices';
import { fillform, resetErrorState } from '../../feature/auth-slice';

export function Login() {
    const navigate = useNavigate();
    const toast = useToast()

    const state = useSelector((state) => state.auth);
    const {  isError, errorInfo } = state
  
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(resetErrorState())
    },[])

    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
        
      const loginHandler = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        const details = {
          email, 
          password,
          navigate,
          toast
        }

        dispatch(logIn(details))
      };
      
    const fillFormValue = (event, fieldName) => {
        const { value } = event.target;
        setFormData((form) => ({ ...form, [fieldName]: value }));
        dispatch(fillform(fieldName))
      };
      
      const fillGuestCredentials = (fieldName,value) => {
        setFormData((form) => ({ ...form, [fieldName]: value }));
      };

      
  return (
    <Center h="100vh">
  <Box
    bg="white"
    maxW="400px"
    p="20px"
    textAlign="center"
    borderRadius="md"
    mx="15px"
    boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
  > 
    <form onSubmit={loginHandler} id="novalidateform" noValidate>
      <FormControl isRequired isInvalid={isError.email}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={formData.email}
          placeholder="Email"
          form="novalidateform"
          onChange={(e) => fillFormValue(e, "email")}
        />
        <FormErrorMessage>
          {isError.email ? errorInfo.email || "Email is required" : null}
        </FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={isError.password} my="10px">
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={formData.password}
          placeholder="Password"
          form="novalidateform"
          onChange={(e) => fillFormValue(e, "password")}
        />
        <FormErrorMessage>
          {isError.password ? errorInfo.password || "Password is required" : null}
        </FormErrorMessage>
      </FormControl>

      <Button variant="with-blue" px="25px" type="submit">
        Login
      </Button>

      <Box>
        <Button variant="with-blue" onClick={() => {
          fillGuestCredentials("email", "cw@gmail.com");
          fillGuestCredentials("password", "asd@123H");
        }}>Guest Login</Button>

        <Button variant="with-blue" onClick={() => {
          fillGuestCredentials("email", "tw@gmail.com");
          fillGuestCredentials("password", "asd@123H");
        }}>Admin Login</Button>
      </Box>

      <Text>
        New user? Create your account{" "}
        <Link to="/signup">
          <Text as="span" color="blue.500">here</Text>
        </Link>
      </Text>
    </form>
  </Box>
</Center>
  )
}

