import { FC, ReactNode } from "react";

interface WrapperProps {
    children?: ReactNode;
    title?: string;
}

//Закрывается если зажать внутри и отпустить снаружи
const InputWrapper: FC<WrapperProps> = (props) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', margin: '5px 0px', borderLeft: '2px solid #8C2425', borderRadius: '5px', padding: '2px 5px', backgroundColor: '#F0EAE9', width: '100%' }}>
            <div style={{ alignSelf: 'start', fontSize: '20px', fontWeight: '600', margin: '5px' }}>{props.title?.toUpperCase()}</div>
            <div style={{
                borderBottom: '3px solid #e9262c',
                borderRadius: '4px',
                backgroundColor: "#E9DFDE",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '5px',
            }}>
                {props.children}
            </div>
        </div>
    );
}

export default InputWrapper;