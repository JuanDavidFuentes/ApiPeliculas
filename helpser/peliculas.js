import Peliculas from "../models/peliculas.js";

const HelperPelicula={
    existePeliculas:async(id)=>{
        const existe =await Peliculas.findById(id)
        if(! existe) throw new Error("Pelicula no existe en la base de datos")
    },
    
}


export default HelperPelicula
