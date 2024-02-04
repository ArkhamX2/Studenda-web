import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {Token:""}

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        updateToken(state, action: PayloadAction<string>)
        {
            state.Token=action.payload
        }
    },    
    extraReducers: (builder) => {

    }
})

export const {updateToken} = adminSlice.actions

export default adminSlice.reducer