import { FC, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '../hook'
import { COLORS } from '../styles/colors'
import '../styles/admin.module.css'
import AdminSubject, { BorderType } from './UI/adminsubject/Subject'
import MenuComponent from './UI/adminmenu/MenuComponent'
import AdminButton from './UI/button/AdminButton'
import { dayPosition, discipline, subjectPosition, weekType, subjectType, account, group, course, department, role, security, markType, } from '../types/AdminType';
import axios, { AxiosHeaders } from 'axios'
import Modal from './UI/modal/Modal'
import useModal from './UI/modal/useModal'
import AdminObjectValue from './UI/adminobjectvalue/AdminObjectValue'
import { RequestValue, request } from '../base/Request'
import { ObjectKey, updateDataArray } from '../store/dataArraySlice'
import { ConnectedProps, connect } from 'react-redux'
import { RootState } from '../store/index';
import AdminInput from './UI/input/AdminInput'
import { ArrayToOptions } from '../base/ArrayToOptionsConverter'
import { option } from '../types/OptionType'
import { translation } from '../base/translation'
import StudendaSelect from './UI/select/StudendaSelect'

interface registerAccount extends account {
    email: string,
    password: string,
}

const mapState = (state: RootState) => (
    {
        Token: state.admin.Token,
        dataArray: state.dataArray
    }
)

type PropsFromRedux = ConnectedProps<typeof connector>

const connector = connect(mapState)

const AdminForm2: FC<PropsFromRedux> = (props: PropsFromRedux) => {
    const dispatch = useAppDispatch()
    const Authorization: string = "Authorization: Bearer " + props.Token

    const forbiddenKeys: string[] = ["id", "email", "identityId"];

    const [selectedButton, setSelectedButton] = useState(RequestValue.value[0].id)
    const [selectedObject, setSelectedObject] = useState<Object>()
    const [dataKey, setDataKey] = useState<ObjectKey>(RequestValue.value[0].name + "Array" as ObjectKey)
    const [permissionOptions, setPermissionOptions] = useState<option[]>([{ value: 1, label: "(response.data as security).defaultPermission" },
    { value: 2, label: "(response.data as security).leaderPermission" },
    { value: 3, label: "(response.data as security).teacherPermission" },
    { value: 4, label: "(response.data as security).adminPermission" }])
    const { isOpen, toggle } = useModal()
    const hasPageBeenRendered = useRef({ effect1: false, effect2: false })

    const needUpdate = true

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
        (() => {
            if (hasPageBeenRendered.current["effect1"]) {
                if (needUpdate) {
                    setDataKey(RequestValue.value[selectedButton].name + "Array" as ObjectKey)
                }
                return;
            }
            hasPageBeenRendered.current["effect1"] = true
        })()
    }, [selectedButton]);

    useEffect(() => {
        (async () => {
            if (hasPageBeenRendered.current["effect2"]) {
                dispatch(updateDataArray({ dataArray: await request(selectedButton, "get"), objectKey: dataKey }))
                return;
            }
            hasPageBeenRendered.current["effect2"] = true
        })()
    }, [dataKey]);

    const onMenuComponentClick = async (ButtonStateId: number) => {
        setSelectedButton(ButtonStateId)
    }

    const onAddClick = async (RequestValueId: number, obj: any | undefined = undefined) => {
        var tmpobj: any;
        switch (RequestValue.value[RequestValueId].name) {
            case "discipline":
                {
                    if (obj === undefined) {
                        (tmpobj as discipline) = { id: 0, accountId: 0, name: "", description: undefined }
                    }
                    else {
                        (tmpobj as discipline) = { id: obj.id, accountId: obj.accountId, name: obj.name, description: obj.description }
                    }
                    break;
                }
            case "subjectPosition":
                {
                    if (obj === undefined) {
                        (tmpobj as subjectPosition) = { id: 0, index: 0, startLabel: undefined, endLabel: undefined, name: undefined }
                    }
                    else {
                        (tmpobj as subjectPosition) = { id: obj.id, index: obj.index, startLabel: obj.startLabel, endLabel: obj.endLabel, name: obj.name }
                    }
                    break;
                }
            case "dayPosition":
                {
                    if (obj === undefined) {
                        (tmpobj as dayPosition) = { id: 0, index: 0, name: undefined }
                    }
                    else {
                        (tmpobj as dayPosition) = { id: obj.id, index: obj.index, name: obj.name }
                    }
                    break;
                }
            case "weekType":
                {
                    if (obj === undefined) {
                        (tmpobj as weekType) = { id: 0, index: 0, name: undefined }
                    }
                    else {
                        (tmpobj as weekType) = { id: obj.id, index: obj.index, name: obj.name }
                    }
                    break;
                }
            case "subjectType":
                {
                    if (obj === undefined) {
                        (tmpobj as subjectType) = { id: 0, name: "" }
                    }
                    else {
                        (tmpobj as subjectType) = { id: obj.id, name: obj.name }
                    }
                    break;
                }
            case "account":
                {
                    if (obj === undefined) {
                        (tmpobj as registerAccount) = { id: 0, email: "", password: "", roleId: undefined, groupId: undefined, identityId: "", surname: undefined, name: undefined, patronymic: undefined }
                    }
                    else {
                        (tmpobj as account) = { id: obj.id, email: obj.email, roleId: obj.roleId, groupId: obj.groupId, identityId: obj.identityId, surname: obj.surname, name: obj.name, patronymic: obj.patronymic }
                    }
                    break;
                }
            case "group":
                {
                    if (obj === undefined) {
                        (tmpobj as group) = { id: 0, courseId: 0, departmentId: 0, name: "" }
                    }
                    else {
                        (tmpobj as group) = { id: obj.id, courseId: obj.courseId, departmentId: obj.departmentId, name: obj.name }
                    }
                    break;
                }
            case "course":
                {
                    if (obj === undefined) {
                        (tmpobj as course) = { id: 0, grade: 0, name: undefined }
                    }
                    else {
                        (tmpobj as course) = { id: obj.id, grade: obj.grade, name: obj.name }
                    }
                    break;
                }
            case "department":
                {
                    if (obj === undefined) {
                        (tmpobj as department) = { id: 0, name: "" }
                    }
                    else {
                        (tmpobj as department) = { id: obj.id, name: obj.name }
                    }
                    break;
                }
            case "role":
                {
                    if (obj === undefined) {
                        (tmpobj as role) = { id: 0, name: "", permission: "", tokenLifetimeSeconds: 0, canRegister: false }
                    }
                    else {
                        (tmpobj as role) = { id: obj.id, name: obj.name, permission: obj.permission, tokenLifetimeSeconds: obj.tokenLifetimeSeconds, canRegister: obj.canRegister }
                    }
                    setPermissionOptions(await getSecurity())
                    break;
                }
            case "markType":
                {
                    if (obj === undefined) {
                        (tmpobj as markType) = { id: 0, name: "", minValue: 0, maxValue: 0 }
                    }
                    else {
                        (tmpobj as markType) = { id: obj.id, name: obj.name, minValue: obj.minValue, maxValue: obj.maxValue }
                    }
                    break;
                }
            default:
                {
                    tmpobj = {}
                    break;
                }
        }
        setSelectedObject(tmpobj)
        toggle()
    }

    const getSecurity = async () => {
        const response = await axios({
            method: "get",
            url: "http://88.210.3.137/api/security"
        })
        return ([{ value: 1, label: (response.data as security).defaultPermission },
        { value: 2, label: (response.data as security).leaderPermission },
        { value: 3, label: (response.data as security).teacherPermission },
        { value: 4, label: (response.data as security).adminPermission },
        ])
    }

    const onSaveClick = async () => {
        toggle()
        if (RequestValue.value[selectedButton].name === "account" && (selectedObject as registerAccount).password !== undefined) {
            await axios({
                method: "post",
                url: "http://88.210.3.137/api/security/user",
                data: { email: (selectedObject as registerAccount).email, password: (selectedObject as registerAccount).password, account: { email: (selectedObject as registerAccount).email, roleId: (selectedObject as account).roleId } },
                headers: new AxiosHeaders(Authorization)
            }).then
                (async (response) =>
                    await request(selectedButton, "post", { id: response.data.Account.Id, email: (selectedObject as registerAccount).email, roleId: (selectedObject as account).roleId, groupId: (selectedObject as registerAccount).groupId, identityId: response.data.Account.IdentityId, name: (selectedObject as registerAccount).name, surname: (selectedObject as registerAccount).surname, patronymic: (selectedObject as registerAccount).patronymic }, undefined, Authorization)
                )
        }
        else {
            await request(selectedButton, "post", selectedObject, undefined, Authorization)
        }
        const requestValue = await request(selectedButton, "get")
        dispatch(updateDataArray({ dataArray: requestValue, objectKey: RequestValue.value[selectedButton].name + "Array" as ObjectKey }))
    }

    const onDeleteClick = async () => {
        toggle()
        await request(selectedButton, "delete", selectedObject, undefined, Authorization)
        const requestValue = await request(selectedButton, "get")
        dispatch(updateDataArray({ dataArray: requestValue, objectKey: RequestValue.value[selectedButton].name + "Array" as ObjectKey }))
    }

    const onItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, obj: any) => {
        event.preventDefault()
        onAddClick(selectedButton, obj)
    }

    return (
        <>
            {selectedObject !== undefined && isOpen
                ?
                <Modal isOpen={isOpen} toggle={toggle}>
                    <>
                        {(Object.keys(selectedObject)).slice(1).map((key) => {
                            const options = ArrayToOptions(props.dataArray[key.replace("Id", "") + "Array" as ObjectKey])
                            return (
                                <div>
                                    {key.includes("Id")
                                        ?
                                        <>
                                            {key.includes("identityId")
                                                ?
                                                <></>
                                                :
                                                <>
                                                    {translation.get(RequestValue.value[selectedButton].name)!.get(key)}:
                                                    <StudendaSelect options={options}
                                                        onChange={value => (selectedObject as any)[key] = value?.value}
                                                        defaultValue={options.find((obj) => { return obj.value === (selectedObject as any)[key] })}
                                                        isClearable={true}
                                                    ></StudendaSelect>
                                                </>
                                            }
                                        </>
                                        :
                                        <>
                                            <>
                                                {translation.get(RequestValue.value[selectedButton].name)!.get(key)}:
                                                {key.includes("permission")
                                                    ?
                                                    <StudendaSelect options={permissionOptions}
                                                        onChange={value => (selectedObject as any)[key] = value?.label}
                                                        defaultValue={permissionOptions?.find((obj) => { return obj.label === (selectedObject as any)[key] })}
                                                        isClearable={true}
                                                    ></StudendaSelect>
                                                    :
                                                    <>
                                                        {typeof (selectedObject as any)[key] === 'boolean'
                                                            ?
                                                            <input type="checkbox" defaultChecked={(selectedObject as any)[key]} onChange={e => (selectedObject as any)[key] = Boolean(!(selectedObject as any)[key])}></input>
                                                            :
                                                            <AdminInput onChange={e =>
                                                            (typeof (selectedObject as any)[key] === 'number'
                                                                ?
                                                                (selectedObject as any)[key] = Number(e.target.value)
                                                                :
                                                                (selectedObject as any)[key] = String(e.target.value))}
                                                                defaultValue={(selectedObject as any)[key]}
                                                            />
                                                        }
                                                    </>
                                                }
                                            </>
                                        </>
                                    }
                                </div>
                            )
                        }
                        )}
                        <AdminButton text='Сохранить' onClick={() => onSaveClick()}></AdminButton>
                        {(selectedObject as any).id !== 0
                            ?
                            <AdminButton text='Удалить' onClick={() => onDeleteClick()}></AdminButton>
                            :
                            <>
                            </>}
                    </>
                </Modal>
                :
                <>
                </>
            }

            <main style={{ display: 'flex', backgroundColor: 'white', maxHeight: '90svh', color: '#1B0E17', boxSizing: 'border-box' }}>
                <div style={{
                    display: 'flex', flexDirection: 'column', border: '3px solid #490514', margin: '5px',
                    backgroundColor: '#F7F3F3', borderRadius: '5px'
                }}>
                    <div>Кнопочки тут будут</div>
                    <div style={{ alignSelf: 'start', fontSize: '22px', fontWeight: '600', margin: '10px' }}>Режим администратора</div>
                    <div style={{ display: 'flex', flexDirection: 'column', margin: '10px', overflowY: 'auto', whiteSpace: 'nowrap', flexGrow: '1', scrollbarColor: COLORS.red3, }}>
                        {[...Array(RequestValue.value.length - (RequestValue.value.length - (RequestValue.value.find((value) => value.name == "schedule")?.id!)) - 1)].map((x, i) => {
                            const selectedButtonId = i + 1; return (
                                <MenuComponent text={RequestValue.value[selectedButtonId].altName?.toUpperCase()} onClick={() => onMenuComponentClick(RequestValue.value[selectedButtonId].id)}></MenuComponent>
                            )
                        }
                        )}
                    </div>
                </div>
                <div style={{
                    width: '80%', border: '3px solid #490514', margin: '5px', display: 'flex',
                    backgroundColor: '#F7F3F3', borderRadius: '5px', flexDirection: 'column'
                }}>
                    <div style={{ display: 'flex', height: '80px', margin: '0px 13px', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', border: '2px solid #490514', borderRadius: '5px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '200px' }}>
                            <div>
                                <label>Фильтр</label>
                                <label>Найти...</label>
                            </div>
                            <div>
                                <label>Лупа</label>
                            </div>
                        </div>
                        <div >
                            <button style={{ border: '1px solid #490514', borderBottom: '2px solid #490514', padding: '20px', borderRadius: '4px', width: '150px' }} onClick={() => onAddClick(selectedButton)}><label style={{ fontWeight: '600' }}>ДОБАВИТЬ</label></button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', overflowX: 'auto', overflowY: 'auto', whiteSpace: 'nowrap', flexGrow: '1', scrollbarColor: COLORS.red3, flexDirection: 'column', border: '1px solid lightgray' }}>
                        {(props.dataArray[dataKey] !== undefined && props.dataArray[dataKey]![0] !== undefined && translation.get(RequestValue.value[selectedButton].name) !== undefined) ?
                            <table style={{ borderCollapse: 'collapse' }}>
                                <AdminSubject
                                    itemList={(Object.keys(props.dataArray[dataKey]![0]))}
                                    first={BorderType.firstElement}
                                    forbiddenKeys={forbiddenKeys}
                                    translationDTO={translation.get(RequestValue.value[selectedButton].name)!}
                                />
                                <tr>
                                    {props.dataArray[dataKey]!.map((obj) =>
                                        <AdminObjectValue
                                            onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => onItemClick(e, obj)}
                                            objectList={Object.entries(obj)}
                                            forbiddenKeys={forbiddenKeys}
                                        />
                                    )}
                                </tr>
                            </table>
                            :
                            <p>
                                Этот список пуст
                            </p>
                        }
                    </div>


                </div>

            </main>
        </>

    )
}

export default connector(AdminForm2)