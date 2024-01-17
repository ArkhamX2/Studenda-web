import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../../hook'
import { isSubjectsEqual, subjectList, uniteSubject, addSubjectItem, subject } from '../../../store/adminSlice';
import useModal from '../modalAdmin/useModalAdmin';
import ModalAdmin from '../modalAdmin/ModalAdmin'
import classes from './AdminScheduleitemList.module.css'

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
            <div style={{textAlign:'center', margin:'10px', fontSize:'20px', fontWeight:'600'}}>РЕДАКТИРОВАНИЕ</div>
            <div className={classes.ElementBox}>
                <p className={classes.p}>discipline:</p>
                <div className={classes.InputBox}>
                <input className={classes.Input} onChange={e=>setSelectedSubject({...selectedSubject!, discipline:e.target.value})}defaultValue={selectedSubject?.discipline}></input>
                </div>
            </div>
            <div className={classes.ElementBox}>
                <p  className={classes.p}>subjectType:</p>
                <div className={classes.InputBox}>
                    <input className={classes.Input} onChange={e=>setSelectedSubject({...selectedSubject!, subjectType:e.target.value})}defaultValue={selectedSubject?.subjectType}></input>
                </div>
            </div>
            <div className={classes.ElementBox}>
                <p  className={classes.p}>user:</p>
                <div className={classes.InputBox}>
                <input className={classes.Input} onChange={e=>setSelectedSubject({...selectedSubject!, user:e.target.value})}defaultValue={selectedSubject?.user}></input>
                </div>
            </div>
            <div className={classes.ElementBox}>
                <p  className={classes.p}>classroom:</p>
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
                            <div  className={classes.subjectBox}>
                                <td onContextMenu={(e)=>openEditClick(e,y,i,0)}>
                            {subjectList.list[y][tryGetSubjectId(subjectList,y,i,0)].discipline}
                            </td> 
                            </div>
                            
                        :
                        <div  className={classes.subjectBox} >
                            <td onContextMenu={(e)=>openEditClick(e,y,i,0)}>
                            
                            </td>
                        </div>
                            )}                            
                        </tr>
                        <tr>
                        {(tryGetSubjectId(subjectList,y,i, 1)!==-1
                        ? 
                        <div className={classes.subjectBox}>
                            <td onContextMenu={(e)=>openEditClick(e,y,i,1)}>
                            {subjectList.list[y][tryGetSubjectId(subjectList,y,i,1)].discipline}
                            </td> 
                        </div>
                            
                        :
                        <div className={classes.subjectBox}>
                            <td onContextMenu={(e)=>openEditClick(e,y,i,1)}>
                                                            
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
                        <div className={classes.subjectBox} style={{height:'100px'}}>
                            <td onContextMenu={(e)=>openEditClick(e,y,i,0)}>
                            {subjectList.list[y][tryGetSubjectId(subjectList,y,i,0)].discipline}
                            </td>
                        </div>
                             
                        :
                        <div className={classes.subjectBox} >
                             <td onContextMenu={(e)=>openEditClick(e,y,i,0)}>
                            
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