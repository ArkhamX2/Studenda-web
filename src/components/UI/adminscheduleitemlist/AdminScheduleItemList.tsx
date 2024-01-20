import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../../hook'
import { isSubjectsEqual, subjectList, uniteSubject, addSubjectItem, subject } from '../../../store/adminSlice';
import useModal from '../modalAdmin/useModalAdmin';
import ModalAdmin from '../modalAdmin/ModalAdmin'
import classes from './AdminScheduleitemList.module.css'
import AdminScheduleItem from '../adminscheduleitem/AdminScheduleItem';

export const tryGetSubjectId = (subjectList: subjectList, curdayPosition:number, cursubjectPosition:number, curweekType: number) => {
    try
    {
        const subjectId:number = subjectList.list.findLastIndex((obj) => {return obj.dayPositionId===curdayPosition && obj.subjectPositionId===cursubjectPosition && obj.weekTypeId === curweekType})!
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
        console.log("smth")
        return isSubjectsEqual(subjectList.list[tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition, 1)],subjectList.list[tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition, 2)])
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
    const openEditClick = (event:React.MouseEvent<HTMLDivElement, MouseEvent>, curdayPosition:number, cursubjectPosition:number, curweekType: number) => {
        event.preventDefault()
        tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition,curweekType)>=0 
        ?
        setSelectedSubject(subjectList.list[tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition,curweekType)]) 
        :
        setSelectedSubject({disciplineId: undefined, classroom: "", subjectTypeId:undefined, userId:undefined, subjectPositionId: cursubjectPosition, dayPositionId: curdayPosition, weekTypeId:curweekType, groupId:undefined, description:undefined})
        toggle()
    }
    const saveClick = () => {
        if(selectedSubject!.disciplineId===undefined&&selectedSubject!.classroom===""&&selectedSubject!.subjectTypeId===undefined&&selectedSubject!.userId===undefined)
        {
            //Пусто
        }
        else
        {
            dispatch(addSubjectItem({subject:selectedSubject!}))
            toggle()
        }
    }
    return (
        <>
            <ModalAdmin isOpen={isOpen} toggle={toggle}>
            <div style={{textAlign:'center', margin:'10px', fontSize:'20px', fontWeight:'600'}}>РЕДАКТИРОВАНИЕ</div>
            <div className={classes.ElementBox}>
                <p className={classes.p}>DisciplineId:</p>
                <div className={classes.InputBox}>
                <input className={classes.Input} onKeyDown={(event)=>{if(!/[0-9]/.test(event.key)) {event.preventDefault();}}} onChange={e=>setSelectedSubject({...selectedSubject!, disciplineId:Number(e.target.value)})}defaultValue={selectedSubject?.disciplineId}></input>
                </div>
            </div>
            <div className={classes.ElementBox}>
                <p  className={classes.p}>SubjectTypeId:</p>
                <div className={classes.InputBox}>
                    <input className={classes.Input} onKeyDown={(event)=>{if(!/[0-9]/.test(event.key)) {event.preventDefault();}}} onChange={e=>setSelectedSubject({...selectedSubject!, subjectTypeId:Number(e.target.value)})}defaultValue={selectedSubject?.subjectTypeId}></input>
                </div>
            </div>
            <div className={classes.ElementBox}>
                <p  className={classes.p}>UserId:</p>
                <div className={classes.InputBox}>
                <input className={classes.Input} onKeyDown={(event)=>{if(!/[0-9]/.test(event.key)) {event.preventDefault();}}} onChange={e=>setSelectedSubject({...selectedSubject!, userId:Number(e.target.value)})}defaultValue={selectedSubject?.userId}></input>
                </div>
            </div>
            <div className={classes.ElementBox}>
                <p  className={classes.p}>Classroom:</p>
                <div className={classes.InputBox}>
                <input className={classes.Input} onChange={e=>setSelectedSubject({...selectedSubject!, classroom:e.target.value})}defaultValue={selectedSubject?.classroom}></input>
                </div>
            </div>
            <button onClick={()=>saveClick()}>Сохранить</button>
            </ModalAdmin>
            {[...Array(6)].map((x, i) => {const cursubjectPosition=i+1; return (
            <tr>
                <td className={classes.TCol}>
                    {cursubjectPosition}
                </td>
                {[...Array(6)].map((x, y) => {const curdayPosition=y+1; return (
                <td className={classes.TCol} onDoubleClick={()=>dispatch(uniteSubject({curdayPosition:curdayPosition,cursubjectPosition:cursubjectPosition}))}>
                    {(tryIsSubjectsEqual(subjectList,curdayPosition,cursubjectPosition)===false)
                    ?
                    <>                    
                        <AdminScheduleItem subjectList={subjectList}curdayPosition={curdayPosition}cursubjectPosition={cursubjectPosition}curweekType={1}openEditClick={openEditClick}/>  
                        <AdminScheduleItem subjectList={subjectList}curdayPosition={curdayPosition}cursubjectPosition={cursubjectPosition}curweekType={2}openEditClick={openEditClick}/>  
                    </>
                    :
                    <>
                        <AdminScheduleItem subjectList={subjectList}curdayPosition={curdayPosition}cursubjectPosition={cursubjectPosition}curweekType={1}openEditClick={openEditClick}/>                             
                    </>
                    }                    
                </td>
                )}
                )}
            </tr>
            )}
            )}
        </>
    )
}
export default AdminScheduleItemList;