import React, { FC, useState } from 'react'
import { subjectList } from '../../../store/adminSlice'
import { tryGetSubjectId } from '../adminscheduleitemlist/AdminScheduleItemList'

interface AdminScheduleItemProps {
    className?: string 
    subjectList: subjectList
    curdayPosition: number
    cursubjectPosition: number
    curweekType: number
    openEditClick: (event:React.MouseEvent<HTMLDivElement, MouseEvent>, curdayPosition:number, cursubjectPosition:number, curweekType: number)=>void
}

const AdminScheduleItem: FC<AdminScheduleItemProps> = (AdminScheduleItemProps) => { return(
    <>
    {(tryGetSubjectId(AdminScheduleItemProps.subjectList,AdminScheduleItemProps.curdayPosition,AdminScheduleItemProps.cursubjectPosition,AdminScheduleItemProps.curweekType)!==-1
    ?
    <div className={AdminScheduleItemProps.className} onContextMenu={(e)=>AdminScheduleItemProps.openEditClick(e,AdminScheduleItemProps.curdayPosition,AdminScheduleItemProps.cursubjectPosition,AdminScheduleItemProps.curweekType)}>
        <td>
            {AdminScheduleItemProps.subjectList.list[tryGetSubjectId(AdminScheduleItemProps.subjectList,AdminScheduleItemProps.curdayPosition,AdminScheduleItemProps.cursubjectPosition,AdminScheduleItemProps.curweekType)].disciplineId}
        </td> 
    </div>
    :
    <div className={AdminScheduleItemProps.className} style={{border:'0px solid transparent', backgroundColor:'transparent'}}  onContextMenu={(e)=>AdminScheduleItemProps.openEditClick(e,AdminScheduleItemProps.curdayPosition,AdminScheduleItemProps.cursubjectPosition,AdminScheduleItemProps.curweekType)}>
        <td>
        </td> 
    </div>
    )}
    </>
)}
export default AdminScheduleItem;

// e,AdminScheduleItemProps.curdayPosition,AdminScheduleItemProps.cursubjectPosition,AdminScheduleItemProps.curweekType