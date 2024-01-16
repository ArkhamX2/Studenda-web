import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type subject = {
    discipline: string, classroom: string, subjectType:string, user:string, subjectPosition: number, dayPosition: number, weekType:number
}

export interface subjectList {
    list: subject[][]
}

const initialState:subjectList = {list:[
    [
    {discipline: "aboba", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 0, dayPosition: 0, weekType: 1},
    {discipline: "aboba", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 0, dayPosition: 0, weekType: 0},
    {discipline: "aboba", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 1, dayPosition: 0, weekType: 1},
    {discipline: "aboba", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 2, dayPosition: 0, weekType: 1},
    {discipline: "bvb", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 3, dayPosition: 0, weekType: 1},
    {discipline: "5555", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 4, dayPosition: 0, weekType: 1}
    ],
    [
    {discipline: "cvbvcb", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 1, dayPosition: 1, weekType: 1},
    {discipline: "vcx", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 0, dayPosition: 1, weekType: 1},
    {discipline: "abdfoba", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 3, dayPosition: 1, weekType: 1},
    {discipline: "abogdfgfdba", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 5, dayPosition: 1, weekType: 1},
    {discipline: "aboba", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 0, dayPosition: 1, weekType: 0},
    {discipline: "bbbbbbbbb", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 1, dayPosition: 1, weekType: 0},
    {discipline: "vvvvvvvvvvvvv", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 2, dayPosition: 1, weekType: 0},
    {discipline: "bvb", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 3, dayPosition: 1, weekType: 0},
    {discipline: "5555", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 4, dayPosition: 1, weekType: 0}
        
    ]
]}

function CopyPushSplice(state:subjectList, curdayPosition:number, copy:number, remove:number){
    if (copy>=0)
    {
        const tmpcopy = Object.assign({},state.list[curdayPosition][copy])      
        tmpcopy.weekType === 0 ? tmpcopy.weekType=1 : tmpcopy.weekType=0      
        state.list[curdayPosition].push(tmpcopy)     
    }   
    if (remove>=0)
    {
        state.list[curdayPosition].splice((remove), 1)
    }
}

export function isSubjectsEqual(firstSubject:subject, secondSubject:subject){
    if (firstSubject.discipline===secondSubject.discipline&&firstSubject.classroom===secondSubject.classroom&&firstSubject.subjectType===secondSubject.subjectType&&firstSubject.user===secondSubject.user)
    {
        return true
    }
    else 
    {
        return false
    }
}

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        uniteSubject(state, action: PayloadAction<{curdayPosition:number,cursubjectPosition:number}>){
            try {
                //console.log(action.payload.curdayPosition + " " + action.payload.cursubjectPosition)
                const tmptop:number = state.list[action.payload.curdayPosition].indexOf(state.list[action.payload.curdayPosition].find((obj) => {return obj.subjectPosition===action.payload.cursubjectPosition && obj.weekType === 0})!)   
                const tmpbot:number = state.list[action.payload.curdayPosition].indexOf(state.list[action.payload.curdayPosition].find((obj) => {return obj.subjectPosition===action.payload.cursubjectPosition && obj.weekType === 1})!)
                if ((tmptop>=0&&tmpbot>=0))
                {
                    //Есть 2 элемента
                    console.log(state.list[action.payload.curdayPosition][tmptop].discipline)

                    console.log(state.list[action.payload.curdayPosition][tmpbot].discipline)

                    if(isSubjectsEqual(state.list[action.payload.curdayPosition][tmptop],state.list[action.payload.curdayPosition][tmpbot]))
                    {
                        CopyPushSplice(state,action.payload.curdayPosition,-1,tmpbot)
                    }
                    else
                    {
                        CopyPushSplice(state,action.payload.curdayPosition,tmptop,tmpbot)
                    }

                }
                else
                {
                    if (tmptop>=0)
                    {
                        //Только верхний элемент
                        console.log(tmptop)
                        CopyPushSplice(state,action.payload.curdayPosition,tmptop,tmpbot)
                    }
                    if (tmpbot>=0)
                    {
                        //Только нижний элемент
                        console.log(tmpbot)
                        CopyPushSplice(state,action.payload.curdayPosition,tmpbot,tmptop)
                    }
                }        
            } catch (e) {
                
            }
        },
        addSubjectItem(state, action: PayloadAction)
        {

        }
    }
})

export const {uniteSubject} = testSlice.actions

export default testSlice.reducer