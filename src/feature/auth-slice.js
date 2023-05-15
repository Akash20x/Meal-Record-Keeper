import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, logIn, signUp } from "../services/authServices";


const initialState = {
  user:{},
  isAdmin:false,
  isError : {
    email: false,
    password: false
    },
  errorInfo : {
    email: "",
    password: ""
    },
  };


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut(state) {
            localStorage.removeItem("token")
            state.user = {}
        },
        fillform(state,action) {
            return {
                ...state,
                isError: { ...state.isError, [action.payload]: false },
                errorInfo: { ...state.errorInfo, [action.payload]: "" },
              };
        },
        resetErrorState(state) {
            return {
              ...state,
              isError: { email: false, password: false },
              errorInfo: { email: "", password: "" },
            };
          }
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.rejected, (state, action) => {  
            const error = action.payload;
            state.isError = error.emptyInput;
            if (error.field) {
              state.isError = { ...state.isError, [error.field]: true };
              state.errorInfo = { ...state.errorInfo, [error.field]: error.message };
            }
        })

        builder.addCase(logIn.fulfilled, (state, action) => {
            localStorage.setItem("token", action.payload.accessToken);     
        })

        builder.addCase(logIn.rejected, (state, action) => {
            const error = action.payload;
            state.isError = error.emptyInput || {};
            state.errorInfo = {}; 

            if (error.field) {
              state.isError = { ...state.isError, [error.field]: true };
              state.errorInfo = { ...state.errorInfo, [error.field]: error.message };
            }
        })

        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.isAdmin = action.payload.user.role === "admin"
        })

    }
})

export const { fillform,resetErrorState, logOut} = authSlice.actions;


export default authSlice.reducer;