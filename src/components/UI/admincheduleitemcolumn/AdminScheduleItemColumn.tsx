import React, { FC } from 'react'
import AdminScheduleItem from '../admincheduleitem/AdminScheduleItem';

interface inputProps {
    content: {red: {subject: string, type: string, teacher: string, classroom: string}, blue:{subject: string, type: string, teacher: string, classroom: string}}[];
    id: string;
}

const AdminScheduleItemColumn: FC<inputProps> =
  ({id, content}) => {
  return (
    <tr>
        <td style={{width:'75px', textAlign:'center', fontSize:'28px', fontWeight:'500'}}>
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

export default AdminScheduleItemColumn;