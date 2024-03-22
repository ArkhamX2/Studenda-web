import { FC, useEffect, useState } from 'react'
import { COLORS } from '../styles/colors'
import Select from 'react-select'
import { account } from '../types/AdminType';
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
        dataArray: state.dataArray
    }
)

type PropsFromRedux = ConnectedProps<typeof connector>

const connector = connect(mapState)

const JournalForm: FC<PropsFromRedux> = (props: PropsFromRedux) => {
    const dispatch = useAppDispatch()
    const Authorization: string = "Authorization: Bearer " + props.Token
    const noOptionsText = "Пусто"

    const [disciplineOptions, setDisciplineOptions] = useState<option[]>()
    const [groupOptions, setGroupOptions] = useState<option[]>()

    const [currentDisciplineId, setCurrentDisciplineId] = useState<number>()
    const [currentGroupId, setCurrentGroupId] = useState<number>()

    const [currentGroupAccounts, setCurrentGroupAccounts] = useState<account[]>()

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
        setDisciplineOptions(ArrayToOptions(props.dataArray.disciplineArray))
    }, [props.dataArray.disciplineArray])

    useEffect(() => {
        setGroupOptions(ArrayToOptions(props.dataArray.groupArray))
    }, [props.dataArray.groupArray])

    useEffect(() => {
        if (currentDisciplineId!=undefined&&currentGroupId!=undefined)
        {
            setCurrentGroupAccounts(props.dataArray.accountArray?.filter((account)=>account.groupId==currentGroupId))
        }
        else
        {
            setCurrentGroupAccounts(undefined)
        }
    }, [currentDisciplineId, currentGroupId])

    return (
        <main style={{ display: 'flex', backgroundColor: 'white', maxHeight: '90svh', color: '#1B0E17', boxSizing: 'border-box' }}>
            <div style={{ width:'270px', display: 'flex', flexDirection: 'column', border: '2px solid #490514', margin: '5px', padding: '10px', backgroundColor: '#F7F3F3', borderRadius: '5px' }}>
                <div style={{alignSelf:'start', fontSize:'22px', fontWeight:'600', margin:'5px'}}>Журнал</div>
                <div style={{display: 'flex', flexDirection: 'column', margin: '5px 0px 10px 0px' , borderLeft: '2px solid #8C2425', borderRadius:'5px', padding:'2px 5px', backgroundColor:'#F0EAE9', width:'100%'}}>
                    <div style={{width:'120px', alignSelf:'start', fontSize:'20px', fontWeight:'600', margin:'5px'}}>Дисциплина:</div>
                    <Select options={disciplineOptions} onChange={(value) => (setCurrentDisciplineId(value?.value))} isClearable={true} noOptionsMessage={() => noOptionsText} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', margin: '5px 0px 10px 0px' , borderLeft: '2px solid #8C2425', borderRadius:'5px', padding:'2px 5px', backgroundColor:'#F0EAE9', width:'100%'}}>
                    <div style={{width:'120px', alignSelf:'start', fontSize:'20px', fontWeight:'600', margin:'5px'}}>Группа:</div>
                    <Select options={groupOptions} onChange={(value) => (setCurrentGroupId(value?.value))} isClearable={true} noOptionsMessage={() => noOptionsText} />
                </div>
            </div>
            <div style={{
                width: '80%', border: '2px solid #490514', margin: '5px', overflowX: 'auto', overflowY: 'auto', whiteSpace: 'nowrap',
                backgroundColor: '#F7F3F3', borderRadius: '5px', scrollbarColor: COLORS.red3
            }}>
                {currentGroupAccounts!=undefined
                ?
                <table>
                    <td>
                        <tr>
                            №
                        </tr>
                        {currentGroupAccounts.map((obj, i) => <tr><div style={{ fontSize: '24px', margin: '16px 0px 10px 0px', textAlign: 'center' }}>{i+1}
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
                :<></>}                
            </div>
        </main>
    )
}

export default connector(JournalForm)