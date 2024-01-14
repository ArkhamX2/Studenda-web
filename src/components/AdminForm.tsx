import { FC, useState } from 'react'
import Selector from './UI/selector/Selector'
import ScheduleTable from './UI/table/ScheduleTable'
import SearchBar from './UI/searchbar/SearchBar'
import { useAppDispatch } from '../hook'
import { aboba } from '../store/testSlice'
import { COLORS } from '../styles/colors'
import '../styles/admin.css'

const AdminForm: FC = () => {
    const dispatch = useAppDispatch()
    const posts = [
        { id: '1', name: 'Предмет1' },
        { id: '2', name: 'Бибабоба' },
        { id: '3', name: 'Преподаватель2' },
        { id: '4', name: 'Чтучка' },
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
        <main style={{display:'flex', backgroundColor:'white', maxHeight: '90svh'}}>
            <div style={{display:'flex', flexDirection:'column', border:'2px solid', margin:'5px', padding:'10px', backgroundColor:'#F7F3F3', borderRadius: '5px'}}>
                <div style={{fontSize:'18px'}}>Редактор расписания</div>
                <div style={{display:'flex', flexDirection:'row', margin:'10px 0px 5px 0px'}}>
                    <SearchBar text='Введите группу'        
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    label='Группа'/>
                </div>
                <div style={{display:'flex', flexDirection:'row', margin:'5px 0px 5px 0px'}}>
                    <SearchBar text='Введите курс'        
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    label='Курс'/>
                </div>
                <div style={{display:'flex', flexDirection:'row', margin:'5px 0px 10px 0px'}}>
                    <SearchBar text='Введите факультет'        
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    label='Факультет'/>
                </div>
                <ul style={{visibility:'hidden'}}>
                {filteredPosts.map(post => (
                    <li key={post.id}>{post.name}</li>
                ))}
                </ul>
            </div>
            <div style={{width:'80%', border:'2px solid',margin:'5px', overflowX:'auto', overflowY:'auto',whiteSpace:'nowrap', 
            backgroundColor:'#F7F3F3', borderRadius: '5px', scrollbarColor:COLORS.red3}}>
               <ScheduleTable>

               </ScheduleTable>
            </div>
            <button onClick={()=>dispatch(aboba(String(prompt())))}>Тест кнопочка</button>
                
        </main>

    )
}

export default AdminForm