import Comentario from '../models/comentarios.js';


const comentarioPost=async(req, res)=>{
    const {usuario,pelicula,comentario}=req.body;
    const comen=new Comentario({usuario,pelicula,comentario})
    await comen.save();
    res.json({
        "msg":"Comentario subido exitosamente"
    })
}

const comentarioGet=async(req, res)=>{
    const com=await Comentario
    .find()
    .populate("usuario","usuario")
    .populate("pelicula","titulo")
    res.json({
        com
    })
}

const comentarioListarTodo=async(req, res)=>{
    const {usuario}=req.query;
    const com= await Comentario.find({usuario})
    res.json({
        com
    })
}

export{comentarioPost,comentarioGet,comentarioListarTodo}