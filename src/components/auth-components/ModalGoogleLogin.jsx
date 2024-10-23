import ReactDOM from 'react-dom';

import {  Modal } from 'antd';
import { useEffect, useState } from 'react';
import  FormLogin  from './FormLogin';
import FormRegister from './FormRegister';
import LoginForm from '../loginForm';


export const ModalGoogleLogin = ({
  googleAPI,
  setUsuarioActivoParaDrive
}) => {
  const [isOpen, setIsOpen] = useState(true)
  

  const handleCloseModal = (e) => {    
    //e.preventDefault()    
    setIsOpen(false)
  }

  const handleOnCancel = () => {
  //  setModo(true);
    setIsOpen(false)
  }

  

  return ReactDOM.createPortal(    
        
          <Modal open={isOpen}       
           onCancel={handleOnCancel}
           width={'50%'}
           //height={'50%'}
           centered
           styles={{
            content: {
              backgroundColor: 'rgba(255,255,255,0.9)'
            },
           header: {
              backgroundColor: 'rgba(255,255,255,0)',
              marginBottom: '20px'
            }
            
            }}
            footer={[              
            ]}
            closable={true}
            >
              <LoginForm googleAPI={googleAPI} setUsuarioActivoParaDrive={setUsuarioActivoParaDrive}/>

              
            </Modal>
        
    ,document.getElementById('modal')
  )
}
