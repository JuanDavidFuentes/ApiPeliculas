import Usuario from "../models/usuarios.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/Validarjwt.js";


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


const editarUsuarioDenuestraapiPeliculasPutAloJholman=async(req,res)=>{
    const {usuario,nombre,apellido,email,contrasena}=req.body
    const {id}=req.params;
    let salt=bcryptjs.genSaltSync(10)
    const usuarioo=await Usuario.findByIdAndUpdate(id,{usuario,nombre,apellido,email,contrasena})
    usuarioo.contrasena=bcryptjs.hashSync(contrasena, salt)

    res.json({ 
        "msg":"Editado con exitoso"
    })
}


const usuarioLogin=async(req, res)=>{
    const { email, contrasena } = req.query;

        try {
            const usuario = await Usuario.findOne({ email })
            if (!usuario) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                })
            }


            if (usuario.estado === 0) {
                return res.status(400).json({
                    msg: "Usuario Inactivo"
                })
            }

            const validPassword = bcryptjs.compareSync(contrasena, usuario.contrasena);
            if (!validPassword) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                })
            }

            const token = await generarJWT(usuario.id);

            res.json({
                usuario,
                token
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
}


export {usuarioPost,usuarioLogin,listarUsuarios,listarId,buscarUsuario,fotoPut,activarPut,desactivarPut,editarUsuarioDenuestraapiPeliculasPutAloJholman}