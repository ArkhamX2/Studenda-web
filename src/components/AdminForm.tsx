import { FC, useState } from 'react'
import Selector from './UI/selector/Selector'
import ScheduleTable from './UI/table/ScheduleTable'
import LoginInput, { TextAlign } from './UI/imput/LoginInput'
import LoginButton, { ButtonVariant } from './UI/button/LoginButton'
<<<<<<< Updated upstream
import { useAppDispatch } from '../hook'
import { aboba } from '../store/testSlice'

const AdminForm: FC = () => {
    const dispatch = useAppDispatch()
=======
import SearchBar from './UI/searchbar/SearchBar'

const AdminForm: FC = () => {
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
    
>>>>>>> Stashed changes

    return (
        <main style={{display:'flex', backgroundColor:'white', maxHeight: '90svh'}}>
            <div style={{display:'flex', flexDirection:'column', border:'2px solid black', margin:'5px', padding:'10px'}}>
                <div style={{display:'flex', flexDirection:'row', margin:'10px 0px 10px 0px'}}>
                    <SearchBar text='Введите группу' align={TextAlign.left}         
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}/>
                </div>
                <ul>
                {filteredPosts.map(post => (
                    <li key={post.id}>{post.name}</li>
                ))}
            </ul>
              <Selector name="faculty" id='faculty-select' text='Факультет'></Selector>
              <Selector name="course" id='course-select' text='Курс'></Selector>
              <Selector name="group" id='group-select' text='Группа'></Selector>
              <LoginButton text='Допустим отправить' variant={ButtonVariant.primary}></LoginButton>
            </div>
            <div style={{width:'80%', border:'2px solid black', margin:'5px', overflowX:'auto', overflowY:'auto',whiteSpace:'nowrap'}}>
               <ScheduleTable>

               </ScheduleTable>
            </div>
            <button onClick={()=>dispatch(aboba(String(prompt())))}>Тест кнопочка</button>
                
        </main>

    )
}

export default AdminForm