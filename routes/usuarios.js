import {Router} from 'express'
import { usuarioPost } from '../controllers/usuarios.js';
const router=Router();

router.post("/",usuarioPost)



export default router;