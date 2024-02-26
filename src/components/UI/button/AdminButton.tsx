import React, { FC } from 'react'
import classes from './AdminButton.module.css'

interface buttonProps {
        text?: string;
        children?: React.ReactChild | React.ReactNode;
        onClick?: ()=> void;
}
const AdminButton: FC<buttonProps> =
  ({
    text, 
    onClick,
  }) => {

  return (
       <button onClick={onClick} className={classes.AdminButton}>
        {text}
        </button>
  )
}

export default AdminButton;