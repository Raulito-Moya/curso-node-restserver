

const path = require('path');
let nodemailer = require('nodemailer')
const { google } = require('googleapis')
const User = require('../models/usuario');
const jwt = require('jsonwebtoken');


const callbackprojectfunction =  async(req,res) => {
  const {token,project} = req.body
 console.log('Se envio!!!!!!!!!')
  const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
  oauth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});

  const accesstoken = await oauth2Client.getAccessToken()

 // console.log(accesstoken);
   try {
    console.log('project!!!',project.project._id)
  
 //   console.log(accesstoken);
    const transporter = nodemailer.createTransport({

      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'raulmoyaweb@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accesstoken.res.data.access_token

      }
    })
   
    let id = await jwt.decode(token,process.env.SECRETORPRIVATEKEY)
    console.log('id',id)
    

  let user = await User.findOne(id) 
  // let project = await User.findOne({project:{$in:[user.id]}})
  
  // console.log('project!!',project)


    const mailData = {
      from: 'raulmoyaweb@gmail.com',
      to: `rauly7moya@gmail.com`,
      subject: `Message From ${user.name}`,
      text: "You have a new project request" + " | Sent from: " + user.email,
      html: `<div></div><p>Sent from:  
     <p>Email:${user.email}</p>
     <p>User:${user.id}</p>
     <p>Project:${project.project._id}</p>`
    }
    
    
  

    await new Promise((resolve,reject) => {   

      transporter.sendMail(mailData, function (err, info) {
          if(err){
                 console.log(err)
               reject(err)
          }
          else{
             console.log(info)
              resolve(info)
          }
            
        })

 })  
  

   const callbackmailDataproject = {
    from: 'raulmoyaweb@gmail.com',
    to: `${user.email}`,
    subject: `Message From raulmoyaweb@gmail.com`,
    text:   " | Sent from: " + 'raulmoyaweb@gmail.com',
    attachments: [{
        filename: 'Raul_logo2.png',
        path: 'https://res.cloudinary.com/dx33ki9ul/image/upload/v1631135752/Raul_logo2_uej8pg.png',
        cid: 'logo' //same cid value as in the html img src
    }],
    html: `<div> 
          <img  src="cid:logo"   alt="RauL Moya Logo"/>
          <h2 style="text-align: center;color: #5f6368;"> Thank you for request your project at ShowMore. We look forward for create it if you have any question please reach out to 816-718-8927 or raulmoyaweb@gmail.com. Stay update for more info </h2> 
     </div>
     <p>Show More</p>
    <p>Sent from: raulmoyaweb@gmail.com</p>`,
  
  }
  


 await  new Promise((resolve,reject)=> {

  transporter.sendMail(callbackmailDataproject, function (err, info) {
         if(err){
           console.log(err)
         reject(err)
         }
         else{
          // console.log(info)
           resolve(info)
         }
           
       })

})  
    // const info =   await transporter.sendMail(mailData) 
    // const callbackinfo =   await transporter.sendMail(callbackmailData)      
     
 
     res.status(200).json({msg:'sended correctly'})

   } catch (error) {
     console.log(error);
    res.status(400).json({msg:'sended bad'})
     return error
   }

  }

 module.exports = {callbackprojectfunction}