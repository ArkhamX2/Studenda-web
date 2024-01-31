import { FC, useEffect, useState } from 'react'
import ScheduleTable from './UI/table/ScheduleTable'
import Select, { SingleValue } from 'react-select'
import { COLORS } from '../styles/colors'
import '../styles/admin.css'
import { course, department, group, weekType, subjectPosition, dayPosition, subjectType, discipline, user, subject } from '../types/AdminType';
import { RequestValue, request } from '../request'
import axios from 'axios'
import ModalAdmin from './UI/modalAdmin/ModalAdmin';
import useModal from './UI/modalAdmin/useModalAdmin'
import classes from './UI/table/ScheduleTable.module.css'

type options = {
    value: number
    label: string
}

const AdminForm: FC = () => {   
    const noOptionsText = "Абоба не найден"

    const { isOpen, toggle } = useModal()

    const [departmentOptions, setDepartmentOptions] = useState<options[]>()

    const [courseOptions, setCoursesOptions] = useState<options[]>()

    const [groupOptions, setGroupOptions] = useState<options[]>()

    const ArrayToOptions = async (RequestValueId:number, data:undefined|any=undefined, params:undefined|any=undefined, headers:undefined|any=undefined) => {
        const tmparray:options[]=[];
        (await request(RequestValue.value[RequestValueId].id, "GET", data, params, headers) as any[]).map((obj,i)=>(!Object.keys(obj).includes("grade")) ? (tmparray.push({value:obj.id,label:obj.name})) : (tmparray.push({value:obj.id,label:String(obj.grade)})))
        return tmparray
    }

    const initialFunc = async () => {        
        setDisciplines(await request(RequestValue.value[1].id, "GET"))        
        setSubjectPositions((await request(RequestValue.value[2].id, "GET")).sort((a:subjectPosition,b:subjectPosition)=> a.index - b.index))        
        setDayPositions((await request(RequestValue.value[3].id, "GET")).sort((a:dayPosition,b:dayPosition)=> a.index - b.index))
        setWeekTypes((await request(RequestValue.value[4].id, "GET")).sort((a:weekType,b:weekType)=> a.index - b.index))
        setSubjectTypes(await request(RequestValue.value[5].id, "GET"))
        setUsers(await request(RequestValue.value[6].id, "GET"))
        setDepartmentOptions(await ArrayToOptions(10))
        setCoursesOptions(await ArrayToOptions(9))
        setGroupOptions(await ArrayToOptions(8))
    }

    const departmentOptionsOnOnChange = async (value: SingleValue<options>) => {
        if (value!==null)
        {
            setCoursesOptions(await ArrayToOptions(9,value.value))
        }
    }

    const courseOptionsOnOnChange = async (value: SingleValue<options>) => {
        if (value!==null)
        {
            setGroupOptions(await ArrayToOptions(8,value.value))
        }
    }

    const groupOptionsOnOnChange = async (value: SingleValue<options>) => {
        if (value!==null)
        {
            setCurrentGroupId(value.value)
            var tmparrarr:subject[][]=[]
            await Promise.all(weekTypes?.map(async (obj,i)=>{
                const param = {groupId:value.value,weekTypeId:obj.index,year:2023}
                tmparrarr.push(await request(RequestValue.value[11].id, "GET", undefined, param)) 
            }))
            var tmparr:subject[]=[]
            tmparrarr.map((obj,i)=>{
                tmparr=tmparr.concat(obj)
            })
            setSubjects(tmparr)
        }
        else
        {
            setCurrentGroupId(undefined)
        }
    }

    const [currentGroupId, setCurrentGroupId] = useState<number>()

    const [weekTypes, setWeekTypes] = useState<weekType[]>([])
    
    const [dayPositions, setDayPositions] = useState<dayPosition[]>([])

    const [subjectPositions, setSubjectPositions] = useState<subjectPosition[]>([])
    
    const [subjectTypes, setSubjectTypes] = useState<subjectType[]>([])

    const [disciplines, setDisciplines] = useState<discipline[]>([])

    const [users, setUsers] = useState<user[]>([])

    const [subjects, setSubjects] = useState<subject[]>([])

    const [selectedSubject, setSelectedSubject] = useState<subject>()

    const findSubject = (subjectPosition:subjectPosition, dayPosition:dayPosition, weekType:weekType) => {
        try {
            return subjects.find((obj)=>obj.subjectPositionId===subjectPosition.id && obj.dayPositionId===dayPosition.id && obj.weekTypeId===weekType.id)
        } catch (error) {
            
        }
    }

    const findUser = (userId:number) => {
        try {
            return users.find((obj)=>obj.id===userId)
        } catch (error) {
            
        }
    }

    const findDiscipline = (disciplineId:number) => {
        try {
            return disciplines.find((obj)=>obj.id===disciplineId)
        } catch (error) {
            
        }
    }

    const findSubjectType = (subjectTypeId:number|undefined) => {
        try {
            return subjectTypes.find((obj)=>obj.id===subjectTypeId)
        } catch (error) {
            
        }
    }

    const subjectClick = (e:React.MouseEvent<HTMLTableRowElement, MouseEvent>, subjectPosition:subjectPosition, dayPosition:dayPosition, weekType:weekType) => {
        e.preventDefault()
        setSelectedSubject(findSubject(subjectPosition,dayPosition,weekType))
        toggle()
    }

    return (
        <main style={{display:'flex', backgroundColor:'white', maxHeight: '90svh', color:'#1B0E17', boxSizing:'border-box'}}>            
            <ModalAdmin isOpen={isOpen} toggle={toggle}>
            {selectedSubject!==undefined
                ?
                <>
                    {(Object.keys(selectedSubject)).map((key, y)=>
                    <div>
                        {key}:
                        <input onChange={e=>(typeof (selectedSubject as any)[key] ==='number'? (selectedSubject as any)[key]=Number(e.target.value):typeof (selectedSubject as any)[key] ==='boolean'?(selectedSubject as any)[key]=Boolean(e.target.value):(selectedSubject as any)[key]=String(e.target.value))} defaultValue={(selectedSubject as any)[key]}/>
                    </div>
                    )}
                    <button>Сохранить</button>
                    {(selectedSubject as any).id!==0
                    ?
                    <button>Удалить</button>
                    :
                    <>
                    </>}
                </>
                :
                <>
                </>
                }  
            </ModalAdmin>
            <div style={{display:'flex', flexDirection:'column', border:'2px solid #490514', margin:'5px', padding:'10px', backgroundColor:'#F7F3F3', borderRadius: '5px'}}>
                <div style={{fontSize:'18px'}}>Редактор расписания</div>
                <div style={{display:'flex', flexDirection:'row', margin:'10px 0px 5px 0px'}}>
                    Department
                    <Select options={departmentOptions} onChange={(value)=>(departmentOptionsOnOnChange(value))} isClearable={true} noOptionsMessage={() => noOptionsText} />
                </div>
                <div style={{display:'flex', flexDirection:'row', margin:'5px 0px 5px 0px'}}>
                    Course
                    <Select options={courseOptions} onChange={(value)=>(courseOptionsOnOnChange(value))} isClearable={true} noOptionsMessage={() => noOptionsText} />
                </div> 
                <div style={{display:'flex', flexDirection:'row', margin:'5px 0px 10px 0px'}}>
                    Group
                    <Select options={groupOptions} onChange={(value)=>(groupOptionsOnOnChange(value))} isClearable={true} noOptionsMessage={() => noOptionsText} />
                </div>               
                
                <button onClick={async ()=>initialFunc()}>TEST</button>
            </div>
                <div style={{width:'80%', border:'2px solid #490514',margin:'5px', overflowX:'auto', overflowY:'auto',whiteSpace:'nowrap', 
            backgroundColor:'#F7F3F3', borderRadius: '5px', scrollbarColor:COLORS.red3}}>
                
            {currentGroupId!==undefined?
               <table>
               <tr className={classes.TRow}>
                    <td className={classes.TCol} style={{width:'75px'}}>
                    </td>
                    {dayPositions?.map((obj,i)=><td className={classes.TCol}>{obj.name}</td>)}
                </tr>
                {subjectPositions?.map((subjectPosition)=><tr>{subjectPosition.startLabel}-{subjectPosition.endLabel}{dayPositions?.map((dayPosition)=><td className={classes.TCol}>{weekTypes?.map((weekType)=>{const subject:subject|undefined=findSubject(subjectPosition,dayPosition,weekType); if (subject!==undefined) return(<tr onContextMenu={(e)=>subjectClick(e,subjectPosition,dayPosition,weekType)}>{findDiscipline(subject.disciplineId)?.name} {findSubjectType(subject.subjectTypeId)?.name} {subject.classroom}</tr>); else return(<tr onContextMenu={(e)=>subjectClick(e,subjectPosition,dayPosition,weekType)}>-1</tr>)})}</td>)}</tr>)}
               </table>
            :<></>}
            
            </div>
                
        </main>

    )
}

export default AdminForm