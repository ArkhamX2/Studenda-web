import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { dayPosition, discipline, subject, subjectPosition, weekType, subjectType, user, role, group, course, department } from '../types/AdminType';

export interface adminLists {
    subjectlist?: subject[]
    disciplineList?: discipline[]
    subjectPositionList?: subjectPosition[]
    dayPositionList?: dayPosition[]
    weekTypeList?: weekType[]
    subjectTypeList?: subjectType[]
    userList?: user[]
    roleList?: role[]
    groupList?: group[]
    courseList?: course[]
    departmentList?: department[]
}

const initialState:adminLists = {subjectlist:[
    //{academicYear:2023, classroom: "Вц-315", groupId:1, subjectTypeId:1, weekTypeId:1, dayPositionId:3, subjectPositionId:1, disciplineId:3}
],
disciplineList:[],
subjectPositionList:[],
dayPositionList:[],
weekTypeList:[],
subjectTypeList:[],
userList:[],
roleList:[],
groupList:[],
courseList:[],
departmentList:[]}

export enum weekTypes {
    red = 5,
    blue = 3
}

export const deleteSubject = createAsyncThunk(
    'admin/deleteSubject',
    async function (id:number) {
        try {
            const response = await axios.delete("http://88.210.3.137/api/schedule/subject", {data:[id]})
        } 
        catch(error) {
            console.error(error);
        }
    }
)

export const postSubject = createAsyncThunk(
    'admin/postSubject',
    async function (subject:subject) {
        try {
            const response = await axios.post("http://88.210.3.137/api/schedule/subject", [{id:subject.id, 
            disciplineId: subject.disciplineId, 
            subjectPositionId: subject.subjectPositionId, 
            dayPositionId: subject.dayPositionId, 
            weekTypeId: subject.weekTypeId, 
            subjectTypeId: subject.subjectTypeId, 
            userId: subject.userId, 
            groupId: subject.groupId, 
            classroom: subject.classroom, 
            description: subject.description, 
            academicYear: subject.academicYear}]) 
            //console.log(response.data)
        } 
        catch(error) {
            console.error(error);
        }
    }
)

export const getSubjectList = createAsyncThunk<subject[], undefined>(
    'admin/getSubjectList',
    async function (_) {
        try {
            const response = await axios.get("http://88.210.3.137/api/schedule/subject", {params:[]})
            console.log(response.data) 
            return response.data
        } 
        catch(error) {
            console.error(error);
        }
    }
)

export const getweekTypeList = createAsyncThunk<weekType[], undefined>(
    'admin/getweekTypeList',
    async function (_) {
        try {
            const response = await axios.get("http://88.210.3.137/api/schedule/week-type", {params:[]})
            console.log(response.data) 
            return response.data
        } 
        catch(error) {
            console.error(error);
        }
    }
)

function subjectCopyPushSplice(state:adminLists, copy:number, remove:number){
    if (copy>=0)
    {
        const tmpcopy = Object.assign({},state.subjectlist![copy])    
        tmpcopy.id=0  
        tmpcopy.weekTypeId === weekTypes.red ? tmpcopy.weekTypeId=weekTypes.blue : tmpcopy.weekTypeId=weekTypes.red      
        state.subjectlist!.push(tmpcopy)
        //не понятно работает или нет, нужны типы недель
        console.log("bim")
        postSubject(state.subjectlist![state.subjectlist!.length])
        console.log("bam")
    }   
    if (remove>=0)
    {
        state.subjectlist!.splice((remove), 1)
        deleteSubject(state.subjectlist![remove].id!)
    }
}

