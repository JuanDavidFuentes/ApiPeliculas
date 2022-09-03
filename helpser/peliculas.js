import { validarMongoIdN } from "../middlewares/validar-mongoid.js";
import Peliculas from "../models/peliculas.js";

const HelperPelicula={
    existePeliculas:async(id)=>{
        const existe =await Peliculas.findById(id)
        if(! existe) throw new Error("Pelicula no existe en la base de datos")
    },
    existePeliculasPorTitulo:async(titulo)=>{
        const existe =await Peliculas.findById(titulo)
        if(! existe) throw new Error("Pelicula no existe")
    },
    reparto:async(reparto)=>{
        
        for (let i = 0; i < reparto.length; i++) {
            if(reparto[i].idactor!==""){
                await validarMongoIdN(reparto.idactor).catch(err => {
                    throw new Error("id no valido"+err);
                });
            }else{
                throw new Error("Falta id del Actor");
            }
            if(reparto[i].personaje===""){
                throw new Error("Falta persaje el cual representa el Actor");
            }
        }

    },
}


export default HelperPelicula
