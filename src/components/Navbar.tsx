import { FC, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import store from '../store'


const Navbar: FC = () => {
    const navigate = useNavigate()
    const unsubscribe = store.subscribe(handleTokenChange)
    const [loginStatus, setLoginStatus] = useState(false)
    function handleTokenChange() {
        const token=store.getState().admin.Token
        if (token != "")
        {
            setLoginStatus(true)
        }
        else
        {
            setLoginStatus(false)
        }
    }    
        useEffect(() => {
            if (!loginStatus) navigate('/login')        
    }, [loginStatus]);
    return (
        <div style={{display:'flex',border:'2px solid lightgray',padding:'5px', color:'#371F76'}}>
               <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/login'>
                login</Link>
                {loginStatus
                ?
                <>
                    <Link  style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/admin'>
                    Admin</Link>
                    <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/admin2'>
                    Admin2</Link>
                </>
                :
                <>
                </>                
                } 
                <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/userSchedule'>
                    UserSchedule</Link>             
        </div>

    )
}

export default Navbar