import { configureStore } from "@reduxjs/toolkit";
import accountReducer from './accountSlice'
import dataArrayReducer from './dataArraySlice';
import journalDataReducer from './journalSlice'

const store = configureStore({
    reducer: {
        account: accountReducer,
        dataArray: dataArrayReducer,
        journal: journalDataReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch