import {Router} from 'express';
import { comentarioGet, comentarioListarTodo, comentarioPost } from '../controllers/comentarios.js';

const router=Router()

router.post('/',comentarioPost)

router.get('/',comentarioGet)

router.get('/listar',comentarioListarTodo)

export default router;