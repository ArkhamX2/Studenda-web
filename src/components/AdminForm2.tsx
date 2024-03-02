import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Selector from './UI/selector/Selector'
import SearchBar from './UI/searchbar/SearchBar'
import { useAppDispatch } from '../hook'
import { COLORS } from '../styles/colors'
import '../styles/admin.module.css'
import LoginInput from './UI/imput/LoginInput'
import LoginButton, { ButtonVariant } from './UI/button/LoginButton'
import AdminSubject, { BorderType } from './UI/adminsubject/Subject'
import MenuComponent from './UI/adminmenu/MenuComponent'
import AdminButton from './UI/button/AdminButton'
import store from '../store/'
import { dayPosition, discipline, subjectPosition, weekType, subjectType, user, role, group, course, department, } from '../types/AdminType';
import axios from 'axios'
import ModalAdmin from './UI/modalAdmin/ModalAdmin'
import useModal from './UI/modalAdmin/useModalAdmin'
import AdminObjectValue from './UI/adminobjectvalue/AdminObjectValue'
import { RequestValue, request } from '../request'
import { ObjectKey, updateDataArray } from '../store/dataArraySlice'
import { ConnectedProps, connect } from 'react-redux'
import { RootState } from '../store/index';
import Select from 'react-select';
import AdminInput from './UI/imput/AdminInput'

