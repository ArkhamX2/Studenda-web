import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './adminSlice'
import dataArrayReducer from './dataArraySlice';
import journalDataReducer from './journalSlice'

const store = configureStore({
    reducer: {
        admin: adminReducer,
        dataArray: dataArrayReducer,
        journal: journalDataReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch