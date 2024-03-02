import Admin from "../pages/adminpage"
import Admin2 from "../pages/adminpage2"
import Journal from "../pages/journalpage"
import Login from "../pages/loginpage"
import UserSchedule from "../pages/userSchedulePage"

export const privateRoutes = [    
    {path: '/admin', element: Admin},
    {path: '/admin2', element: Admin2}, 
]

export const publicRoutes = [
    {path: '/login', element: Login},      
    {path: '/userSchedule', element: UserSchedule},
    {path: '/journal', element: Journal}
]