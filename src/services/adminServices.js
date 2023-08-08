import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API =  'https://meal-record-api.vercel.app/api/admin'


  export const fetchAllUsers = createAsyncThunk(
    "admin/fetchAll",
    async (pagenumber) => {
      try {
        let config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
  
        const response = await axios.get(`${BASE_API}/users?page=${pagenumber}`, config);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  );
  
 
 export const makeAdmin = createAsyncThunk(
    "admin/makeAdmin",
    async ({id,role}) => {
      try {
        let config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
  
        const response = await axios.put(`${BASE_API}/users/${id}`,role, config);
        return response.data.updatedUser;
      } catch (error) {
        console.error(error);
      }
    },
  );
  


  export const fetchAllUserMeals = createAsyncThunk(
    "admin/fetchAllUserMeals",
    async (pagenumber="") => {
      try {
        let config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
  
        const response = await axios.get(`${BASE_API}/meals?page=${pagenumber}`, config);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  );
  
  

 export const deleteUserMeal = createAsyncThunk(
    "admin/deleteUserMeal",
    async (id) => {
      try {
        let config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
  
        await axios.delete(`${BASE_API}/meals/${id}`, config);
        return id

    } catch (error) {
        console.error(error);
      }
    },
  );



 export const updateUserMeal = createAsyncThunk(
    "admin/updateUserMeal",
    async ({meal,id}) => {
      try {
        let config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
  
        const response = await axios.put(`${BASE_API}/meals/${id}`, meal,config);
        return response.data;
      } catch (error) {
        console.error(error)
      }
    },
  );




  export const getUserMeal = async (id) =>{
    try{
 
        let config = {
            headers: {
                Authorization: 'Bearer ' +  localStorage.getItem("token"),
            }
          }

         const response = await axios.get(`${BASE_API}/meals/${id}`, config);
         return response.data

     }
     catch(error){
         console.error(error);
     }
 }


 export const fetchStats = createAsyncThunk(
    "admin/fetchStats",
    async () => {
      try {
        let config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
  
        const response = await axios.get(`${BASE_API}/stats`,config);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  );


  
 
