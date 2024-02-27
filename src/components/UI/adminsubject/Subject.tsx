import { FC } from 'react'
import classes from './Subject.module.css'
import { Style } from 'util';

export enum BorderType {
    firstElement='outlined',
    otherElements='primary'
  }

interface subjectProps{
    itemList?: any[];
    first?: BorderType;

}

const AdminSubject: FC<subjectProps> = ({
        itemList, first
}) => {

    return (
        <tr style={{display:'flex', flexDirection:'row', border: first===BorderType.firstElement ? '1px solid #8C2425': '1px solid #B5999F'}}>
            {(itemList!==undefined)
            ?
            <>          
                {itemList.slice(1).map((item,i)=>
                <>
                    <div className={classes.Subject} style={{border: first===BorderType.firstElement ? '1px solid #8C2425': '1px solid #B5999F',  fontSize: first===BorderType.firstElement ? '20px' : '16px', fontWeight: first===BorderType.firstElement ? '600' : '500'}}>{item}</div>
                </>
                )}
            </>
            :
            <>
            </>}
        </tr>
    )
}

export default AdminSubject