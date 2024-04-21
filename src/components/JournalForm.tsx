import { FC, useEffect, useState } from 'react'
import { COLORS } from '../styles/colors'
import Select, { SingleValue } from 'react-select'
import { account, subjectType } from '../types/AdminType';
import { option } from '../types/OptionType';
import { useAppDispatch } from '../hook';
import { RootState } from '../store';
import { ConnectedProps, connect } from 'react-redux';
import { RequestValue, request } from '../base/Request';
import { ObjectKey, updateDataArray } from '../store/dataArraySlice';
import { ArrayToOptions } from '../base/ArrayToOptionsConverter';

const mapState = (state: RootState) => (
    {
        Token: state.admin.Token,
        dataArray: state.dataArray,
        journal: state.journal
    }
)

type PropsFromRedux = ConnectedProps<typeof connector>

const connector = connect(mapState)

const JournalForm: FC<PropsFromRedux> = (props: PropsFromRedux) => {
    const dispatch = useAppDispatch()
    const Authorization: string = "Authorization: Bearer " + props.Token
    const noOptionsText = "Пусто"

    const [groupOptions, setGroupOptions] = useState<option[]>([])

    const [currentGroupId, setCurrentGroupId] = useState<number>()

    const [currentGroupAccounts, setCurrentGroupAccounts] = useState<account[]>()

    const [subjectTypes, setSubjectTypes] = useState<subjectType[]>([])

    const [accounts, setAccounts] = useState<account[]>([])

    const [defaultGroupOptions, setDefaultGroupOptions] = useState<option>()

    const initialFunc = async () => {
        setSubjectTypes(await request(RequestValue.value[5].id, "get"))
        setAccounts(await request(RequestValue.value[6].id, "get"))
    }

    useEffect(() => {
        (async () => {
            initialFunc()
        })()
    }, [])

    useEffect(() => {
        setGroupOptions(ArrayToOptions(props.journal.groups))
        setDefaultGroupOptions(groupOptions[0])
    }, [props.journal.groups])

    useEffect(() => {
        setDefaultGroupOptions(groupOptions[0])
    }, [groupOptions])

    useEffect(() => {
        if (currentGroupId != undefined) {
            setCurrentGroupAccounts(accounts?.filter((account) => account.groupId == currentGroupId))
        }
        else {
            setCurrentGroupAccounts(undefined)
        }
    }, [currentGroupId])

    const groupOptionsOnChange = (value: SingleValue<option>) => {
        if (value !== null) {
            setDefaultGroupOptions(value)
            setCurrentGroupId(value?.value)
        }
    }

    return (
        <main style={{ display: 'flex', backgroundColor: 'white', maxHeight: '90svh', color: '#1B0E17', boxSizing: 'border-box' }}>
            <div style={{ width: '270px', display: 'flex', flexDirection: 'column', border: '2px solid #490514', margin: '5px', padding: '10px', backgroundColor: '#F7F3F3', borderRadius: '5px' }}>
                <div style={{ alignSelf: 'start', fontSize: '22px', fontWeight: '600', margin: '5px' }}>Журнал</div>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '5px 0px 10px 0px', borderLeft: '2px solid #8C2425', borderRadius: '5px', padding: '2px 5px', backgroundColor: '#F0EAE9', width: '100%' }}>
                    <div style={{ width: '120px', alignSelf: 'start', fontSize: '20px', fontWeight: '600', margin: '5px' }}>Дисциплина:</div>
                    <label>{props.journal.disciplineName}</label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '5px 0px 10px 0px', borderLeft: '2px solid #8C2425', borderRadius: '5px', padding: '2px 5px', backgroundColor: '#F0EAE9', width: '100%' }}>
                    <div style={{ width: '120px', alignSelf: 'start', fontSize: '20px', fontWeight: '600', margin: '5px' }}>Группа:</div>
                    <Select options={groupOptions} value={defaultGroupOptions} onChange={(value) => (groupOptionsOnChange(value))} isClearable={false} noOptionsMessage={() => noOptionsText} />
                </div>
            </div>
            <div style={{
                width: '80%', border: '2px solid #490514', margin: '5px', overflowX: 'auto', overflowY: 'auto', whiteSpace: 'nowrap',
                backgroundColor: '#F7F3F3', borderRadius: '5px', scrollbarColor: COLORS.red3
            }}>
                {currentGroupAccounts != undefined
                    ?
                    <table>
                        <td>
                            <tr>
                                №
                            </tr>
                            {currentGroupAccounts.map((obj, i) => <tr><div style={{ fontSize: '24px', margin: '16px 0px 10px 0px', textAlign: 'center' }}>{i + 1}
                            </div></tr>)}
                        </td>
                        <td>
                            <tr>
                                ФИО
                            </tr>
                            {currentGroupAccounts.map((obj) => <tr><div style={{ fontSize: '24px', margin: '16px 0px 10px 0px', textAlign: 'center' }}>{obj.surname}{obj.name}{obj.patronymic}
                            </div></tr>)}
                        </td>
                    </table>
                    : <></>}
            </div>
        </main>
    )
}

export default connector(JournalForm)