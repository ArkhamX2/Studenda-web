import Admin from "../pages/adminpage"
import Admin2 from "../pages/adminpage2"
import Journal from "../pages/journalpage"
import Login from "../pages/loginpage"
import AccountSchedule from "../pages/userSchedulePage"

export const privateRoutes = [    
    {path: '/admin', element: Admin},
    {path: '/admin2', element: Admin2}, 
    {path: '/userSchedule', element: AccountSchedule},
    {path: '/journal', element: Journal}
]

export const publicRoutes = [
    {path: '/login', element: Login},      
]