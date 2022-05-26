import {Router} from 'express'
import { usuarioLogin, usuarioPost } from '../controllers/usuarios.js';
import { check } from 'express-validator';
import HelperUsuario from '../helpser/usuarios.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router=Router();
router.post("/",[
    check('usuario',"El usuario es obligatorio").not().isEmpty(),
    check('usuario',"Debe tener menos de 20 caracteres").isLength({max:20}),
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('nombre',"Debe tener menos de 20 caracteres").isLength({max:20}),
    check('apellido',"El apellido es obligatorio").not().isEmpty(),
    check('apellido',"Debe tener menos de 20 caracteres").isLength({max:20}),
    check('email',"El email es obligatorio").not().isEmpty(),
    check('email',"No es un email valido").isEmail(),
    check('email').custom(HelperUsuario.existeEmail),
    check('contrasena',"El contrasena es obligatorio").not().isEmpty(),
    check('contrasena',"Debe tener mas de 6 caracteres").isLength({min:6}),
    validarCampos
],usuarioPost)
router.get("/", usuarioLogin)


export default router;