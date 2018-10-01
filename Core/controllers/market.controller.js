import market from '../models/market.model';
import logger from '../core/logger/app-logger'
import jwt from 'jsonwebtoken';
import verifyToken from '../config/validation'
import { sendEmail, getSuccessObject, getErrorObject } from '../utils/util'
import  * as CONSTANTS  from '../utils/constants'
import multer from 'multer';
import alertController from './alerts.controller'
const controller = {};


controller.getTaks=  async (req,res)=>{

    let requestObject = {
        // subCategoryId: req.body.subCategory.id,
        // taskDescription: req.body.taskDescription,
        // taskTypeId :req.body.taskTypeId,
        // location:req.body.location,
        // dueDate:new Date(req.body.dueDate),
        // expectedCost:req.body.expectedCost,
        // status:"open"
      };

     // const bearerHeader = req.headers['authorization'];
      try {
        let result = await market.getTaks(req);
        console.log("dataaa    "+JSON.stringify(result))
        res.send(getSuccessObject(result));
      }
      catch(err) {
          logger.error('Error in login- ' + err);
          res.send(getErrorObject(500,err));

      }


}



controller.getTasksAsAUser=  async (req,res)=>{

    const bearerHeader = req.headers['authorization'];//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTUzMzM3NzUxMn0.WhH7-TZtD7Pip0laVeCA7A-yZuwEYSBNZfJhdaIs7_k"; req.headers['authorization'];

    const bearer = bearerHeader.split(' ');
    
     const bearerToken = bearer[1];
     const data = await jwt.verify(bearerToken, 'test');

      try {
        let result = await market.getTasksAsAUser(data.id);
        console.log("dataaa    "+JSON.stringify(result))
        res.send(getSuccessObject(result));
      }
      catch(err) {
          logger.error('Error in login- ' + err);
          res.send(getErrorObject(500,err));

      }


}
controller.getTasksAsATasker=  async (req,res)=>{



      try {
        const bearerHeader = req.headers['authorization'];//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTUzMzM3NzUxMn0.WhH7-TZtD7Pip0laVeCA7A-yZuwEYSBNZfJhdaIs7_k"; req.headers['authorization'];

        const bearer = bearerHeader.split(' ');
        
         const bearerToken = bearer[1];
         const data = await jwt.verify(bearerToken, 'test');
        let result = await market.getTasksAsATasker(data.id);
        console.log("dataaa    "+JSON.stringify(result))
        res.send(getSuccessObject(result));
      }
      catch(err) {
          logger.error('Error in login- ' + err);
          res.send(getErrorObject(500,err));

      }


}


controller.getBids=  async (req,res)=>{



    try {
    //   const bearerHeader = req.headers['authorization'];//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTUzMzM3NzUxMn0.WhH7-TZtD7Pip0laVeCA7A-yZuwEYSBNZfJhdaIs7_k"; req.headers['authorization'];

    //   const bearer = bearerHeader.split(' ');
      
    //    const bearerToken = bearer[1];
    //    const data = await jwt.verify(bearerToken, 'test');
      let result = await market.getBids(req.query.taskId);
      console.log("dataaa    "+JSON.stringify(result))
      res.send(getSuccessObject(result));
    }
    catch(err) {
        logger.error('Error in login- ' + err);
        res.send(getErrorObject(500,err));

    }


}


controller.postTask = async (req, res) => {
    let requestObject = {
        subCategoryId: req.body.subCategory.id,
        taskDescription: req.body.taskDescription,
        taskTypeId :req.body.taskTypeId,
        location:req.body.location.City,
        lat:req.body.location.lat,
        lon:req.body.location.lon,
        dueDate:new Date(req.body.dueDate),
        expectedCost:req.body.expectedCost,
        status:"open"
      };
      console.log("test");
      const bearerHeader = req.headers['authorization'];
      console.log("bearer token"+bearerHeader);
      try {
          const data = await jwt.verify(req.body.token, 'test');
          if(data.id){
            let result = await market.postTask(data.id,requestObject);
          //  console.log("dataaa    "+JSON.stringify(result))
            alertController.sendCategoriesAlerts(requestObject.subCategoryId);
            res.send(getSuccessObject(result));
          }else
          res.send(getErrorObject(500,"something went wrong"));
      }
      catch(err) {
          logger.error('Error in login- ' + err);
          res.send(getErrorObject(500,err));

      }
  }
  
  controller.acceptBid = async (req, res) => {
    let requestObject = {
        bidId: req.body.bidId,
        taskId:req.body.taskId,
        taskerId:req.body.taskerId
      };

     
      try {
        const bearerHeader = req.headers['authorization'];//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTUzMzM3NzUxMn0.WhH7-TZtD7Pip0laVeCA7A-yZuwEYSBNZfJhdaIs7_k"; req.headers['authorization'];

        const bearer = bearerHeader.split(' ');
        
         const bearerToken = bearer[1];
        const data = await jwt.verify(bearerToken, 'test');
          if(data.id){
            let result = await market.acceptBid(requestObject);
          //  console.log("dataaa    "+JSON.stringify(result))
            alertController.sendCategoriesAlerts(requestObject.subCategoryId);
            res.send(getSuccessObject(result));
          }else
          res.send(getErrorObject(500,"something went wrong"));
      }
      catch(err) {
          logger.error('Error in login- ' + err);
          res.send(getErrorObject(500,err));

      }
  }
  

  controller.bidATask = async (req, res) => {
    let requestObject = {
        taskId: req.body.taskId,
        comment: req.body.comment,
        offer :req.body.offer,
      };
      try {
        const bearerHeader = req.headers['authorization'];//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTUzMzM3NzUxMn0.WhH7-TZtD7Pip0laVeCA7A-yZuwEYSBNZfJhdaIs7_k"; req.headers['authorization'];

        const bearer = bearerHeader.split(' ');
        
         const bearerToken = bearer[1];
         const data = await jwt.verify(bearerToken, 'test');
          if(data.id){
            let result = await market.bidATask(data.id,requestObject);
            console.log("dataaa    "+JSON.stringify(result))
            res.send(getSuccessObject(result));
          }else
          res.send(getErrorObject(500,"something went wrong"));
      }
      catch(err) {
          logger.error('Error in login- ' + err);
          res.send(getErrorObject(500,err));

      }
  }
export default controller;