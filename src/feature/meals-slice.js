import { createSlice } from "@reduxjs/toolkit";
import { createMeal, deleteMeal, fetchAllMeals, fetchMeal, updateMeal } from "../services/mealsServices";

const initialState = {
    meals: [],
    mealsLoading: false,

    singleMeal: {},
    singleMealLoading :false,
  };


const mealsSlice = createSlice({
    name: "meals",
    initialState,
    extraReducers: (builder) => {
        // Get all meals of user
        builder.addCase(fetchAllMeals.pending, (state) => {
            state.mealsLoading = true;
        });
        builder.addCase(fetchAllMeals.fulfilled, (state, action) => {
            state.meals = action.payload;
            state.mealsLoading = false;
        })

        // Get meal
        builder.addCase(fetchMeal.pending, (state) => {
            state.singleMealLoading = true;
        });
        builder.addCase(fetchMeal.fulfilled, (state, action) => {
            state.singleMeal = action.payload;
            state.singleMealLoading = false;
        })

          // Delete meal
          builder.addCase(deleteMeal.fulfilled, (state, action) => {
            state.meals = state.meals.filter((item) => item._id !== action.payload);
          });

        // add new meal
        builder.addCase(createMeal.fulfilled, (state, action) => {
            state.meals.push(action.payload.createdMeal);
        })

        // update meal
        builder.addCase(updateMeal.fulfilled, (state, action) => {
            state.singleMeal = action.payload.doc;
        })

    }
})

export default mealsSlice.reducer;