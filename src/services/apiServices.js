




const API_URL = process.env.REACT_APP_BASE_URL;



const apiService = {
//metodo de testing de conexion
 getTest: async () => {
    
 
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error en la petición GET:', error);
    throw error;
  }
 },

 postNewExperience: async (data, token) => {
 console.log("estado del boy de la aplicacion: ", data);
  try {
    const response = await fetch(`${API_URL}/tour360/experience`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const dataResponse = await response.json();
    console.log(dataResponse);
    return dataResponse;
  } catch (error) {
    console.error('Error en la petición POST:', error);
    throw error;
  }
 },

 getExperiencesByUser: async (token) => {
  
   try {
     const response = await fetch(`${API_URL}/tour360/experience`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
       }       
     });
     if (!response.ok) {
       throw new Error(`Error HTTP: ${response.status}`);
     }
     const dataResponse = await response.json();
     console.log(dataResponse);
     return dataResponse;
   } catch (error) {
     console.error('Error en la petición POST:', error);
     throw error;
   }
  },
  getExperienceById: async (token, id) => {    
    
    try {
      const response = await fetch(`${API_URL}/tour360/experience/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }       
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const dataResponse = await response.json();
      console.log(dataResponse);
      return dataResponse;
    } catch (error) {
      console.error('Error en la petición POST:', error);
      throw error;
    }
   },
   postNewScene: async (data) => {
    console.log("iniciando la peticion de post new scence", data);
    try {
      const formData = new FormData();
      formData.append('experienceId', data.experienceId);
      formData.append('title', data.title);
      formData.append('name', data.description);
      formData.append('principal', data.principal);

      const dataOrigen = {
        x: 0,
        y: 0
      }

      formData.append('initial', JSON.stringify(dataOrigen));
      formData.append('elements', JSON.stringify(data.elements));
      // const elementsData = [{
      //   id: '17200190946045',
      //   tipo: 1,
      //   texto: 'Iglesia Estilo Colonial',
      //   nombre: 'datos turísticos',
      //   titulo: 'Datos Históricos',
      //   position: { x: -0.5, y: -1.46, z: -22 },
      //   rotation: { x: 0, y: 0, z: 0 }
      // }];
      
      //formData.append('elements', JSON.stringify(elementsData));
      
      
      formData.append('image360', data.image360);      

      
      // formData.forEach((value, key) => {
      //   console.log(key, value);
      // });
      
      const response = await fetch(`${API_URL}/tour360/scene`, {
        method: 'POST',        
        headers: {               
          'Authorization': `Bearer ${data.token}`
        },
        body: formData
      });
      // console.log("Respuesta al Post de Imagen")
      // console.log(response)
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const dataResponse = await response.json();
      console.log(dataResponse);
      return dataResponse;
    } catch (error) {
      console.error('Error en la petición POST:', error);
      throw error;
    }
   },

   deleteSceneById: async (token, id) => {
    
    try {
      const response = await fetch(`${API_URL}/tour360/scene/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }       
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const dataResponse = await response.json();
      console.log(dataResponse);
      return dataResponse;
    } catch (error) {
      console.error('Error en la petición DELETE:', error);
      throw error;
    }
   },
   updateExperienceById: async (token, id, data) => {
    console.log("DATA DE TITULO RECIBIDA EN EL SERVICE", data)
    
     try {
      const response = await fetch(`${API_URL}/tour360/experience/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
      console.log("Respuesta al PUT DE EXPERIENCIA")
      console.log(response)
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const dataResponse = await response.json();
      console.log(dataResponse);
      return dataResponse;
      
     } catch (error) {
       console.error('Error en la petición PUT:', error);
       throw error;
     }
   },

   updateSceneById: async (token, id, data) => {   
      const formData = new FormData();

      if (data.title) {
        formData.append('title', data.title);
      }
    
      if (data.name) {
        formData.append('name', data.name);
      }
    
      if ('principal' in data) {
        formData.append('principal', data.principal);
      }
      if (data.initial) {
        formData.append('initial', data.initial);
      }
    
      if (data.elements) {
        formData.append('elements', data.elements);
      }
    
      if (data.image360) {
        formData.append('image360', data.image360);
      }

     try {
      const response = await fetch(`${API_URL}/tour360/scene/${id}`, {  
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,      
        },
        body: formData
    });            
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const dataResponse = await response.json();            
      return dataResponse;
      
     } catch (error) {
       console.error('Error en la petición PUT:', error);
       throw error;
     }
   },

   deleteExperienceById: async (token, id) => {       
    try {
     const response = await fetch(`${API_URL}/tour360/experience/${id}`, {
       method: 'DELETE',
       headers: {
           'Authorization': `Bearer ${token}`           
       }       
   });  
      console.log("--------------RESPUESTA AL DELETE EN EL SERVICE-----------")
      console.log(response)    
     if (!response.ok) {
       throw new Error(`Error HTTP: ${response.status}`);
     }
     const dataResponse = await response.json();      
     return dataResponse;
     
    } catch (error) {
      console.error('Error en la petición DELETE experience:', error);
      throw error;
    }
  },



 

  // Método para obtener datos
  getData: async (endpoint) => {
    try {
      //const response = await fetch(`${API_URL}/${endpoint}`);
      const response = await fetch('/mockData.json');
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error en la petición GET:', error);
      throw error;
    }
  },

  // getExperienceById: async (id) => {
  //   try {
  //     const response = await fetch('/mockData.json');
  //     if (!response.ok) {
  //       throw new Error(`Error HTTP: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     const experience = data.find(x => x.id === id);      
  //     return experience;      
  //   } catch (error) {
  //     console.error('Error en la petición GET:', error);
  //     throw error;
  //   }
  // },

  // Método para enviar datos (POST)
  postData: async ( payload={message:"Hello World!"}) => {
    try {
      const response = await fetch('/mockData.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la petición POST:', error);
      throw error;
    }
  },

  //metodo para enviar imagen a Cloudinary
  postImage: async (imageBynarized) => {
    const preset_name = "q93jy2fr";
 const cloud_name = "xxavierargentino";

    try {
      const formData = new FormData();
      formData.append('file', imageBynarized);
      formData.append('upload_preset', preset_name);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      
    }
  },

  // Método para actualizar datos (PUT)
  putData: async (endpoint, payload) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la petición PUT:', error);
      throw error;
    }
  },

  // Método para eliminar datos (DELETE)
  deleteData: async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.status === 204;
    } catch (error) {
      console.error('Error en la petición DELETE:', error);
      throw error;
    }
  }
};

export default apiService;
