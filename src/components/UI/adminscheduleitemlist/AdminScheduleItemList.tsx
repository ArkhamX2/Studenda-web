import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../../hook'
import { isSubjectsEqual, adminLists, uniteSubject, addSubjectItem, subject, postSubject, deleteSubject, getSubjectList, weekType, weekTypes } from '../../../store/adminSlice';
import useModal from '../modalAdmin/useModalAdmin';
import ModalAdmin from '../modalAdmin/ModalAdmin'
import classes from './AdminScheduleitemList.module.css'
import AdminScheduleItem from '../adminscheduleitem/AdminScheduleItem';

export const tryGetSubjectId = (subjectList: adminLists, curdayPosition:number, cursubjectPosition:number, curweekType: number) => {
    try
    {
        const subjectId:number = subjectList.subjectlist!.findLastIndex((obj) => {return obj.dayPositionId===curdayPosition && obj.subjectPositionId===cursubjectPosition && obj.weekTypeId === curweekType})!
        return subjectId    
    }
    catch (e)
    {
        return -1
    }    
}

const tryIsSubjectsEqual=(subjectList: adminLists, curdayPosition:number, cursubjectPosition:number)=>{
    try
    {
        return isSubjectsEqual(subjectList.subjectlist![tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition, weekTypes.red)],subjectList.subjectlist![tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition, weekTypes.blue)])
    }
    catch(e)
    {
        return false
    }
}

const AdminScheduleItemList: FC<adminLists> = (subjectList) => {    
    const dispatch = useAppDispatch()
    const { isOpen, toggle } = useModal()
    const [selectedSubject, setSelectedSubject] = useState<subject>()
    const openEditClick = (event:React.MouseEvent<HTMLDivElement, MouseEvent>, curdayPosition:number, cursubjectPosition:number, curweekType: number) => {
        event.preventDefault()
        tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition,curweekType)>=0 
        ?
        setSelectedSubject(subjectList.subjectlist![tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition,curweekType)]) 
        :
        setSelectedSubject({academicYear: 0,disciplineId: 0, classroom: "", subjectTypeId:undefined, userId:undefined, subjectPositionId: cursubjectPosition, dayPositionId: curdayPosition, weekTypeId:curweekType, groupId:1, description:undefined})
        toggle()
    }
    const saveClick = async () => {
        if(selectedSubject!.disciplineId===undefined&&selectedSubject!.classroom===""&&selectedSubject!.subjectTypeId===undefined&&selectedSubject!.userId===undefined)
        {
            //Пусто
        }
        else
        {
            dispatch(addSubjectItem({subject:selectedSubject!}))
            toggle()
            await dispatch(postSubject(selectedSubject!))
            await dispatch(getSubjectList())
        }
    }
    const deleteClick = async () => {
        if(selectedSubject!.id===undefined)
        {
            //Пусто
        }
        else
        {
            toggle()
            await dispatch(deleteSubject(selectedSubject!.id))
            await dispatch(getSubjectList())
        }
    }
    const uniteDoubleClick = async (curdayPosition:number, cursubjectPosition:number) => {
        dispatch(uniteSubject({curdayPosition:curdayPosition,cursubjectPosition:cursubjectPosition}))
        //await dispatch(getSubjectList())
    }
    return (
        <>
            <ModalAdmin isOpen={isOpen} toggle={toggle}>
            <div style={{textAlign:'center', margin:'10px', fontSize:'20px', fontWeight:'600'}}>РЕДАКТИРОВАНИЕ</div>
            <div className={classes.ElementBox}>
                <p className={classes.p}>academicYear:</p>
                <div className={classes.InputBox}>
                <input className={classes.Input} onChange={e=>setSelectedSubject({...selectedSubject!, academicYear:Number(e.target.value)})}defaultValue={selectedSubject?.academicYear}></input>
                </div>
            </div>
            <div className={classes.ElementBox}>
                <p className={classes.p}>DisciplineId:</p>
                <div className={classes.InputBox}>
                <input className={classes.Input} onChange={e=>setSelectedSubject({...selectedSubject!, disciplineId:Number(e.target.value)})}defaultValue={selectedSubject?.disciplineId}></input>
                </div>
            </div>
            <div className={classes.ElementBox}>
                <p  className={classes.p}>SubjectTypeId:</p>
                <div className={classes.InputBox}>
                    <input className={classes.Input} onChange={e=>setSelectedSubject({...selectedSubject!, subjectTypeId:Number(e.target.value)})}defaultValue={selectedSubject?.subjectTypeId}></input>
                </div>
            </div>
            <div className={classes.ElementBox}>
                <p  className={classes.p}>UserId:</p>
                <div className={classes.InputBox}>
                <input className={classes.Input} onChange={e=>setSelectedSubject({...selectedSubject!, userId:Number(e.target.value)})}defaultValue={selectedSubject?.userId}></input>
                </div>
            </div>
            <div className={classes.ElementBox}>
                <p  className={classes.p}>Classroom:</p>
                <div className={classes.InputBox}>
                <input className={classes.Input} onChange={e=>setSelectedSubject({...selectedSubject!, classroom:e.target.value})}defaultValue={selectedSubject?.classroom}></input>
                </div>
            </div>
            <button onClick={()=>saveClick()}>Сохранить</button>
            <button onClick={()=>deleteClick()}>Удалить</button>
            </ModalAdmin>
            {[...Array(6)].map((x, i) => {const cursubjectPosition=i+1; return (
            <tr>
                <td className={classes.TCol}>
                    {cursubjectPosition}
                </td>
                
                {[...Array(6)].map((x, y) => {const curdayPosition=y+1; return (
                <td className={classes.TCol} onDoubleClick={()=>uniteDoubleClick(curdayPosition,cursubjectPosition)}>
                    {(tryIsSubjectsEqual(subjectList,curdayPosition,cursubjectPosition)===false)
                    ?
                    <>                    
                        <AdminScheduleItem className={classes.subjectBox} adminLists={subjectList}curdayPosition={curdayPosition}cursubjectPosition={cursubjectPosition}curweekType={weekTypes.red}openEditClick={openEditClick}/>  
                        <hr style={{height:'1px', backgroundColor:'#B5999F', border:'1px solid #B5999F', margin:'0px -5px 0px -5px'}}></hr>
                        <AdminScheduleItem className={classes.subjectBox} adminLists={subjectList}curdayPosition={curdayPosition}cursubjectPosition={cursubjectPosition}curweekType={weekTypes.blue}openEditClick={openEditClick}/>  
                    </>
                    :
                    <>
                        <AdminScheduleItem className={classes.subjectBoxBoth} adminLists={subjectList}curdayPosition={curdayPosition}cursubjectPosition={cursubjectPosition}curweekType={weekTypes.red}openEditClick={openEditClick}/>                             
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