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

const listarCdeU=async(req, res)=>{
    const {id}=req.params;
    const comen=await Comentario.find().where('usuario').in(id).exec();
    res.json({comen})
}

const listarCdeP=async(req, res)=>{
    const {id}=req.params;
    const comen=await Comentario.find({pelicula:id})
    .populate("usuario","usuario")
    res.json({comen})
}

const listarIdC=async(req, res)=>{
    const {id}=req.params;
    const comen=await Comentario.findById(id)
    res.json({comen})
}

const buscarC=async(req, res)=>{
    const {comentario}=req.query;
    const comen=await Comentario.find({comentario})
    res.json({comen})
}


const eliminarC=async(req, res)=>{
    const {id}=req.params;
    const com= await Comentario.findByIdAndDelete(id)
    res.json({
        "msg":"Comentario eliminado exitosamente"
    })
}

export{comentarioPost,comentarioGet,listarCdeU,listarIdC,buscarC,eliminarC,listarCdeP}