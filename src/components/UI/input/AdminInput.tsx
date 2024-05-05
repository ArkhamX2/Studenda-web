import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from 'react'
import classes from './LoginInput.module.css'
import InputWrapper from '../inputwrapper/InputWrapper';
export enum TextAlignEnum {
  left = 'left',
  center = 'center'
}

interface inputProps {
  text?: string;
  align?: TextAlignEnum;
  autoComplete?: string | undefined;
  onChange?: ChangeEventHandler<any> | undefined;
  type?: HTMLInputTypeAttribute | undefined;
  title?: string;
  defaultValue?: string | number | readonly string[] | undefined;
}
const AdminInput: FC<inputProps> =
  (props) => {

    return (
      <InputWrapper title={props.title}>
        <input placeholder={props.text} className={classes.AdminInput} style={{ fontSize:'18px', display: 'flex', textAlign: props.align === TextAlignEnum.center ? 'center' : 'left' }}
          autoComplete={props.autoComplete} onChange={props.onChange} type={props.type} defaultValue={props.defaultValue}></input>
      </InputWrapper>
    )
  }

export default AdminInput;
