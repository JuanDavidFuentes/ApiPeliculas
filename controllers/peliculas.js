import peliculas from "../models/peliculas.js";
import * as fs from 'fs'
import path from 'path'
import url from 'url'
import subirArchivo from "../helpser/subir-archivo.js";
import { v2 as cloudinary } from 'cloudinary'

const peliculasPost=async(req,res)=>{
    const {titulo,subtitulo,fecha,descripcion,genero,duracion,calificacion,reparto}=req.body;
    const pelicula=new peliculas({titulo,subtitulo,fecha,descripcion,genero,duracion,calificacion,reparto});
    await pelicula.save();

    res.json({
        pelicula,
        "msg":"Pelicula creada exitosamente."
    })
}

const peliculasGet = async(req, res)=>{
    const pelicula=await peliculas
    .find()
    .populate("reparto.idactor",["nombre","foto","observaciones"])
    res.json({
        pelicula
    })
}

//listar por titulo
const buscarpeliGet=async(req,res)=>{
    const {titulo}=req.query
    const pelicula = await peliculas.find(
        {
            $or: [
                { titulo: new RegExp(titulo, "i") },
            ]
        }
    )
    .populate("reparto.idactor",["nombre","foto","observaciones"])
    res.json({pelicula})
}


const idGetPeli=async(req, res)=>{
    const {id}=req.params;
    const idPeli=await peliculas.findById(id)
    res.json({idPeli})
}

const actorBuscarGet=async(req, res)=>{
    const {id}=req.params;
    const peli= await peliculas.find().where('reparto.idactor').in(id).exec();
    res.json({peli})
}


const posterPut=async(req, res)=>{
    const { id } = req.params;
        try {
            let nombre
            await subirArchivo(req.files, undefined)
                .then(value => nombre = value)
                .catch((err) => console.log(err));

            //persona a la cual pertenece la foto
            let peli = await peliculas.findById(id);
            //si el usuario ya tiene foto la borramos
            if (peli.imagen) {
                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                const pathImage = path.join(__dirname, '../uploads/', peli.imagen);
                
                if (fs.existsSync(pathImage)) {               
                    fs.unlinkSync(pathImage)
                }
                
            }
           
            peli= await peliculas.findByIdAndUpdate(id, { imagen: nombre })
            //responder
            res.json({ nombre });
        } catch (error) {
            res.status(400).json({ error, 'general': 'Controlador' })
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
                    let pelicula = await peliculas.findById(id);
                    if (pelicula.imagen) {
                        const nombreTemp = pelicula.imagen.split('/')
                        const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                        const [public_id] = nombreArchivo.split('.')
                        cloudinary.uploader.destroy(public_id)
                    }
                    pelicula = await peliculas.findByIdAndUpdate(id, { imagen: result.url })
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
        let pelicula = await peliculas.findById(id)
        if (pelicula.imagen) {
            return res.json({ url: pelicula.imagen })
        }
        res.status(400).json({ msg: 'Falta Imagen' })
    } catch (error) {
        res.status(400).json({ error })
    }
}

const mostrarImagen= async (req, res) => {
    const { id } = req.params

    try {
        let peli = await peliculas.findById(id)
        if (peli.imagen) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', peli.imagen);
            if (fs.existsSync(pathImage)) {
                return res.sendFile(pathImage)
            }
        }
        res.status(400).json({ msg: 'Falta Imagen' })
    } catch (error) {
        res.status(400).json({ error })
    }
}


const modificarPut=async(req, res)=>{
    const {titulo,subtitulo,fecha,descripcion,genero,duracion,calificacion,reparto}=req.body
    const {id}=req.params;
    const editar=await peliculas.findByIdAndUpdate(id,{titulo,subtitulo,fecha,descripcion,genero,duracion,calificacion,reparto})
    res.json({
        "msg":"Pelicula editada con exito"
    })
}

const eliminarPeli=async(req, res)=>{
    const {id}=req.params;
    const peli=await peliculas.findByIdAndDelete(id)
    res.json({
        "msg":"Se elimino exitosamente"
    })
}



export {cargarArchivoCloud,mostrarImagenCloud,peliculasPost,peliculasGet,mostrarImagen,buscarpeliGet,idGetPeli,actorBuscarGet,posterPut,modificarPut,eliminarPeli}