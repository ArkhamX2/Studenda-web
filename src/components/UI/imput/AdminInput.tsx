import React, { ChangeEventHandler, FC, HTMLInputTypeAttribute } from 'react'
import classes from './LoginInput.module.css'
export enum TextAlignEnum {
  left='left',
  center='center'
}

interface inputProps {
        text?: string;
        align?: TextAlignEnum;
        autoComplete?: string | undefined;
        onChange?: ChangeEventHandler<any> | undefined;
        type?: HTMLInputTypeAttribute | undefined;
        defaultValue?: string | number | readonly string[] | undefined;
}
const AdminInput: FC<inputProps> =
  ({
    text, 
    align,
    autoComplete,
    onChange,
    type,
    defaultValue,
  }) => {

  return (
       <input placeholder={text} className={classes.AdminInput}  style={{display: 'flex', textAlign: align===TextAlignEnum.center  ? 'center' : 'left'}}
       autoComplete={autoComplete} onChange={onChange} type={type} defaultValue={defaultValue}></input>
  )
}

export default AdminInput;
