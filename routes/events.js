/* Rutas de usuarios / Auth
 host + api/events */

const {Router}= require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const isDate = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const router=Router();

//Todas tiene que pasar por la validacion del JWT
router.use(validarJWT);
 
 
 router.get( '/',getEventos);
 router.post( '/',
    [check('title','El titulo es obligatorio').not().isEmpty(),validarCampos,
     check('start','fecha de inicio es obligatoria').custom(isDate),validarCampos,
     check('end','fecha de finalizacion es obligatoria').custom(isDate),validarCampos

    ],
    crearEvento);
 router.put( '/:id', actualizarEvento);
 router.delete( '/:id',eliminarEvento);
 

 
 
 module.exports=router;