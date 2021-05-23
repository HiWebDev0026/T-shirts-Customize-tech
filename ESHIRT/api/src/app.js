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
    let orders= await Order.findAll()

  /* 
    Aca tenemos que iterar todas las ordenes y por cada
    una, hacer un getPayment para consultar el estado
    del pago. Con ese status que nos traemos, hay que 
    hacer un modifyOrder para modificar el status de esa
    orden.
    Esto lo vamos a hacer cada 15 min para ir actualizanado
    el status de todas las ordenes, ya que no tenemos forma
    de que mercadopago nos avise cuando hay un cambio en el
    estado del pago
  */

    for(let order of orders){
      let payment= await mercadopago.get(`/v1/payments/search`, {"external_reference": order.paymentId})
      order.status = payment.body.results.status_detail
      await order.save()
    }
    return 
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

// setInterval(paymentUpdate, 6000)

server.use((err, req, res, next) => { 
  const status = err.status || 500;
  console.error(err);
  res.status(status).json(err);
});

module.exports = server;
