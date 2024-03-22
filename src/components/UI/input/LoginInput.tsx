import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from 'react'
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
}
const LoginInput: FC<inputProps> =
  ({
    text, 
    align,
    autoComplete,
    onChange,
    type,
  }) => {

  return (
       <input placeholder={text} className={classes.LoginInput}  style={{display: 'flex', textAlign: align===TextAlignEnum.left  ? 'left' : 'center'}}
       autoComplete={autoComplete} onChange={onChange} type={type} ></input>
  )
}

export default LoginInput;
