import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { course, dayPosition, department, discipline, group, role, subject, subjectPosition, subjectType, user, weekType } from '../types/AdminType';

type dataArrays = {
    subjectArray?: subject[],
    disciplineArray?:  discipline[],
    subjectPositionArray?: subjectPosition[],
    dayPositionArray?: dayPosition[],
    weekTypeArray?: weekType[],
    subjectTypeArray?: subjectType[],
    userArray?: user[],
    roleArray?: role[],
    groupArray?: group[],
    courseArray?: course[],
    departmentArray?: department[]
}

const initialState:dataArrays = {
    subjectArray: undefined,
    disciplineArray: undefined,
    subjectPositionArray: undefined,
    dayPositionArray: undefined,
    weekTypeArray: undefined,
    subjectTypeArray: undefined,
    userArray: undefined,
    roleArray: undefined,
    groupArray: undefined,
    courseArray: undefined,
    departmentArray: undefined
}

export type ObjectKey = keyof typeof initialState;

const dataArraySlice = createSlice({
    name: 'dataArraySlice',
    initialState,
    reducers: {
        updateDataArray(state, action: PayloadAction<{dataArray:any[], objectKey:ObjectKey}>)
        {
            state[action.payload.objectKey] = action.payload.dataArray
            console.log(state[action.payload.objectKey])
        },
        doNothing(state, action: PayloadAction<any>)
        {

        }
    },    
    extraReducers: (builder) => {

    }
})

export const {updateDataArray, doNothing} = dataArraySlice.actions

export default dataArraySlice.reducer