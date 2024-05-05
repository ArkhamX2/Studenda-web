import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router';
import { RootState } from '../store';
import { ConnectedProps, connect } from 'react-redux'

const mapState=(state:RootState)=>(
    {
        Token:state.account.Token
    }
)

type PropsFromRedux = ConnectedProps<typeof connector>

const connector = connect(mapState)

const AppRouter = (props: PropsFromRedux) => { 
    return (           
           <Routes>
                {publicRoutes.map(route =>
                    <Route
                        Component={route.element}
                        path={route.path}
                        key={route.path} />
                )}
                {props.Token!=""?privateRoutes.map(route =>
                    <Route
                        Component={route.element}
                        path={route.path}
                        key={route.path} />
                ):<></>}
                <Route path="*" element={<Navigate to="/login" replace/>}/>
            </Routes>
    )
}

export default connector(AppRouter)