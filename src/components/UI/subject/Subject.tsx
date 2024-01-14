import { FC } from 'react'
import classes from './Subject.module.css'

interface subjectProps{
        timestart?: string;
        timeend?: string;
        subject?: string;
        room?: string;

}

const Subject: FC<subjectProps> = ({
        timestart,timeend,subject,room
}) => {

    return (
                <div className={classes.elementBox}>
                        <div className={classes.timeContainer}>
                                <p className={classes.text}>10.00{timestart}</p>
                                <p className={classes.text}>11.00{timeend}</p>
                        </div>
                        <div className={classes.subjectContainer}><div className={classes.text} style={{textAlign:'center'}}>Дело1{subject}</div></div>
                        <div className={classes.roomContainer}><div className={classes.text}>каб.123{room}</div></div>
                </div>
    )
}

export default Subject