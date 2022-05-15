import Actores from "../models/actores.js"

const actorPost=async(req, res)=>{
    const{nombre,foto,observaciones}=req.body
    const actor=new Actores({nombre,foto,observaciones})
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



export{actorPost,actorGet,actorBuscar}