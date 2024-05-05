import Admin from "../pages/adminpage"
import Admin2 from "../pages/adminpage2"
import TeacherJournal from "../pages/teacherjournalpage"
import Login from "../pages/loginpage"
import TeacherSchedule from "../pages/teacherschedulepage"
import StudentSchedule from "../pages/studentschedulepage"
import StudentJournal from "../pages/studentjournalpage"

export const privateRoutes = [    
    {path: '/admin', element: Admin},
    {path: '/admin2', element: Admin2}, 
    {path: '/teacherSchedule', element: TeacherSchedule},
    {path: '/teacherJournal', element: TeacherJournal},
    {path: '/studentSchedule', element: StudentSchedule},
    {path: '/studentJournal', element: StudentJournal}
]

export const publicRoutes = [
    {path: '/login', element: Login},      
]