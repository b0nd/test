import user from '../models/user.model';
import logger from '../core/logger/app-logger'
import jwt from 'jsonwebtoken';
import verifyToken from '../config/validation'
import { sendEmail, getSuccessObject, getErrorObject } from '../utils/util'
import  * as CONSTANTS  from '../utils/constants'
import multer from 'multer';
const controller = {};

controller.getAll = async (req, res) => {
    try {
        const cars = await user.getAll();
        logger.info('sending all cars...');
        res.send(cars);
    }
    catch(err) {
        logger.error('Error in getting cars- ' + err);
        res.send('Got error in getAll');
    }
}


controller.login = async (req, res) => {
    let data = {
          email: req.body.email,
          password :req.body.password
      };
      try {
        const bearerHeader = req.headers['authorization'];
        console.log("test");
        console.log("tokenn test"+bearerHeader);
          let result = await user.login(req.body);
           if(result.length == 0)
           res.send(getErrorObject(201,'Wrong Credentials'))
          let token =  jwt.sign({id:result[0].id,name:result[0].name},"test");
          result[0].token = token;
         
          res.send(getSuccessObject(result[0]));
      }
      catch(err) {  
          logger.error('Error in login- ' + err);
          res.send('Got error in login controller'+err);
      }
  }

  
  controller.registerStep1 = async (req, res) => {
    let requestObject = {
        firstName: req.body.firstName,
        lastName :req.body.lastName,
        roleId:req.body.roleId,
        city:req.body.location.city,
        lat:req.body.location.lat,
        lon:req.body.location.lon,
      };
      console.log("test");
      const bearerHeader = req.headers['authorization'];
      console.log("bearer token"+bearerHeader);
      try {
         // let result = await user.login(req.body);
          const data = await jwt.verify(req.body.token, 'test');
          if(data.id){
            let result = await user.registerStep1(data.id,requestObject);
            res.send(getSuccessObject(result));
          }else
          res.send(getErrorObject(500,"something went wrong"));
      }
      catch(err) {
          logger.error('Error in login- ' + err);
          res.send('Got error in login');
      }
  }

  
  controller.updateUserProfile = async (req, res) => {
    let requestObject = {
        description: req.body.description,
        categories :req.body.categories,
      };
      console.log("test");
      const bearerHeader = req.headers['authorization'];
      console.log("bearer token"+bearerHeader);
      try {
         // let result = await user.login(req.body);
          const data = await jwt.verify(req.body.token, 'test');
          if(data.id){
            let result = await user.updateUserProfile(data.id,requestObject);
            res.send(getSuccessObject(result));
        }else
        res.send(getErrorObject(500,"something went wrong"));
      }
      catch(err) {
          logger.error('Error in login- ' + err);
          res.send('Got error in login');
      }
  }

  controller.registerStep2 = async (req, res) => {
    let requestObject = {
        description: req.body.description,
        categories :req.body.categories,
      };
      console.log("test");
      const bearerHeader = req.headers['authorization'];
      console.log("bearer token"+bearerHeader);
      try {
         // let result = await user.login(req.body);
          const data = await jwt.verify(req.body.token, 'test');
          if(data.id){
            let result = await user.registerStep2(data.id,requestObject);
            res.send(getSuccessObject(result));
        }else
        res.send(getErrorObject(500,"something went wrong"));
      }
      catch(err) {
          logger.error('Error in login- ' + err);
          res.send('Got error in login');
      }
  }
  
  controller.setAlerts = async (req, res) => {
    let requestObject = {
       // description: req.body.description,
        categories :req.body.categories,
      };
    //   console.log("test");
    //   const bearerHeader = req.headers['authorization'];
    //   console.log("bearer token"+bearerHeader);
      try {
         // let result = await user.login(req.body);
         
         const bearerHeader = req.headers['authorization'];//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTUzMzM3NzUxMn0.WhH7-TZtD7Pip0laVeCA7A-yZuwEYSBNZfJhdaIs7_k"; req.headers['authorization'];
         const bearer = bearerHeader.split(' ');
         
          const bearerToken = bearer[1];
          const data = await jwt.verify(bearerToken, 'test');
          if(data.id){
            let result = await user.setAlerts(data.id,requestObject);
            res.send(getSuccessObject(result));
        }else
        res.send(getErrorObject(500,"something went wrong"));
      }
      catch(err) {
          logger.error('Error in login- ' + err);
          res.send('Got error in login');
      }
  }
  controller.uploadProfilePicture = async (req, res) => {

    try {
        const bearerHeader = req.headers['authorization'];//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTUzMzM3NzUxMn0.WhH7-TZtD7Pip0laVeCA7A-yZuwEYSBNZfJhdaIs7_k"; req.headers['authorization'];
        console.log(req.headers);
        const bearer = bearerHeader.split(' ');
        
         const bearerToken = bearer[1];
         const data = await jwt.verify(bearerToken, 'test');
         req.body.test = "test";
         let Storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, "./app/profile");
            },
            filename: function (req, file, callback) {
                let filenames = file.originalname.split('.');
                console.log(filenames[filenames.length-1]);
                callback(null, `profile-${data.id}.${filenames[filenames.length-1]}`);
            }
        });
          let upload = multer({ storage: Storage }).single("imgUploader"); //Field name and max count
        
        
         if(data.id){
            upload(req, res, function (err) {
                if (err) {
                    return res.end("Something went wrong!");
                }else{
                 user.uploadProfilePicture(data.id,`http://${req.get('host')}/profile/${req.file.filename}`);
                return res.send(getSuccessObject({message:"image has successfully uploaded",imgUrl:`http://${req.get('host')}/profile/${req.file.filename}`}));
                }
            });

         }else
         res.send('Got erro');
     }
     catch(err) {
         logger.error('Error in login- ' + err);
         res.send('Got error in login');
     }

  }
  


  controller.uploadPortfolioPicture = async (image,req, res) => {

    try {
        const bearerHeader = req.headers['authorization'];//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTUzMzM3NzUxMn0.WhH7-TZtD7Pip0laVeCA7A-yZuwEYSBNZfJhdaIs7_k"; req.headers['authorization'];
        console.log(req.headers);
        const bearer = bearerHeader.split(' ');
        
         const bearerToken = bearer[1];
         const data = await jwt.verify(bearerToken, 'test');
         req.body.test = "test";
         let Storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, "./app/profile");
            },
            filename: function (req, file, callback) {
                let filenames = file.originalname.split('.');
                console.log(filenames[filenames.length-1]);
                callback(null, `${image}-${data.id}.${filenames[filenames.length-1]}`);
            }
        });
          let upload = multer({ storage: Storage }).single("imgUploader"); //Field name and max count
        
        
         if(data.id){
            upload(req, res, function (err) {
                if (err) {
                    return res.end("Something went wrong!");
                }else{
                    let result= user.uploadPortfolioPicture(data.id,`http://${req.get('host')}/profile/${req.file.filename}`,image);
                return res.send(getSuccessObject({message:"image has successfully uploaded",imgUrl:`http://${req.get('host')}/profile/${req.file.filename}`}));
                }
            });

         }else
         res.send('Got erro');
     }
     catch(err) {
         logger.error('Error in login- ' + err);
         res.send('Got error in login');
     }

  }
  
  

  controller.uploadHeaderImage = async (req, res) => {

    try {
        const bearerHeader = req.headers['authorization'];//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTUzMzM3NzUxMn0.WhH7-TZtD7Pip0laVeCA7A-yZuwEYSBNZfJhdaIs7_k"; req.headers['authorization'];
        console.log(req.headers);
        const bearer = bearerHeader.split(' ');
        
         const bearerToken = bearer[1];
         const data = await jwt.verify(bearerToken, 'test');
         req.body.test = "test";
         let Storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, "./app/profile");
            },
            filename: function (req, file, callback) {
                let filenames = file.originalname.split('.');
                console.log(filenames[filenames.length-1]);
                callback(null, `header-${data.id}.${filenames[filenames.length-1]}`);
            }
        });
          let upload = multer({ storage: Storage }).single("imgUploader"); //Field name and max count
        
        
         if(data.id){
            upload(req, res, function (err) {
                if (err) {
                    return res.end("Something went wrong!");
                }else{
                    let result= user.uploadHeaderImage(data.id,`http://${req.get('host')}/profile/${req.file.filename}`);
                return res.send(getSuccessObject({message:"image has successfully uploaded",imgUrl:`http://${req.get('host')}/profile/${req.file.filename}`}));
                }
            });

         }else
         res.send('Got erro');
     }
     catch(err) {
         logger.error('Error in login- ' + err);
         res.send('Got error in login');
     }

  }
  
  controller.uploadSkills = async (req, res) => {

    try {
        let requestObject = {
            language: req.body.language,
            qualification :req.body.qualification,
            experience :req.body.experience,
          };
        const bearerHeader = req.headers['authorization'];//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTUzMzM3NzUxMn0.WhH7-TZtD7Pip0laVeCA7A-yZuwEYSBNZfJhdaIs7_k"; req.headers['authorization'];
        console.log(req.headers);
        const bearer = bearerHeader.split(' ');
        
         const bearerToken = bearer[1];
         const data = await jwt.verify(bearerToken, 'test');
         if(data.id){
           let result = await user.uploadSkills(data.id,requestObject);
           res.send(getSuccessObject(result));
       }else
       res.send(getErrorObject(500,"something went wrong"));
     }
     catch(err) {
         logger.error('Error in login- ' + err);
         res.send('Got error in login');
     }

  }
  
  controller.getUserSkills = async (req, res) => {

    try {
        const bearerHeader = req.headers['authorization'];//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTUzMzM3NzUxMn0.WhH7-TZtD7Pip0laVeCA7A-yZuwEYSBNZfJhdaIs7_k"; req.headers['authorization'];
        const bearer = bearerHeader.split(' ');
        
         const bearerToken = bearer[1];
         const data = await jwt.verify(bearerToken, 'test');
         if(data.id){
           let result = await user.getUserSkills(data.id);
           res.send(getSuccessObject(result));
       }else
       res.send(getErrorObject(500,"something went wrong"));
     }
     catch(err) {
         logger.error('Error in login- ' + err);
         res.send('Got error in login');
     }

  }

  controller.getUserAlerts = async (req, res) => {

    try {
        const bearerHeader = req.headers['authorization'];//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTUzMzM3NzUxMn0.WhH7-TZtD7Pip0laVeCA7A-yZuwEYSBNZfJhdaIs7_k"; req.headers['authorization'];
        const bearer = bearerHeader.split(' ');
        
         const bearerToken = bearer[1];
         const data = await jwt.verify(bearerToken, 'test');
         if(data.id){
           let result = await user.getUserAlerts(data.id);
           res.send(getSuccessObject(result));
       }else
       res.send(getErrorObject(500,"something went wrong"));
     }
     catch(err) {
         logger.error('Error in login- ' + err);
         res.send('Got error in login');
     }

  }


  controller.updatePassword = async (req, res) => {
    let requestObject = {
        password: req.body.password,
        newPassword :req.body.newPassword,
      };
    try {
        const bearerHeader = req.headers['authorization'];//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTUzMzM3NzUxMn0.WhH7-TZtD7Pip0laVeCA7A-yZuwEYSBNZfJhdaIs7_k"; req.headers['authorization'];
       // console.log(req.headers);
        const bearer = bearerHeader.split(' ');
        
         const bearerToken = bearer[1];
         const data = await jwt.verify(bearerToken, 'test');
         req.body.test = "test";
        
         if(data.id){
            let result= await user.updatePassword(data.id,requestObject);
            console.log("results  "+JSON.stringify(result));
            return res.send(getSuccessObject(result));
         }else
         res.send('Got erro');
     }
     catch(err) {
         logger.error('Error in login- ' + err);
         res.send('Got error in login');
     }

  }

