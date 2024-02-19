import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router';
import store from '../store';
import { useState } from 'react';

const AppRouter = () => {
    const unsubscribe = store.subscribe(handleTokenChange)
    const [loginStatus, setLoginStatus] = useState(false)
    function handleTokenChange() {
        const token=store.getState().admin.Token
        if (token != "")
        {
            setLoginStatus(true)
        }
        else
        {
            setLoginStatus(false)
        }
    }  
    return (           
           <Routes>
                {publicRoutes.map(route =>
                    <Route
                        Component={route.element}
                        path={route.path}
                        key={route.path} />
                )}
                {loginStatus?privateRoutes.map(route =>
                    <Route
                        Component={route.element}
                        path={route.path}
                        key={route.path} />
                ):<></>}
                <Route path="*" element={<Navigate to="/login" replace/>}/>
            </Routes>
    )
}

export default AppRouter