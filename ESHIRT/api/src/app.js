const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const path = require('path');
const {createProxyMiddleware} = require('http-proxy-middleware')
const mercadopago= require('mercadopago');
const { default: axios } = require('axios');
const {CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN}= process.env
const {Order}= require('./db')
const {getPayment}= require('./controllers/payment')
const {Op}= require('sequelize')

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

//////////////////////// PAYMENT UPDATE /////////////////
async function paymentUpdate(){
  try {
    let payments= await axios.get('http://localhost:3001/payment')
    let dataToCheck= []
    payments.data.body.results.forEach(result => {
      if (result.metadata?.id){
        dataToCheck.push({
          id: result.metadata.id,
          status: result.status.toUpperCase() === 'REJECTED' ? 'CANCELED' : result.status.toUpperCase()
          }
        )}
    }) // Aca tenemos un array con ids y status
    
    let orderFound= []
    let ordersToCheck= dataToCheck.map(e => {
      return new Promise((resolve, reject)=> {
        try {
          //if(e.id !== 5 && e.id !== '5'){
          orderFound = Order.findOne({
          where: {
            id: e.id
          }
        }) //}
        }
        catch(error){console.log('error', error)}
    
        if(orderFound.length < 1 || orderFound === undefined || orderFound === null) {
          return reject(new Error('${orderFound}'));
        } 
        
        return resolve(orderFound);
      })
    })
    Promise.all(ordersToCheck)
    .then(data => {
      // data= [con lo que haya que chequear de la db] contra dataToCheck=[lo que me trajo mp]
      for (let i=0; i< dataToCheck.length; i++){
        for (let j=0; j< data; j++){
          if (dataToCheck[i].id === data[j].id){
            if (dataToCheck[i].status !== data[j].status){
              data[j].status= dataToCheck[i].status
            }}
        }
      }
      console.log(data)
    })
   
  }
  catch(error){return error}
    
}
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

//setInterval(paymentUpdate, 60000)

server.use((err, req, res, next) => { 
  const status = err.status || 500;
  console.error(err);
  res.status(status).json(err);
});

module.exports = server;
