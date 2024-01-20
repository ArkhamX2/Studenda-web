import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../../hook'
import { isSubjectsEqual, subjectList, uniteSubject, addSubjectItem, subject } from '../../../store/adminSlice';
import useModal from '../modalAdmin/useModalAdmin';
import ModalAdmin from '../modalAdmin/ModalAdmin'
import classes from './AdminScheduleitemList.module.css'

const tryGetSubjectId = (subjectList: subjectList, curdayPosition:number, cursubjectPosition:number, curweekType: number) => {
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
        return isSubjectsEqual(subjectList.list[tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition, 0)],subjectList.list[tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition, 1)])
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
        if(selectedSubject!.disciplineId!==undefined&&selectedSubject!.classroom!==""&&selectedSubject!.subjectTypeId!==undefined&&selectedSubject!.userId!==undefined)
        {
            dispatch(addSubjectItem({subject:selectedSubject!}))
            toggle()
        }
        else
        {
            //Незаполненные поля
            if(selectedSubject!.disciplineId===undefined&&selectedSubject!.classroom===""&&selectedSubject!.subjectTypeId===undefined&&selectedSubject!.userId===undefined)
            {
                //Пусто
            }
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
            {[...Array(6)].map((x, i) =>
            <tr>
                <td className={classes.TCol}>
                    {i+1}
                </td>
                {[...Array(6)].map((x, y) => /** пустые */
                <td className={classes.TCol} onDoubleClick={()=>dispatch(uniteSubject({curdayPosition:y,cursubjectPosition:i}))}>
                    {(tryIsSubjectsEqual(subjectList,y,i)===false)
                    ?
                    <>
                    
                        <tr>
                        {(tryGetSubjectId(subjectList,y,i,0)!==-1
                        ? 
                            <div  className={classes.subjectBox} onContextMenu={(e)=>openEditClick(e,y,i,0)}>
                                <td >
                            {subjectList.list[tryGetSubjectId(subjectList,y,i,0)].disciplineId}
                            </td> 
                            </div>
                            
                        :
                        <div  className={classes.subjectBox} onContextMenu={(e)=>openEditClick(e,y,i,0)}>
                            <td >
                            
                            </td>
                        </div>
                            )}                            
                        </tr>
                        <tr>
                        {(tryGetSubjectId(subjectList,y,i, 1)!==-1
                        ? 
                        <div className={classes.subjectBox} onContextMenu={(e)=>openEditClick(e,y,i,1)}>
                            <td >
                            {subjectList.list[tryGetSubjectId(subjectList,y,i,1)].disciplineId}
                            </td> 
                        </div>
                            
                        :
                        <div className={classes.subjectBox} onContextMenu={(e)=>openEditClick(e,y,i,1)}>
                            <td >
                                                            
                            </td>
                        </div>
                           )}
                        </tr>
                    </>
                    :
                    <>
                    <tr>
                        {(tryGetSubjectId(subjectList,y,i,0)!==-1
                        ? 
                        <div className={classes.subjectBox} style={{height:'100px'}}  onContextMenu={(e)=>openEditClick(e,y,i,0)}>
                            <td>
                            {subjectList.list[tryGetSubjectId(subjectList,y,i,0)].disciplineId}
                            </td>
                        </div>
                             
                        :
                        <div className={classes.subjectBox} onContextMenu={(e)=>openEditClick(e,y,i,0)}>
                             <td >
                            
                            </td>
                        </div>
                           )}                            
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