import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from './core/logger/app-logger'
import morgan from 'morgan'
import config from './core/config/config.dev'

import users from './routes/user.route'
import publicApi from './routes/public.route'
import market from './routes/market.route';
import { connectToDb } from './config/db'
import jwt from 'jsonwebtoken';
import mysql from 'mysql';
import verifyToken from './config/validation';
import test from './models/user.model'

import { static_content } from './utils/staticContent'
var path = require('path'); 


//var cors = require('cors')
import userController from './controllers/user.controller';

var fs = require('fs');

var mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
};


const port =config.serverPort;
logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

//connectToDb();

const app = express();
// app.use(express.static('app'));

app.use(function(req, res, next) {
  console.log("header setting");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});


// app.get('/*', function(req, res){
//   res.sendfile("index.html", {root: path.join(__dirname, 'app')});
// });
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));





app.use('/users', users);
app.use("/api",publicApi);
app.use("/market",market);
//smtp protocal 

//smtp protocol
//Index route

app.get('/verifyEmail', (req, res) => {
  //  test.createUser(req, res)
  console.log("varified"+req.query.id);
  res.send(static_content[req.query.id]);
  });

app.get('/login', (req, res) => {
   let token =  jwt.sign({id:1,name:'kashif'},"test");
    res.json({token});
});


app.post('/api/posts', (req, res) => {  
  console.log("token"+req.body.token);
  // jwt.verify(req.body.token, 'test', (err, authData) => {
  //   if(err) {
  //     res.sendStatus(403);
  //   } else {
  //     res.json({
  //       message: 'Post created...',
  //       authData
  //     });
  //   }
  // });

  jwt.verify(req.body.token, 'test', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

//test.createUser();
//test2.addCar();
//userController.login();

app.use(express.static(path.join(__dirname, 'app')));
app.options('*', cors());
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

var dir = path.join(__dirname, 'app');
app.get('*', function (req, res) {
  var file = path.join(dir, req.path.replace(/\/$/, '/index.html'));
  if (file.indexOf(dir + path.sep) !== 0) {
      return res.status(403).end('Forbidden');
  }
  var type = mime[path.extname(file).slice(1)] || 'text/plain';
  var s = fs.createReadStream(file);
  s.on('open', function () {
      res.set('Content-Type', type);
      s.pipe(res);
  });
  s.on('error', function () {
      res.set('Content-Type', 'text/plain');
      res.status(404).end('Not found');
  });
});

app.listen(port, () => {
    logger.info('server started - ', port);
});