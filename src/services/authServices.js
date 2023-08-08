import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const BASE_API =  'https://meal-record-api.vercel.app/api/auth'


export const signUp = createAsyncThunk(
    "auth/signUp",
    async (details, { rejectWithValue }) => {

        const {email,password,navigate,toast} = details
      
        try {
        const response = await axios.post(`${BASE_API}/register`, {
            email: email,
            password: password
        });

        toast({
            position: 'top',
            title: 'Account created.',
            description: response.data.message,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });

          navigate('/login')    
      
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
)



export const logIn = createAsyncThunk(
    "auth/logIn",
    async (details, { rejectWithValue }) => {

        const {email,password,navigate,toast} = details
      
        try {
        const response = await axios.post(`${BASE_API}/login`, {
            email: email,
            password: password
        });

       navigate('/dashboard')    

       return response.data
      
      } catch (error) {
        const err = error.response.data

        if(!err.field && !err.emptyInput){
            toast({
                position: 'top',
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }
        return rejectWithValue(err);
      }
    }
)



  export const fetchUserProfile = createAsyncThunk(
    "auth/fetchUserProfile",
    async () => {
      try {
        let config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
  
        const response = await axios.get(`${BASE_API}/profile`, config)
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  );


