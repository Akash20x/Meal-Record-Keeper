import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { signUp } from '../../services/authServices';
import { useDispatch, useSelector } from 'react-redux';
import { fillform, resetErrorState } from '../../feature/auth-slice';


export function Signup() {

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

  const signUpHandler =  (e) => {
      e.preventDefault();
      const { email, password } = formData;
      const details = {
        email, 
        password,
        navigate,
        toast
      }
      dispatch(signUp(details))
  }


  const fillFormValue = (event, fieldName) => {
      const { value } = event.target;
      setFormData((form) => ({ ...form, [fieldName]: value }));
      dispatch(fillform(fieldName))
    };
    
 
  return (
<Center h="100vh">
  <Box
    maxW="400px"
    bg="white"
    p="20px"
    textAlign="center"
    borderRadius="md"
    mx="15px"
    boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
  >
    <form onSubmit={signUpHandler} id="novalidateform" noValidate>
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
          {isError.email ? (errorInfo.email ? errorInfo.email : "Email is required") : null}
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
          {isError.password ? (errorInfo.password ? errorInfo.password : "Password is required") : null}
        </FormErrorMessage>
      </FormControl>

      <Button variant="with-blue" type="submit">
        Signup
      </Button>

      <Text>
        Already have an account? Login{" "}
        <Link to="/login">
          <Text as="span" color="blue.500">
            here
          </Text>
        </Link>
      </Text>
    </form>
  </Box>
</Center>
  )
}

