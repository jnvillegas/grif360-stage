import { Button, Card, Checkbox, Modal, Slider } from "antd";
import React, { useContext, useEffect, useState } from "react";
import apiService from "../services/apiServices";
import { AuthContext } from "../context/auth-context/AuthContext";
import ModalSinPortal from "../core/components/ModalSinPortal";
import LoadingSpin from "./loadingSpin";

export default function SceneInspector({
  //proyecto,
  escena,
  guardarCambios,
  modo,
  actualizarExperienciaAPI,
  cambiarTabKey,
}) {
  const [isHover, setIsHover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rotEditing, setRotEditing] = useState(escena.inicio || { x: 0, y: 0 });
  const { handleRefreshToken } = useContext(AuthContext);
  //state que maneja los mensajes del modal sin portal
  const [dataModal, setDataModal] = useState({
    titulo: "",
    mensaje: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  //state que maneja el modal de confirmacion
  const [dataModalConfirmacion, setDataModalConfirmacion] = useState({
    title: "Confirmar",
    open: isModalOpen,
    onOk: () => {},
    onCancel: () => {},
    okText: "Confirmar",
    cancelText: "Cancelar",
    message: "Confirmar Accion",
  });

  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  

  const activarPrincipal = (e) => {
    escena.principal = e.target.checked;
    if (!modo) {
      console.log("ACTUALIZANDO EL PRINCIPAL!!!");
      console.log("escena actualizada", escena);
      setDataModalConfirmacion({
        title: "Confirmar Principal",
        open: true, 
        onOk:()=> {
          guardarCambios(escena);
          setIsModalOpen(false);
        }, 
        onCancel: cancelarAccion, 
        okText: "Confirmar",
        cancelText: "Cancelar",
        message: "Confirme el cambio de escena principal",
      }); 
      setIsModalOpen(true); 
    }else{
      
      guardarCambios(escena);
      setIsModalOpen(false);
    }
  };

  const alCambiarRot = (e) => {
    console.log("alCambiarRot", e);
    setRotEditing({ x: e.x, y: e.y });
    let valorX = (e.x * Math.PI) / 180;
    let valorY = ((e.y * Math.PI) / 180) * -1;

    let camara = document.getElementById("camara");
    camara.components["look-controls"].pitchObject.rotation.x = valorX;
    camara.components["look-controls"].yawObject.rotation.y = valorY;
    escena.inicio = e;
  };

  const eliminarEscena = async () => {
    setIsLoading(true);
    try {
      const tokenVerified = await handleRefreshToken();
      await apiService.deleteSceneById(tokenVerified, escena.id);
      setSuccess(true);
      setDataModal({
        titulo: "Exito",
        mensaje: `Ha eliminado la escena!`,
      });
      setShowModal(true);
      actualizarExperienciaAPI();
      cambiarTabKey(1);
    } catch (error) {
      setSuccess(false);
      setIsLoading(false);
      setDataModal({
        titulo: "Error",
        mensaje: "Ha sucedido un error al eliminar la escena...",
      });
      setShowModal(true);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };
  

  const mostrarModalConfirmacion = (action) => {
    if(action === "eliminar") {
      setDataModalConfirmacion({
        title: "Confirmar Eliminacion",
        open: true, 
        onOk: eliminarEscena, 
        onCancel: cancelarAccion, 
        okText: "Confirmar",
        cancelText: "Cancelar",
        message: "Confirme la eliminacion de la escena",
      });  
    }
    // else if(action === "principal") {
    //   setDataModalConfirmacion({
    //     title: "Confirmar Principal",
    //     open: true, 
    //     onOk: activarPrincipal, 
    //     onCancel: cancelarAccion, 
    //     okText: "Confirmar",
    //     cancelText: "Cancelar",
    //     message: "Confirme el cambio de escena principal",
    //   });  
    // }
    else {
      return;
    }
    
    setIsModalOpen(true);
    
  };
  
  const cancelarAccion = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("cambioEscena:", escena);
    let camara = document.getElementById("camara");
    console.log("look", escena.inicio);
    let valorX = (escena.inicio.x * Math.PI) / 180;
    let valorY = ((escena.inicio.y * Math.PI) / 180) * -1;
    if (camara && camara.components && camara.components["look-controls"]) {
      camara.components["look-controls"].pitchObject.rotation.x = valorX;
      camara.components["look-controls"].yawObject.rotation.y = valorY;
    }

    setRotEditing(escena.inicio);
  }, [escena]);

  return (
    <>
      <h1
        style={{
          textAlign: "left",
        }}
      >
        {escena.titulo}
      </h1>
      <Card
        title="Principal: "
        size="small"
        style={{
          textAlign: "left",
        }}
      >
        <Checkbox
          checked={escena.principal}
           //onChange={()=>mostrarModalConfirmacion("principal")}
           onChange={activarPrincipal}
          disabled={escena.principal}
        >
          Establecer como Principal
        </Checkbox>
      </Card>
      <Card
        title="Vista Inicial: "
        size="small"
        style={{
          textAlign: "left",
        }}
      >
        <label>Eje X</label>
        <Slider
          onChangeComplete={() => guardarCambios(escena)}
          defaultValue={0}
          step={0.01}
          max={180}
          min={-180}
          value={rotEditing.x}
          onChange={(v) => alCambiarRot({ ...rotEditing, x: v })}
          disabled={!escena}
        />
        <label>Eje Y</label>
        <Slider
          onChangeComplete={() => guardarCambios(escena)}
          defaultValue={0}
          step={0.01}
          max={180}
          min={-180}
          value={rotEditing.y}
          onChange={(v) => alCambiarRot({ ...rotEditing, y: v })}
          disabled={!escena}
        />
      </Card>

      {!modo && (
        <Card>
          <Button
            type={isHover ? "primary" : "default"}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            danger
            onClick={() => mostrarModalConfirmacion("eliminar")}
          >
            Eliminar Escena
          </Button>
        </Card>
      )}
      <ModalSinPortal
        titulo={dataModal.titulo}
        mensaje={dataModal.mensaje}
        setIsVisible={setShowModal}
        isVisible={showModal}
        success={success}
      />

      <LoadingSpin visible={isLoading} />
      <Modal
         title={dataModalConfirmacion.title}
         open={isModalOpen}
         onOk={dataModalConfirmacion.onOk}
         onCancel={dataModalConfirmacion.onCancel}
         okText={dataModalConfirmacion.okText}
         cancelText={dataModalConfirmacion.cancelText}
      >
        <p>{dataModalConfirmacion.message}</p>
      </Modal>

      {/* <Modal
        title="Confirmar"
        open={isModalOpen}
        onOk={eliminarEscena}
        onCancel={cancelarEliminacion}
        okText="Cofirmar"
        cancelText="Cancelar"
      >
        <p>Esta Seguro que Desea Eliminar esta Escena?</p>
      </Modal> */}
    </>
  );
}
