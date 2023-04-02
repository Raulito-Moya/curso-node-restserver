

const path = require('path');
let nodemailer = require('nodemailer')
const { google } = require('googleapis')


const callbackprojectfunction =  async(req,res) => {
  const {name,email} = req.body

  const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
  oauth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});

  const accesstoken = await oauth2Client.getAccessToken()

 // console.log(accesstoken);
   try {
    
  
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

    const mailData = {
      from: 'raulmoyaweb@gmail.com',
      to: `rauly7moya@gmail.com`,
      subject: `Message From ${req.body.name}`,
      text: req.body.message + " | Sent from: " + req.body.email,
      html: `<div>${req.body.message}</div><p>Sent from:
     <p>${req.body.email}</p>`
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
    to: `${email}`,
    subject: `Message From raulmoyaweb@gmail.com`,
    text: req.body.message + " | Sent from: " + req.body.email,
    attachments: [{
        filename: 'Raul_logo2.png',
        path: 'https://res.cloudinary.com/dx33ki9ul/image/upload/v1631135752/Raul_logo2_uej8pg.png',
        cid: 'logo' //same cid value as in the html img src
    }],
    html: `<div> 
          <img  src="cid:logo"   alt="RauL Moya Logo"/>
          <h2 style="text-align: center;color: #5f6368;"> Hi thank you for reuqets your project at ShowMore We will move forward for make your prject the soon as possible. </h2> 
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