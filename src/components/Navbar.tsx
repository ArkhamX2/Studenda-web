import { FC } from 'react'

const Navbar: FC = () => {

    return (
        <div style={{display:'flex',border:'2px solid lightgray',padding:'5px', color:'#371F76'}}>
               <a style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} href='/email'>
                email</a>
               <a style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} href='/f1'>
                f1</a>
               <a style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} href='/login'>
                login</a>
               <a style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} href='/groupselector'>
                group selector</a>
               <a style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} href='/schedule'>
                Schedule</a>
               <a style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} href='/journal'>
                Journal</a>
               <a style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} href='/homework'>
                Homework</a>
               <a style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} href='/attendance'>
                Attendence</a>
               <a style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} href='/admin'>
                Admin</a>
                <a style={{margin:'5px', border:'2px solid lightgray',padding:'5px', width:'120px', textAlign:'center', fontSize:'14px'}} href='/admin2'>
                Admin2</a>
        </div>

    )
}

export default Navbar