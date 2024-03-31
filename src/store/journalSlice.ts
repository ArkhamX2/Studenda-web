import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState:journalData = {groupIds: []}

type journalData = {
    groupIds: number[]

}

const journalSlice = createSlice({
    name: 'journalSlice',
    initialState,
    reducers: {
        updateJournalData(state, action: PayloadAction<journalData>)
        {
            state.groupIds=action.payload.groupIds
        }
    },    
    extraReducers: (builder) => {

    }
})

export const {updateJournalData} = journalSlice.actions

export default journalSlice.reducer