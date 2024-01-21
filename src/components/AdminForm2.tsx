import { FC, useState } from 'react'
import Selector from './UI/selector/Selector'
import ScheduleTable from './UI/table/ScheduleTable'
import SearchBar from './UI/searchbar/SearchBar'
import { useAppDispatch } from '../hook'
import { COLORS } from '../styles/colors'
import '../styles/admin.css'
import LoginInput from './UI/imput/LoginInput'
import LoginButton, { ButtonVariant } from './UI/button/LoginButton'
import AdminSubject, { BorderType } from './UI/adminsubject/Subject'
import MenuComponent from './UI/adminmenu/MenuComponent'
import AdminButton from './UI/button/AdminButton'

const AdminForm2: FC = () => {
    const dispatch = useAppDispatch()
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
    

    return (
        <main style={{display:'flex', backgroundColor:'white', maxHeight: '90svh', color:'#1B0E17', boxSizing:'border-box'}}>
            <div style={{display:'flex', flexDirection:'column', border:'2px solid #490514', margin:'5px', padding:'10px', 
                backgroundColor:'#F7F3F3', borderRadius: '5px'}}>
                <div style={{fontSize:'18px'}}>Редактор расписания</div>
                <div style={{display:'flex', flexDirection:'row', margin:'10px 0px 5px 0px'}}>
                    <MenuComponent text='Группы'></MenuComponent>
                </div>
                <div style={{display:'flex', flexDirection:'row', margin:'5px 0px 5px 0px'}}>
                    <MenuComponent text='Дисциплины'></MenuComponent>
                </div>
                <div style={{display:'flex', flexDirection:'row', margin:'5px 0px 10px 0px'}}>
                    <MenuComponent text='Преподаватели'></MenuComponent>
                </div>
                <div style={{display:'flex', flexDirection:'row', margin:'5px 0px 10px 0px'}}>
                    <MenuComponent text='Пользователи'></MenuComponent>
                </div>
                <div style={{display:'flex', flexDirection:'row', margin:'5px 0px 10px 0px'}}>
                    <MenuComponent text='Роли'></MenuComponent>
                </div>
                <ul style={{visibility:'hidden'}}>
                {filteredPosts.map(post => (
                    <li key={post.id}>{post.name}</li>
                ))}
                </ul>
                <AdminButton text='СОХРАНИТЬ'/>
            </div>
            <div style={{width:'80%', border:'2px solid #490514',margin:'5px', overflowX:'auto', overflowY:'auto',whiteSpace:'nowrap', 
            backgroundColor:'#F7F3F3', borderRadius: '5px', scrollbarColor:COLORS.red3, flexDirection:'row'}}>
                <div style={{display:'flex'}}>
                    <div style={{display:'flex', flexDirection:'row', margin:'10px 10px 10px 10px',width:'60%'}}>
                        <button style={{margin:'5px', fontSize:'12px', width:'60px'}}>Фильтр</button>
                        <input placeholder='Введите имя столбца' style={{borderRadius: '5px', border: '2px solid #490514', backgroundColor:'#FFF', height:'40px', width:'80%',
                    display:'flex', alignSelf:'center', paddingLeft:'5px'}}></input>
                        <button style={{margin:'5px', fontSize:'12px', width:'60px'}}>Поиск</button>

                    </div>
                    <div style={{display: 'flex', width:'20%', alignSelf:'center', justifySelf:'flex-end'}}>
                        <AdminButton text='Добавить'/>
                    </div>
                    
                </div>
                <div style={{display:'flex', flexDirection:'column', border:'1px solid lightgray', padding:'5px'}}>
                   <AdminSubject col={['colum1','colum2','colum3']} first={BorderType.firstElement}/>
                </div>


            </div>
                
        </main>

    )
}

export default AdminForm2