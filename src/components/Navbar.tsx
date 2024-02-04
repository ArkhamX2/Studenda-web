import { FC } from 'react'
import { Link } from 'react-router-dom'


const Navbar: FC = () => {

    return (
        <div style={{display:'flex',border:'2px solid lightgray',padding:'5px', color:'#371F76'}}>
               <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/login'>
                login</Link>
               <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/admin'>
                Admin</Link>
                <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/admin2'>
                Admin2</Link>
        </div>

    )
}

export default Navbar