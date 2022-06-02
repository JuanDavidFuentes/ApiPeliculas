import {Router} from 'express';
import { favEliminar, favget, favlistarId, favListarU, favPeliTitulo, favpost } from '../controllers/favoritos.js';
import { check } from 'express-validator';
import HelperUsuario from '../helpser/usuarios.js';
import HelperPelicula from '../helpser/peliculas.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarMongoIdN } from '../middlewares/validar-mongoid.js';
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

router.get("/listarU/:id",[
    check('id').custom(validarMongoIdN),
    validarCampos
],favListarU)

router.get("/listarId/:id",[
    check('id').custom(validarMongoIdN),
    validarCampos
],favlistarId)

router.get("/buscarTituloP",favPeliTitulo)

router.delete("/:id",[
    check('id').custom(validarMongoIdN),
    validarCampos
],favEliminar)

export default router