export function isSubjectsEqual(firstSubject:subject, secondSubject:subject){
    if (firstSubject.disciplineId===secondSubject.disciplineId&&firstSubject.classroom===secondSubject.classroom&&firstSubject.subjectTypeId===secondSubject.subjectTypeId&&firstSubject.userId===secondSubject.userId)
    {
        return true
    }
    else 
    {
        return false
    }
}

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        uniteSubject(state, action: PayloadAction<{curdayPosition:number,cursubjectPosition:number}>){
            try {
                //console.log(action.payload.curdayPosition + " " + action.payload.cursubjectPosition)
                const tmptop:number = state.subjectlist!.findLastIndex((obj) => {return obj.dayPositionId===action.payload.curdayPosition && obj.subjectPositionId===action.payload.cursubjectPosition && obj.weekTypeId === weekTypes.red})!
                const tmpbot:number = state.subjectlist!.findLastIndex((obj) => {return obj.dayPositionId===action.payload.curdayPosition && obj.subjectPositionId===action.payload.cursubjectPosition && obj.weekTypeId === weekTypes.blue})!
                if ((tmptop>=0&&tmpbot>=0))
                {
                    //Есть 2 элемента
                    if(isSubjectsEqual(state.subjectlist![tmptop],state.subjectlist![tmpbot]))
                    {
                        subjectCopyPushSplice(state,-1,tmpbot)
                    }
                    else
                    {
                        subjectCopyPushSplice(state,tmptop,tmpbot)
                    }

                }
                else
                {
                    if (tmptop>=0)
                    {
                        //Только верхний элемент           
                        subjectCopyPushSplice(state,tmptop,tmpbot)
                    }
                    if (tmpbot>=0)
                    {
                        //Только нижний элемент
                        subjectCopyPushSplice(state,tmpbot,tmptop)
                    }
                }        
            } catch (e) {
                console.error(e)
            }
        },
        addSubjectItem(state, action: PayloadAction<{subject:subject}>)
        {
            //Тут полная муть все надо переписать, но оно каким то чудом работает
            const tmptop:number = state.subjectlist!.findLastIndex((obj) => {return obj.dayPositionId===action.payload.subject.dayPositionId && obj.subjectPositionId===action.payload.subject.dayPositionId && obj.weekTypeId === weekTypes.red})!   
            const tmpbot:number = state.subjectlist!.findLastIndex((obj) => {return obj.dayPositionId===action.payload.subject.dayPositionId && obj.subjectPositionId===action.payload.subject.dayPositionId && obj.weekTypeId === weekTypes.blue})!
            if ((tmptop>=0&&tmpbot>=0))
            {
                if(isSubjectsEqual(state.subjectlist![tmptop],state.subjectlist![tmpbot]))
                {
                    state.subjectlist!.splice((tmptop), 1)
                    state.subjectlist!.splice((state.subjectlist!.findLastIndex((obj) => {return obj.dayPositionId===action.payload.subject.dayPositionId && obj.subjectPositionId===action.payload.subject.subjectPositionId && obj.weekTypeId === weekTypes.blue})!), 1)
                    state.subjectlist!.push(action.payload.subject)
                    subjectCopyPushSplice(state, state.subjectlist!.length-1, -1)
                }
                else
                {
                    if(state.subjectlist![tmptop].weekTypeId===action.payload.subject.weekTypeId)
                    {
                        state.subjectlist!.splice((tmptop), 1)
                        state.subjectlist!.push(action.payload.subject)
                    }
                    else
                    {
                        state.subjectlist!.splice((tmpbot), 1)
                        state.subjectlist!.push(action.payload.subject)
                    }
                }
            }
            else
            {
                if (tmptop>=0)
                {
                    if(state.subjectlist![tmptop].weekTypeId===action.payload.subject.weekTypeId)
                    {
                        state.subjectlist!.splice((tmptop), 1)
                        state.subjectlist!.push(action.payload.subject)
                    }
                    else
                    {
                        state.subjectlist!.push(action.payload.subject)
                    }
                }
                else
                {
                    if (tmpbot>=0)
                    {
                        if(state.subjectlist![tmpbot].weekTypeId===action.payload.subject.weekTypeId)
                        {
                            state.subjectlist!.splice((tmpbot), 1)
                            state.subjectlist!.push(action.payload.subject)
                        }
                        else
                        {
                            state.subjectlist!.push(action.payload.subject)
                        }
                    }
                    else
                    {
                        state.subjectlist!.push(action.payload.subject)
                    }
                }
            }            
        }
    },    
    extraReducers: (builder) => {
        builder
        .addCase(getSubjectList.fulfilled, (state, action)=>{
            state.subjectlist!.splice(0,state.subjectlist!.length) //Очистка листа перед фетчем
            action.payload.map((obj,i)=>{state.subjectlist!.push({id:obj.id, academicYear:obj.academicYear, disciplineId:obj.disciplineId, classroom:obj.classroom, subjectTypeId:obj.subjectTypeId, userId:obj.userId, subjectPositionId:obj.subjectPositionId, dayPositionId:obj.dayPositionId, weekTypeId:obj.weekTypeId, groupId:obj.groupId, description:obj.description})})
            //action.payload.map((obj,i)=>{state.subjectlist!.push(obj)}) //full subject
        })
        .addCase(getweekTypeList.fulfilled, (state, action)=>{
            action.payload.map((obj,i)=>{state.weekTypeList!.push({id:obj.id, index:obj.index, name:obj.name})})
            //action.payload.map((obj,i)=>{state.subjectlist!.push(obj)}) //full subject
        })
    }
})

export const {uniteSubject,addSubjectItem} = adminSlice.actions

export default adminSlice.reducer