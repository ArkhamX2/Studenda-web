import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {Token:"", accountId:0}

type accountInfo = {
    token: string
    accountId: number
}

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        updateAccountInfo(state, action: PayloadAction<accountInfo>)
        {
            state.Token=action.payload.token
            state.accountId=action.payload.accountId
        }
    },    
    extraReducers: (builder) => {

    }
})

export const {updateAccountInfo} = adminSlice.actions

export default adminSlice.reducer