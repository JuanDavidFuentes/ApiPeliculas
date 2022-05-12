import Usuario from "../models/usuarios.js";
import bcryptjs from "bcryptjs";

const usuarioPost=async(req, res)=>{
    const {nombre,apellido,email,contrasena}=req.body
    let salt=bcryptjs.genSaltSync(10)
    const usuario=new Usuario({nombre,apellido,email,contrasena})
    usuario.contrasena=bcryptjs.hashSync(contrasena, salt)
    await usuario.save()

    res.json({ 
        "msg":"Registro exitoso"
    })
}



export {usuarioPost}