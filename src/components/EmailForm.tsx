import { FC } from 'react'
import LoginButton, { ButtonVariant } from './UI/button/LoginButton'
import LoginInput, { TextAlign } from './UI/imput/LoginInput'
import LoginLabel from './UI/label/LoginLabel'

const EmailForm: FC = () => {

    return (
        <main>
            <div style={{alignSelf:'center', display:'flex',flexDirection:'column',border:'2px solid lightgray',padding:'50px', color:'#371F76'}}>
                
                <div style={{textAlign:'center', display:'flex', flexDirection:'column', alignSelf:'center', justifySelf:'center', whiteSpace:'nowrap'}}>
                    <p style={{textAlign:'center', display:'felx', whiteSpace:'normal'}}>ваш.email@mail.com</p>
                    <p style={{whiteSpace:'nowrap',textAlign:'center', display:'flex'}}>На почту был отправлен код<br/>Введите в поле ниже код из письма </p>
                </div>
                
                <LoginInput text='КОД' align={TextAlign.center}></LoginInput>
                <LoginButton variant={ButtonVariant.primary} text='Подтвердить'></LoginButton>
                <LoginButton variant={ButtonVariant.outlined} text='Получить код повторно'></LoginButton>
        </div>
        </main>
        
    )
}

export default EmailForm