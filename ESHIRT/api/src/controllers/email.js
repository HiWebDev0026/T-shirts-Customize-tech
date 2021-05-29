const nodemailer= require('nodemailer');
const { getMaxListeners } = require('../app');
const fs= require('fs')
var path = require("path");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'e.shirt2021@gmail.com',
      pass: 'eshirt2021grupo8'
    }
    }
);


var utils = {};
utils.readFile = function (filename, callback) {
	var randExtraTime = Math.random() * 200;
	setTimeout(function () {
		fs.readFile(filename, function (err, buffer) {
			if (err) callback(err);
			else callback(null, buffer.toString());
		});
	}, randExtraTime);
};

utils.promisifiedReadFile = function (filename) {
	return new Promise(function (resolve, reject) {
		utils.readFile(filename, function (err, str) {
			if (err) reject(err);
			else resolve(str);
		});
	});
};
  


  async function sendEmail(req, res, next){
    let {email, status}= req.body
    let textColor=''
    let fileName=''
    switch (status){
        case 'APPROVED':
            fileName= 'approved.html'
        case 'CANCELED':
            fileName= 'canceled.html'
        case 'PENDING':
            fileName= 'pending.html'
        case 'DISPATCHED':
            fileName= 'dispatched.html'
        case 'DONE':
            fileName= 'done.html'
        case 'CANCELED BY ADMIN':
            fileName= 'canceled.html'        
        default:    
            fileName= 'pending.html'
    }
    var absolutePath = path.resolve(`./src/controllers/emails/approved.html`);
    let htmlContent = await utils.promisifiedReadFile(absolutePath)

    

    status === 'APPROVED' ? textColor= 'green' : status === 'CANCELED' ? textColor= 'red' : textColor= 'orange' 
    var mailOptions = {
        from: 'e.shirt2021@gmail.com',
        to: 'bolzicoemanuel@gmail.com',
        subject: 'E-Shirt paymet update! (do not reply)',
        html: htmlContent
    };
  
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}

module.exports={
    sendEmail
}