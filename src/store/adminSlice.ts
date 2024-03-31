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
        updateAccountData(state, action: PayloadAction<accountInfo>)
        {
            state.Token=action.payload.token
            state.accountId=action.payload.accountId
        }
    },    
    extraReducers: (builder) => {

    }
})

export const {updateAccountData} = adminSlice.actions

export default adminSlice.reducer