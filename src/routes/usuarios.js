import { Router } from 'express'
import { check } from 'express-validator'

import { 
  usuariosGet, 
  usuariosPost, 
  usuariosPut, 
  usuariosDelete 
  } from '../controllers/usuarios.js'
import { validarCampos } from '../middlewares/validarCampos.js'
import { validarRol, existeEmail, existeUsuarioPorId } from '../helpers/validators.js'


const router = Router()

router.get('', usuariosGet)

router.post('', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password debe ser más de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail().custom(existeEmail),
    check('rol').custom(validarRol),
    validarCampos
], usuariosPost)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(validarRol),
    validarCampos
], usuariosPut)

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

export { router }