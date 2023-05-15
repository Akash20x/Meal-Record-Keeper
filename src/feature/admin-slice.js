import { createSlice } from "@reduxjs/toolkit";
import { deleteUserMeal, fetchAllUserMeals, fetchAllUsers, fetchStats, fetchUserMeal, makeAdmin, updateUserMeal } from "../services/adminServices";

  const initialState = {
    usersList: [],
    usersListLoading: false,

    allMeals: [],
    allMealsLoading: false,

    stats:[],
    statsLoading: false,

    user:{},
  };


const adminSlice = createSlice({
    name: "admin",
    initialState,
    extraReducers: (builder) => {
        // Get data of all users
        builder.addCase(fetchAllUsers.pending, (state) => {
            state.usersListLoading = true;
        });
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.usersList = action.payload;
            state.usersListLoading = false;
        })

        // Change role
        builder.addCase(makeAdmin.fulfilled, (state, action) => {
            state.user = action.payload;
        })

        // Get meals of all users
        builder.addCase(fetchAllUserMeals.pending, (state) => {
            state.allMealsLoading = true;
        });
        builder.addCase(fetchAllUserMeals.fulfilled, (state, action) => {
            state.allMeals = action.payload;
            state.allMealsLoading = false;
        })

          // get Stats
        builder.addCase(fetchStats.pending, (state) => {
            state.statsLoading = true;
        });
        builder.addCase(fetchStats.fulfilled, (state, action) => {
            state.stats = action.payload;
            state.statsLoading = false;
        })


        // Delete user meal
        builder.addCase(deleteUserMeal.fulfilled, (state, action) => {
            const updatedAllMeals = state.allMeals.meals.filter((item) => item._id !== action.payload);
            state.allMeals = {
              ...state.allMeals,
              meals: updatedAllMeals
            };
          });

         // update user meal
        builder.addCase(updateUserMeal.fulfilled, (state, action) => {

            const updatedAllMeals = state.allMeals.meals.map((item)=>{
                if(item._id === action.payload.doc._id) {
                    return action.payload.doc
                    }
                else{
                    return item
                    }
            });
            state.allMeals = {
              ...state.allMeals,
              meals: updatedAllMeals
            };
        })      
    }
})

export default adminSlice.reducer;