import { request, response } from 'express'

const usuariosGet = (req = request , res = response)=> {

    const {nombre} = req.query

    res.json({
        ok: true,
        msg: "get api - controlador 🧠",
        nombre
    })
  }

const usuariosPost = (req = request , res = response)=> {

    const {nombre, edad} = req.body

    res.json({
        ok: true,
        msg: "post api - controlador 🧠",
        data: {nombre, edad}
    })
}

const usuariosPut = (req = request , res = response)=> {

    const {id} = req.params

    res.json({
        ok: true,
        msg: "put api - controlador 🧠",
        id
    })
}

const usuariosDelete = (req = request , res = response)=> {
    res.json({
        ok: true,
        msg: "delete api - controlador 🧠"
    })
}


 export {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
 } 