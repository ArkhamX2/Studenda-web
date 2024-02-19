import { FC, useEffect, useState } from 'react'
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

const AdminForm2: FC = () => {
    const dispatch = useAppDispatch()
    const Authorization: string = "Authorization: Bearer " + store.getState().admin.Token
    const posts = [
        { id: '1', name: 'Предмет1' },

    ];
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');


    const filterPosts = (posts: any[], query: any) => {
        if (!query) {
            return posts;
        }

        return posts.filter((post: { name: string }) => {
            const postName = post.name.toLowerCase();
            return postName.includes(query);
        });
    };
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredPosts = filterPosts(posts, searchQuery);

    const [selectedButton, setSelectedButton] = useState(RequestValue.value[0].id)
    const [selectedArray, setSelectedArray] = useState<any[]>()
    const [selectedObject, setSelectedObject] = useState<Object>()
    const { isOpen, toggle } = useModal()

    useEffect(() => {
        (async () => {
            setSelectedArray(await request(selectedButton, "get"))
        })()
    }, [selectedButton]);

    const onMenuComponentClick = async (ButtonStateId: number) => {
        setSelectedButton(ButtonStateId)
    }

    const onAddClick = (RequestValueId: number, obj: any | undefined = undefined) => {
        switch (RequestValue.value[RequestValueId].name) {
            case "discipline":
                {
                    if (obj === undefined) {
                        const tmpobj: discipline = { id: 0, userId: 0, name: "", description: "" }
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
                        const tmpobj: subjectPosition = { id: 0, index: 0, startLabel: "", endLabel: "", name: "" }
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
                        const tmpobj: dayPosition = { id: 0, index: 0, name: "" }
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
                        const tmpobj: weekType = { id: 0, index: 0, name: "" }
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
                        const tmpobj: subjectType = { id: 0, name: "", IsScorable: false }
                        setSelectedObject(tmpobj)
                    }
                    else {
                        const tmpobj: subjectType = { id: obj.id, name: obj.name, IsScorable: obj.IsScorable }
                        setSelectedObject(tmpobj)
                    }
                    break;
                }
            case "user":
                {
                    if (obj === undefined) {
                        const tmpobj: user = { id: 0, roleId: 1, groupId: 1, identityId: "", name: "", surname: "", patronymic: "" }
                        setSelectedObject(tmpobj)
                    }
                    else {
                        const tmpobj: user = { id: obj.id, roleId: obj.roleId, groupId: obj.groupId, identityId: obj.identityId, name: obj.name, surname: obj.surname, patronymic: obj.patronymic }
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
                        const tmpobj: course = { id: 0, grade: 0, name: "" }
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
        setSelectedArray(await request(selectedButton, "post", selectedObject, undefined, Authorization))
        setSelectedArray(await request(selectedButton, "get"))
    }

    const onDeleteClick = async () => {
        toggle()
        setSelectedArray(await request(selectedButton, "delete", selectedObject, undefined, Authorization))
        setSelectedArray(await request(selectedButton, "get"))
    }

    const onItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, obj: any) => {
        event.preventDefault()
        onAddClick(selectedButton, obj)
    }

    return (
        <>
            <ModalAdmin isOpen={isOpen} toggle={toggle}>
                {selectedObject !== undefined
                    ?
                    <>
                        {(Object.keys(selectedObject)).map((key, y) =>
                            <div>
                                {key}:
                                <input onChange={e => (typeof (selectedObject as any)[key] === 'number' ? (selectedObject as any)[key] = Number(e.target.value) : typeof (selectedObject as any)[key] === 'boolean' ? (selectedObject as any)[key] = Boolean(e.target.value) : (selectedObject as any)[key] = String(e.target.value))} defaultValue={(selectedObject as any)[key]} />
                            </div>
                        )}
                        <button onClick={() => onSaveClick()}>Сохранить</button>
                        {(selectedObject as any).id !== 0
                            ?
                            <button onClick={() => onDeleteClick()}>Удалить</button>
                            :
                            <>
                            </>}
                    </>
                    :
                    <>
                    </>
                }
            </ModalAdmin>
            <main style={{ display: 'flex', backgroundColor: 'white', maxHeight: '90svh', color: '#1B0E17', boxSizing: 'border-box' }}>
                <div style={{
                    display: 'flex', flexDirection: 'column', border: '2px solid #490514', margin: '5px', padding: '10px',
                    backgroundColor: '#F7F3F3', borderRadius: '5px'
                }}>
                    <div style={{alignSelf:'start', fontSize:'22px', fontWeight:'600', margin:'5px'}}>Редактор расписания</div>
                    {[...Array(RequestValue.value.length - 2)].map((x, i) => {
                        const selectedButtonId = i + 1; return (
                            <MenuComponent text={RequestValue.value[selectedButtonId].name} onClick={() => onMenuComponentClick(RequestValue.value[selectedButtonId].id)}></MenuComponent>
                        )
                    }
                    )}
                    <ul style={{ visibility: 'hidden' }}>
                        {filteredPosts.map(post => (
                            <li key={post.id}>{post.name}</li>
                        ))}
                    </ul>
                </div>
                <div style={{
                    width: '80%', border: '2px solid #490514', margin: '5px', overflowX: 'auto', overflowY: 'auto', whiteSpace: 'nowrap',
                    backgroundColor: '#F7F3F3', borderRadius: '5px', scrollbarColor: COLORS.red3, flexDirection: 'row'
                }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 10px 10px 10px', width: '60%' }}>
                            <button style={{ margin: '5px', fontSize: '12px', width: '60px' }}>Фильтр</button>
                            <input placeholder='Введите имя столбца' style={{
                                borderRadius: '5px', border: '2px solid #490514', backgroundColor: '#FFF', height: '40px', width: '80%',
                                display: 'flex', alignSelf: 'center', paddingLeft: '5px'
                            }}></input>
                            <button style={{ margin: '5px', fontSize: '12px', width: '60px' }}>Поиск</button>

                        </div>
                        <div style={{ display: 'flex', width: '20%', alignSelf: 'center', justifySelf: 'flex-end' }}>
                            <AdminButton onClick={() => onAddClick(selectedButton)} text='Добавить' />
                        </div>

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid lightgray', padding: '5px' }}>
                        {(selectedArray !== undefined && selectedArray[0] !== undefined) ?
                            <>
                                <AdminSubject itemList={(Object.keys(selectedArray[0]))} first={BorderType.firstElement} />
                                {selectedArray.map((obj, i) =>
                                    <AdminObjectValue onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => onItemClick(e, obj)} objectList={Object.values(obj)} />
                                )}
                            </>
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

export default AdminForm2