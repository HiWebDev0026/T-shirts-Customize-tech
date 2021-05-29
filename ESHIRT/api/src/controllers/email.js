const nodemailer= require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'e.shirt2021@gmail.com',
      pass: 'eshirt2021grupo8'
    }
  });


async function sendEmail(req, res, next){
    console.log('email')
    let {email, status}= req.body
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
}

module.exports={
    sendEmail
}