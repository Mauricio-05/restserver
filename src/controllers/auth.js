import { request, response } from 'express'
import bcrypt from 'bcryptjs'

import Usuario from '../models/usuario.js'
import generarJwt from '../helpers/generarJwt.js'

const login = async (req = request, res = response) => {

    const { correo, password } = req.body

    try {
        
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo })

        if(!usuario){
          return res.status(400).json({
             ok: false,
             msg: 'Usuario / Password no son correctos - correo'
          })
        }

        // Si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
               ok: false,
               msg: 'Usuario / Password no son correctos - estado: false'
            })
          }

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, usuario.password)

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // Generar JWT
        const token = await generarJwt(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
      console.log(error)  
      return res.status(500).json({
         ok: false,
         msg: "Hable con el administrador"
      })  
    }
}



export {
    login,
} 