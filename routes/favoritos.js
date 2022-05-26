import {Router} from 'express';
import { favget, favpost } from '../controllers/favoritos.js';
import { check } from 'express-validator';
import HelperUsuario from '../helpser/usuarios.js';
import HelperPelicula from '../helpser/peliculas.js';
import { validarCampos } from '../middlewares/validar-campos.js';
const router =Router()

router.post("/",[
    check('usuario',"El usuario es obligatorio").not().isEmpty(),
    check('usuario',"Usuario no existe").isMongoId(),
    check('usuario').custom(HelperUsuario.existeUsuario),
    check('pelicula',"La pelicula es obligatoria").not().isEmpty(),
    check('pelicula',"pelicula no existe").isMongoId(),
    check('pelicula').custom(HelperPelicula.existePeliculas),
    validarCampos
],favpost)

router.get("/",favget)

export default router