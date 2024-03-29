import React, { FC } from 'react'
import classes from './LoginButton.module.css'

export enum ButtonVariant {
  outlined='outlined',
  primary='primary'
}
interface buttonProps {
        text?: string;
        children?: React.ReactChild | React.ReactNode;
        variant: ButtonVariant;
        onClick?: ()=> void;
}
const LoginButton: FC<buttonProps> =
  ({
    text, 
    variant,
    onClick,
    children
  }) => {

  return (
       <button onClick={onClick} className={classes.LoginButton} style={{display: 'flex', border: variant=== ButtonVariant.outlined ? '2px solid lightgray' : 'none',
    backgroundColor: variant===ButtonVariant.primary ?   '#643B9F' : 'transparent', color: variant===ButtonVariant.primary ? 'white' : '#643B9F'}}>{text}{children}
        </button>
  )
}

export default LoginButton;
