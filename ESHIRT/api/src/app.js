const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const path = require('path');
const {createProxyMiddleware} = require('http-proxy-middleware')
const mercadopago= require('mercadopago')
const {CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN}= process.env

require('./db.js');

const server = express();
const corsOptions = {
  origin: true,
  credentials: true,
}


server.name = 'api_eshirts_server';

server.options('*', cors(corsOptions));

/////////////////////////MERCADOPAGO/////////////////////
mercadopago.configure({
  access_token: ACCESS_TOKEN
});
/////////////////////////////////////////////////////////

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  if(req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
  next();
  }
});



/*server.use(
        '/',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );*/
           

server.use('/', routes);

server.use((err, req, res, next) => { 
  const status = err.status || 500;
  console.error(err);
  res.status(status).json(err);
});

module.exports = server;
