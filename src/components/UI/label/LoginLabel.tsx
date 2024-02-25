import React, { FC } from 'react'
import classes from './LoginLabel.module.css'
export enum TextAlign {
  right='right',
  center='center',
  left='left'
}

interface labelProps {
        text?: string;
        align?: TextAlign;
        children?: React.ReactChild | React.ReactNode;
}
const LoginLabel: FC<labelProps> =
  ({
    text, 
    align,
    children,
  }) => {

  return (
       <div className={classes.LoginLabel} style={{ alignSelf: align===TextAlign.center  ? 'center' : 'right'}}>{text} {children}</div>
  )
}

export default LoginLabel;
