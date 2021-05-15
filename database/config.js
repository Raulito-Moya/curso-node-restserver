const mongoose = require('mongoose')

const dbConnection = async() => {

  try {
      
     await mongoose.connect(process.env.MONGODB_CNN, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
      
      
     })

     console.log('Base de Datos online');

  } catch (error) {
      console.log(error);
      throw new Error('Error a la hora de inicializar el proceso')
  }

}


module.exports = {
    dbConnection
}