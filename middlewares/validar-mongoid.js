import mongoose from "mongoose";
import HelperActores from "../helpser/actores.js";



const validarMongoId = async(reparto) => {
  if (reparto.length > 0) {
    for (let i = 0; i < reparto.length; i++) {
      const element = reparto[i].idactor;
      const valido =  mongoose.Types.ObjectId.isValid(element);
      if (!valido) {
        throw new Error("id no valido" );
      }
      const xx=await HelperActores.existeActores(element)  
      if (xx) {
        throw new Error("id no existe" );
      }
    }
  }
};

const validarMongoIdN=async(id) => {
  const validar= mongoose.Types.ObjectId.isValid(id);
  if(!validar) {
    throw new Error("id no valido")
  }
}

const validarRepartoActor=(idactor)=>{
  return new Promise(async (resolve, reject) =>{
    const valido =mongoose.Types.ObjectId.isValid(idactor);
    if(!valido) {
      reject("id no valido")
    }else{
      const xx = await HelperActores.existeActores2(idactor)
      if (!xx) {
        reject("id no existe")
      }
    }
    resolve("");
  })
}

export {validarMongoId,validarMongoIdN,validarRepartoActor}
