import React from 'react';
import griftinLogo from '../assets/griftinLogo.png'
import { Button, Form } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

export default function LoginForm({ googleAPI, setUsuarioActivoParaDrive }) {
    const handleLogIn = async () => {
        try {
            
            let activeUser =JSON.parse(localStorage.getItem('user'));
            console.log("<<<<<ACTIVE USER: ", activeUser);
            if (!activeUser) {
                 await googleAPI.logIn();
                 activeUser =JSON.parse(localStorage.getItem('user'));
            }
            setUsuarioActivoParaDrive(activeUser);
        } catch (error) {
            throw new Error(error);
        }
    }
    return(
        <div style={{ display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      width: '100vw',
                      height: '100vh',
                      backgroundColor: 'gray'}}>
            <Form style={{ backgroundColor: 'white',
                          boxShadow: '0px 8px 32px 0 rgba(0, 0, 255, 0.3)',
                          padding: '0px 16px 16px 16px',
                          borderRadius: '16px ',
                         

                        }}>
                    <img alt="" src={griftinLogo} width="50%"/><br/>

                    <Button 
                        type="primary" 
                        shape="round" icon={<GoogleOutlined />} 
                        // onClick={async () => {await googleAPI.logIn();}}
                        onClick={handleLogIn}
                        >
                        Ingresar con Google
                    </Button>                    
            </Form>

        </div>
    )
}