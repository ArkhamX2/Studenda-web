import { FC } from 'react'
import Day from './UI/day/Day';
import DayName from './UI/dayname/DayName';
import  '../styles/schedule.css'

const ScheduleForm: FC = () => {

    return (
                <div style={{backgroundColor:'#F0F1F5', padding:'10px'}}>
                        <div style={{display: 'flex', flexDirection: 'column', marginLeft:'10px'}}>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <DayName text1='Понедельник, 1 января'>
                                                <Day/>
                                        </DayName>
                                        <DayName text1='Вторник, 2 января'>
                                                <Day/>
                                        </DayName>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <DayName text1='Среда, 3 января'>
                                                <Day/>
                                        </DayName>
                                        <DayName text1='Четверг, 4 января'> 
                                                <Day/>
                                        </DayName>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <DayName text1='Пятница, 5 января'>
                                                <Day/>
                                        </DayName>
                                        <DayName text1='Суббота, 6 января'>
                                                <Day/>
                                        </DayName>
                                        
                                </div>
                        </div>
                       
                        
                </div>

    )
}

export default ScheduleForm