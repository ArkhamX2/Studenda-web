import { FC } from 'react'
import classes from './Subject.module.css'
import { Style } from 'util';

export enum BorderType {
    firstElement = 'outlined',
    otherElements = 'primary'
}

interface subjectProps {
    objectList?: any[];
    first?: BorderType;
    forbiddenKeys: string[];
    onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const AdminObjectValue: FC<subjectProps> = ({
    objectList, first, forbiddenKeys, onContextMenu
}) => {

    return (
        <tr onContextMenu={onContextMenu} style={{ display: 'flex', flexDirection: 'row', border: first === BorderType.firstElement ? '1px solid #8C2425' : '1px solid #B5999F' }}>
            {(objectList !== undefined)
                ?
                <>
                    {objectList.filter((val) => !forbiddenKeys.find((forbiddenKeyName) => forbiddenKeyName === val[0])).map((value: any) =>
                        <>
                            <td className={classes.tableDefContainer} style={{
                                border: first === BorderType.firstElement ? '1px solid #8C2425' : '1px solid #B5999F', fontSize: first === BorderType.firstElement ? '20px' : '16px', fontWeight: first === BorderType.firstElement ? '600' : '500'
                            }}>
                                {value[1]}
                            </td >
                        </>
                    )}
                </>
                :
                <>
                </>}
        </tr >
    )
}

export default AdminObjectValue