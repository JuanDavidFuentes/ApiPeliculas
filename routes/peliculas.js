import {Router} from 'express';
const routes =Router()
import { buscarpeliGet, peliculasGet, peliculasPost } from '../controllers/peliculas.js';

routes.post("/",peliculasPost);

routes.get("/",peliculasGet);

routes.get("/buscar",buscarpeliGet);
export default routes;