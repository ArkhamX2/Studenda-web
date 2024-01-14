import React, { FC, useEffect, useState } from 'react'
import  './ScheduleTable.module.css'
import classes from './ScheduleTable.module.css'
import AdminScheduleItem from '../admincheduleitem/AdminScheduleItem'
import AdminScheduleItemRow from '../admincheduleitemrow/AdminScheduleItemRow'

export enum row {
  half='half',
  split='split'
}

const mon = [
        {red: {subject: "zxbvvcb", type: "", teacher: "m", classroom: "432"}, blue: {subject: "", type: "", teacher: "", classroom: "11"}},
        {red: {subject: "dghdfg", type: "", teacher: "", classroom: ""}, blue: {subject: "xvcb", type: "", teacher: "", classroom: "23"}},
        {red: {subject: "", type: "", teacher: "", classroom: ""}, blue: {subject: "", type: "", teacher: "", classroom: "543"}},
        {red: {subject: "nnnn", type: "", teacher: "", classroom: "643"}, blue: {subject: "nnnn", type: "", teacher: "", classroom: "643"}},
        {red: {subject: "", type: "", teacher: "", classroom: ""}, blue: {subject: "", type: "", teacher: "", classroom: "123"}},
        {red: {subject: "", type: "", teacher: "", classroom: ""}, blue: {subject: "", type: "", teacher: "", classroom: "432"}},
]

const ScheduleTable: FC =
  () => {

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

                <AdminScheduleItemRow id='1' content={mon}/>
                <AdminScheduleItemRow id='2' content={mon}/>

        </table>
       //<input placeholder={text} className={classes.LoginInput}  style={{display: 'flex', textAlign: align===TextAlign.right  ? 'right' : 'center'}}></input>
  )
}

export default ScheduleTable;
