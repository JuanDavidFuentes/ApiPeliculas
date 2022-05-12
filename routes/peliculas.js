import {Router} from 'express';
const routes =Router()
import { peliculasGet, peliculasPost } from '../controllers/peliculas.js';

routes.post("/",peliculasPost);

routes.get("/",peliculasGet);

export default routes;