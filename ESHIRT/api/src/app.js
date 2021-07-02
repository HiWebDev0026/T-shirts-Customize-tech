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
const {CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN, BACKEND_URL}= process.env
const {Order, Shirt}= require('./db')
const {getPayment}= require('./controllers/payment')
const {Op}= require('sequelize')
const nodemailer= require('nodemailer')

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

//////////////////// MAILING ////////////////////////////

/* const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'e.shirt2021@gmail.com',
    pass: 'eshirt2021grupo8'
  }
});

async function sendEmail(email, status) {
  let textColor=''
  status === 'APPROVED' ? textColor= 'green' : status === 'CANCELED' ? textColor= 'red' : textColor= 'orange' 
  var mailOptions = {
    from: 'e.shirt2021@gmail.com',
    to: email,
    subject: 'E-Shirt paymet update! (do not reply)',
    html: `<h1 style="color:blue">We have an update on your order!</h1><p>It is now <span style="color: ${textColor}">${status}</span></p>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
} */


/////////////////////////////////////////////////////////

//////////////////////// PAYMENT UPDATE /////////////////
async function paymentUpdate(){
  try {
    let payments= await axios.get('http://localhost:3001/payment')
    let mpData= []
    payments.data.body.results.forEach(result => {
      if (result.metadata?.id){
        mpData.push({
          id: result.metadata.id,
          status: result.status.toUpperCase() === 'REJECTED' ? 'CANCELED' : result.status.toUpperCase(),
          email: result.metadata.email
          }
        )}
    }) // Aca tenemos un array con ids, status, email
    
    let orderFound= []
    let ordersToCheck= mpData.map(e => {
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
      for (let i=0; i< mpData.length; i++){
        for (let j=0; j< data.length; j++){
          if (parseInt(mpData[i].id) === parseInt(data[j]?.id) && mpData[i].status !== data[j].status){  
            if(data[j].status !== 'DONE' && data[j].status !== 'DISPATCHED' && data[j].status !== 'CANCELED BY ADMIN'){
              data[j].status= mpData[i]?.status
              data[j].save()
              if (mpData[i].email){
                let sent= axios({
                  method: 'post',
                  url: BACKEND_URL || 'http://localhost:3001/email',
                  data:{
                    email: mpData[i].email,
                    status: mpData[i].status
                  }
                })
              } // sendEmail(mpData[i].email, mpData[i].status)

            }
          }
        }
      }
    })
   
  }
  catch(error){return error}
    
}
/////////////////////////////////////////////////////////

//////////////////////// DISCOUNT UPDATE /////////////////
async function discountUpdate() {
  
  try {

    let response = await Shirt.findAll();
    
    response.forEach(elem => {
      elem.price;
      
      /* console.log(elem.price); */
    })

    /* console.log('OK'); */

  } catch (error) {
    console.log(error)
  }
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
           

server.use('/api', routes);


setInterval(paymentUpdate, 60000)
setInterval(discountUpdate, 5000)

server.use((err, req, res, next) => { 
  const status = err.status || 500;
  console.error(err);
  res.status(status).json(err);
});

module.exports = server

