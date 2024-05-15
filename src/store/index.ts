import { configureStore } from "@reduxjs/toolkit";
import accountReducer from './accountSlice'
import dataArrayReducer from './dataArraySlice';
import journalDataReducer from './journalSlice'
import adminFormDataReducer from "./adminFormSlice";

const store = configureStore({
    reducer: {
        account: accountReducer,
        dataArray: dataArrayReducer,
        journal: journalDataReducer,
        adminForm: adminFormDataReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch