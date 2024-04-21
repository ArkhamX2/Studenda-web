import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { group, discipline } from '../types/AdminType';

const initialState:journalData = {disciplineName: "", groups: []}

type journalData = {
    disciplineName: string
    groups: group[]
}

const journalSlice = createSlice({
    name: 'journalSlice',
    initialState,
    reducers: {
        updateJournalData(state, action: PayloadAction<journalData>)
        {
            state.groups=action.payload.groups
            state.disciplineName=action.payload.disciplineName
        }
    },    
    extraReducers: (builder) => {

    }
})

export const {updateJournalData} = journalSlice.actions

export default journalSlice.reducer