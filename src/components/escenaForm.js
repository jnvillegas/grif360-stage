import React, { useState } from "react";
import { Button, Form, Input, Modal, Upload } from 'antd';

export default function EscenaForm({visible, alCerrar, alAceptar, modo}){    
    const [form] = Form.useForm();
    const [imagen, setImagen] = useState(null);

    const handleBeforeUpload = (file) => {
      if (modo) {
          // Usar FileReader si modo es true
          const reader = new FileReader();
          reader.onload = e => {
              console.log(e.target.result);
              setImagen(e.target.result); // Guardar la imagen como DataURL
          };
          reader.readAsDataURL(file);
      } else {
          // Guardar el archivo directamente si modo es false
          setImagen(file); // Guardar el archivo en el estado
      }
      
      return false; // Prevenir el comportamiento por defecto de subir el archivo
  };
 
    return (<Modal
        open={visible}
        title="Crear nueva Escena"
        okText="Crear"
        cancelText="Cancelar"
        onCancel={() => {            
            alCerrar();
          }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {    
              console.log(values)  
              values.imageContent = imagen;             
              alAceptar(values);
              form.resetFields();
              //onCreate(values);
            })
            .catch((info) => {
              console.log('No puede Continuar:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="escenaForm"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Form.Item
            name="titulo"
            label="Titulo"
            rules={[
              {
                required: true,
                message: 'Ingrese el titulo de la Escena',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="descripcion" label="Descripcion">
            <Input type="textarea" />
          </Form.Item>
          <Form.Item name="imagen" label="Imagen 360°" rules={[
              {
                required: true,
                message: 'Seleccione una imagen 360',
              }]}>

          <Upload accept=".png, .jpg" 
                    maxCount={1}
                    beforeUpload={handleBeforeUpload}
                    
            ><Button type="primary">Click para subir Imagen</Button>
            </Upload>
                
            {/* <Upload accept=".png, .jpg" 
                    maxCount={1}
                    beforeUpload={file => {
                      
                      const reader = new FileReader();
              
                      reader.onload = e => {
                          console.log(e.target.result);
                          setImagen(e.target.result)
                      };
                      reader.readAsDataURL(file);
              
                      // Prevent upload
                      return false;
                    }}
                    
            ><Button type="primary">Click para subir Imagen</Button>
            </Upload> */}
          </Form.Item>
        </Form>
      </Modal>);
}

