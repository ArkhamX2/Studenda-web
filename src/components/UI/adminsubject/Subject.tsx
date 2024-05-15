import { FC, useState } from 'react'
import classes from './Subject.module.css'

export enum BorderType {
    firstElement = 'outlined',
    otherElements = 'primary'
}

interface subjectProps {
    itemList?: any[];
    first?: BorderType;
    forbiddenKeys: string[];
    translationDTO: Map<string, string>;
    onClick: (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>, key: string, reverse: boolean, updateReverse: () => void) => void;
}

const AdminSubject: FC<subjectProps> = ({
    itemList, first, forbiddenKeys, translationDTO, onClick
}) => {
    const [reverse, setReverse] = useState<boolean>(false)
    const updateReverse = () => {
        if (reverse)
            setReverse(false)
        else
            setReverse(true)
    }
    return (
        <tr style={{ display: 'flex', flexDirection: 'row', border: first === BorderType.firstElement ? '1px solid #8C2425' : '1px solid #B5999F' }}>
            {(itemList !== undefined)
                ?
                <>
                    {itemList.filter((keyName) => !forbiddenKeys.find((forbiddenKeyName) => forbiddenKeyName === keyName)).map((item) =>
                        <>
                            <td onClick={(e) => onClick(e, item, reverse, updateReverse)} className={classes.tableDefContainer} style={{ border: first === BorderType.firstElement ? '1px solid #8C2425' : '1px solid #B5999F', fontSize: first === BorderType.firstElement ? '20px' : '16px', fontWeight: first === BorderType.firstElement ? '600' : '500' }}>{translationDTO!.get(item)}</td>
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