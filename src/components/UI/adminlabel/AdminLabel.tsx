import { FC } from 'react'
import classes from './AdminLabel.module.css'
import InputWrapper from '../inputwrapper/InputWrapper';

export enum TextAlignEnum {
    left = 'left',
    center = 'center'
}

interface labelProps {
    text?: string;
    align?: TextAlignEnum;
    title?: string;
}
const AdminLabel: FC<labelProps> =
    (props) => {
        return (
            <InputWrapper title={props.title}>
                <label className={classes.AdminLabel} style={{ fontSize: '18px', display: 'flex', textAlign: props.align === TextAlignEnum.center ? 'center' : 'left' }}>{props.text}</label>
            </InputWrapper>
        )
    }

export default AdminLabel;
