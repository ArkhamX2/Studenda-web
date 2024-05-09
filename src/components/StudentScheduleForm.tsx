import { FC, useEffect, useState } from 'react'
import classes from '../styles/admin.module.css'
import { group, weekType, subjectPosition, dayPosition, subjectType, discipline, account, subject } from '../types/AdminType';
import { RequestValue, request } from '../base/Request'
import store from '../store'
import { option } from '../types/OptionType';
import { useAppDispatch } from '../hook';
import { updateJournalData } from '../store/journalSlice';
import { useNavigate } from 'react-router-dom';
import { SingleValue } from 'react-select';
import StudendaSelect from './UI/select/StudendaSelect';

const StudentScheduleForm: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        initialFunc()
    }, []);

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

    const [groupOptions, setGroupsOptions] = useState<option[]>([])

    const GetArrayToOptions = async (RequestValueId: number, data: undefined | any = undefined, params: undefined | any = undefined, headers: undefined | any = undefined) => {
        const tmparray: option[] = [];
        (await request(RequestValue.value[RequestValueId].id, "get", data, params, headers) as account[]).map((obj) => (tmparray.push({ value: obj.id!, label: "" + obj?.surname + " " + obj?.name + " " + obj?.patronymic })))
        return tmparray
    }

    const initialFunc = async () => {
        setDisciplines(await request(RequestValue.value[1].id, "get"))
        setSubjectPositions((await request(RequestValue.value[2].id, "get")).sort((a: subjectPosition, b: subjectPosition) => a.index - b.index))
        setDayPositions((await request(RequestValue.value[3].id, "get")).sort((a: dayPosition, b: dayPosition) => a.index - b.index))
        setWeekTypes((await request(RequestValue.value[4].id, "get")).sort((a: weekType, b: weekType) => a.index - b.index))
        setSubjectTypes(await request(RequestValue.value[5].id, "get"))
        setGroupsOptions(await GetArrayToOptions(7))
        setCurrentGroupId((await request(RequestValue.value[6].id, "get", undefined, undefined, undefined, "?ids="+store.getState().account.accountId) as account[])[0].groupId)
    }

    useEffect(() => {
        var groupOption = findgroupOption(currentGroupId)
        if (groupOption != undefined) {
            setDefaultGroupOption(groupOption)
            groupOptionsOnChange(groupOption)
        }
    }, [groupOptions]);

    const groupOptionsOnChange = async (value: SingleValue<option>) => {
        if (value !== null) {
            setDefaultGroupOption(value)
            setCurrentGroupId(value.value)
            var tmparrarr: subject[][] = []
            await Promise.all(weekTypes?.map(async (obj) => {
                const param = { groupId: value.value, weekTypeId: obj.id, year: currentAcademicYear }
                console.log(param)
                tmparrarr.push(await request(RequestValue.value.find((value) => value.name == "schedule")?.id!, "get", undefined, param, undefined, "/group?"))
            }))
            var tmparr: subject[] = []
            tmparrarr.map((obj) => {
                tmparr = tmparr.concat(obj)
            })
            setToggleVisibility(true)
            setSubjects(tmparr)
        }
        else {
            setToggleVisibility(false)
            setDefaultGroupOption(undefined)
            setCurrentGroupId(undefined)
        }
    }

    const [defaultGroupOption, setDefaultGroupOption] = useState<option>()

    const [currentGroupId, setCurrentGroupId] = useState<number>()

    const [weekTypes, setWeekTypes] = useState<weekType[]>([])

    const [dayPositions, setDayPositions] = useState<dayPosition[]>([])

    const [subjectPositions, setSubjectPositions] = useState<subjectPosition[]>([])

    const [subjectTypes, setSubjectTypes] = useState<subjectType[]>([])

    const [disciplines, setDisciplines] = useState<discipline[]>([])

    const [subjects, setSubjects] = useState<subject[]>([])

    const [groups, setGroups] = useState<group[]>([])

    const [toggleVisibility, setToggleVisibility] = useState<boolean>(false)

    const findSubject = (subjectPosition: subjectPosition, dayPosition: dayPosition, weekType: weekType) => {
        try {
            return subjects.filter((obj) => obj.subjectPositionId === subjectPosition.id && obj.dayPositionId === dayPosition.id && obj.weekTypeId === weekType.id)
        } catch (error) {

        }
    }

    const findGroup = (groupId: number) => {
        try {
            return groups.find((obj) => obj.id === groupId)
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

    const findgroupOption = (accountId: number | undefined) => {
        try {
            return groupOptions.find((obj) => obj.value === accountId)
        } catch (error) {

        }
    }

    const onItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, subjects: subject[]) => {
        event.preventDefault()
        dispatch(updateJournalData({ disciplineName: findDiscipline(subjects[0].disciplineId)?.name!, groups: subjects.map((subject) => findGroup(subject.groupId)!), subject: subjects[0] }))
        navigate("/teacherJournal")
    }

    return (
        <main style={{ display: 'flex', backgroundColor: 'white', maxHeight: '90svh', color: '#1B0E17', boxSizing: 'border-box' }}>
            <div style={{ width: '270px', display: 'flex', flexDirection: 'column', border: '2px solid #490514', margin: '5px', padding: '10px', backgroundColor: '#F7F3F3', borderRadius: '5px' }}>
                <div style={{ alignSelf: 'start', fontSize: '22px', fontWeight: '600', margin: '5px' }}>Расписание</div>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '5px 0px 10px 0px', borderLeft: '2px solid #8C2425', borderRadius: '5px', padding: '2px 5px', backgroundColor: '#F0EAE9', width: '100%' }}>
                    <div style={{ width: '120px', alignSelf: 'start', fontSize: '20px', fontWeight: '600', margin: '5px' }}>Пользователь:</div>
                    <StudendaSelect options={groupOptions} value={defaultGroupOption} onChange={(value) => (groupOptionsOnChange(value))} 
                    isClearable={true} noOptionsMessage={() => noOptionsText} placeholder='Пользователь' />
                </div>
            </div>
            <div style={{
                width: '80%', border: '2px solid #490514', margin: '5px', overflowX: 'auto', overflowY: 'auto', whiteSpace: 'nowrap',
                backgroundColor: '#F7F3F3', borderRadius: '5px'
            }}>
                {toggleVisibility ?
                    
                    <table className={classes.AdminTable}>
                    <tbody style={{
                        display: 'block',
                    }}>
                        <tr>
                            <td style={{
                                fontWeight: '600',
                                minHeight: '70px',
                                borderRight: '4px solid #B5999F',
                                width: '75px',
                                height: '42px',
                            }}>
                            </td>
                            {dayPositions.map((obj) => <td style={{
                                fontWeight: '600',
                                minHeight: '70px',
                                borderRight: '4px solid #B5999F'
                            }}><div style={{ fontSize: '24px', margin: '16px 0px 10px 0px', textAlign: 'center' }}>{obj.name}
                                </div></td>)}
                        </tr>

                        {subjectPositions?.map((subjectPosition) =>
                            weekTypes?.map((weekType, index) =>
                                <tr style={(index % 2 != 0) ? { borderBottom: '4px solid #B5999F', borderTop: '2px solid #B5999F' } : { borderBottom: '2px solid #B5999F', borderTop: '4px solid #B5999F' }}>
                                    {(index % 2 == 0) ?
                                        <td style={{
                                            fontWeight: '600',
                                            minHeight: '70px',
                                            borderRight: '4px solid #B5999F'
                                        }} rowSpan={2}><div style={{ margin: '0px 10px 0px 10px', fontSize: '18px' }}>{subjectPosition.startLabel}-{subjectPosition.endLabel}</div> </td> :
                                        <></>}
                                    {dayPositions?.map((dayPosition) => {
                                        const subjects: subject[] | undefined = findSubject(subjectPosition, dayPosition, weekType);
                                        return (
                                            <td className={classes.TableColumn} style={{ minWidth: '278px', minHeight: '70px', borderRight: '4px solid #B5999F' }}>
                                                <div>
                                                    {(subjects !== undefined && subjects[0] !== undefined) ?

                                                        <div className={classes.SubjectBox} onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => onItemClick(e, subjects)}>
                                                            <span>{findDiscipline(subjects[0].disciplineId)?.name} {findSubjectType(subjects[0].subjectTypeId)?.name}</span>
                                                            <span style={{ color: 'rgba(27, 14, 23, 0.7)' }}>{subjects[0].classroom}</span>

                                                        </div>
                                                        :
                                                        <div style={{ minWidth: '278px', minHeight: '70px' }} />
                                                    }
                                                </div>
                                            </td>
                                        )

                                    }
                                    )
                                    }
                                </tr>
                            )
                        )
                        }
                    </tbody>
                </table>
                    : <></>}

            </div>

        </main>

    )
}

export default StudentScheduleForm