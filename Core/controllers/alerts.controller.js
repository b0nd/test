import alerts from '../models/alerts.model';
import logger from '../core/logger/app-logger'
import jwt from 'jsonwebtoken';
import verifyToken from '../config/validation'
import { sendEmail, getSuccessObject, getErrorObject } from '../utils/util'
import  * as CONSTANTS  from '../utils/constants'
import multer from 'multer';
const controller = {};


controller.sendCategoriesAlerts=  async (categoryId)=>{

    let requestObject = {
      };

     // const bearerHeader = req.headers['authorization'];
      try {
        let result = await alerts.getUserIdForAlert(categoryId);
        let body = `Hello,<br> Please Click on the link to verify your email.<br>`

        console.log("alerts    "+JSON.stringify(result))
        //res.send(getSuccessObject(result));
        for(let i=0;i<result.length;i++)
        {
            sendEmail(result[i].email,"Alerts",body);
        }
      }
      catch(err) {
          logger.error('Error in login- ' + err);
          //res.send(getErrorObject(500,err));

      }


}
// controller.postTask = async (req, res) => {
//     let requestObject = {
//         subCategoryId: req.body.subCategory.id,
//         taskDescription: req.body.taskDescription,
//         taskTypeId :req.body.taskTypeId,
//         location:req.body.location.City,
//         lat:req.body.location.lat,
//         lon:req.body.location.lon,
//         dueDate:new Date(req.body.dueDate),
//         expectedCost:req.body.expectedCost,
//         status:"open"
//       };
//       console.log("test");
//       const bearerHeader = req.headers['authorization'];
//       console.log("bearer token"+bearerHeader);
//       try {
//           const data = await jwt.verify(req.body.token, 'test');
//           if(data.id){
//             let result = await market.postTask(data.id,requestObject);
//             console.log("dataaa    "+JSON.stringify(result))
//             res.send(getSuccessObject(result));
//           }else
//           res.send(getErrorObject(500,"something went wrong"));
//       }
//       catch(err) {
//           logger.error('Error in login- ' + err);
//           res.send(getErrorObject(500,err));

//       }
//   }

  

//   controller.bidATask = async (req, res) => {
//     let requestObject = {
//         taskId: req.body.taskId,
//         comment: req.body.comment,
//         offer :req.body.offer,
//       };
//       try {
//         const bearerHeader = req.headers['authorization'];//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTUzMzM3NzUxMn0.WhH7-TZtD7Pip0laVeCA7A-yZuwEYSBNZfJhdaIs7_k"; req.headers['authorization'];

//         const bearer = bearerHeader.split(' ');
        
//          const bearerToken = bearer[1];
//          const data = await jwt.verify(bearerToken, 'test');
//           if(data.id){
//             let result = await market.bidATask(data.id,requestObject);
//             console.log("dataaa    "+JSON.stringify(result))
//             res.send(getSuccessObject(result));
//           }else
//           res.send(getErrorObject(500,"something went wrong"));
//       }
//       catch(err) {
//           logger.error('Error in login- ' + err);
//           res.send(getErrorObject(500,err));

//       }
//   }
export default controller;