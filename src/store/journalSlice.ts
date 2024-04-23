import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { group, discipline, subject } from '../types/AdminType';

const initialState:journalData = {disciplineName: "", groups: [], subject: undefined}

type journalData = {
    disciplineName?: string
    groups?: group[]
    subject?: subject
}

const journalSlice = createSlice({
    name: 'journalSlice',
    initialState,
    reducers: {
        updateJournalData(state, action: PayloadAction<journalData>)
        {
            state.groups=action.payload.groups
            state.disciplineName=action.payload.disciplineName
            state.subject=action.payload.subject
        }
    },    
    extraReducers: (builder) => {

    }
})

export const {updateJournalData} = journalSlice.actions

export default journalSlice.reducer