import Usuarios from "../models/usuarios.js";

const HelperUsuario={
    existeEmail:async(email)=>{
        if(email){
            const existe=await Usuarios.findOne({email})
            if(existe) throw new Error("Correo existente en la Base de datos")
        }
    },
    
    existeUsuario:async(id)=>{
        const existe =await Usuarios.findById(id)
        if(! existe) throw new Error("Usuario no existe en la base de datos")
    },
    noexisteEmail:async(email)=>{
        if(email){
            const existe=await Usuarios.findOne({email})
            if(!existe) throw new Error("Correo no existe Base de datos")
        }
    },
}



export default HelperUsuario