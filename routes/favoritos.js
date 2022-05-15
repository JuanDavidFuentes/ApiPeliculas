import {Router} from 'express';
import { favget, favpost } from '../controllers/favoritos.js';
const router =Router()

router.post("/",favpost)

router.get("/",favget)

export default router