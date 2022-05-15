import {Router} from 'express'
import { usuarioLogin, usuarioPost } from '../controllers/usuarios.js';
const router=Router();

router.post("/",usuarioPost)
router.get("/", usuarioLogin)


export default router;