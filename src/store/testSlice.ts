import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {info: "test"}

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        aboba(state, action: PayloadAction<string>){
            state.info = action.payload
            console.log(state.info)
        }
    }
})

export const {aboba} = testSlice.actions

export default testSlice.reducer