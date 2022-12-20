var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var app = module.exports = express();
const config = require('./config');

app.set('port', (process.env.PORT || 4250));
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var fs = require('fs');
var nodemailer = require('nodemailer');

app.post('/', function (req, res) {
  // 
  console.log(req.body.length)
  let transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    secure: false,
    port: 587,
    auth: {
      user: 'b2df5aa9f49e7a5e97ea88036158266d',
      pass: 'f4c4d6b7ea6cf9c311c0fceccc7f935f'
    }
  });
  var i = 0;                 
  function myLoop() {        
    setTimeout(function () {   
      var datas = req.body[i].data;
      var email = req.body[i].email;
      var slip_date = req.body[i].slip_date;
      var name = req.body[i].name;
      var shopname = req.body[i].shopname;
      console.log('sending email...' + email + ' - ' + (i + 1))
      let HelperOptions = {
        from: '"CoCoPayday - ' + shopname + '" <admin@smldatacenter.com>',
        to: email,
        subject: 'Payslip for ' + slip_date + ' from CocoPayday',
        html: 'Hello ' + name + ',<br><br> Here is your payslip for ' + slip_date + ' from ' + shopname,
        attachments: [{
          filename: 'PaySlip' + slip_date + '.pdf',
          content: Buffer.from(datas, 'base64'),
          contentType: 'application/pdf'
        }],
      }
      transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        res.json({ output: 'The message was sent!', message: info });
        console.log("The message was sent!");
        console.log(info);
      });
  
      console.log('sending email done')
      i++;                   
      if (i < req.body.length) {           
        myLoop();             
      }                     
    }, 10)
  }

  myLoop();
  res.json({ output: 'success', message: 'done' });
  // 
})

app.get('/getEmail/', function (req, res) {


  let transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    secure: false,
    port: 587,
    auth: {
      user: 'b2df5aa9f49e7a5e97ea88036158266d',
      pass: 'f4c4d6b7ea6cf9c311c0fceccc7f935f'
    }
  });

  let HelperOptions = {
    from: '"CoCoPayday" <fish@smldatacenter.com>',
    to: 'webmaster@smlsoft.com',
    subject: 'Payslip From CocoPayday Node Service',
    text: 'Test Sent Payslip From NodeJs 2019-05-31 ',
    attachments: [{
      filename: 'SmlsoftPayslip.pdf',
      path: 'C:/Users/SMLDEV-Fish/Desktop/allemp.pdf',
      contentType: 'application/pdf'
    }],
  };

  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.json({ output: 'The message was sent!', message: info });
    console.log("The message was sent!");
    console.log(info);
  });
  res.json({ output: 'success', message: 'done' });
})

app.post('/sendEmail', function (req, res) {

  console.log('33333333')
})


app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'));
})