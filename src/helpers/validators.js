import Usuario from '../models/usuario.js'
import Role from '../models/role.js'

const validarRol = async(rol = '')=> {
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
       throw new Error(`El rol ${rol} no esta registrado en la BD.`)
    }
}

const existeEmail = async (correo = '') => {
    const email = await Usuario.findOne({correo})
    if(email){
      throw new Error(`El correo: ${correo}  ya esta registrado.`)
    }
} 

const existeUsuarioPorId = async (id = '') => {
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error(`El id: ${id} no existe en la base de datos.`)
    }
}

export {
    validarRol,
    existeEmail,
    existeUsuarioPorId
}

