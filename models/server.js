import express from "express";
import cors from "cors";
import { dbConnection } from "../database/config.js";
import pelicula from "../routes/peliculas.js";
import usuario from "../routes/usuarios.js"

class Server{
    constructor(){
        this.app=express();
        this.middlewares();
        this.port=process.env.PORT;
        this.connectarbd()
        this.routes() 
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        // this.app.use(express.static())
    }

    async connectarbd(){
        await dbConnection()
    }

    routes(){
        this.app.use("/api/peliculas",pelicula)
        this.app.use("/api/usuario",usuario)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

export default Server