import { FC } from 'react'
import LoginInput from './UI/imput/LoginInput'
import LoginButton, { ButtonVariant } from './UI/button/LoginButton'
import LoginLabel, { TextAlign } from './UI/label/LoginLabel'

const LoginForm: FC = () => {

    return (
        <main>
            <div style={{alignSelf:'center',display:'flex',flexDirection:'column',border:'2px solid lightgray',padding:'50px', color:'#371F76'}}>
                <LoginLabel text='Введите ваш email'></LoginLabel>
                <LoginInput></LoginInput>
                <LoginButton variant={ButtonVariant.primary} text='Получить код'></LoginButton>
                
        </div>
        </main>
        

    )
}

export default LoginForm