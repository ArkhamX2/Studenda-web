import { FC } from 'react'
import { Link } from 'react-router-dom'


const Navbar: FC = () => {

    return (
        <div style={{display:'flex',border:'2px solid lightgray',padding:'5px', color:'#371F76'}}>

               <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/email'>
                email</Link>
               <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/f1'>
                f1</Link>
               <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/login'>
                login</Link>
               <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/groupselector'>
                group selector</Link>
               <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/schedule'>
                Schedule</Link>
               <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/journal'>
                Journal</Link>
               <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/homework'>
                Homework</Link>
               <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/attendance'>
                Attendence</Link>
               <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/admin'>
                Admin</Link>
                <Link style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} to='/admin2'>
                Admin2</Link>
        </div>

    )
}

export default Navbar