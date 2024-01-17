import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../../hook'
import { isSubjectsEqual, subjectList, uniteSubject, addSubjectItem, subject } from '../../../store/adminSlice';
import useModal from '../modalAdmin/useModalAdmin';
import ModalAdmin from '../modalAdmin/ModalAdmin'

const tryGetSubjectId = (subjectList: subjectList, curdayPosition:number, cursubjectPosition:number, curweekType: number) => {
    try
    {
        const subjectId:number = subjectList.list[curdayPosition].indexOf(subjectList.list[curdayPosition].find((obj) => {return obj.subjectPosition===cursubjectPosition && obj.weekType === curweekType})!)
        return subjectId    
    }
    catch (e)
    {
        return -1
    }    
}

const tryIsSubjectsEqual=(subjectList: subjectList, curdayPosition:number, cursubjectPosition:number)=>{
    try
    {
        return isSubjectsEqual(subjectList.list[curdayPosition][tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition, 0)],subjectList.list[curdayPosition][tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition, 1)])
    }
    catch(e)
    {
        return false
    }
}

const AdminScheduleItemList: FC<subjectList> = (subjectList) => {    
    const dispatch = useAppDispatch()
    const { isOpen, toggle } = useModal()
    const [selectedSubject, setSelectedSubject] = useState<subject>()
    const openEditClick = (event:React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,curdayPosition:number, cursubjectPosition:number, curweekType: number) => {
        event.preventDefault()
        tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition,curweekType)>=0 
        ?
        setSelectedSubject(subjectList.list[curdayPosition][tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition,curweekType)]) 
        :
        setSelectedSubject({discipline: "", classroom: "", subjectType:"", user:"", subjectPosition: cursubjectPosition, dayPosition: curdayPosition, weekType:curweekType})
        toggle()
    }
    const saveClick = () => {
        if(selectedSubject!.discipline!==""&&selectedSubject!.classroom!==""&&selectedSubject!.subjectType!==""&&selectedSubject!.user!=="")
        {
            dispatch(addSubjectItem({subject:selectedSubject!}))
            toggle()
        }
        else
        {
            //Незаполненные поля
        }
    }
    return (
        <>
            <ModalAdmin isOpen={isOpen} toggle={toggle}>
            <div>
                discipline:
                <input onChange={e=>setSelectedSubject({...selectedSubject!, discipline:e.target.value})}defaultValue={selectedSubject?.discipline}></input>
            </div>
            <div>
                subjectType:
                <input onChange={e=>setSelectedSubject({...selectedSubject!, subjectType:e.target.value})}defaultValue={selectedSubject?.subjectType}></input>
            </div>
            <div>
                user:
                <input onChange={e=>setSelectedSubject({...selectedSubject!, user:e.target.value})}defaultValue={selectedSubject?.user}></input>
            </div>
            <div>
                classroom:
                <input onChange={e=>setSelectedSubject({...selectedSubject!, classroom:e.target.value})}defaultValue={selectedSubject?.classroom}></input>
            </div>
            <button onClick={()=>saveClick()}>Сохранить</button>
            </ModalAdmin>
            {[...Array(6)].map((x, i) =>
            <tr>
                <td>
                    {i+1}
                </td>
                {[...Array(6)].map((x, y) =>
                <td onDoubleClick={()=>dispatch(uniteSubject({curdayPosition:y,cursubjectPosition:i}))}>
                    {(tryIsSubjectsEqual(subjectList,y,i)===false)
                    ?
                    <>
                        <tr>
                        {(tryGetSubjectId(subjectList,y,i,0)!==-1
                        ? 
                            <td onContextMenu={(e)=>openEditClick(e,y,i,0)}>
                            {subjectList.list[y][tryGetSubjectId(subjectList,y,i,0)].discipline}
                            </td> 
                        :
                            <td onContextMenu={(e)=>openEditClick(e,y,i,0)}>
                            
                            </td>)}                            
                        </tr>
                        <tr>
                        {(tryGetSubjectId(subjectList,y,i, 1)!==-1
                        ? 
                            <td onContextMenu={(e)=>openEditClick(e,y,i,1)}>
                            {subjectList.list[y][tryGetSubjectId(subjectList,y,i,1)].discipline}
                            </td> 
                        :
                            <td onContextMenu={(e)=>openEditClick(e,y,i,1)}>
                                
                            </td>)}
                        </tr>
                    </>
                    :
                    <>
                    <tr>
                        {(tryGetSubjectId(subjectList,y,i,0)!==-1
                        ? 
                            <td onContextMenu={(e)=>openEditClick(e,y,i,0)}>
                            {subjectList.list[y][tryGetSubjectId(subjectList,y,i,0)].discipline}
                            </td> 
                        :
                            <td onContextMenu={(e)=>openEditClick(e,y,i,0)}>
                            
                            </td>)}                            
                    </tr>
                    </>
                    }
                    
                </td>
                )}
            </tr>
            
            )}
        </>
    )
}
export default AdminScheduleItemList;