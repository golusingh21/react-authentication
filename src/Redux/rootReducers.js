import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import AppSlice from './Slices/AppSlice'

const combinedReducers = combineReducers({
    auth: AuthSlice,
    app: AppSlice
})

export const rootReducer = (state, action) => {
    return combinedReducers(state, action)
} 