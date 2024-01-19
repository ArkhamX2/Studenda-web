import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type subject = {
    discipline: string, classroom: string, subjectType:string, user:string, subjectPosition: number, dayPosition: number, weekType:number
}

export interface subjectList {
    list: subject[]
}

/// {"classroom": "Вц-315", ///получать "groupID":1, ///получать "subjectTypeId":1, "weekTypeId":1,"dayPositionId":3, "subjectPositionId":1, ///получать "disciplineId":3}

const initialState:subjectList = {list:[
    {discipline: "aboba", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 0, dayPosition: 0, weekType: 1},
    {discipline: "aboba", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 0, dayPosition: 0, weekType: 0},
    {discipline: "aboba", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 1, dayPosition: 0, weekType: 1},
    {discipline: "aboba", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 2, dayPosition: 0, weekType: 1},
    {discipline: "bvb", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 3, dayPosition: 0, weekType: 1},
    {discipline: "5555", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 4, dayPosition: 0, weekType: 1},
    {discipline: "cvbvcb", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 1, dayPosition: 1, weekType: 1},
    {discipline: "vcx", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 0, dayPosition: 1, weekType: 1},
    {discipline: "abdfoba", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 3, dayPosition: 1, weekType: 1},
    {discipline: "abogdfgfdba", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 5, dayPosition: 1, weekType: 1},
    {discipline: "aboba", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 0, dayPosition: 1, weekType: 0},
    {discipline: "bbbbbbbbb", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 1, dayPosition: 1, weekType: 0},
    {discipline: "vvvvvvvvvvvvv", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 2, dayPosition: 1, weekType: 0},
    {discipline: "bvb", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 3, dayPosition: 1, weekType: 0},
    {discipline: "5555", classroom: "z123", subjectType: "l", user: "Masloy",subjectPosition: 4, dayPosition: 1, weekType: 0}
]}

function CopyPushSplice(state:subjectList, copy:number, remove:number){
    if (copy>=0)
    {
        const tmpcopy = Object.assign({},state.list[copy])      
        tmpcopy.weekType === 0 ? tmpcopy.weekType=1 : tmpcopy.weekType=0      
        state.list.push(tmpcopy)     
    }   
    if (remove>=0)
    {
        state.list.splice((remove), 1)
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

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        uniteSubject(state, action: PayloadAction<{curdayPosition:number,cursubjectPosition:number}>){
            try {
                //console.log(action.payload.curdayPosition + " " + action.payload.cursubjectPosition)
                const tmptop:number = state.list.indexOf(state.list.find((obj) => {return obj.dayPosition===action.payload.curdayPosition && obj.subjectPosition===action.payload.cursubjectPosition && obj.weekType === 0})!)   
                const tmpbot:number = state.list.indexOf(state.list.find((obj) => {return obj.dayPosition===action.payload.curdayPosition && obj.subjectPosition===action.payload.cursubjectPosition && obj.weekType === 1})!)
                if ((tmptop>=0&&tmpbot>=0))
                {
                    //Есть 2 элемента

                    if(isSubjectsEqual(state.list[tmptop],state.list[tmpbot]))
                    {
                        CopyPushSplice(state,-1,tmpbot)
                    }
                    else
                    {
                        CopyPushSplice(state,tmptop,tmpbot)
                    }

                }
                else
                {
                    if (tmptop>=0)
                    {
                        //Только верхний элемент
                        CopyPushSplice(state,tmptop,tmpbot)
                    }
                    if (tmpbot>=0)
                    {
                        //Только нижний элемент
                        CopyPushSplice(state,tmpbot,tmptop)
                    }
                }        
            } catch (e) {
                
            }
        },
        addSubjectItem(state, action: PayloadAction<{subject:subject}>)
        {
            //Тут полная муть все надо переписать, но оно каким то чудом работает
            const tmptop:number = state.list.indexOf(state.list.find((obj) => {return obj.dayPosition===action.payload.subject.dayPosition && obj.subjectPosition===action.payload.subject.dayPosition && obj.weekType === 0})!)   
            const tmpbot:number = state.list.indexOf(state.list.find((obj) => {return obj.dayPosition===action.payload.subject.dayPosition && obj.subjectPosition===action.payload.subject.dayPosition && obj.weekType === 1})!)
            if ((tmptop>=0&&tmpbot>=0))
            {
                if(isSubjectsEqual(state.list[tmptop],state.list[tmpbot]))
                {
                    state.list.splice((tmptop), 1)
                    state.list.splice((state.list.indexOf(state.list.find((obj) => {return obj.dayPosition===action.payload.subject.dayPosition && obj.subjectPosition===action.payload.subject.subjectPosition && obj.weekType === 1})!)), 1)
                    state.list.push(action.payload.subject)
                    CopyPushSplice(state, state.list.length-1, -1)
                }
                else
                {
                    if(state.list[tmptop].weekType===action.payload.subject.weekType)
                    {
                        state.list.splice((tmptop), 1)
                        state.list.push(action.payload.subject)
                    }
                    else
                    {
                        state.list.splice((tmpbot), 1)
                        state.list.push(action.payload.subject)
                    }
                }
            }
            else
            {
                if (tmptop>=0)
                {
                    if(state.list[tmptop].weekType===action.payload.subject.weekType)
                    {
                        state.list.splice((tmptop), 1)
                        state.list.push(action.payload.subject)
                    }
                    else
                    {
                        state.list.push(action.payload.subject)
                    }
                }
                else
                {
                    if (tmpbot>=0)
                    {
                        if(state.list[tmpbot].weekType===action.payload.subject.weekType)
                        {
                            state.list.splice((tmpbot), 1)
                            state.list.push(action.payload.subject)
                        }
                        else
                        {
                            state.list.push(action.payload.subject)
                        }
                    }
                    else
                    {
                        state.list.push(action.payload.subject)
                    }
                }
            }
            
        }
    }
})

export const {uniteSubject,addSubjectItem} = adminSlice.actions

export default adminSlice.reducer