type options = {
    value: number
    label: string
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

    const [selectedButton, setSelectedButton] = useState(RequestValue.value[0].id)
    const [selectedObject, setSelectedObject] = useState<Object>()
    const [dataKey, setDataKey] = useState<ObjectKey>(RequestValue.value[0].name + "Array" as ObjectKey)
    const { isOpen, toggle } = useModal()
    const hasPageBeenRendered = useRef({ effect1: false, effect2: false })

    const needUpdate = true

    const ArrayToOptions = (array: any[] | undefined) => {
        const tmparray: options[] = [];
        if (array === undefined) {
            return tmparray
        }
        array.map((obj, i) => (((!Object.keys(obj).includes("surname"))
            ?
            !Object.keys(obj).includes("grade")
                ?
                (tmparray.push({ value: obj.id, label: obj.name }))
                :
                (tmparray.push({ value: obj.id, label: String(obj.grade) }))
            :
            (tmparray.push({ value: obj.id, label: "" + obj.surname + " " + obj.name + " " + obj.patronymic })))))
        return tmparray
    }

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

    const onAddClick = (RequestValueId: number, obj: any | undefined = undefined) => {
        switch (RequestValue.value[RequestValueId].name) {
            case "discipline":
                {
                    if (obj === undefined) {
                        const tmpobj: discipline = { id: 0, userId: 0, name: "", description: undefined }
                        setSelectedObject(tmpobj)
                    }
                    else {
                        const tmpobj: discipline = { id: obj.id, userId: obj.userId, name: obj.name, description: obj.description }
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "subjectPosition":
                {
                    if (obj === undefined) {
                        const tmpobj: subjectPosition = { id: 0, index: 0, startLabel: undefined, endLabel: undefined, name: undefined }
                        setSelectedObject(tmpobj)
                    }
                    else {
                        const tmpobj: subjectPosition = { id: obj.id, index: obj.index, startLabel: obj.startLabel, endLabel: obj.endLabel, name: obj.name }
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "dayPosition":
                {
                    if (obj === undefined) {
                        const tmpobj: dayPosition = { id: 0, index: 0, name: undefined }
                        setSelectedObject(tmpobj)
                    }
                    else {
                        const tmpobj: dayPosition = { id: obj.id, index: obj.index, name: obj.name }
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "weekType":
                {
                    if (obj === undefined) {
                        const tmpobj: weekType = { id: 0, index: 0, name: undefined }
                        setSelectedObject(tmpobj)
                    }
                    else {
                        const tmpobj: weekType = { id: obj.id, index: obj.index, name: obj.name }
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "subjectType":
                {
                    if (obj === undefined) {
                        const tmpobj: subjectType = { id: 0, name: "" }
                        setSelectedObject(tmpobj)
                    }
                    else {
                        const tmpobj: subjectType = { id: obj.id, name: obj.name }
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "user":
                {
                    if (obj === undefined) {
                        const tmpobj: user = { id: 0, roleId: 0, groupId: undefined, name: undefined, surname: undefined, patronymic: undefined }
                        setSelectedObject(tmpobj)
                    }
                    else {
                        const tmpobj: user = { id: obj.id, roleId: obj.roleId, groupId: obj.groupId, name: obj.name, surname: obj.surname, patronymic: obj.patronymic }
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "role":
                {
                    if (obj === undefined) {
                        const tmpobj: role = { id: 0, name: "" }
                        setSelectedObject(tmpobj)
                    }
                    else {
                        const tmpobj: role = { id: obj.id, name: obj.name }
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "group":
                {
                    if (obj === undefined) {
                        const tmpobj: group = { id: 0, courseId: 0, departmentId: 0, name: "" }
                        setSelectedObject(tmpobj)
                    }
                    else {
                        const tmpobj: group = { id: obj.id, courseId: obj.courseId, departmentId: obj.departmentId, name: obj.name }
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "course":
                {
                    if (obj === undefined) {
                        const tmpobj: course = { id: 0, grade: 0, name: undefined }
                        setSelectedObject(tmpobj)
                    }
                    else {
                        const tmpobj: course = { id: obj.id, grade: obj.grade, name: obj.name }
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "department":
                {
                    if (obj === undefined) {
                        const tmpobj: department = { id: 0, name: "" }
                        setSelectedObject(tmpobj)
                    }
                    else {
                        const tmpobj: department = { id: obj.id, name: obj.name }
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            default:
                {
                    setSelectedObject({})
                    break;
                }
        }
        toggle()
    }

    const onSaveClick = async () => {
        toggle()
        await request(selectedButton, "post", selectedObject, undefined, Authorization)
        await request(selectedButton, "get")
    }

    const onDeleteClick = async () => {
        toggle()
        await request(selectedButton, "delete", selectedObject, undefined, Authorization)
        await request(selectedButton, "get")
    }

    const onItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, obj: any) => {
        event.preventDefault()
        onAddClick(selectedButton, obj)
    }

    return (
        <>
            {selectedObject !== undefined && isOpen
                ?
                <ModalAdmin isOpen={isOpen} toggle={toggle}>
                    <>
                        {(Object.keys(selectedObject)).slice(1).map((key, y) => {
                            const options = ArrayToOptions(props.dataArray[key.replace("Id", "") + "Array" as ObjectKey])
                            return (
                                <div>
                                    {key.includes("Id")
                                        ?
                                        <>
                                            {key.replace("Id", "")}:
                                            <Select options={options}
                                                onChange={value => (selectedObject as any)[key] = value}
                                                defaultValue={options.find((obj) => { return obj.value === (selectedObject as any)[key] })}
                                                isClearable={true}
                                            ></Select>
                                        </>
                                        :
                                        <>{key}:
                                            <AdminInput onChange={e =>
                                            (typeof (selectedObject as any)[key] === 'number'
                                                ?
                                                (selectedObject as any)[key] = Number(e.target.value)
                                                :
                                                (selectedObject as any)[key] = String(e.target.value))}
                                                defaultValue={(selectedObject as any)[key]}
                                            />
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
                </ModalAdmin>
                :
                <>
                </>
            }

            <main style={{ display: 'flex', backgroundColor: 'white', maxHeight: '90svh', color: '#1B0E17', boxSizing: 'border-box' }}>
                <div style={{
                    display: 'flex', flexDirection: 'column', border: '2px solid #490514', margin: '5px', padding: '10px',
                    backgroundColor: '#F7F3F3', borderRadius: '5px'
                }}>
                    <div style={{ alignSelf: 'start', fontSize: '22px', fontWeight: '600', margin: '5px' }}>Редактор расписания</div>
                    {[...Array(RequestValue.value.length - 2)].map((x, i) => {
                        const selectedButtonId = i + 1; return (
                            <MenuComponent text={RequestValue.value[selectedButtonId].name} onClick={() => onMenuComponentClick(RequestValue.value[selectedButtonId].id)}></MenuComponent>
                        )
                    }
                    )}
                </div>
                <div style={{
                    width: '80%', border: '2px solid #490514', margin: '5px', overflowX: 'auto', overflowY: 'auto', whiteSpace: 'nowrap',
                    backgroundColor: '#F7F3F3', borderRadius: '5px', scrollbarColor: COLORS.red3, flexDirection: 'row'
                }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', width: '20%', alignSelf: 'center', justifySelf: 'flex-end' }}>
                            <label>{RequestValue.value[selectedButton].name}</label>
                            <button onClick={() => onAddClick(selectedButton)}>Добавить</button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid lightgray', padding: '5px' }}>
                        {(props.dataArray[dataKey] !== undefined && props.dataArray[dataKey]![0] !== undefined) ?
                            <table>
                                <AdminSubject itemList={(Object.keys(props.dataArray[dataKey]![0]))} first={BorderType.firstElement} />
                                <tr>
                                    {props.dataArray[dataKey]!.map((obj, i) =>
                                        <AdminObjectValue onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => onItemClick(e, obj)} objectList={Object.values(obj)} />
                                    )}
                                </tr>
                            </table>
                            :
                            <>
                            </>
                        }
                    </div>


                </div>

            </main>
        </>

    )
}

export default connector(AdminForm2)