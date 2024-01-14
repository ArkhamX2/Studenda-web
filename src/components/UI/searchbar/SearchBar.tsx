import React, { FC } from 'react'
import classes from './SearchBar.module.css'
export enum TextAlign {
  left='left',
  center='center'
}

interface searchProps {
        text?: string;
        align?: TextAlign;
        searchQuery: any;
        setSearchQuery: any;
        onInput?: ()=> void;
}


const SearchBar: FC<searchProps> =
  ({ searchQuery, setSearchQuery,
    text
  }) => {
        

  return (
        <form action="/" method="get" style={{display:'flex', flexDirection:'column'}}>
        <label htmlFor="header-search">
            <span className="visually-hidden">Search blog posts</span>
        </label>
        <input placeholder={text} className={classes.LoginInput} type='text' value={searchQuery}
           onInput={(event: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value) } ></input>
    </form>
       
  )
}

export default SearchBar;