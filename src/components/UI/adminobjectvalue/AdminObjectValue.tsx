import { FC, useState } from 'react'
import classes from './Subject.module.css'
import { account } from '../../../types/AdminType';

export enum BorderType {
    firstElement = 'outlined',
    otherElements = 'primary'
}

interface subjectProps {
    objectList?: any[];
    first?: BorderType;
    forbiddenKeys: string[];
    onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void;
    neededDataArrays?: Map<string, any[]>;
}

const findById = (dataArray: any[], id: number) => {
    try {
        return dataArray.find((obj) => obj.id === id)
    } catch (error) {

    }
}

const AdminObjectValue: FC<subjectProps> = ({
    objectList, first, forbiddenKeys, onContextMenu, neededDataArrays
}) => {
    return (
        <tr onContextMenu={onContextMenu} style={{ display: 'flex', flexDirection: 'row', border: first === BorderType.firstElement ? '1px solid #8C2425' : '1px solid #B5999F' }}>
            {(objectList !== undefined)
                ?
                <>
                    {objectList.filter((val) => !forbiddenKeys.find((forbiddenKeyName) => forbiddenKeyName === val[0])).map((value: any) => {
                        var tmpString = ""
                        if ((value[0] as string).includes("Id")) {
                            const tmpArr = findById(neededDataArrays?.get((value[0] as string).replace("Id", "") + "Array")!, value[1])
                            console.log("tmpArr")
                            console.log(tmpArr)
                            if ((value[0] as string) == "accountId") {
                                tmpString=((tmpArr as account).surname + " " + (tmpArr as account).name + " " + (tmpArr as account).patronymic)
                            }
                            else {
                                tmpString=(tmpArr?.name)
                            }
                        }
                        else {
                            tmpString=(value[1])
                        }
                        return (
                            <td className={classes.tableDefContainer} style={{
                                border: first === BorderType.firstElement ? '1px solid #8C2425' : '1px solid #B5999F', fontSize: first === BorderType.firstElement ? '20px' : '16px', fontWeight: first === BorderType.firstElement ? '600' : '500'
                            }}>
                                {tmpString}
                            </td >
                        )
                    }
                    )}
                </>
                :
                <>
                </>}
        </tr >
    )
}

export default AdminObjectValue