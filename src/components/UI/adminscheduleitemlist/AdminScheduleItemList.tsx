import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../../hook'
import { isSubjectsEqual, subjectList, uniteSubject } from '../../../store/testSlice';

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
        console.log(subjectList.list[curdayPosition][tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition, 0)].discipline)
        console.log(subjectList.list[curdayPosition][tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition, 1)].discipline)
        console.log(isSubjectsEqual(subjectList.list[curdayPosition][tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition, 0)],subjectList.list[curdayPosition][tryGetSubjectId(subjectList,curdayPosition,cursubjectPosition, 1)]))
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
    return (
        <>
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
                            <td>
                            {subjectList.list[y][tryGetSubjectId(subjectList,y,i, 0)].discipline}
                            </td> 
                        :
                            <td>
                            
                            </td>)}                            
                        </tr>
                        <tr>
                        {(tryGetSubjectId(subjectList,y,i, 1)!==-1
                        ? 
                            <td>
                            {subjectList.list[y][tryGetSubjectId(subjectList,y,i, 1)].discipline}
                            </td> 
                        :
                            <td>
                                
                            </td>)}
                        </tr>
                    </>
                    :
                    <>
                    <tr>
                        {(tryGetSubjectId(subjectList,y,i, 0)!==-1
                        ? 
                            <td>
                            {subjectList.list[y][tryGetSubjectId(subjectList,y,i, 0)].discipline}
                            </td> 
                        :
                            <td>
                            
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