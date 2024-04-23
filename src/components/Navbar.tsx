import { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../store'
import { ConnectedProps, connect } from 'react-redux'

const mapState=(state:RootState)=>(
    {
        Token:state.admin.Token
    }
)

type PropsFromRedux = ConnectedProps<typeof connector>

const connector = connect(mapState)

const Navbar: FC<PropsFromRedux> = (props: PropsFromRedux) => {
    const navigate = useNavigate()
    useEffect(() => {
            if (props.Token == "") navigate('/login')        
    }, [props.Token]);
    return (
        <div style={{display:'flex',border:'2px solid lightgray',padding:'5px', color:'#371F76'}}>
               <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/login'>
                login</Link>
                {props.Token != ""
                ?
                <>
                    <Link  style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/admin'>
                    Admin</Link>
                    <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/admin2'>
                    Admin2</Link>                    
                    <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/userSchedule'>
                        UserSchedule</Link>
                </>
                :
                <>
                </>                
                }            
        </div>

    )
}

export default connector(Navbar)