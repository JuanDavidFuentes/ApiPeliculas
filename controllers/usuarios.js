import Usuario from "../models/usuarios.js";
import bcryptjs from "bcryptjs";
import subirArchivo from "../helpser/subir-archivo.js";
import * as fs from 'fs'
import path from 'path'
import url from 'url'
import { generarJWT } from "../middlewares/Validarjwt.js";
import { v2 as cloudinary } from 'cloudinary';



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

const mostrarImagen= async (req, res) => {
    const { id } = req.params

    try {
        let usuario = await Usuario.findById(id)
        if (usuario.foto) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', usuario.foto);
            if (fs.existsSync(pathImage)) {
                return res.sendFile(pathImage)
            }
        }
        res.status(400).json({ msg: 'Falta Imagen' })
    } catch (error) {
        res.status(400).json({ error })
    }
}


const cargarArchivoCloud= async (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
        secure: true
    });

    const { id } = req.params;
    try {
        //subir archivo
        const { tempFilePath } = req.files.archivo
        cloudinary.uploader.upload(tempFilePath,
            { width: 250, crop: "limit" },
            async function (error, result) {
                if (result) {
                    let usu = await Usuario.findById(id);
                    if (usu.foto) {
                        const nombreTemp = usu.foto.split('/')
                        const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                        const [public_id] = nombreArchivo.split('.')
                        cloudinary.uploader.destroy(public_id)
                    }
                    usu = await Usuario.findByIdAndUpdate(id, { foto: result.url })
                    //responder
                    res.json({ url: result.url });
                } else {
                    res.json(error)
                }

            })
    } catch (error) {
        res.status(400).json({ error, 'general': 'Controlador' })
    }
}

const mostrarImagenCloud= async (req, res) => {
    const { id } = req.params

    try {
        let usu = await Usuario.findById(id)
        if (usu.foto) {
            return res.json({ url: usu.foto })
        }
        res.status(400).json({ msg: 'Falta Imagen' })
    } catch (error) {
        res.status(400).json({ error })
    }
}


const fotoPut=async(req, res)=>{
    const { id } = req.params;
        try {
            let nombre
            await subirArchivo(req.files, undefined)
                .then(value => nombre = value)
                .catch((err) => console.log(err));

            //persona a la cual pertenece la foto
            let usu = await Usuario.findById(id);
            //si el usuario ya tiene foto la borramos
            if (usu.foto) {
                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                const pathImage = path.join(__dirname, '../uploads/', usu.foto);
                
                if (fs.existsSync(pathImage)) {               
                    fs.unlinkSync(pathImage)
                }
                
            }
           
            usu= await Usuario.findByIdAndUpdate(id, { foto: nombre })
            //responder
            res.json({ nombre });
        } catch (error) {
            res.status(400).json({ error, 'general': 'Controlador' })
        }
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
    const {usuario,nombre,apellido,contrasena}=req.body
    const {id}=req.params;
    let salt=bcryptjs.genSaltSync(10)
    const usuarioo=await Usuario.findByIdAndUpdate(id,{usuario,nombre,apellido,contrasena})
    usuarioo.contrasena=bcryptjs.hashSync(contrasena, salt)
    await usuarioo.save()
    res.json({ 
        "msg":"Editado con exitoso"
    })
}



const usuarioLogin=async(req, res)=>{
    const { email, contrasena } = req.body;

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


export {mostrarImagenCloud,cargarArchivoCloud,usuarioPost,usuarioLogin,listarUsuarios,listarId,buscarUsuario,fotoPut,activarPut,desactivarPut,editarUsuarioDenuestraapiPeliculasPutAloJholman,mostrarImagen}