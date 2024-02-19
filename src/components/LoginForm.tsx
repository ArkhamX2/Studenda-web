import { FC, useState } from 'react'
import LoginInput from './UI/imput/LoginInput'
import LoginButton, { ButtonVariant } from './UI/button/LoginButton'
import LoginLabel, { TextAlign } from './UI/label/LoginLabel'
import axios from 'axios'
import { request } from '../request'
import { useAppDispatch } from '../hook'
import { updateUserInfo } from '../store/adminSlice'
import store from '../store'

const LoginForm: FC = () => {
    const dispatch = useAppDispatch()
    const [loginInfo, setLoginInfo] = useState({ login: "", password: "" })
    const [remember, setRemember] = useState(false);
    const LoginClick = async () => {
        if (loginInfo.login != "" && loginInfo.password != "")
        {
            const url = "http://88.210.3.137/api/security/login"
            const response = await axios({
                method: "post",
                url: url,
                data: { email: loginInfo.login, password: loginInfo.password, rolename: "admin" }
            })
            dispatch(updateUserInfo({token:response.data.Token,userId:response.data.User.Id}))
        }
    }
    return (
        <main>
            <div style={{ alignSelf: 'center', display: 'flex', flexDirection: 'column', border: '2px solid lightgray', padding: '50px', color: '#371F76' }}>
                <LoginLabel text='Введите ваш email'></LoginLabel>
                <input autoComplete='on' placeholder='Логин' onChange={(e) => setLoginInfo({ ...loginInfo, login: e.target.value })}></input>
                <input autoComplete='on' type="password" placeholder='Пароль' onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}></input>
                <div>                
                Запомнить меня:                
                <input type="checkbox" onChange={()=>setRemember(!remember)} checked={remember} />
                </div>
                <LoginButton variant={ButtonVariant.primary} text='Войти' onClick={() => LoginClick()}></LoginButton>
            </div>
        </main>


    )
}

export default LoginForm