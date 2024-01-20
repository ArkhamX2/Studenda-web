import React, { FC, useEffect, useState } from 'react'
import  './ScheduleTable.module.css'
import classes from './ScheduleTable.module.css'
import AdminScheduleItemList from '../adminscheduleitemlist/AdminScheduleItemList'
import store from '../../../store'
import axios from "axios"
import { fetchSubjectList } from '../../../store/adminSlice'
import { useAppDispatch } from '../../../hook'

export enum row {
  half='half',
  split='split'
}

async function abobus() {
        try {
        const response = await axios.get("http://88.210.3.137/api/subject")
        console.log(response.data)
        } catch(error) {
        console.error(error);
        }
}

const ScheduleTable: FC =
  () => {
        const [ScheduleList, setScheduleList]=useState(store.getState().admin.list)
        store.subscribe(() => setScheduleList(store.getState().admin.list))
        const dispatch = useAppDispatch()
  return (
        <table>
                <tr>
                        <td className={classes.Row1} style={{width:'75px'}}>

                        </td>

                        <td className={classes.Row1}>
                                Понедельник
                        </td>

                        <td className={classes.Row1}>
                                Вторник
                        </td>

                        <td className={classes.Row1}>
                                Среда
                        </td >

                        <td className={classes.Row1}>
                                Четверг
                        </td>

                        <td className={classes.Row1}>
                                Пятница
                        </td>

                        <td className={classes.Row1}>
                                Суббота
                        </td>

                </tr>

                <AdminScheduleItemList list={ScheduleList}/>
                
                <button onClick={()=>dispatch(fetchSubjectList())}>Тест кнопочка вернулась</button>

        </table>
       //<input placeholder={text} className={classes.LoginInput}  style={{display: 'flex', textAlign: align===TextAlign.right  ? 'right' : 'center'}}></input>
  )
}

export default ScheduleTable;
