import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {Token:"", userId:0}

type userInfo = {
    token: string
    userId: number
}

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        updateUserInfo(state, action: PayloadAction<userInfo>)
        {
            state.Token=action.payload.token
            state.userId=action.payload.userId
        }
    },    
    extraReducers: (builder) => {

    }
})

export const {updateUserInfo} = adminSlice.actions

export default adminSlice.reducer