controller.createUser = async (req, res) => {


    try {
        const savedUser = await user.createUser(req.body);
   
        let token =  jwt.sign({id:savedUser.insertId},"test");
     let link="http://"+req.get('host')+"/verify?id="+token;
        let body = `Hello,<br> Please Click on the link to verify your email.<br><a href="${link}">Click here to verify</a>`
        const emailReport = await sendEmail(req.body.email,'verify email',body);
        savedUser.access_token = token;
        res.send(getSuccessObject(savedUser));
        
    }
    catch(err) {
        logger.error('Error in getting cars- ' + err);
        res.send('Got error in getAll');
    }
}

controller.facebookAPI = async (req, res,data) => {
    let facebookData = {
        email: data.emails[0].value,
        password :req.body.password,
        firstName:data.name.givenName,
        lastName:data.name.familyName,
        facebookToken:req.body.access_token,
        profilePicture:data.photos[0].value,
    };

    try {
        const savedUser = await user.facebookAPI(facebookData);
        console.log(savedUser);
        let token =  jwt.sign({id:savedUser.insertId},"test");
    //  let link="http://"+req.get('host')+"/verify?id="+token;
    //     let body = `Hello,<br> Please Click on the link to verify your email.<br><a href="${link}">Click here to verify</a>`
    //     const emailReport = await sendEmail(req.body.email,'verify email',body);
        savedUser.access_token = token;
        res.send(getSuccessObject(savedUser));
        
    }
    catch(err) {
        logger.error('Error in getting cars- ' + err);
        res.send('Got error in getAll');
    }
}


controller.verifyEmail = async (req, res) => {

      try {
        const data = await jwt.verify(req.body.token, 'test');
        if(data.id){
          let result = await user.verifyEmail(data.id);
             res.send(result);
        }else
        res.send('Got erro');
      }
      catch(err) {
          logger.error('Error in verify- ' + err);
          res.send('Got error in verify');
      }
  }

controller.deleteCar = async (req, res) => {
    let carName = req.body.name;
    try{
        const removedCar = await user.removeCar(carName);
        logger.info('Deleted user- ' + removedCar);
        res.send('user successfully deleted');
    }
    catch(err) {
        logger.error('Failed to delete user- ' + err);
        res.send('Delete failed..!');
    }
}

export default controller;