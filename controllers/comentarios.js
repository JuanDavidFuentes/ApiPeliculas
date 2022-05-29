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

const listarCdeU=async(req, res)=>{
    const {idUsuario}=req.query;
    const comen=await Comentario.find({idUsuario})
    res.json({comen})
}

const listarCdeP=async(req, res)=>{
    const {idPeli}=req.query;
    const comen=await Comentario.find({idPeli})
    res.json({comen})
}

const listarIdC=async(req, res)=>{
    const {id}=req.query;
    const comen=await Comentario.find({id})
    res.json({comen})
}

const buscarC=async(req, res)=>{
    const {comentario}=req.query;
    const comen=await Comentario.find({comentario})
    res.json({comen})
}


const eliminarC=async(req, res)=>{
    const {id}=req.params;
    const com= await Comentario.findOneAndDelete({id})
    res.json({
        "msg":"Comentario eliminado exitosamente"
    })
}

export{comentarioPost,comentarioGet,comentarioListarTodo,listarCdeU,listarIdC,buscarC,eliminarC,listarCdeP}