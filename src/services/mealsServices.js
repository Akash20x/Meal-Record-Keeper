import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API =  'https://meal-record-api.up.railway.app/api/meal'


export const createMeal = createAsyncThunk(
    "meals/createMeal",
    async (meal) => {
      try {
        let config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
  
        const response = await axios.post(`${BASE_API}`, meal,config);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  );


  export const fetchAllMeals = createAsyncThunk(
    "meals/fetchAllMeals",
    async () => {
      try {
        let config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
  
        const response = await axios.get(`${BASE_API}`, config);
        return response.data.meals;
      } catch (error) {
        console.error(error);
      }
    },
  );
  

  
  export const fetchMeal = createAsyncThunk(
    "meals/fetchMeal",
    async (id) => {
      try {
        let config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
  
        const response = await axios.get(`${BASE_API}/${id}`, config);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  );




  export const deleteMeal = createAsyncThunk(
    "meals/deleteMeal",
    async (id) => {
      try {
        let config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
  
        await axios.delete(`${BASE_API}/${id}`, config);
        return id;
      } catch (error) {
        console.error(error);
      }
    },
  );


 export const updateMeal = createAsyncThunk(
    "meals/updateMeal",
    async ({meal,id}) => {
      try {
        let config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
  
        const response = await axios.put(`${BASE_API}/${id}`,meal,config)
        return response.data
      } catch (error) {
        console.error(error);
      }
    },
  );



