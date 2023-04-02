
const Project = require("../models/project");
const User = require('../models/usuario');
const jwt = require('jsonwebtoken');

const postproject = async(req, res) => {
     
     const {name,description,date,token } = req.body
     console.log('token',token)
     try {
        if(token){
            let id = await jwt.decode(token,process.env.SECRETORPRIVATEKEY)
           console.log('id',id)
           

         let user = await User.findOne(id) 
          console.log('user',user) 
         console.log('se logro')
         console.log(id)
          const project = new Project({"name":name,"description":description,"user":user.id,"date":date})
           
          await project.save()

          if(project){
            res.json({
                project:project
            })
          }

         }else{
            res.json({
                msg: 'NO token provided',
                
            });
         }        
  


     } catch (error) {
        res.json({
            msg: 'error',
            error
        });
     }
  
    
 


}

module.exports = {
    postproject
}