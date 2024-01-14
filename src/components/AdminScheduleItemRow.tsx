import React, { FC } from 'react'
import AdminScheduleItem from './AdminScheduleItem';

interface inputProps {
    content: {red: {subject: string, type: string, teacher: string, classroom: string}, blue:{subject: string, type: string, teacher: string, classroom: string}}[];
    id: string;
}

const AdminScheduleItemRow: FC<inputProps> =
  ({id, content}) => {
  return (
    <tr>
        <td>
          {id}
        </td>
        {content.map((item) => 
        <>
        {(item.red.subject === item.blue.subject && item.red.subject !== "") 
        ? 
        <td>
          <tr>
            <AdminScheduleItem content={item.red}/>
          </tr>
        </td>    
        : 
          <td>
                <tr>
                        <AdminScheduleItem content={item.red}/>
                </tr>
                <tr>
                        <AdminScheduleItem content={item.blue}/>
                </tr>
          </td>   
        }
        </>
        )}
    </tr>   
    
  )
}

export default AdminScheduleItemRow;