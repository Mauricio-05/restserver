import { request, response } from 'express'
import jwt from 'jsonwebtoken'

import Usuario from '../models/usuario.js'

const validarJwt = async (req = request, res = response, next) => {
    const token = req.headers.authorization.split(' ')[1]
    
    if(!token){
        return response.status(401).json({
            ok: false,
            msg: "No existe el token"
        })
    }

    try {
        
       const { uuid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

       // Leer el usuario que viene con el uuid
       const usuario = await Usuario.findById(uuid)

       if(!usuario){
         return res.status(401).json({
                ok: false,
                msg: "Token no valido - usuario no existe en base de datos"
            })
       }

       // verificar si el usuario esta eliminado
       if(!usuario.estado){
            return res.status(401).json({
                ok: false,
                msg: "Token no valido - usuario con estado: false"
            })
       }

       req.usuario = usuario

       next()

    } catch (error) {
        console.log(error)
        res.status(401).json({
            ok: false,
            msg: "Token invalido"
        })
    }
}



export { validarJwt }