import { request, response } from 'express'
import bcrypt from 'bcryptjs'

import Usuario from '../models/usuario.js'

const usuariosGet = async (req = request , res = response)=> {

    const { init = 0,limit = 5 } = req.query
    const queryCondition = { estado: true }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(queryCondition),
        Usuario.find(queryCondition)
              .skip(Number(init))
              .limit(Number(limit))
    ]) 

    res.json({
        ok: true,
        msg: "Usuarios listados exitosamente 👤",
        total,
        usuarios
    })
  }

const usuariosPost = async (req = request , res = response) => {

    const {nombre, correo, password, rol} = req.body

    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    })

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10)
    usuario.password = await bcrypt.hash(password, salt)
    

    await usuario.save()

    res.status(201).json({
        ok: true,
        msg: "Usuario registrado exitosamente 👤",
        usuario
    })
}

const usuariosPut = async (req = request , res = response)=> {

    const {id} = req.params
    const {_id, password, correo , google, ...usuarioData} = req.body

    // Validar contra la base de datos
    if(password){
        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10)
        usuarioData.password = await bcrypt.hash(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, usuarioData)

    res.status(200).json({
        ok: true,
        msg: "Usuario editado exitosamente 👤",
        usuario
    })
}

const usuariosDelete = async (req = request , res = response)=> {

    const { id } = req.params

    // Fisicamente eliminado
    // const usuario = await Usuario.findByIdAndDelete(id)

    // Logicamente eliminado
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false })


    res.json({
        ok: true,
        msg: "Usuario eliminado exitosamente 👤",
        usuario
    })
}


 export {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
 } 