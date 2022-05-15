import Fav from '../models/favoritos.js';

const favpost=async(req, res)=>{
    const {usuario,pelicula}=req.body;
    const fav=new Fav({usuario,pelicula})
    await fav.save();
    res.json({
        "msg":`Se a añadido exitosamente la pelicula a favoritos`
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



export{favpost,favget}