import {Router} from 'express';
import { actorBuscar, actorGet, actorPost } from '../controllers/actores.js';
const router =Router()

router.post('/',actorPost)

router.get('/',actorGet)

router.get('/buscar',actorBuscar)


export default router