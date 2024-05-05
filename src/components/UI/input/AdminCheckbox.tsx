import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from 'react'
import classes from './LoginInput.module.css'
import InputWrapper from '../inputwrapper/InputWrapper';
export enum TextAlignEnum {
  left = 'left',
  center = 'center'
}

interface inputProps {
  title?: string,
  default?: boolean,
  onChanged: ChangeEventHandler<HTMLInputElement>,
}
const AdminCheckbox: FC<inputProps> =
  (props) => {

    return (
        <div style={{ display: 'flex', flexDirection: 'row', margin: '5px 0px', borderLeft: '2px solid #8C2425', borderRadius: '5px', padding: '2px 5px', backgroundColor: '#F0EAE9', width: '100%' }}>
        <input type="checkbox" defaultChecked={props.default} onChange={props.onChanged}/>
        <div style={{ alignSelf: 'start', fontSize: '16px', fontWeight: '600', margin: '5px' }}>{props.title}</div>
    </div>
    )
  }

export default AdminCheckbox;
