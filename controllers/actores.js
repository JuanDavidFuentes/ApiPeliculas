import Actores from "../models/actores.js"

const actorPost=async(req, res)=>{ 
    const{nombre,observaciones}=req.body
    const actor=new Actores({nombre,observaciones})
    await actor.save()
    res.json({
        "msg":"Actor agregado exitosamente 👌"
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
    const idActor=await Actores.find({id})
    res.json({idActor})
}

const fotoPut=async(req, res)=>{
    const {foto}=req.body
    const {id}=req.params;
    const actorFoto=await Actores.findByIdAndUpdate(id,{foto})
    res.json({
        "msg":`Foto insertada`
    })
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
    const idActor=await Actores.findOneAndDelete({id})
    res.json({
        "msg":"Eliminado exitosamente"
    })
}

export{actorPost,actorGet,actorBuscar,actorBuscarId,fotoPut,editarPut,actorBorrarId}