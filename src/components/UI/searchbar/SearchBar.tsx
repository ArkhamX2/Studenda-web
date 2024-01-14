import React, { FC } from 'react'
import classes from './SearchBar.module.css'
export enum TextAlign {
  left='left',
  center='center'
}

interface searchProps {
        text?: string;
        label?: string;
        align?: TextAlign;
        searchQuery: any;
        setSearchQuery: any;
        onInput?: ()=> void;
}


const SearchBar: FC<searchProps> =
  ({ searchQuery, setSearchQuery,
    text, label
  }) => {
        

  return (
        <form action="/" method="get" style={{display:'flex', flexDirection:'column', borderLeft: '2px solid #8C2425', borderRadius:'5px', padding:'2px'}}>
        <label >
            <span className={classes.LabelText}>{label}</span>
        </label>
        <input placeholder={text} className={classes.LoginInput} type='text' value={searchQuery}
           onInput={(event: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value) } ></input>
    </form>
       
  )
}

export default SearchBar;