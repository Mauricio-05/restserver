import path from 'path';

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { router as routerUser } from "../routes/usuarios.routes.js"


class Server {
   constructor(){

     this.app = express()
     this.port = process.env.PORT

     //paths routes
     this.usuariosPath = '/api/usuarios'

     //Middlewares
     this.middlewares()

     // Rutas de mi aplicacion
     this.routes()

   }

   middlewares(){
     this.app.use(morgan('dev'))

     this.app.use(cors())

     this.app.use(express.json())

     this.app.use(express.static(path.join(process.cwd(), 'src' ,"public")));
   }

   routes(){
     this.app.use(this.usuariosPath, routerUser)
   }

   listen(){
    this.app.listen(this.port, ()=> {
        console.log(`Servidor encendido en el puerto ${this.port} ⚡`)
    })
   }
}

export { Server }