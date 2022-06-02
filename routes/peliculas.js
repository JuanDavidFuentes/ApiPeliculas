import {Router} from 'express';
import { check } from 'express-validator';
import { actorBuscarGet, buscarpeliGet, eliminarPeli, idGetPeli, modificarPut, peliculasGet, peliculasPost, posterPut } from '../controllers/peliculas.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarMongoId, validarMongoIdN} from '../middlewares/validar-mongoid.js';
const routes =Router()

routes.post("/",[
    check('titulo',"El titulo es obligatorio").not().isEmpty(),
    check('titulo',"El titulo tiene que tener menos de 20 caracteres").isLength({max:20}),
    check('subtitulo',"El subtitulo tiene que tener menos de 40 caracteres").isLength({max:40}),
    check('fecha',"La fecha es obligatorioa").not().isEmpty(),
    check('descripcion',"La descripcion es obligatorioa").not().isEmpty(),
    check('genero',"El genero es obligatorio").not().isEmpty(),
    check('genero',"El genero tiene que tener menos de 20 caracteres").isLength({max:20}),
    check('duracion',"La duracion es obligatoria").not().isEmpty(),
    check('reparto').custom(validarMongoId),
    validarCampos
],peliculasPost);

routes.get("/",peliculasGet);

routes.get("/buscar",buscarpeliGet);

routes.get("/buscarID/:id",[
    check('id').custom(validarMongoIdN),
    validarCampos
],idGetPeli);

routes.get("/BuscarActorId/:id",[
    check('id').custom(validarMongoIdN),
    validarCampos
],actorBuscarGet);

routes.put("/:id",[
    check("id").custom(validarMongoIdN),
    validarCampos
],posterPut);

routes.put("/editar/:id",[
    check("id").custom(validarMongoIdN),
    check('titulo',"El titulo es obligatorio").not().isEmpty(),
    check('titulo',"El titulo tiene que tener menos de 20 caracteres").isLength({max:20}),
    check('subtitulo',"El subtitulo tiene que tener menos de 40 caracteres").isLength({max:40}),
    check('fecha',"La fecha es obligatorioa").not().isEmpty(),
    check('descripcion',"La descripcion es obligatorioa").not().isEmpty(),
    check('genero',"El genero es obligatorio").not().isEmpty(),
    check('genero',"El genero tiene que tener menos de 20 caracteres").isLength({max:20}),
    check('duracion',"La duracion es obligatoria").not().isEmpty(),
    check('reparto').custom(validarMongoId),
    validarCampos
],modificarPut);

routes.delete('/:id',[
    check("id").custom(validarMongoIdN),
    validarCampos
],eliminarPeli)

export default routes;