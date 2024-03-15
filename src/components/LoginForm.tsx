import { FC, useState } from 'react'
import LoginInput, { TextAlignEnum } from './UI/imput/LoginInput'
import LoginButton, { ButtonVariant } from './UI/button/LoginButton'
import LoginLabel, { TextAlign } from './UI/label/LoginLabel'
import axios from 'axios'
import { RequestValue, request } from '../base/Request'
import { useAppDispatch } from '../hook'
import { updateAccountInfo } from '../store/adminSlice'
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
                data: { email: loginInfo.login, password: loginInfo.password}
            })
            dispatch(updateAccountInfo({token:response.data.Token,accountId:response.data.Account.Id}))
        }
    }
    return (
        <main>
            <div style={{ alignSelf: 'center', display: 'flex', flexDirection: 'column', border: '2px solid lightgray', padding: '50px', color: '#371F76', borderRadius:'8px'}}>
                <LoginLabel text='Введите ваш email'></LoginLabel>
                <LoginInput autoComplete='on' text='Логин' onChange={(e) => setLoginInfo({ ...loginInfo, login: e.target.value })} align={TextAlignEnum.left}></LoginInput>
                <LoginInput autoComplete='on' text='Пароль' type='password' onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })} align={TextAlignEnum.left}></LoginInput>
                <LoginLabel text='Запомни меня:'>
                    <input type="checkbox" onChange={()=>setRemember(!remember)} checked={remember} style={{margin:'5px', borderRadius:'10px', border:'2px solid lightgray', height:'15px'}} />
                </LoginLabel>
                <LoginButton variant={ButtonVariant.primary} text='Войти' onClick={() => LoginClick()}></LoginButton>
            </div>
        </main>
    )
}

export default LoginForm