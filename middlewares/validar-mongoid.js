import mongoose from "mongoose";

const validarMongoId = async(reparto) => {
  if (reparto.length > 0) {
    for (let i = 0; i < reparto.length; i++) {
      const element = reparto[i].idactor;
      const valido =  mongoose.Types.ObjectId.isValid(element);
      if (!valido) {
        throw new Error("id no valido" );
      }
    }
  }
};

const validarMongoIdN=async(_id) => {
  const validar= mongoose.Types.ObjectId.isValid(_id);
  if(!validar) {
    throw new Error("id no valido")
  }
}

export {validarMongoId,validarMongoIdN}
