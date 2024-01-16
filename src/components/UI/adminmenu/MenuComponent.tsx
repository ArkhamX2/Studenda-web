import React, { FC } from 'react'
import classes from './SearchBar.module.css'
export enum TextAlign {
  left='left',
  center='center'
}

interface searchProps {
        text?: string;
        onClick?: ()=> void;
}


const MenuComponent: FC<searchProps> =
  ({ text, onClick
  }) => {
        

  return (
        <form action="/" method="get" onClick={onClick} style={{display:'flex', flexDirection:'column', borderLeft: '2px solid #8C2425', borderRadius:'5px', padding:'2px', backgroundColor:'#F0EAE9', width:'100%'}}>
        <label >
            <span className={classes.LabelText}>{text}</span>
        </label>
    </form>
       
  )
}

export default MenuComponent;