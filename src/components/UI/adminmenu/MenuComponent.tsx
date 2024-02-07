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
        <div onClick={onClick} style={{margin:'5px 2px', display:'flex', flexDirection:'column', borderLeft: '2px solid #8C2425', borderRadius:'5px', padding:'2px', backgroundColor:'#F0EAE9', width:'100%', height:'32px'}}>
          <label >
              <span className={classes.LabelText}>{text}</span>
          </label>
        </div>
       
  )
}

export default MenuComponent;