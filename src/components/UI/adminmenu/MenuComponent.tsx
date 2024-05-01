import React, { FC } from 'react'
import classes from './MenuComponents.module.css'
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
        <div onClick={onClick} style={{display:'flex', borderLeft: '2px solid #8C2425', marginBottom:'7px', alignItems: "center", borderRadius:'5px',  backgroundColor:'#F0EAE9', width:'100%', height:'32px'}}>
          <label style={{marginLeft:'5px'}}>
              <span className={classes.LabelText}>{text}</span>
          </label>
        </div>
       
  )
}

export default MenuComponent;


