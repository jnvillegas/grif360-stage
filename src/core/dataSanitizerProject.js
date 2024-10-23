import { useState } from "react";

export class  DataSanitizerProject {
  

  static sanitizerDataProjecFromAPI = (info) => {    
    let escenas;
    console.log("OBJETO RECIBIDO DESDE API", info)
  let experienceData = {
    id: "",
    escenas: [],
    nombre: "",
    isAnimated: false,
    linkUrl: "",
    titulo360: "",
    redesSociales: {
      facebook: "",
      twitter: "",
      youtube: "",
    },
    otras360: [
      {
        icono: "",
        titulo: "",
        url: "",
        imagen: "",
      },
    ],
  };
    if (info.id) experienceData.id = info.id;
    if (info.name) experienceData.nombre = info.name;
    if (info?.isAnimated !== undefined) {
      experienceData["isAnimated"] = info.isAnimated;
    } else {
      experienceData["isAnimated"] = false;
    }
    if (info?.metadata?.urlLink !== undefined) {
      experienceData["linkUrl"] = info.metadata.urlLink;
    } else {
      experienceData["linkUrl"] = "";
    }

    if (info?.metadata?.titulo360 !== undefined) {
      experienceData["titulo360"] = info.metadata.titulo360;
    } else {
      experienceData["titulo360"] = "";
    }

    if (info?.redesSociales !== undefined) {
      experienceData["redesSociales"] = info.redesSociales;
    } else {
      experienceData["redesSociales"] = {
        facebook: "",
        twitter: "",
        youtube: "",
      };
    }

    if (info?.metadata?.otras360 !== undefined && Array.isArray(info.metadata.otras360)) {
      // Verificar si alguno de los objetos en el array contiene la key "nombre"
      const hasInvalidKey = info.metadata.otras360.some(item => item.hasOwnProperty("nombre"));
      console.log("QUE ES INFO METADATA? ", info.metadata.otras360)
      
      if (!hasInvalidKey) {
        experienceData["otras360"] = info.metadata.otras360;
      } else {
        // Si la lista contiene la key "nombre", se crea un objeto vacío
        experienceData["otras360"] = [
          // {
          //   icono:"camioneta",
          //   titulo: "Nissan Kicks",
          //   url: "https://agnnissan.com.ar/vehiculos/autos/x-trail-e-power/",
          //   imagen: "https://agnnissan.com.ar/wp-content/uploads/2024/03/nissan-kicks.png",
          // }
          // {
          //   icono: "",
          //   titulo: "",
          //   url: "",
          //   imagen: "",
          // }
        ];
      }
    } else {
      // Si no hay datos, se crea un objeto vacío
      experienceData["otras360"] = [
        // {
        //   icono: "",
        //   titulo: "",
        //   url: "",
        //   imagen: "",
        // }
      ];
    }
    
    

    // if (info?.otras360 !== undefined) {
    //   experienceData["otras360"] = info.otras360;
    // } else {
    //   experienceData["otras360"] = [
    //     {
    //       icono: "",
    //       titulo: "",
    //       url: "",
    //       imagen: "",
    //     }
    //   ];
    // }



    if (info.scenes)
      experienceData.escenas = info.scenes.map((e) => {
        return {
          id: e.id,
          titulo: e.title ?? "",
          fondo: e.url ?? "",
          elementos: e.elements
            ? e.elements.map((el) => {
                let r = {
                  id: el.id ?? Date.now(),
                  nombre: el.nombre ?? "",
                  position: el.position ?? { x: 0, y: 0, z: 0 },
                  rotation: el.rotation ?? { x: 0, y: 0, z: 0 },
                  tipo: el.tipo ?? 1,
                };
                if (r.tipo == 0) return { ...r, video: el.video ?? "" };
                if (r.tipo == 1)
                  return {
                    ...r,
                    titulo: el.titulo ?? "",
                    texto: el.texto ?? "",
                  };
                if (r.tipo == 2) return { ...r, escena: el.escena ?? "" };
                if (r.tipo == 3) return { ...r, imagen: el.imagen ?? "" };
              })
            : [],
          principal: e.principal ?? false,
          inicio: e.initial ?? { x: 0, y: 0 },
        };
      });
      
    return experienceData;    
  };

  
};
