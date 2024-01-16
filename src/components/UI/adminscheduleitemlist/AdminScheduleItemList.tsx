import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../../hook'
import { isSubjectsEqual, subjectList, uniteSubject } from '../../../store/testSlice';
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

const test2 = (y:number,i:number) => {
    console.log("curdayPosition:" + y + "cursubjectPosition:" + i)
}

const AdminScheduleItemList: FC<subjectList> = (subjectList) => {    
    const dispatch = useAppDispatch()
    const { isOpen, toggle } = useModal()
    const [cords, setCords] = useState({i: 0, y: 0})
    const bob = (i:number, y:number) => {
        console.log("test")
        setCords({i,y})
        toggle()
    }
    return (
        <>
            <ModalAdmin isOpen={isOpen} toggle={toggle}>{cords.i} {cords.y}</ModalAdmin>
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
                        {(tryGetSubjectId(subjectList,y,i, 0)!==-1
                        ? 
                            <td onContextMenu={()=>bob(i,y)}>
                            {subjectList.list[y][tryGetSubjectId(subjectList,y,i, 0)].discipline}
                            </td> 
                        :
                            <td onContextMenu={()=>bob(i,y)}>
                            
                            </td>)}                            
                        </tr>
                        <tr>
                        {(tryGetSubjectId(subjectList,y,i, 1)!==-1
                        ? 
                            <td onContextMenu={()=>bob(i,y)}>
                            {subjectList.list[y][tryGetSubjectId(subjectList,y,i, 1)].discipline}
                            </td> 
                        :
                            <td onContextMenu={()=>bob(i,y)}>
                                
                            </td>)}
                        </tr>
                    </>
                    :
                    <>
                    <tr>
                        {(tryGetSubjectId(subjectList,y,i, 0)!==-1
                        ? 
                            <td onContextMenu={()=>bob(i,y)}>
                            {subjectList.list[y][tryGetSubjectId(subjectList,y,i, 0)].discipline}
                            </td> 
                        :
                            <td onContextMenu={()=>bob(i,y)}>
                            
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