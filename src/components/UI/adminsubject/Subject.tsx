import { FC } from 'react'
import classes from './Subject.module.css'
import { Style } from 'util';

export enum BorderType {
    firstElement='outlined',
    otherElements='primary'
  }

interface subjectProps{
        col1?: string;
        col2?: string;
        col3?: string;
        col4?: string;
        col5?: string;
        col6?: string;
        col7?: string;
        col8?: string;
        first?: BorderType;

}

const AdminSubject: FC<subjectProps> = ({
        col1,col2,col3,col4,col5,col6,col7,col8, first,
}) => {

    return (
        <div style={{display:'flex', flexDirection:'row', border: first===BorderType.firstElement ? '1px solid #8C2425': '1px solid #B5999F'}}>
        <div className={classes.Subject} style={{border: first===BorderType.firstElement ? '1px solid #8C2425': '1px solid #B5999F',  fontSize: first===BorderType.firstElement ? '20px' : '16px', fontWeight: first===BorderType.firstElement ? '600' : '500'}}>{col1}</div>
        <div className={classes.Subject} style={{border: first===BorderType.firstElement ? '1px solid #8C2425': '1px solid #B5999F',  fontSize: first===BorderType.firstElement ? '20px' : '16px', fontWeight: first===BorderType.firstElement ? '600' : '500'}}>{col2}</div>
        <div className={classes.Subject} style={{border: first===BorderType.firstElement ? '1px solid #8C2425': '1px solid #B5999F',  fontSize: first===BorderType.firstElement ? '20px' : '16px', fontWeight: first===BorderType.firstElement ? '600' : '500'}}>{col3}</div>
        <div className={classes.Subject} style={{border: first===BorderType.firstElement ? '1px solid #8C2425': '1px solid #B5999F',  fontSize: first===BorderType.firstElement ? '20px' : '16px', fontWeight: first===BorderType.firstElement ? '600' : '500'}}>{col4}</div>
        <div className={classes.Subject} style={{border: first===BorderType.firstElement ? '1px solid #8C2425': '1px solid #B5999F',  fontSize: first===BorderType.firstElement ? '20px' : '16px', fontWeight: first===BorderType.firstElement ? '600' : '500'}}>{col5}</div>
        <div className={classes.Subject} style={{border: first===BorderType.firstElement ? '1px solid #8C2425': '1px solid #B5999F',  fontSize: first===BorderType.firstElement ? '20px' : '16px', fontWeight: first===BorderType.firstElement ? '600' : '500'}}>{col6}</div>
    </div>
    )
}

export default AdminSubject