import Usuario from "../models/usuarios.js";
import bcryptjs from "bcryptjs";

const usuarioPost=async(req, res)=>{
    const {usuario,nombre,apellido,email,contrasena}=req.body
    let salt=bcryptjs.genSaltSync(10)
    const usuarioo=new Usuario({usuario,nombre,apellido,email,contrasena})
    usuarioo.contrasena=bcryptjs.hashSync(contrasena, salt)
    await usuarioo.save()

    res.json({ 
        "msg":"Registro exitoso"
    })
}

const usuarioLogin=async(req, res)=>{
    let {email,contrasena}=req.query
    const usuario=await Usuario.findOne({email})//esto significa que esta buscando un email igual al que el usuario esta digitando solo se poone un email para abrebiar
    const validar=bcryptjs.compareSync(contrasena,usuario.contrasena)
    if(validar)
        res.json({
            "msg":"Bienvenido"
        })
    else
        res.status(401).json({
            "msg":"Error email o contraseña incorrectos"
        })
}


export {usuarioPost,usuarioLogin}