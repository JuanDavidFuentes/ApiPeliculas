import {Router} from 'express';
import { activarPut, buscarUsuario, desactivarPut, fotoPut, listarId, listarUsuarios, modificarPut, usuarioLogin, usuarioPost } from '../controllers/usuarios.js';
import { check } from 'express-validator';
import HelperUsuario from '../helpser/usuarios.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarMongoIdN } from '../middlewares/validar-mongoid.js';

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
],usuarioPost);

router.get("/", usuarioLogin);

router.get("/listar",listarUsuarios);

router.get("/listarID/:id",[
    check('id').custom(validarMongoIdN),
    validarCampos
],listarId);

router.get("/buscarU",buscarUsuario);

router.put("/:id",[
    check("id").custom(validarMongoIdN),
    validarCampos
],fotoPut);

router.put("/editar/:id",[
    check("id").custom(validarMongoIdN),
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
],modificarPut)

router.put('/activar/:id',[
    check('id').custom(validarMongoIdN),
    validarCampos
],activarPut)

router.put('/desactivar/:id',[
    check('id').custom(validarMongoIdN),
    validarCampos
],desactivarPut)

export default router;