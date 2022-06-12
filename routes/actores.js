import {Router} from 'express';
import { actorBorrarId, actorBuscar, actorBuscarId, actorGet, actorPost, editarPut, fotoPut } from '../controllers/actores.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarMongoIdN } from '../middlewares/validar-mongoid.js';
import { validarJWT } from '../middlewares/Validarjwt.js';
const router =Router()

router.post('/',[
    validarJWT,
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('nombre',"El nombre debe tener menos de 20 caracteres").isLength({max:20}),
    validarCampos
],actorPost)

router.get('/',actorGet)

router.get('/buscar',actorBuscar)

router.get('/buscarId/:id',[
    check('id').custom(validarMongoIdN)
],actorBuscarId)

router.put('/:id',[
    check('id').custom(validarMongoIdN),
    validarCampos
],fotoPut)

router.put('/editar/:id',[
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('nombre',"El nombre debe tener menos de 20 caracteres").isLength({max:20}),
    check("id").custom(validarMongoIdN),
    validarCampos
],editarPut)

router.delete('/:id',[
    check("id").custom(validarMongoIdN),
    validarCampos
],actorBorrarId)
export default router