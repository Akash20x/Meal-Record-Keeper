import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from "./feature/meals-slice";
import adminReducer from "./feature/admin-slice";
import authReducer from "./feature/auth-slice";
export const store = configureStore({
    reducer: {
        meals: mealsReducer,
        admin: adminReducer,
        auth: authReducer
    }
});