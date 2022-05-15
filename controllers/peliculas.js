import peliculas from "../models/peliculas.js";

const peliculasPost=async(req,res)=>{
    const {titulo,subtitulo,fecha,descripcion,genero,duracion,calificacion,imagen,reparto}=req.body;
    const pelicula=new peliculas({titulo,subtitulo,fecha,descripcion,genero,duracion,calificacion,imagen,reparto});
    await pelicula.save();

    res.json({
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

const buscarpeliGet=async(req, res)=>{
    const {titulo}=req.query;
    const pelicula=await peliculas.find({titulo})
    res.json({
        pelicula
    })
}


export {peliculasPost,peliculasGet,buscarpeliGet}