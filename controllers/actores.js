import Actores from "../models/actores.js";
import * as fs from 'fs'
import path from 'path'
import url from 'url'
import subirArchivo from "../helpser/subir-archivo.js";
import { v2 as cloudinary } from 'cloudinary'

const actorPost=async(req, res)=>{ 
    const{nombre,observaciones}=req.body
    const actor=new Actores({nombre,observaciones})
    await actor.save()
    res.json({
        actor
    })
}

const actorGet=async(req, res)=>{
    const actor=await Actores.find()
    res.json({actor})
}

const actorBuscar=async(req, res)=>{
    const {nombre}=req.query;
    const actor=await Actores.find({nombre})
    res.json({actor})
}

const actorBuscarId=async(req, res)=>{
    const {id}=req.params;
    const idActor=await Actores.findById(id)
    res.json({idActor})
}

const mostrarImagen= async (req, res) => {
    const { id } = req.params

    try {
        let actor = await Actores.findById(id)
        if (actor.foto) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', actor.foto);
            if (fs.existsSync(pathImage)) {
                return res.sendFile(pathImage)
            }
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
            let actor = await Actores.findById(id);
            //si el usuario ya tiene foto la borramos
            if (actor.foto) {
                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                const pathImage = path.join(__dirname, '../uploads/', actor.foto);
                
                if (fs.existsSync(pathImage)) {               
                    fs.unlinkSync(pathImage)
                }
                
            }
           
            actor= await Actores.findByIdAndUpdate(id, { foto: nombre })
            //responder
            res.json({ nombre });
        } catch (error) {
            res.status(400).json({ error, 'general': 'Controlador' })
        }
}

const cargarArchivoCloudA= async (req, res) => {
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
                    let actor = await Actores.findById(id);
                    if (actor.foto) {
                        const nombreTemp = actor.foto.split('/')
                        const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                        const [public_id] = nombreArchivo.split('.')
                        cloudinary.uploader.destroy(public_id)
                    }
                    actor = await Actores.findByIdAndUpdate(id, { foto: result.url })
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


const mostrarImagenCloudA= async (req, res) => {
    const { id } = req.params

    try {
        let actor = await Actores.findById(id)
        if (actor.foto) {
            return res.json({ url: actor.foto })
        }
        res.status(400).json({ msg: 'Falta Imagen' })
    } catch (error) {
        res.status(400).json({ error })
    }
}


const editarPut=async(req, res)=>{
    const {nombre,observaciones}=req.body
    const {id}=req.params;
    const actorEditar=await Actores.findByIdAndUpdate(id,{nombre,observaciones})
    res.json({
        "msg":`Datos modificados con exito`
    })
}

const actorBorrarId=async(req, res)=>{
    const {id}=req.params;
    const idActor=await Actores.findByIdAndDelete(id)
    res.json({
        "msg":"Eliminado exitosamente"
    })
}

export{cargarArchivoCloudA,mostrarImagenCloudA,actorPost,actorGet,actorBuscar,actorBuscarId,fotoPut,editarPut,actorBorrarId,mostrarImagen}