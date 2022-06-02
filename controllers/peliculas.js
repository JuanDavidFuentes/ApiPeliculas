import peliculas from "../models/peliculas.js";

const peliculasPost=async(req,res)=>{
    const {titulo,subtitulo,fecha,descripcion,genero,duracion,calificacion,reparto}=req.body;
    const pelicula=new peliculas({titulo,subtitulo,fecha,descripcion,genero,duracion,calificacion,reparto});
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

const idGetPeli=async(req, res)=>{
    const {id}=req.params;
    const idPeli=await peliculas.findById(id)
    res.json({idPeli})
}

const actorBuscarGet=async(req, res)=>{
    const {id}=req.params;
    const peli= await peliculas.find({id})
    res.json({peli})
}


const posterPut=async(req, res)=>{
    const {imagen}=req.body
    const {id}=req.params;
    const poster=await peliculas.findByIdAndUpdate(id,{imagen})
    res.json({
        "msg":"Poster insertado con exito"
    })
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
    const peli=await peliculas.findOneAndDelete({id})
    res.json({
        "msg":"Se elimino exitosamente"
    })
}



export {peliculasPost,peliculasGet,buscarpeliGet,idGetPeli,actorBuscarGet,posterPut,modificarPut,eliminarPeli}