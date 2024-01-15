import { FC } from 'react'
import classes from './Subject.module.css'

interface subjectProps{
        col1?: string;
        col2?: string;
        col3?: string;
        col4?: string;
        col5?: string;
        col6?: string;
        col7?: string;
        col8?: string;

}

const AdminSubject: FC<subjectProps> = ({
        col1,col2,col3,col4,col5,col6,col7,col8
}) => {

    return (
        <div style={{display:'flex', flexDirection:'row', border:'2px solid gray'}}>
        <div style={{margin:'10px', border:'2px solid lightgray', padding:'5px'}}>{col1}</div>
        <div style={{margin:'10px', border:'2px solid lightgray', padding:'5px'}}>{col2}</div>
        <div style={{margin:'10px', border:'2px solid lightgray', padding:'5px'}}>{col3}</div>
        <div style={{margin:'10px', border:'2px solid lightgray', padding:'5px'}}>{col4}</div>
        <div style={{margin:'10px', border:'2px solid lightgray', padding:'5px'}}>{col5}</div>
        <div style={{margin:'10px', border:'2px solid lightgray', padding:'5px'}}>{col6}</div>
    </div>
    )
}

export default AdminSubject