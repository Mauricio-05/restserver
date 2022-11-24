import mongoose from "mongoose"

const dbConnection = async () => {
  try {

    await mongoose.connect(process.env.MONGODB_CNN)
    
    console.log('Connected node_coffee_db database ☕')
    
  } catch (error) {
    console.error(error)
    throw new Error('Error al conectarse a la base de datos')
  }
}


export default dbConnection