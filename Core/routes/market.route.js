import express from "express";
import marketController from "../controllers/market.controller"

import passport from 'passport'
import * as db from '../config/db'

const router = express.Router()




router.post('/postTask',async (req, res) => {
    
    marketController.postTask(req, res);
});
router.post('/acceptBid',async (req, res) => {
    
    marketController.acceptBid(req, res);
});

router.post('/bid-a-task',async (req, res) => {
    
    marketController.bidATask(req, res);
});

router.get('/getTasks',async (req,res)=>{

    marketController.getTaks(req,res);
})


router.get('/getTasksAsAUser',async (req,res)=>{

    marketController.getTasksAsAUser(req,res);
})


router.get('/getTasksAsATasker',async (req,res)=>{

    marketController.getTasksAsATasker(req,res);
})

router.get('/getBids',async (req,res)=>{

    marketController.getBids(req,res);
})

router.get('/test-get',async (req, res) => {
    
    res.send("aa gaya bc");
});


export default router;