import jwt from 'jsonwebtoken'

const generarJwt = (uuid = '') => {

    return new Promise((resolve, reject)=> {
        
        const payload = { uuid }

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })
    })
  
}



export default generarJwt