import Fav from '../models/favoritos.js';

const favpost=async(req, res)=>{
    const {usuario,pelicula}=req.body;
    const fav=new Fav({usuario,pelicula})
    await fav.save();
    res.json({
        "msg":`Se a añadido exitosamente la pelicula a favoritos`,
        fav
    })
}

const favget=async(req, res)=>{
    const fav=await Fav
    .find()
    .populate("usuario","usuario")
    .populate("pelicula",["titulo","imagen"])
    res.json({
        fav
    })
}

const favListarU=async(req, res)=>{
    const {id}=req.params;
    const fav=await Fav
    .find({usuario:id})
    .populate({
        path:"pelicula",
        populate:{
            path:"reparto.idactor"

        }
    })
    // .populate("pelicula.reparto.idactor",["nombre","foto","observaciones"])
    res.json({fav})
}

const favlistarId=async(req, res)=>{
    const {id}=req.params;
    const fav=await Fav.findById(id)
    res.json({fav})
}

const favPeliTitulo=async(req, res)=>{
    const{id}=req.params;
    const fav=await Fav
    .find({pelicula:id})
    .populate("pelicula")
    res.json({fav})
}

const favEliminar=async(req, res)=>{
    const{id}=req.params;
    const fav=await Fav.findByIdAndDelete(id)
    res.json({
        "msg":"Se he eliminado correctamente"
    })
}





export{favpost,favget,favListarU,favlistarId,favPeliTitulo,favEliminar}