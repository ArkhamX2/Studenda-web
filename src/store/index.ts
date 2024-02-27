import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './adminSlice'
import dataArrayReducer from './dataArraySlice';

const store = configureStore({
    reducer: {
        admin: adminReducer,
        dataArray: dataArrayReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch