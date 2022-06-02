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

const listarUsuarios=async(req, res)=>{
    const usu=await Usuario.find()
    res.json({usu})
}

const listarId=async(req, res)=>{
    const {id}=req.params;
    const listar=await Usuario.findById(id)
    res.json({listar})
}


const buscarUsuario=async(req, res)=>{
    const {valorABuscar}=req.query;
    const usuarioN=await Usuario.find({$or:[
        { nombre: { $regex: valorABuscar  } },
        { email: { $regex: valorABuscar  } },
    ]})
    res.json({
        usuarioN
    })

}

const fotoPut=async(req, res)=>{
    const {foto}=req.body
    const {id}=req.params;
    const fotoU=await Usuario.findByIdAndUpdate(id,{foto})
    res.json({
        "msg":"foto insertado con exito"
    })
}

const modificarPut=async(req, res)=>{
    const {usuario,nombre,apellido,email,contrasena}=req.body
    const {id}=req.params;
    const editar=await Usuario.findByIdAndUpdate(id,{usuario,nombre,apellido,email,contrasena})
    res.json({
        "msg":"Datos editados con exito"
    })
}


const activarPut=async(req, res)=>{
    const {id}=req.params;
    const activar=await Usuario.findByIdAndUpdate(id,{estado:1})
    res.json({
        "msg":"El usuario esta activado"
    })
}

const desactivarPut=async(req, res)=>{
    const {id}=req.params;
    const activar=await Usuario.findByIdAndUpdate(id,{estado:0})
    res.json({
        "msg":"El usuario esta desactivado"
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


export {usuarioPost,usuarioLogin,listarUsuarios,listarId,buscarUsuario,fotoPut,modificarPut,activarPut,desactivarPut}