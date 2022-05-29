import {Router} from 'express';
import { buscarC, comentarioGet, comentarioListarTodo, comentarioPost, eliminarC, listarCdeP, listarCdeU, listarIdC } from '../controllers/comentarios.js';
import { check } from 'express-validator';
import HelperUsuario from '../helpser/usuarios.js';
import HelperPelicula from '../helpser/peliculas.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarMongoIdN } from '../middlewares/validar-mongoid.js';

const router=Router();

router.post('/',[
    check('usuario',"El usuario es obligatorio").not().isEmpty(),
    check('usuario',"Usuario no existe").isMongoId(),
    check('usuario').custom(HelperUsuario.existeUsuario),
    check('pelicula',"La pelicula es obligatoria").not().isEmpty(),
    check('pelicula',"Pelicula no existe").isMongoId(),
    check('pelicula').custom(HelperPelicula.existePeliculas),
    validarCampos
],comentarioPost);

router.get('/',comentarioGet);

router.get('/listar',comentarioListarTodo);

router.get("/listarCdeU",listarCdeU);

router.get("/listarCdeP",listarCdeP);

router.get("/listarId",listarIdC);

router.get("/buscarC",buscarC);

router.delete("/:id",[
    check("id").custom(validarMongoIdN),
    validarCampos
],eliminarC);

export default router;