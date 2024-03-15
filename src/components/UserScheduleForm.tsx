import { FC, useEffect, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import classes from '../styles/admin.module.css'
import { course, department, group, weekType, subjectPosition, dayPosition, subjectType, discipline, account, subject } from '../types/AdminType';
import { RequestValue, request } from '../base/Request'
import axios from 'axios'
import Modal from './UI/modal/Modal';
import { useAppDispatch } from '../hook'
import store from '../store'
import AdminButton from './UI/button/AdminButton';
import { option } from '../types/OptionType';
import useModal from './UI/modal/useModal';

const AccountScheduleForm: FC = () => {
    const dispatch = useAppDispatch()
    const { isOpen, toggle } = useModal()

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

    const [accountOptions, setAccountsOptions] = useState<option[]>([])

    const GetArrayToOptions = async (RequestValueId: number, data: undefined | any = undefined, params: undefined | any = undefined, headers: undefined | any = undefined) => {
        const tmparray: option[] = [];
        (await request(RequestValue.value[RequestValueId].id, "get", data, params, headers) as account[]).map((obj, i) => (tmparray.push({ value: obj.id!, label: ""+obj?.surname+" "+obj?.name+" "+obj?.patronymic})))
        return tmparray
    }

    const initialFunc = async () => {
        setDisciplines(await request(RequestValue.value[1].id, "get"))
        setSubjectPositions((await request(RequestValue.value[2].id, "get")).sort((a: subjectPosition, b: subjectPosition) => a.index - b.index))
        setDayPositions((await request(RequestValue.value[3].id, "get")).sort((a: dayPosition, b: dayPosition) => a.index - b.index))
        setWeekTypes((await request(RequestValue.value[4].id, "get")).sort((a: weekType, b: weekType) => a.index - b.index))
        setSubjectTypes(await request(RequestValue.value[5].id, "get"))
        setGroups(await request(RequestValue.value[8].id, "get"))        
        setAccountsOptions(await GetArrayToOptions(6))
        setCurrentAccountId(store.getState().admin.accountId)
    }

    useEffect(() => {
        var accountOption = findAccountOption(currentAccountId)
        if (accountOption!=undefined)
        {
            setDefaultAccountOption(accountOption) 
            accountOptionsOnChange(accountOption)
        }
    }, [accountOptions]);

    const accountOptionsOnChange = async (value: SingleValue<option>) => {
        if (value !== null) {            
            setDefaultAccountOption(value)
            setCurrentAccountId(value.value)
            var tmparrarr: subject[][] = []
            await Promise.all(weekTypes?.map(async (obj, i) => {
                const param = { accountId: value.value, weekTypeId: obj.id, year: currentAcademicYear }
                console.log(param)
                tmparrarr.push(await request(RequestValue.value[10].id, "get", undefined, param, undefined, "/account?"))
            }))
            var tmparr: subject[] = []
            tmparrarr.map((obj, i) => {
                tmparr = tmparr.concat(obj)
            })
            setToggleVisibility(true)
            setSubjects(tmparr)
        }
        else {
            setToggleVisibility(false)
            setDefaultAccountOption(undefined)
            setCurrentAccountId(undefined)
        }
    }

    const [defaultAccountOption, setDefaultAccountOption] = useState<option>()

    const [currentAccountId, setCurrentAccountId] = useState<number>()

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

    const findAccountOption = (accountId: number | undefined) => {
        try {
            return accountOptions.find((obj) => obj.value === accountId)
        } catch (error) {

        }
    }

    const onItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault()
        toggle()
    }
    
    return (
        <main style={{ display: 'flex', backgroundColor: 'white', maxHeight: '90svh', color: '#1B0E17', boxSizing: 'border-box' }}>
            <Modal isOpen={isOpen} toggle={toggle}>
                
            </Modal>
            <div style={{ width:'270px', display: 'flex', flexDirection: 'column', border: '2px solid #490514', margin: '5px', padding: '10px', backgroundColor: '#F7F3F3', borderRadius: '5px' }}>
                <div style={{alignSelf:'start', fontSize:'22px', fontWeight:'600', margin:'5px'}}>Расписание</div>
                <div style={{display: 'flex', flexDirection: 'column', margin: '5px 0px 10px 0px' , borderLeft: '2px solid #8C2425', borderRadius:'5px', padding:'2px 5px', backgroundColor:'#F0EAE9', width:'100%'}}>
                <div style={{width:'120px', alignSelf:'start', fontSize:'20px', fontWeight:'600', margin:'5px'}}>Пользователь:</div>
                    <Select options={accountOptions} value={defaultAccountOption} onChange={(value) => (accountOptionsOnChange(value))} isClearable={true} noOptionsMessage={() => noOptionsText} />
                </div>
            </div>
            <div style={{
                width: '80%', border: '2px solid #490514', margin: '5px', overflowX: 'auto', overflowY: 'auto', whiteSpace: 'nowrap',
                backgroundColor: '#F7F3F3', borderRadius: '5px'
            }}>
                {toggleVisibility ?
                    <table className={classes.AdminTable}>
                        <tr >
                            <td className={classes.TableColumn} style={{ width: '75px', height: '42px' }}>
                            </td>
                            {dayPositions?.map((obj, i) => <td className={classes.TableColumn}>{obj.name}</td>)}
                        </tr>
                        {subjectPositions?.map((subjectPosition) =>
                            <tr>
                                <td className={classes.TableColumn}>{subjectPosition.startLabel}-{subjectPosition.endLabel} </td>{dayPositions?.map((dayPosition) =>
                                    <td className={classes.TableColumn}> {weekTypes?.map((weekType) => {const subject: subject | undefined = findSubject(subjectPosition, dayPosition, weekType); if (subject !== undefined)
                                            return (<div className={classes.SubjectBox} onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => onItemClick(e)}>
                                                <tr>{findDiscipline(subject.disciplineId)?.name}<br/> {findSubjectType(subject.subjectTypeId)?.name} {subject.classroom} {findGroup(subject.groupId)?.name}</tr>
                                                
                                            </div> );
                                                
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

export default AccountScheduleForm