import { FC, useEffect, useState } from 'react'
import Selector from './UI/selector/Selector'
import ScheduleTable from './UI/table/ScheduleTable'
import SearchBar from './UI/searchbar/SearchBar'
import { useAppDispatch } from '../hook'
import { COLORS } from '../styles/colors'
import '../styles/admin.css'
import LoginInput from './UI/imput/LoginInput'
import LoginButton, { ButtonVariant } from './UI/button/LoginButton'
import AdminSubject, { BorderType } from './UI/adminsubject/Subject'
import MenuComponent from './UI/adminmenu/MenuComponent'
import AdminButton from './UI/button/AdminButton'
import store from '../store/'
import { dayPosition, discipline, subjectPosition, uniteSubject, weekType, subjectType, user, role, group, course, department, } from '../store/adminSlice';
import axios from 'axios'
import ModalAdmin from './UI/modalAdmin/ModalAdmin'
import useModal from './UI/modalAdmin/useModalAdmin'
import AdminObjectValue from './UI/adminobjectvalue/AdminObjectValue'

type info = {
    id: number,
    name: string,
    route: string
}

interface IEditValue {
    value: info[]
}

export const EditValue:IEditValue = {value:[
    {id:0,name:"default",route:""},
    {id:1,name:"discipline",route:"api/schedule/discipline"},
    {id:2,name:"subjectPosition",route:"api/schedule/subject-position"},
    {id:3,name:"dayPosition",route:"api/schedule/day-position"},
    {id:4,name:"weekType",route:"api/schedule/week-type"},
    {id:5,name:"subjectType",route:"api/schedule/subject-type"},
    {id:6,name:"user",route:"api/security/user"},
    {id:7,name:"role",route:""},
    {id:8,name:"group",route:"api/group"},
    {id:9,name:"course",route:"api/course"},
    {id:10,name:"department",route:"api/department"},
]}

