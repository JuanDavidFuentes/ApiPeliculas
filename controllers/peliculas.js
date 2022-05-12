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
    const pelicula=await peliculas.find()
    res.json({
        pelicula
    })
}


export {peliculasPost,peliculasGet}