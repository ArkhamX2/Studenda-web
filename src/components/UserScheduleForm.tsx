import { FC, useEffect, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import classes from '../styles/admin.module.css'
import { course, department, group, weekType, subjectPosition, dayPosition, subjectType, discipline, user, subject } from '../types/AdminType';
import { RequestValue, request } from '../request'
import axios from 'axios'
import ModalAdmin from './UI/modalAdmin/ModalAdmin';
import useModal from './UI/modalAdmin/useModalAdmin'
import { useAppDispatch } from '../hook'
import store from '../store'
import AdminButton from './UI/button/AdminButton';

type options = {
    value: number
    label: string
}

const UserScheduleForm: FC = () => {
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

    const [userOptions, setUsersOptions] = useState<options[]>([])

    const GetArrayToOptions = async (RequestValueId: number, data: undefined | any = undefined, params: undefined | any = undefined, headers: undefined | any = undefined) => {
        const tmparray: options[] = [];
        (await request(RequestValue.value[RequestValueId].id, "get", data, params, headers) as user[]).map((obj, i) => (tmparray.push({ value: obj.id!, label: "" + obj?.surname + " " + obj?.name + " " + obj?.patronymic })))
        return tmparray
    }

    const initialFunc = async () => {
        setDisciplines(await request(RequestValue.value[1].id, "get"))
        setSubjectPositions((await request(RequestValue.value[2].id, "get")).sort((a: subjectPosition, b: subjectPosition) => a.index - b.index))
        setDayPositions((await request(RequestValue.value[3].id, "get")).sort((a: dayPosition, b: dayPosition) => a.index - b.index))
        setWeekTypes((await request(RequestValue.value[4].id, "get")).sort((a: weekType, b: weekType) => a.index - b.index))
        setSubjectTypes(await request(RequestValue.value[5].id, "get"))
        setGroups(await request(RequestValue.value[8].id, "get"))
        setUsersOptions(await GetArrayToOptions(6))
        setCurrentUserId(store.getState().admin.userId)
    }

    useEffect(() => {
        var userOption = findUserOption(currentUserId)
        if (userOption != undefined) {
            setDefaultUserOption(userOption)
            userOptionsOnChange(userOption)
        }
    }, [userOptions]);

    const userOptionsOnChange = async (value: SingleValue<options>) => {
        if (value !== null) {
            setDefaultUserOption(value)
            setCurrentUserId(value.value)
            var tmparrarr: subject[][] = []
            await Promise.all(weekTypes?.map(async (obj, i) => {
                const param = { userId: value.value, weekTypeId: obj.id, year: currentAcademicYear }
                tmparrarr.push(await request(RequestValue.value[11].id, "get", undefined, param, undefined, "/user?"))
            }))
            var tmparr: subject[] = []
            tmparrarr.map((obj, i) => {
                tmparr = tmparr.concat(obj)
            })
            setToggle(true)
            setSubjects(tmparr)
        }
        else {
            setToggle(false)
            setDefaultUserOption(undefined)
            setCurrentUserId(undefined)
        }
    }

    const [defaultUserOption, setDefaultUserOption] = useState<options>()

    const [currentUserId, setCurrentUserId] = useState<number>()

    const [weekTypes, setWeekTypes] = useState<weekType[]>([])

    const [dayPositions, setDayPositions] = useState<dayPosition[]>([])

    const [subjectPositions, setSubjectPositions] = useState<subjectPosition[]>([])

    const [subjectTypes, setSubjectTypes] = useState<subjectType[]>([])

    const [disciplines, setDisciplines] = useState<discipline[]>([])

    const [subjects, setSubjects] = useState<subject[]>([])

    const [groups, setGroups] = useState<group[]>([])

    const [toggle, setToggle] = useState<boolean>(false)

    const findSubject = (subjectPosition: subjectPosition, dayPosition: dayPosition, weekType: weekType) => {
        try {
            return subjects.find((obj) => obj.subjectPositionId === subjectPosition.id && obj.dayPositionId === dayPosition.id && obj.weekTypeId === weekType.id)
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

    const findUserOption = (userId: number | undefined) => {
        try {
            return userOptions.find((obj) => obj.value === userId)
        } catch (error) {

        }
    }

    return (
        <main className={classes.Main}>
            <div className={classes.NavigationBox}>
                <div className={classes.Header}>Расписание</div>
                <div className={classes.SearchBox}>
                    <div className={classes.SearchBoxLabel}>Пользователь:</div>
                    <Select options={userOptions} value={defaultUserOption} onChange={(value) => (userOptionsOnChange(value))} isClearable={true} noOptionsMessage={() => noOptionsText} />
                </div>
            </div>
            <div className={classes.TableBox}>
                {toggle ?
                    <table className={classes.AdminTable}>
                        <tr >
                            <td className={classes.TableColumn} style={{ width: '75px', height: '42px' }}>
                            </td>
                            {dayPositions?.map((obj, i) => <td className={classes.TableColumn}>{obj.name}</td>)}
                        </tr>
                        {subjectPositions?.map((subjectPosition) =>
                            <tr>
                                <td className={classes.TableColumn}>{subjectPosition.startLabel}-{subjectPosition.endLabel} </td>{dayPositions?.map((dayPosition) =>
                                    <td className={classes.TableColumn}> {weekTypes?.map((weekType) => {
                                        const subject: subject | undefined = findSubject(subjectPosition, dayPosition, weekType); if (subject !== undefined)
                                            return (<div className={classes.SubjectBox}>
                                                <tr>{findDiscipline(subject.disciplineId)?.name}<br /> {findSubjectType(subject.subjectTypeId)?.name} {subject.classroom} {findGroup(subject.groupId)?.name}</tr>

                                            </div>);

                                        else return (<div className={classes.SubjectBox}>
                                            <tr></tr>
                                        </div>)
                                    })}</td>)}</tr>)}
                    </table>
                    : <></>}

            </div>

        </main>

    )
}

export default UserScheduleForm