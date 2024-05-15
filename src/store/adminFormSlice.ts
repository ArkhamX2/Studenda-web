import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {selectedButton:0}

type adminFormInfo = {
    selectedButton: number
}

const adminFormSlice = createSlice({
    name: 'adminFormSlice',
    initialState,
    reducers: {
        updateAdminFormData(state, action: PayloadAction<adminFormInfo>)
        {
            state.selectedButton=action.payload.selectedButton
        }
    },    
    extraReducers: (builder) => {

    }
})

export const {updateAdminFormData} = adminFormSlice.actions

export default adminFormSlice.reducer