import { FC, useEffect, useState } from 'react'
import { COLORS } from '../styles/colors'
import { account, subjectType, task, markType, role } from '../types/AdminType';
import { option } from '../types/OptionType';
import { useAppDispatch } from '../hook';
import { RootState } from '../store';
import { ConnectedProps, connect } from 'react-redux';
import { RequestValue, request } from '../base/Request';
import { ObjectKey, updateDataArray } from '../store/dataArraySlice';
import { ArrayToOptions } from '../base/ArrayToOptionsConverter';
import Modal from './UI/modal/Modal';
import useModal from './UI/modal/useModal';
import axios, { AxiosHeaders } from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from '../styles/admin.module.css'
import buttonclasses from './UI/button/AdminButton.module.css';
import { SingleValue } from 'react-select';
import StudendaSelect from './UI/select/StudendaSelect';
import AdminInput from './UI/input/AdminInput';
import AdminButton from './UI/button/AdminButton';
import AdminLabel from './UI/adminlabel/AdminLabel';
import MarkSelect from './UI/select/MarkSelect';

const mapState = (state: RootState) => (
    {
        Token: state.account.Token,
        dataArray: state.dataArray,
        journal: state.journal
    }
)

type PropsFromRedux = ConnectedProps<typeof connector>

const connector = connect(mapState)

