import { FC } from 'react'
import classes from './Subject.module.css'
import { Style } from 'util';

export enum BorderType {
    firstElement='outlined',
    otherElements='primary'
  }

interface subjectProps{
        col: string[];
        first?: BorderType;

}

const AdminSubject: FC<subjectProps> = ({
        col, first
}) => {

    return (
        <div style={{display:'flex', flexDirection:'row', border: first===BorderType.firstElement ? '1px solid #8C2425': '1px solid #B5999F'}}>
            {col.map((x,i) => {return (
                <div className={classes.Subject} style={{border: first===BorderType.firstElement ? '1px solid #8C2425': '1px solid #B5999F',  fontSize: first===BorderType.firstElement ? '20px' : '16px', fontWeight: first===BorderType.firstElement ? '600' : '500'}}>{x}</div>
            )})}
        </div>
    )
}

export default AdminSubject