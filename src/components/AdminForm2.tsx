import { FC, useState } from 'react'
import Selector from './UI/selector/Selector'
import ScheduleTable from './UI/table/ScheduleTable'
import SearchBar from './UI/searchbar/SearchBar'
import { useAppDispatch } from '../hook'
import { COLORS } from '../styles/colors'
import '../styles/admin.css'
import LoginInput from './UI/imput/LoginInput'
import LoginButton, { ButtonVariant } from './UI/button/LoginButton'
import AdminSubject from './UI/adminsubject/Subject'

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
            <div style={{display:'flex', flexDirection:'column', border:'2px solid #490514', margin:'5px', padding:'10px', backgroundColor:'#F7F3F3', borderRadius: '5px'}}>
                <div style={{fontSize:'18px'}}>Редактор расписания</div>
                <div style={{display:'flex', flexDirection:'row', margin:'10px 0px 5px 0px'}}>
                    <LoginButton text='Группы' variant={ButtonVariant.outlined}></LoginButton>
                </div>
                <div style={{display:'flex', flexDirection:'row', margin:'5px 0px 5px 0px'}}>
                    <LoginButton text='Дисциплины' variant={ButtonVariant.outlined}></LoginButton>
                </div>
                <div style={{display:'flex', flexDirection:'row', margin:'5px 0px 10px 0px'}}>
                    <LoginButton text='Преподаватели' variant={ButtonVariant.outlined}></LoginButton>
                </div>
                <div style={{display:'flex', flexDirection:'row', margin:'5px 0px 10px 0px'}}>
                    <LoginButton text='Пользователи' variant={ButtonVariant.outlined}></LoginButton>
                </div>
                <div style={{display:'flex', flexDirection:'row', margin:'5px 0px 10px 0px'}}>
                    <LoginButton text='Роли' variant={ButtonVariant.outlined}></LoginButton>
                </div>
                <ul style={{visibility:'hidden'}}>
                {filteredPosts.map(post => (
                    <li key={post.id}>{post.name}</li>
                ))}
                </ul>
                <LoginButton text='Сохранить' variant={ButtonVariant.primary}></LoginButton>
            </div>
            <div style={{width:'80%', border:'2px solid #490514',margin:'5px', overflowX:'auto', overflowY:'auto',whiteSpace:'nowrap', 
            backgroundColor:'#F7F3F3', borderRadius: '5px', scrollbarColor:COLORS.red3}}>
                <div style={{display:'flex'}}>
                    <div style={{display:'flex', flexDirection:'row', margin:'10px 10px 10px 10px'}}>
                        <button style={{margin:'5px', fontSize:'12px'}}>Фильтр</button>
                        <SearchBar text='Введите имя столбца'        
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}/>

                    </div>
                </div>
                <div style={{display:'flex', flexDirection:'column', border:'2px solid lightgray', padding:'5px'}}>
                   <AdminSubject col1='colum1' col2='column2' col3='column3' col4='column4' col5='column5' col6='column6'/>
                   <AdminSubject col1='colum1' col2='column2' col3='column3' col4='column4' col5='column5' col6='column6'/>
                   <AdminSubject col1='colum1' col2='column2' col3='column3' col4='column4' col5='column5' col6='column6'/>
                   <AdminSubject col1='colum1' col2='column2' col3='column3' col4='column4' col5='column5' col6='column6'/>
                   <AdminSubject col1='colum1' col2='column2' col3='column3' col4='column4' col5='column5' col6='column6'/>
                   <AdminSubject col1='colum1' col2='column2' col3='column3' col4='column4' col5='column5' col6='column6'/>





                </div>


            </div>
                
        </main>

    )
}

export default AdminForm2