const TeacherJournalForm: FC<PropsFromRedux> = (props: PropsFromRedux) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const Authorization: string = "Authorization: Bearer " + props.Token
    const noOptionsText = "Пусто"
    const { isOpen, toggle } = useModal()

    const [groupOptions, setGroupOptions] = useState<option[]>([])

    const [currentGroupId, setCurrentGroupId] = useState<number>()

    const [currentGroupAccounts, setCurrentGroupAccounts] = useState<account[]>()

    const [subjectTypes, setSubjectTypes] = useState<subjectType[]>([])

    const [accounts, setAccounts] = useState<account[]>()

    const [defaultGroupOptions, setDefaultGroupOptions] = useState<option>()

    const [currentTaskInfo, setCurrentTaskInfo] = useState<any>({ id: 0, name: "", description: "", endedAt: undefined })

    const [tasks, setTasks] = useState<task[][]>()

    const [markTypeOptions, setMarkTypeOptions] = useState<option[]>([])

    const [markTypes, setMarkTypes] = useState<markType[]>()

    const [currentMarkTypeName, setCurrentMarkTypeName] = useState<string>()

    const [onInitial, setOnInitial] = useState<boolean>(false)

    const [roles, setRoles] = useState<role[]>()

    const initialFunc = async () => {
        setSubjectTypes(await request(RequestValue.value[5].id, "get"))
        setAccounts((await request(RequestValue.value[6].id, "get") as account[]).sort((a, b) => {
            const nameA = a.surname!.toUpperCase();
            const nameB = b.surname!.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        }))
        setMarkTypes(await request(RequestValue.value[11].id, "get"))
        setRoles(await request(RequestValue.value[8].id, "get"))
    }

    useEffect(() => {
        (async () => {
            initialFunc()
        })()
    }, [])

    useEffect(() => {
        setGroupOptions(ArrayToOptions(props.journal.groups))
        setDefaultGroupOptions(ArrayToOptions(props.journal.groups)[0])
    }, [props.journal.groups])

    useEffect(() => {
        if (markTypes != undefined) {
            setMarkTypeOptions(ArrayToOptions(markTypes))
        }
    }, [markTypes])

    useEffect(() => {
        if (groupOptions != undefined && groupOptions[0] != undefined && groupOptions[0].value != undefined) {
            setDefaultGroupOptions(groupOptions[0])
            setCurrentGroupId(groupOptions[0].value)
        }
    }, [groupOptions])

    useEffect(() => {
        if (currentGroupId != undefined && accounts != undefined && roles != undefined) {
            setCurrentGroupAccounts(accounts?.filter((account) => account.groupId == currentGroupId))
        }
    }, [currentGroupId, accounts, roles])

    useEffect(() => {
        if (currentGroupAccounts != undefined) {
            SetTasks()
        }
    }, [currentGroupAccounts])

    //Если что то ломается то удалять этот юзэффект
    useEffect(() => {
        if (tasks != undefined) {
            сheckAccountChanges()
        }
    }, [tasks])

    const SetTasks = async () => {
        setTasks(TasksSort(await request(RequestValue.value[13].id, "get", undefined, { issuerAccountId: props.journal.subject?.accountId, groupIds: currentGroupId }, undefined, "/issuer?")))
    }

    const groupOptionsOnChange = async (value: SingleValue<option>) => {
        if (value !== null) {
            setDefaultGroupOptions(value)
            setCurrentGroupId(value?.value)
            setTasks(undefined)
        }
    }

    const TasksSort = (tasks: task[]): task[][] => {
        var tmpTasks: task[][] = []
        var dates: string[] = []
        var names: string[] = []
        tasks.map((task) => {
            if (!dates.includes(task.startedAt)) {
                dates.push(task.startedAt)
            }
            if (!names.includes(task.name)) {
                names.push(task.name)
            }
        })
        names.map((name) => {
            tmpTasks.push(tasks.filter((obj) => obj.name == name))
        })

        tmpTasks.map((task) => {
            task.sort((a, b) => {
                const nameA = accounts?.find((account) => account.id == a.assigneeAccountId)?.surname!
                const nameB = accounts?.find((account) => account.id == b.assigneeAccountId)?.surname!
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            }
            )
        })
        console.log(tmpTasks)
        return tmpTasks
    }

    const сheckAccountChanges = async () => {
        tasks!.map((task) => {
            currentGroupAccounts!.map(async (account) => {
                var taskFound = false
                task.map((accountTask) => {
                    if (account.id == accountTask.assigneeAccountId) {
                        taskFound = true
                        return
                    }
                })
                if (!taskFound) {
                    await axios({
                        method: "post",
                        url: "http://88.210.3.137/api/journal/task",
                        data: [{ id: 0, markTypeId: task[0].markTypeId, disciplineId: task[0].disciplineId, subjectTypeId: task[0].subjectTypeId, issuerAccountId: task[0].issuerAccountId, assigneeAccountId: account.id, name: task[0].name, description: task[0].description, startedAt: task[0].startedAt, endedAt: task[0].endedAt }],
                        headers: new AxiosHeaders(Authorization)
                    })
                }
            })

        })
        await request(RequestValue.value[13].id, "get", undefined, { issuerAccountId: props.journal.subject?.accountId, groupIds: currentGroupId }, undefined, "/issuer?").then(() => {
            tasks!.map((task) => {
                task.map(async (accountTask) => {
                    var taskFound = false
                    currentGroupAccounts!.map(async (account) => {
                        if (accountTask.assigneeAccountId == account.id) {
                            taskFound = true
                            return
                        }
                    })
                    if (!taskFound) {
                        console.log(accountTask.id)
                        await axios({
                            method: "delete",
                            url: "http://88.210.3.137/api/journal/task",
                            data: [accountTask.id!],
                            headers: new AxiosHeaders(Authorization)
                        })
                    }
                })
            })
        })
    }

    const addTaskClick = () => {
        toggle()
    }

    const getAcademicYear = () => {
        const currdate = new Date()
        if (currdate.getMonth() < 7) {
            currdate.setFullYear(currdate.getFullYear() - 1)
        }
        return currdate
    }

    const saveTaskClick = async () => {
        const currdate = getAcademicYear()
        await currentGroupAccounts?.map(async (account) => {
            await axios({
                method: "post",
                url: "http://88.210.3.137/api/journal/task",
                data: [{ id: 0, markTypeId: markTypes?.find((markType) => markType.name == currentMarkTypeName)?.id, disciplineId: props.journal.subject?.disciplineId, subjectTypeId: props.journal.subject?.subjectTypeId, issuerAccountId: props.journal.subject?.accountId, assigneeAccountId: account.id, name: currentTaskInfo.name, description: currentTaskInfo.description, startedAt: currdate.toISOString(), endedAt: currdate.toISOString() }],
                headers: new AxiosHeaders(Authorization)
            }).then(() => SetTasks())
        })
        toggle()
    }

    const createMarkOptions = (markTypeId: number): option[] => {
        const tmparray: option[] = [];
        var tmpMarkType = markTypes?.find((markType) => markType.id == markTypeId)
        if (tmpMarkType != undefined) {
            if (tmpMarkType.maxValue == 1 && tmpMarkType.minValue == 0) {
                tmparray.push({ value: 0, label: "незач" })
                tmparray.push({ value: 1, label: "зач" })
            }
            else {
                for (var i = tmpMarkType.minValue; i <= tmpMarkType.maxValue; i++) {
                    tmparray.push({ value: i, label: i.toString() })
                }
            }
        }
        return tmparray
    }

    const updateTaskMark = async (mark: number | undefined, task: task) => {
        if (mark != undefined) {
            await axios({
                method: "post",
                url: "http://88.210.3.137/api/journal/task",
                data: [{ id: task.id, markTypeId: task.markTypeId, disciplineId: task.disciplineId, subjectTypeId: task.subjectTypeId, issuerAccountId: task.issuerAccountId, assigneeAccountId: task.assigneeAccountId, name: task.name, description: task.description, startedAt: task.startedAt, endedAt: task.endedAt, mark: mark }],
                headers: new AxiosHeaders(Authorization)
            }).then(() => SetTasks())
        }
    }

    const deleteTasks = async (tasks: task[]) => {
        const tmpTaskIds: number[] = []
        tasks.map((task) => {
            tmpTaskIds.push(task.id!)
        })
        await axios({
            method: "delete",
            url: "http://88.210.3.137/api/journal/task",
            data: tmpTaskIds,
            headers: new AxiosHeaders(Authorization)
        }).then(() => SetTasks())
    }

    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle}>
                <AdminInput title="Название" onChange={(e) => setCurrentTaskInfo({ ...currentTaskInfo, name: e.target.value })} defaultValue={currentTaskInfo.name} text='Укажите название' />
                <AdminInput title="Описание" onChange={(e) => setCurrentTaskInfo({ ...currentTaskInfo, description: e.target.value })} defaultValue={currentTaskInfo.description} text='Укажите описание' />
                <StudendaSelect title="Тип оценивания" options={markTypeOptions} placeholder="Укажите тип оценивания"
                    onChange={value => setCurrentMarkTypeName(value?.label)}
                    isClearable={false}>
                </StudendaSelect>
                <AdminButton text="Добавить" onClick={() => saveTaskClick()} />
            </Modal>

            <main style={{ display: 'flex', backgroundColor: 'white', maxHeight: '90svh', color: '#1B0E17', boxSizing: 'border-box' }}>
                <div style={{ width: '270px', display: 'flex', flexDirection: 'column', border: '2px solid #490514', margin: '5px', padding: '10px', backgroundColor: '#F7F3F3', borderRadius: '5px' }}>
                    <AdminButton text="Назад" onClick={() => navigate("/userSchedule")} />
                    <div style={{ alignSelf: 'start', fontSize: '22px', fontWeight: '600', margin: '5px' }}>Журнал</div>
                    <AdminLabel title="Дисциплина" text={props.journal.disciplineName} />

                    <StudendaSelect title="Группа" options={groupOptions} value={defaultGroupOptions} onChange={(value) => (groupOptionsOnChange(value))} isClearable={false} noOptionsMessage={() => noOptionsText} placeholder="Выберите группу" />

                </div>
                <div style={{
                    width: '80%', border: '2px solid #490514', margin: '5px', overflowX: 'auto', overflowY: 'auto', whiteSpace: 'nowrap',
                    backgroundColor: '#F7F3F3', borderRadius: '5px', scrollbarColor: COLORS.red3
                }}>
                    {currentGroupAccounts != undefined && currentGroupAccounts[0] != undefined
                        ?

                        <table className={classes.AdminTable}>
                            <tbody>
                                <tr>
                                    <td style={{
                                        fontWeight: '600',
                                        borderRight: '4px solid #B5999F',
                                        minWidth: '40px',
                                        width: '100%',
                                        height: '42px',
                                        left: 0,
                                        zIndex: 3,
                                        top: 0, textAlign: 'center'
                                    }}>№</td>
                                    <td style={{
                                        fontWeight: '600',
                                        minHeight: '70px',
                                        borderRight: '4px solid #B5999F',
                                        width: '75px',
                                        height: '42px',
                                        left: 1,
                                        zIndex: 3, textAlign: 'center'
                                    }}>ФИО</td>
                                    {tasks?.map((task) =>
                                        <td style={{
                                            fontWeight: '600',
                                            minHeight: '70px',
                                            borderRight: '4px solid #B5999F', fontSize: '20px', margin: '16px 0px 10px 0px', textAlign: 'center', minWidth: '90px'
                                        }}>
                                            {task[0].name}
                                        </td>)}
                                    <td style={{ borderRight: '4px solid #B5999F', borderBottom: '2px solid #B5999F', fontWeight: '600' }}>
                                        <button style={{
                                            border: 'none',
                                            width: '50px',
                                            fontSize: '30px',
                                            fontWeight: '300',
                                            padding: '0px 5px',
                                            justifySelf: 'center',
                                        }} onClick={() => addTaskClick()}>+</button>
                                    </td>
                                </tr>
                                {
                                    currentGroupAccounts?.map((account, i) => {
                                        return (
                                            <tr >

                                                <th style={{
                                                    borderRight: '4px solid #B5999F', borderBottom: '2px solid #B5999F', borderTop: '2px solid #B5999F', fontWeight: '600',
                                                    
                                                    left: 0,
                                                    zIndex: 3, fontSize: '20px', textAlign: 'center',
                                                    minWidth: '40px',
                                                    width: '100%',
                                                }}>
                                                    {i + 1}
                                                </th>
                                                <th style={{
                                                    left: 1, fontSize: '20px', margin: '14px 17px', textAlign: 'center',
                                                    zIndex: 3, borderRight: '4px solid #B5999F', borderBottom: '2px solid #B5999F', borderTop: '2px solid #B5999F', fontWeight: '600'
                                                }}>
                                                    {account.surname} {account.name} {account.patronymic}
                                                </th>
                                                {tasks?.map((task) => {
                                                    var markOptions = createMarkOptions(task[i].markTypeId)
                                                    return (<td className={classes.TableColumn}>
                                                        <div style={{ fontSize: '24px', margin: '5px', textAlign: 'center' }}>
                                                            {task[i].mark == null
                                                                ?
                                                                <MarkSelect options={markOptions} value={undefined} defaultValue={undefined} onChange={(value) => updateTaskMark(value?.value, task[i])} />
                                                                :
                                                                <MarkSelect options={markOptions} value={markOptions.find((option) => option.value == task[i].mark)} defaultValue={markOptions.find((option) => option.value == task[i].mark)} onChange={(value) => updateTaskMark(value?.value, task[i])} />
                                                            }
                                                        </div>
                                                    </td>)
                                                }
                                                )}
                                                <td style={{ borderRight: '4px solid #B5999F', borderBottom: '2px solid #B5999F', borderTop: '2px solid #B5999F', fontWeight: '600' }}>
                                                </td>
                                            </tr>)
                                    }
                                    )
                                }


                            </tbody>
                        </table>
                        : <></>}
                </div>
            </main >
        </>
    )
}

export default connector(TeacherJournalForm)