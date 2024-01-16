import React, { FC, useEffect, useState } from 'react'
import  './ScheduleTable.module.css'
import classes from './ScheduleTable.module.css'
import AdminScheduleItemList from '../adminscheduleitemlist/AdminScheduleItemList'
import store from '../../../store'

export enum row {
  half='half',
  split='split'
}

const ScheduleTable: FC =
  () => {
        const [ScheduleList, setScheduleList]=useState(store.getState().test.list)
        store.subscribe(() => setScheduleList(store.getState().test.list))
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

        </table>
       //<input placeholder={text} className={classes.LoginInput}  style={{display: 'flex', textAlign: align===TextAlign.right  ? 'right' : 'center'}}></input>
  )
}

export default ScheduleTable;