const AdminForm2: FC = () => {
    const dispatch = useAppDispatch()
    const posts = [
        { id: '1', name: 'Предмет1' },

    ];
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s'); 
    

    const filterPosts = (posts: any[], query: any) => {
        if (!query) {
            return posts;
        }
    
        return posts.filter((post: { name: string }) => {
            const postName = post.name.toLowerCase();
            return postName.includes(query);
        });
    };
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredPosts = filterPosts(posts, searchQuery);

    const [selectedButton, setSelectedButton] = useState(EditValue.value[0].id)
    const [selectedArray, setSelectedArray] = useState<any[]>()
    const [selectedObject, setSelectedObject] = useState<Object>()  
    const { isOpen, toggle } = useModal()

    useEffect(() => {
        request(selectedButton,"get")
    },[selectedButton]);
    
    const onMenuComponentClick = async (ButtonStateId:number) =>{
        setSelectedButton(ButtonStateId)        
    }

    const request = async (EditValueId:number, method:string, data:undefined|any=undefined, params:undefined|any=undefined) => {   
        try {
            if (method==="delete" && data !== undefined)
            {
                data=data.id
            }
            const url = "http://88.210.3.137/"+EditValue.value[EditValueId].route
            const response = await axios({
                method: method,
                url: url,
                data: [data],
                params: [params]
            })
            console.log(response.data)
            if (method==="get")
            {
                switch (EditValue.value[EditValueId].name) {
                    case "discipline":
                        {
                        const tmparr=[] as discipline[]
                        const data = response.data as discipline[]
                        data.map((obj,i)=>{tmparr.push({id:obj.id,userId:obj.userId,name:obj.name,description:obj.description})})
                        setSelectedArray(tmparr)
                        break;
                        }
                    case "subjectPosition":
                        {
                        const tmparr=[] as subjectPosition[]
                        const data = response.data as subjectPosition[]
                        data.map((obj,i)=>{tmparr.push({id:obj.id,index:obj.index,startLabel:obj.startLabel,endLabel:obj.endLabel,name:obj.name})})
                        setSelectedArray(tmparr)
                        break;
                        }
                    case "dayPosition":
                        {
                        const tmparr=[] as dayPosition[]
                        const data = response.data as dayPosition[]
                        data.map((obj,i)=>{tmparr.push({id:obj.id,index:obj.index,name:obj.name})})
                        setSelectedArray(tmparr)
                        break;
                        }
                    case "weekType":
                        {
                        const tmparr=[] as weekType[]
                        const data = response.data as weekType[]
                        data.map((obj,i)=>{tmparr.push({id:obj.id,index:obj.index,name:obj.name})})
                        setSelectedArray(tmparr)
                        break;
                        }
                    case "subjectType":
                        {
                        const tmparr=[] as subjectType[]
                        const data = response.data as subjectType[]
                        data.map((obj,i)=>{tmparr.push({id:obj.id,name:obj.name,IsScorable:obj.IsScorable})})
                        setSelectedArray(tmparr)
                        break;
                        }
                    case "user":
                        {
                        const tmparr=[] as user[]
                        const data = response.data as user[]
                        data.map((obj,i)=>{tmparr.push({id:obj.id,roleId:obj.roleId,groupId:obj.groupId,identityId:obj.identityId,name:obj.name,surname:obj.surname,patronymic:obj.patronymic})})
                        setSelectedArray(tmparr)
                        break;
                        }
                    case "role":
                        {
                        const tmparr=[] as role[]
                        const data = response.data as role[]
                        data.map((obj,i)=>{tmparr.push({id:obj.id,name:obj.name})})
                        setSelectedArray(tmparr)
                        break;
                        }
                    case "group":
                        {
                        const tmparr=[] as group[]
                        const data = response.data as group[]
                        data.map((obj,i)=>{tmparr.push({id:obj.id,courseId:obj.courseId,departmentId:obj.departmentId,name:obj.name})})
                        setSelectedArray(tmparr)
                        break;
                        }
                    case "course":
                        {
                        const tmparr=[] as course[]
                        const data = response.data as course[]
                        data.map((obj,i)=>{tmparr.push({id:obj.id,grade:obj.grade,name:obj.name})})
                        setSelectedArray(tmparr)
                        break;
                        }
                    case "department":
                        {
                        const tmparr=[] as department[]
                        const data = response.data as department[]
                        data.map((obj,i)=>{tmparr.push({id:obj.id,name:obj.name})})
                        setSelectedArray(tmparr)
                        break;
                        }            
                    default:
                        {
                        setSelectedArray([])
                        break;
                        }
                }
            }
            return response.data
        } 
        catch(error) {
            setSelectedArray([])
            console.error(error);
        }
    }

    const onAddClick=(EditValueId:number, obj:any|undefined=undefined)=>{
        switch (EditValue.value[EditValueId].name) {
            case "discipline":
                {
                    if (obj === undefined)
                    {
                        const tmpobj:discipline={id:0,userId:0,name:"",description:undefined}
                        setSelectedObject(tmpobj)
                    }
                    else
                    {
                        const tmpobj:discipline={id:obj.id,userId:obj.userId,name:obj.name,description:obj.description}
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "subjectPosition":
                {
                    if (obj === undefined)
                    {
                        const tmpobj:subjectPosition={id:0,index:0,startLabel:undefined,endLabel:undefined,name:undefined}
                        setSelectedObject(tmpobj)
                    }
                    else
                    {
                        const tmpobj:subjectPosition={id:obj.id,index:obj.index,startLabel:obj.startLabel,endLabel:obj.endLabel,name:obj.name}
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "dayPosition":
                {
                    if (obj === undefined)
                    {
                        const tmpobj:dayPosition={id:0,index:0,name:undefined}
                        setSelectedObject(tmpobj)
                    }
                    else
                    {
                        const tmpobj:dayPosition={id:obj.id,index:obj.index,name:obj.name}
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "weekType":
                {
                    if (obj === undefined)
                    {
                        const tmpobj:weekType={id:0,index:0,name:undefined}
                        setSelectedObject(tmpobj)
                    }
                    else
                    {
                        const tmpobj:weekType={id:obj.id,index:obj.index,name:obj.name}
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "subjectType":
                {
                    if (obj === undefined)
                    {
                        const tmpobj:subjectType={id:0,name:"",IsScorable:false}
                        setSelectedObject(tmpobj)
                    }
                    else
                    {
                        const tmpobj:subjectType={id:obj.id,name:obj.name,IsScorable:obj.IsScorable}
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "user":
                {
                    if (obj === undefined)
                    {
                        const tmpobj:user={id:0,roleId:0,groupId:undefined,identityId:undefined,name:undefined,surname:undefined,patronymic:undefined}
                        setSelectedObject(tmpobj)
                    }
                    else
                    {
                        const tmpobj:user={id:obj.id,roleId:obj.roleId,groupId:obj.groupId,identityId:obj.identityId,name:obj.name,surname:obj.surname,patronymic:obj.patronymic}
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "role":
                {
                    if (obj === undefined)
                    {
                        const tmpobj:role={id:0,name:""}
                        setSelectedObject(tmpobj)
                    }
                    else
                    {
                        const tmpobj:role={id:obj.id,name:obj.name}
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "group":
                {
                    if (obj === undefined)
                    {
                        const tmpobj:group={id:0,courseId:0,departmentId:0,name:""}
                        setSelectedObject(tmpobj)
                    }
                    else
                    {
                        const tmpobj:group={id:obj.id,courseId:obj.courseId,departmentId:obj.departmentId,name:obj.name}
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "course":
                {
                    if (obj === undefined)
                    {
                        const tmpobj:course={id:0,grade:0,name:undefined}
                        setSelectedObject(tmpobj)
                    }
                    else
                    {
                        const tmpobj:course={id:obj.id,grade:obj.grade,name:obj.name}
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "department":
                {
                    if (obj === undefined)
                    {
                        const tmpobj:department={id:0,name:""}                        
                        setSelectedObject(tmpobj)
                    }
                    else
                    {                        
                        const tmpobj:department={id:obj.id,name:obj.name}                        
                        setSelectedObject(tmpobj)
                    }                    
                    break;
                }        
            default:
                {
                    setSelectedObject({})
                    break;
                }
        }
        toggle()
    }

    const onSaveClick = async () => {
        toggle()
        await request(selectedButton,"post",selectedObject)
        await request(selectedButton,"get")
    }

    const onDeleteClick = async () => {
        toggle()
        await request(selectedButton,"delete",selectedObject)
        await request(selectedButton,"get")
    }

    const onItemClick = (event:React.MouseEvent<HTMLDivElement, MouseEvent>,obj:any) => {
        event.preventDefault()
        onAddClick(selectedButton, obj)
    }

    return (
        <>
            <ModalAdmin isOpen={isOpen} toggle={toggle}>
                {selectedObject!==undefined
                ?
                <>
                    {(Object.keys(selectedObject)).map((key, y)=>
                    <div>
                        {key}:
                        <input onChange={e=>(typeof (selectedObject as any)[key] ==='number'? (selectedObject as any)[key]=Number(e.target.value):typeof (selectedObject as any)[key] ==='string'?(selectedObject as any)[key]=String(e.target.value):(selectedObject as any)[key]=Boolean(e.target.value))} defaultValue={(selectedObject as any)[key]}/>
                    </div>
                    )}
                    <button onClick={()=>onSaveClick()}>Сохранить</button>
                    {(selectedObject as any).id!==0
                    ?
                    <button onClick={()=>onDeleteClick()}>Удалить</button>
                    :
                    <>
                    </>}
                </>
                :
                <>
                </>
                }                
            </ModalAdmin>        
            <main style={{display:'flex', backgroundColor:'white', maxHeight: '90svh', color:'#1B0E17', boxSizing:'border-box'}}>
                <div style={{display:'flex', flexDirection:'column', border:'2px solid #490514', margin:'5px', padding:'10px', 
                    backgroundColor:'#F7F3F3', borderRadius: '5px'}}>
                    <div style={{fontSize:'18px'}}>Редактор расписания</div>
                    {[...Array(EditValue.value.length-1)].map((x, i) => {const selectedButtonId=i+1; return(
                        <MenuComponent text={EditValue.value[selectedButtonId].name} onClick={()=>onMenuComponentClick(EditValue.value[selectedButtonId].id)}></MenuComponent>
                    )}
                    )}
                    <ul style={{visibility:'hidden'}}>
                    {filteredPosts.map(post => (
                        <li key={post.id}>{post.name}</li>
                    ))}
                    </ul>
                </div>
                <div style={{width:'80%', border:'2px solid #490514',margin:'5px', overflowX:'auto', overflowY:'auto',whiteSpace:'nowrap', 
                backgroundColor:'#F7F3F3', borderRadius: '5px', scrollbarColor:COLORS.red3, flexDirection:'row'}}>
                    <div style={{display:'flex'}}>
                        <div style={{display:'flex', flexDirection:'row', margin:'10px 10px 10px 10px',width:'60%'}}>
                            <button style={{margin:'5px', fontSize:'12px', width:'60px'}}>Фильтр</button>
                            <input placeholder='Введите имя столбца' style={{borderRadius: '5px', border: '2px solid #490514', backgroundColor:'#FFF', height:'40px', width:'80%',
                        display:'flex', alignSelf:'center', paddingLeft:'5px'}}></input>
                            <button style={{margin:'5px', fontSize:'12px', width:'60px'}}>Поиск</button>

                        </div>
                        <div style={{display: 'flex', width:'20%', alignSelf:'center', justifySelf:'flex-end'}}>
                            <AdminButton onClick={()=>onAddClick(selectedButton)} text='Добавить'/>
                        </div>
                        
                    </div>
                    <div style={{display:'flex', flexDirection:'column', border:'1px solid lightgray', padding:'5px'}}>
                        {(selectedArray!==undefined && selectedArray[0]!==undefined)?
                        <>
                        <AdminSubject itemList={(Object.keys(selectedArray[0]))} first={BorderType.firstElement}/>
                        {selectedArray.map((obj,i)=>                        
                        <AdminObjectValue onContextMenu={(e:React.MouseEvent<HTMLDivElement>)=>onItemClick(e,obj)} objectList={Object.values(obj)}/>
                        )}
                        </>
                        :
                        <>
                        </>
                        }                   
                    </div>


                </div>
                    
            </main>
        </>

    )
}

export default AdminForm2