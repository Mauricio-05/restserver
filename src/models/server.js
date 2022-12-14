import path from 'path';

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { router as routerUser } from "../routes/usuarios.js"
import { router as routerAuth } from "../routes/auth.js"

import dbConnection from '../database/config.js';


class Server {
   constructor(){

     this.app = express()
     this.port = process.env.PORT

     //paths routes
     this.usuariosPath = '/api/usuarios'
     this.authPath = '/api/auth'

     // conectar a base de datos
     this.conectarDb()

     //Middlewares
     this.middlewares()

     // Rutas de mi aplicacion
     this.routes()

   }

   async conectarDb(){
    await dbConnection()
   }

   middlewares(){
     this.app.use(morgan('dev'))

     this.app.use(cors())

     this.app.use(express.json())

     this.app.use(express.static(path.join(process.cwd(), 'src' ,"public")));
   }

   routes(){
     this.app.use(this.authPath, routerAuth)
     this.app.use(this.usuariosPath, routerUser)
   }

   listen(){
    this.app.listen(this.port, ()=> {
        console.log(`Servidor encendido en el puerto ${this.port} ⚡`)
    })
   }
}

export default Server 