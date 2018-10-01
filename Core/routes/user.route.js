import express from "express";
import userController from "../controllers/user.controller"

import passport from 'passport'
import passportConfig from '../config/passport'
import * as db from '../config/db'

const router = express.Router()
passportConfig();
// router.get('/allcars', (req, res) => {   
//     userController.getAll(req, res);
// });

router.get('/allcars', (req, res) => {
    res.send('data');
});

var sendToken = function (req, res) {
   // res.setHeader('x-auth-token', req.token);
    res.status(200).send("done");
  };

  router.post('/auth/facebook', 
  (req, res, next) => passport.authenticate(
          'facebook-token',
          { failureRedirect: '/login' },
          (err, data) => {
            if(err){
              res.status(err.oauthError.statusCode)
              res.json(data || err)
            } else {
              userController.facebookAPI(req, res,data);
            }
          })(req, res, next));

// router.route('/auth/facebook')
//   .post(passport.authenticate('facebook-token', {session: false}), function(req, res, next) {
//       console.log("inside post")
//     // if (!req.user) {
//     //   return res.send(401, 'User Not Authenticated');
//     // }
//     next();
//     // prepare token for API
//     res.send('data');
//   },sendToken);


router.post('/login', (req, res) => {
    
    userController.login(req, res);
});

router.post('/test',async (req, res) => {
    
    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(`call getData()`, function (err, result) {
            if (err) return res.send(err);
            res.send(result);
          });
    });
});

router.get('/test-get',async (req, res) => {
    
    res.send("aa gaya bc");
});

router.post('/register-step-1', (req, res) => {
    
    userController.registerStep1(req, res);
});

router.post('/register-step-2', (req, res) => {
    
    userController.registerStep2(req, res);
});

router.post('/updateUserProfile', (req, res) => {
    
    userController.updateUserProfile(req, res);
});

router.post('/uploadProfilePicture', (req, res) => {
    
    userController.uploadProfilePicture(req, res);
});

router.post('/uploadPortfolioPicture-1', (req, res) => {
    
    userController.uploadPortfolioPicture("portfolio-picture-1",req, res);
});

router.post('/uploadPortfolioPicture-2', (req, res) => {
    
    userController.uploadPortfolioPicture("portfolio-picture-2",req, res);
});

router.post('/uploadPortfolioPicture-3', (req, res) => {
    
    userController.uploadPortfolioPicture("portfolio-picture-3",req, res);
});

router.post('/uploadPortfolioPicture-4', (req, res) => {
    userController.uploadPortfolioPicture("portfolio-picture-4",req, res);
});

router.post('/uploadHeaderImage', (req, res) => {
    userController.uploadHeaderImage(req, res);
});

router.post('/uploadSkills', (req, res) => {
    userController.uploadSkills(req, res);
});

router.get('/getUserSkills', (req, res) => {
    userController.getUserSkills(req, res);
});

router.get('/getUserAlerts', (req, res) => {
    userController.getUserAlerts(req, res);
});

router.post('/setAlerts', (req, res) => {
    userController.setAlerts(req, res);
});

router.post('/updatePassword', (req, res) => {
    userController.updatePassword(req, res);
});

router.post('/signup', (req, res) => {
    
    userController.createUser(req, res);
});


router.post('/facebook-api', (req, res) => {
    
    userController.facebookAPI(req, res);
});

router.post('/verifyEmail', (req, res) => {
    
    userController.verifyEmail(req, res);
});



// router.delete('/deletecar', (req, res) => {
//     userController.deleteCar(req, res);
// });

export default router;