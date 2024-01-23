import React, { FC, useEffect, useState } from 'react'
import  './ScheduleTable.module.css'
import classes from './ScheduleTable.module.css'
import AdminScheduleItemList from '../adminscheduleitemlist/AdminScheduleItemList'
import store from '../../../store'
import { getSubjectList, getweekTypeList } from '../../../store/adminSlice'
import { useAppDispatch } from '../../../hook'
import axios from 'axios'

export enum row {
  half='half',
  split='split'
}

const ScheduleTable: FC =
  () => {
        const [ScheduleList, setScheduleList]=useState(store.getState().admin.subjectlist)
        store.subscribe(() => setScheduleList(store.getState().admin.subjectlist))
        const dispatch = useAppDispatch()
        const getInfo = () => {
                dispatch(getSubjectList())
                dispatch(getweekTypeList())
        }
        const test = async () => {
                try
                {                        
                        const response = await axios.get("http://88.210.3.137/api/schedule/week-type", {params:[1]})
                        console.log(response.data)
                }
                catch(error)
                {
                        console.error(error);
                }
        }
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

                <AdminScheduleItemList subjectlist={ScheduleList}/>
                
                <button onClick={()=>getInfo()}>Тест кнопочка вернулась</button>

                <button onClick={()=>test()}>bvcb</button>

        </table>
       //<input placeholder={text} className={classes.LoginInput}  style={{display: 'flex', textAlign: align===TextAlign.right  ? 'right' : 'center'}}></input>
  )
}

export default ScheduleTable;
