import { FC, useEffect, useRef, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import { COLORS } from '../styles/colors'
import classes from '../styles/admin.module.css'
import { weekType, subjectPosition, dayPosition, subject } from '../types/AdminType';
import { RequestValue, request } from '../base/Request'
import Modal from './UI/modal/Modal';
import useModal from './UI/modal/useModal'
import { useAppDispatch } from '../hook'
import { RootState } from '../store'
import AdminButton from './UI/button/AdminButton';
import AdminInput from './UI/input/AdminInput';
import { ConnectedProps, connect } from 'react-redux';
import { ObjectKey, updateDataArray } from '../store/dataArraySlice';
import { ArrayToOptions } from '../base/ArrayToOptionsConverter';
import { option } from '../types/OptionType';

const mapState = (state: RootState) => (
    {
        Token: state.admin.Token,
        dataArray: state.dataArray
    }
)

type PropsFromRedux = ConnectedProps<typeof connector>

const connector = connect(mapState)

const AdminForm: FC<PropsFromRedux> = (props: PropsFromRedux) => {
    const dispatch = useAppDispatch()

    const Authorization: string = "Authorization: Bearer " + props.Token

    const noOptionsText = "Пусто"

    //const hasPageBeenRendered = useRef({ effect1: false, effect2: false })

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

    const [departmentOptions, setDepartmentOptions] = useState<option[]>([])

    const [courseOptions, setCourseOptions] = useState<option[]>([])

    const [groupOptions, setGroupOptions] = useState<option[]>([])

    const [accountsOptions, setAccountsOptions] = useState<option[]>([])

    const [subjectTypesOptions, setSubjectTypesOptions] = useState<option[]>([])

    const [disciplinesOptions, setDisciplinesOptions] = useState<option[]>([])

    const [currentGroupId, setCurrentGroupId] = useState<number>()

    const [currentCourseId, setCurrentCourseId] = useState<number>()

    const [currentDepartmentId, setCurrentDepartmentId] = useState<number>()

    const [subjects, setSubjects] = useState<subject[]>([])

    const [selectedSubject, setSelectedSubject] = useState<subject>()

    const initialFunc = async () => {
        RequestValue.value.slice(1).map(async (value) => {
            const requestValue = await request(value.id, "get")
            dispatch(updateDataArray({ dataArray: requestValue, objectKey: value.name + "Array" as ObjectKey }))
        })
    }

    useEffect(() => {
        (async () => {
            initialFunc()
        })()
    }, [])

    useEffect(() => {
        setDepartmentOptions(ArrayToOptions(props.dataArray.departmentArray))
    }, [props.dataArray.departmentArray])

    useEffect(() => {
        setCourseOptions(ArrayToOptions(props.dataArray.courseArray))
    }, [props.dataArray.courseArray])

    useEffect(() => {
        setGroupOptions(ArrayToOptions(props.dataArray.groupArray))
    }, [props.dataArray.groupArray])

    useEffect(() => {
        setAccountsOptions(ArrayToOptions(props.dataArray.accountArray))
    }, [props.dataArray.accountArray])

    useEffect(() => {
        setSubjectTypesOptions(ArrayToOptions(props.dataArray.subjectTypeArray))
    }, [props.dataArray.subjectTypeArray])

    useEffect(() => {
        setDisciplinesOptions(ArrayToOptions(props.dataArray.disciplineArray))
    }, [props.dataArray.disciplineArray])

    useEffect(() => {
        setGroupOptions(ArrayToOptions(props.dataArray.groupArray?.filter((group) => 
        (currentCourseId === undefined ? true : group.courseId === currentCourseId)
        &&
        (currentDepartmentId === undefined ? true : group.departmentId === currentDepartmentId))))
    }, [currentDepartmentId, currentCourseId])

    const groupOptionsOnChange = async (value: SingleValue<option>) => {
        if (value !== null && props.dataArray.weekTypeArray != null) {
            setCurrentGroupId(value.value)
            var tmparrarr: subject[][] = []
            await Promise.all(props.dataArray.weekTypeArray?.map(async (obj) => {
                const param = { groupId: value.value, weekTypeId: obj.id, year: currentAcademicYear }
                tmparrarr.push(await request(RequestValue.value.find((value) => value.name == "schedule")?.id!, "get", undefined, param, undefined, "/group?"))
            }))
            var tmparr: subject[] = []
            tmparrarr.map((obj) => {
                tmparr = tmparr.concat(obj)
            })
            setSubjects(tmparr)
        }
        else {
            setCurrentGroupId(undefined)
        }
    }

    const findSubject = (subjectPosition: subjectPosition, dayPosition: dayPosition, weekType: weekType) => {
        try {
            return subjects.find((obj) => obj.subjectPositionId === subjectPosition.id && obj.dayPositionId === dayPosition.id && obj.weekTypeId === weekType.id)
        } catch (error) {

        }
    }

    const findAccount = (accountId: number) => {
        try {
            return props.dataArray.accountArray?.find((obj) => obj.id === accountId)
        } catch (error) {

        }
    }

    const findDiscipline = (disciplineId: number) => {
        try {
            return props.dataArray.disciplineArray?.find((obj) => obj.id === disciplineId)
        } catch (error) {

        }
    }

    const findSubjectType = (subjectTypeId: number | undefined) => {
        try {
            return props.dataArray.subjectTypeArray?.find((obj) => obj.id === subjectTypeId)
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
            setSelectedSubject({ id: 0, academicYear: currentAcademicYear, disciplineId: 0, classroom: "", subjectTypeId: undefined, accountId: undefined, subjectPositionId: subjectPosition.id!, dayPositionId: dayPosition.id!, weekTypeId: weekType.id!, groupId: currentGroupId!, description: "" })
        }
        toggle()
    }

    const onSaveClick = async (subject: subject) => {
        toggle()
        await (request(RequestValue.value.find((value) => value.name == "schedule")?.id!, "post", subject, undefined, Authorization))
        var tmparrarr: subject[][] = []
        await Promise.all(props.dataArray.weekTypeArray!?.map(async (obj) => {
            const param = { groupId: currentGroupId, weekTypeId: obj.id, year: currentAcademicYear }
            tmparrarr.push(await request(RequestValue.value.find((value) => value.name == "schedule")?.id!, "get", undefined, param, undefined, "/group?"))
        }))
        var tmparr: subject[] = []
        tmparrarr.map((obj) => {
            tmparr = tmparr.concat(obj)
        })
        setSubjects(tmparr)
    }

    const onDeleteClick = async (subject: subject) => {
        toggle()
        await (request(RequestValue.value.find((value) => value.name == "schedule")?.id!, "delete", subject, undefined, Authorization))
        var tmparrarr: subject[][] = []
        await Promise.all(props.dataArray.weekTypeArray!?.map(async (obj) => {
            const param = { groupId: currentGroupId, weekTypeId: obj.id, year: currentAcademicYear }
            tmparrarr.push(await request(RequestValue.value.find((value) => value.name == "schedule")?.id!, "get", undefined, param, undefined, "/group?"))
        }))
        var tmparr: subject[] = []
        tmparrarr.map((obj) => {
            tmparr = tmparr.concat(obj)
        })
        setSubjects(tmparr)
    }

    return (
        <main style={{ display: 'flex', backgroundColor: 'white', maxHeight: '90svh', color: '#1B0E17', boxSizing: 'border-box' }}>
            <Modal isOpen={isOpen} toggle={toggle}>
                {selectedSubject !== undefined
                    ?
                    <>
                        <div>
                            <p>DisciplineId:</p>
                            <div>
                                <Select className={classes.Select} options={disciplinesOptions} onChange={value => setSelectedSubject({ ...selectedSubject!, disciplineId: findDiscipline(value?.value!)?.id! })} defaultValue={disciplinesOptions.find((obj) => { return obj.value === selectedSubject.disciplineId })} isClearable={true}></Select>
                            </div>
                        </div>
                        <div>
                            <p>SubjectTypeId:</p>
                            <div>
                                <Select className={classes.Select} options={subjectTypesOptions} onChange={value => setSelectedSubject({ ...selectedSubject!, subjectTypeId: findSubjectType(value?.value!)?.id! })} defaultValue={subjectTypesOptions.find((obj) => { return obj.value === selectedSubject.subjectTypeId })} isClearable={true}></Select>
                            </div>
                        </div>
                        <div>
                            <p>AccountId:</p>
                            <div>
                                <Select className={classes.Select} options={accountsOptions} onChange={value => setSelectedSubject({ ...selectedSubject!, accountId: findAccount(value?.value!)?.id! })} defaultValue={accountsOptions.find((obj) => { return obj.value === selectedSubject.accountId })} isClearable={true}></Select>
                            </div>
                        </div>
                        <div>
                            <p>Classroom:</p>
                            <div>
                                <AdminInput onChange={e => setSelectedSubject({ ...selectedSubject!, classroom: e.target.value })} defaultValue={selectedSubject?.classroom}></AdminInput>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
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
            </Modal>
            <div style={{ width: '270px', display: 'flex', flexDirection: 'column', border: '2px solid #490514', margin: '5px', padding: '10px', backgroundColor: '#F7F3F3', borderRadius: '5px' }}>
                <div style={{ alignSelf: 'start', fontSize: '22px', fontWeight: '600', margin: '5px' }}>Редактор расписания</div>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0px 5px 0px', borderLeft: '2px solid #8C2425', borderRadius: '5px', padding: '2px 5px', backgroundColor: '#F0EAE9', width: '100%' }}>
                    <div style={{ width: '120px', alignSelf: 'start', fontSize: '20px', fontWeight: '600', margin: '5px' }}>Факультет</div>
                    <Select options={departmentOptions} onChange={(value) => (setCurrentDepartmentId(value?.value))} isClearable={true} noOptionsMessage={() => noOptionsText} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '5px 0px 5px 0px', borderLeft: '2px solid #8C2425', borderRadius: '5px', padding: '2px 5px', backgroundColor: '#F0EAE9', width: '100%' }}>
                    <div style={{ width: '120px', alignSelf: 'start', fontSize: '20px', fontWeight: '600', margin: '5px' }}>Курс</div>
                    <Select options={courseOptions} onChange={(value) => (setCurrentCourseId(value?.value))} isClearable={true} noOptionsMessage={() => noOptionsText} />
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
                        <tr>
                            <td className={classes.TableColumn} style={{ width: '75px', height: '42px' }}>
                            </td>
                            {props.dataArray.dayPositionArray?.map((obj) => <td className={classes.TableColumn}><div style={{ fontSize: '24px', margin: '16px 0px 10px 0px', textAlign: 'center' }}>{obj.name}
                            </div></td>)}
                        </tr>
                        {props.dataArray.subjectPositionArray?.map((subjectPosition) =>
                            <tr>
                                <td className={classes.TableColumn}><div style={{ margin: '0px 10px 0px 10px', fontSize: '18px' }}>{subjectPosition.startLabel}-{subjectPosition.endLabel}</div> </td>
                                {props.dataArray.dayPositionArray?.map((dayPosition) =>
                                    <td className={classes.TableColumn}>
                                        {props.dataArray.weekTypeArray?.map((weekType, index) => {
                                            const subject: subject | undefined = findSubject(subjectPosition, dayPosition, weekType);
                                            if (subject !== undefined)
                                                return (<div className={classes.SubjectBox} onContextMenu={(e) => subjectClick(e, subjectPosition, dayPosition, weekType)}>
                                                    <tr>{findDiscipline(subject.disciplineId)?.name}<br /> {findSubjectType(subject.subjectTypeId)?.name} {subject.classroom} </tr>
                                                </div>);

                                            else return (<div>
                                                <div className={classes.SubjectBox} onContextMenu={(e) => subjectClick(e, subjectPosition, dayPosition, weekType)} style={{}}>
                                                    <tr></tr>
                                                </div>
                                                {index % 2 == 0 ?
                                                    <hr style={{ color: '#B5999F', backgroundColor: '#B5999F', border: '2px solid #B5999F' }}></hr>
                                                    : <></>}

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

export default connector(AdminForm)