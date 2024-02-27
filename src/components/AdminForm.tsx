import { FC, useEffect, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import { COLORS } from '../styles/colors'
import classes from '../styles/admin.module.css'
import { course, department, group, weekType, subjectPosition, dayPosition, subjectType, discipline, user, subject } from '../types/AdminType';
import { RequestValue, request } from '../request'
import axios from 'axios'
import ModalAdmin from './UI/modalAdmin/ModalAdmin';
import useModal from './UI/modalAdmin/useModalAdmin'
import { useAppDispatch } from '../hook'
import store from '../store'
import LoginButton, { ButtonVariant } from './UI/button/LoginButton';
import AdminButton from './UI/button/AdminButton';
import AdminInput from './UI/imput/AdminInput';

type options = {
    value: number
    label: string
}

const AdminForm: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        initialFunc()
    }, []);

    const Authorization: string = "Authorization: Bearer " + store.getState().admin.Token

    const noOptionsText = "Пусто"

    const getAcademicYear = () => {
        const currdate = new Date()
        var year = currdate.getFullYear();
        if (currdate.getMonth() < 7) {
            year -= 1
        }
        return year
    }

    const currentAcademicYear = getAcademicYear()

    const { isOpen, toggle } = useModal()

    const [departmentOptions, setDepartmentOptions] = useState<options[]>([])

    const [courseOptions, setCoursesOptions] = useState<options[]>([])

    const [groupOptions, setGroupOptions] = useState<options[]>([])

    const [usersOptions, setUsersOptions] = useState<options[]>([])

    const [subjectTypesOptions, setSubjectTypesOptions] = useState<options[]>([])

    const [disciplinesOptions, setDisciplinesOptions] = useState<options[]>([])

    const GetArrayToOptions = async (RequestValueId: number, data: undefined | any = undefined, params: undefined | any = undefined, headers: undefined | any = undefined) => {
        const tmparray: options[] = [];
        (await request(RequestValue.value[RequestValueId].id, "get", data, params, headers) as any[]).map((obj, i) => (!Object.keys(obj).includes("grade")) ? (tmparray.push({ value: obj.id, label: obj.name })) : (tmparray.push({ value: obj.id, label: String(obj.grade) })))
        return tmparray
    }

    const ArrayToOptions = (array: any[]) => {
        const tmparray: options[] = [];
        array.map((obj, i) => (((!Object.keys(obj).includes("surname")) ? (tmparray.push({ value: obj.id, label: obj.name })) : (tmparray.push({ value: obj.id, label: "" + obj.surname + " " + obj.name + " " + obj.patronymic })))))
        return tmparray
    }

    const initialFunc = async () => {
        setDisciplines(await request(RequestValue.value[1].id, "get"))
        setSubjectPositions((await request(RequestValue.value[2].id, "get")).sort((a: subjectPosition, b: subjectPosition) => a.index - b.index))
        setDayPositions((await request(RequestValue.value[3].id, "get")).sort((a: dayPosition, b: dayPosition) => a.index - b.index))
        setWeekTypes((await request(RequestValue.value[4].id, "get")).sort((a: weekType, b: weekType) => a.index - b.index))
        setSubjectTypes(await request(RequestValue.value[5].id, "get"))
        setUsers(await request(RequestValue.value[6].id, "get"))
        setDepartmentOptions(await GetArrayToOptions(10))
        setCoursesOptions(await GetArrayToOptions(9))
        setGroupOptions(await GetArrayToOptions(8))
    }

    const departmentOptionsOnChange = async (value: SingleValue<options>) => {
        if (value !== null) {
            setCoursesOptions(await GetArrayToOptions(9, value.value))
        }
    }

    const courseOptionsOnChange = async (value: SingleValue<options>) => {
        if (value !== null) {
            setGroupOptions(await GetArrayToOptions(8, value.value))
        }
    }

    const groupOptionsOnChange = async (value: SingleValue<options>) => {
        if (value !== null) {
            setCurrentGroupId(value.value)
            var tmparrarr: subject[][] = []
            await Promise.all(weekTypes?.map(async (obj, i) => {
                const param = { groupId: value.value, weekTypeId: obj.id, year: currentAcademicYear }
                tmparrarr.push(await request(RequestValue.value[11].id, "get", undefined, param, undefined, "/group?"))
            }))
            var tmparr: subject[] = []
            tmparrarr.map((obj, i) => {
                tmparr = tmparr.concat(obj)
            })
            setSubjects(tmparr)
        }
        else {
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

    useEffect(() => {
        (async () => {
            setUsersOptions(ArrayToOptions(users))
        })()
    }, [users]);

    useEffect(() => {
        (async () => {
            setDisciplinesOptions(ArrayToOptions(disciplines))
        })()
    }, [disciplines]);

    useEffect(() => {
        (async () => {
            setSubjectTypesOptions(ArrayToOptions(subjectTypes))
        })()
    }, [subjectTypes]);

    const findSubject = (subjectPosition: subjectPosition, dayPosition: dayPosition, weekType: weekType) => {
        try {
            return subjects.find((obj) => obj.subjectPositionId === subjectPosition.id && obj.dayPositionId === dayPosition.id && obj.weekTypeId === weekType.id)
        } catch (error) {

        }
    }

    const findUser = (userId: number) => {
        try {
            return users.find((obj) => obj.id === userId)
        } catch (error) {

        }
    }

    const findDiscipline = (disciplineId: number) => {
        try {
            return disciplines.find((obj) => obj.id === disciplineId)
        } catch (error) {

        }
    }

    const findSubjectType = (subjectTypeId: number | undefined) => {
        try {
            return subjectTypes.find((obj) => obj.id === subjectTypeId)
        } catch (error) {

        }
    }

    const subjectClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, subjectPosition: subjectPosition, dayPosition: dayPosition, weekType: weekType) => {
        e.preventDefault()
        const tmp = findSubject(subjectPosition, dayPosition, weekType)
        if (tmp !== undefined) {
            setSelectedSubject(tmp)
        }
        else {
            setSelectedSubject({ id: 0, academicYear: currentAcademicYear, disciplineId: 0, classroom: "", subjectTypeId: 0, userId: 0, subjectPositionId: subjectPosition.id!, dayPositionId: dayPosition.id!, weekTypeId: weekType.id!, groupId: currentGroupId!, description: "" })
        }
        toggle()
    }

    const onSaveClick = async (subject: subject) => {
        toggle()
        await (request(RequestValue.value[11].id, "post", subject, undefined, Authorization))
        var tmparrarr: subject[][] = []
        await Promise.all(weekTypes?.map(async (obj, i) => {
            const param = { groupId: currentGroupId, weekTypeId: obj.id, year: currentAcademicYear }
            tmparrarr.push(await request(RequestValue.value[11].id, "get", undefined, param, undefined, "/group?"))
        }))
        var tmparr: subject[] = []
        tmparrarr.map((obj, i) => {
            tmparr = tmparr.concat(obj)
        })
        setSubjects(tmparr)
    }

    const onDeleteClick = async (subject: subject) => {
        toggle()
        await (request(RequestValue.value[11].id, "delete", subject, undefined, Authorization))
        var tmparrarr: subject[][] = []
        await Promise.all(weekTypes?.map(async (obj, i) => {
            const param = { groupId: currentGroupId, weekTypeId: obj.id, year: currentAcademicYear }
            tmparrarr.push(await request(RequestValue.value[11].id, "get", undefined, param, undefined, "/group?"))
        }))
        var tmparr: subject[] = []
        tmparrarr.map((obj, i) => {
            tmparr = tmparr.concat(obj)
        })
        setSubjects(tmparr)
    }

    return (
        <main style={{ display: 'flex', backgroundColor: 'white', maxHeight: '90svh', color: '#1B0E17', boxSizing: 'border-box' }}>
            <ModalAdmin isOpen={isOpen} toggle={toggle}>
                {selectedSubject !== undefined
                    ?
                    <>
                        <div>
                            <p>DisciplineId:</p>
                            <div>
                                <Select className={classes.Select}  options={disciplinesOptions} onChange={value => setSelectedSubject({ ...selectedSubject!, disciplineId: findDiscipline(value?.value!)?.id! })} defaultValue={disciplinesOptions.find((obj) => { return obj.value === selectedSubject.disciplineId })} isClearable={true}></Select>
                            </div>
                        </div>
                        <div>
                            <p>SubjectTypeId:</p>
                            <div >
                                <Select className={classes.Select}  options={subjectTypesOptions} onChange={value => setSelectedSubject({ ...selectedSubject!, subjectTypeId: findSubjectType(value?.value!)?.id! })} defaultValue={subjectTypesOptions.find((obj) => { return obj.value === selectedSubject.subjectTypeId })} isClearable={true}></Select>
                            </div>
                        </div>
                        <div>
                            <p>UserId:</p>
                            <div >
                                <Select className={classes.Select} options={usersOptions} onChange={value => setSelectedSubject({ ...selectedSubject!, userId: findUser(value?.value!)?.id! })} defaultValue={usersOptions.find((obj) => { return obj.value === selectedSubject.userId })} isClearable={true}></Select>
                            </div>
                        </div>
                        <div>
                            <p>Classroom:</p>
                            <div >
                                <AdminInput onChange={e => setSelectedSubject({ ...selectedSubject!, classroom: e.target.value })} defaultValue={selectedSubject?.classroom}></AdminInput>
                            </div>
                        </div>
                        <div style={{display:'flex', alignContent:'center', justifyContent:'center'}}>
                            <AdminButton onClick={() => onSaveClick(selectedSubject)} text='Сохранить'></AdminButton>
                        </div>
                        
                        {(selectedSubject as any).id !== 0
                            ?
                            <button onClick={() => onDeleteClick(selectedSubject)}>Удалить</button>
                            :
                            <>
                            </>}
                    </>
                    :
                    <>
                    </>
                }
            </ModalAdmin>
            <div style={{ width: '270px', display: 'flex', flexDirection: 'column', border: '2px solid #490514', margin: '5px', padding: '10px', backgroundColor: '#F7F3F3', borderRadius: '5px' }}>
                <div style={{ alignSelf: 'start', fontSize: '22px', fontWeight: '600', margin: '5px' }}>Редактор расписания</div>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0px 5px 0px', borderLeft: '2px solid #8C2425', borderRadius: '5px', padding: '2px 5px', backgroundColor: '#F0EAE9', width: '100%' }}>
                    <div style={{ width: '120px', alignSelf: 'start', fontSize: '20px', fontWeight: '600', margin: '5px' }}>Факультет</div>
                    <Select options={departmentOptions} onChange={(value) => (departmentOptionsOnChange(value))} isClearable={true} noOptionsMessage={() => noOptionsText} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '5px 0px 5px 0px', borderLeft: '2px solid #8C2425', borderRadius: '5px', padding: '2px 5px', backgroundColor: '#F0EAE9', width: '100%' }}>
                    <div style={{ width: '120px', alignSelf: 'start', fontSize: '20px', fontWeight: '600', margin: '5px' }}>Курс</div>
                    <Select options={courseOptions} onChange={(value) => (courseOptionsOnChange(value))} isClearable={true} noOptionsMessage={() => noOptionsText} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '5px 0px 10px 0px', borderLeft: '2px solid #8C2425', borderRadius: '5px', padding: '2px 5px', backgroundColor: '#F0EAE9', width: '100%' }}>
                    <div style={{ width: '120px', alignSelf: 'start', fontSize: '20px', fontWeight: '600', margin: '5px' }}>Группа</div>
                    <Select options={groupOptions} onChange={(value) => (groupOptionsOnChange(value))} isClearable={true} noOptionsMessage={() => noOptionsText} />
                </div>
            </div>
            <div style={{
                width: '80%', border: '2px solid #490514', margin: '5px', overflowX: 'auto', overflowY: 'auto', whiteSpace: 'nowrap',
                backgroundColor: '#F7F3F3', borderRadius: '5px', scrollbarColor: COLORS.red3
            }}>

                {currentGroupId !== undefined ?
                    <table className={classes.AdminTable}>
                        <tr >
                            <td className={classes.TableColumn} style={{ width: '75px', height: '42px' }}>
                            </td>
                            {dayPositions?.map((obj, i) => <td className={classes.TableColumn}><div style={{fontSize:'24px', margin:'16px 0px 10px 0px', textAlign:'center'}}>{obj.name}
                                </div></td>)}
                        </tr>
                        {subjectPositions?.map((subjectPosition) =>
                            <tr>
                                <td className={classes.TableColumn}><div style={{margin:'0px 10px 0px 10px', fontSize:'18px'}}>{subjectPosition.startLabel}-{subjectPosition.endLabel}</div> </td>
                                {dayPositions?.map((dayPosition) =>
                                    <td className={classes.TableColumn}>
                                        {weekTypes?.map((weekType, index) => {
                                            const subject: subject | undefined = findSubject(subjectPosition, dayPosition, weekType);
                                            if (subject !== undefined)
                                                return (<div className={classes.SubjectBox} onContextMenu={(e) => subjectClick(e, subjectPosition, dayPosition, weekType)}>
                                                    <tr>{findDiscipline(subject.disciplineId)?.name}<br /> {findSubjectType(subject.subjectTypeId)?.name} {subject.classroom} </tr>
                                                </div>);

                                            else return (<div>
                                                <div className={classes.SubjectBox} onContextMenu={(e) => subjectClick(e, subjectPosition, dayPosition, weekType)} style={{}}>
                                                    <tr> текст</tr>
                                                </div>
                                                {index%2==0 ?
                                                <hr style={{color:'#B5999F', backgroundColor:'#B5999F', border:'2px solid #B5999F'}}></hr>
                                                :<></>}
                                                
                                            </div>)
                                        })}
                                    </td>)}
                            </tr>)}
                    </table>
                    : <></>}

            </div>

        </main>

    )
}

export default AdminForm