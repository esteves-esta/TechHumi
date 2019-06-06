// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

const nodemailer = require('nodemailer');

router.post('/enviar_email', function (req, res, next) {


// dados da TechHumi q vai enviar
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "techhumicorporation@gmail.com",
        pass: "Voupassar123"
    },
    tls: { rejectUnauthorized: false }
  });

  // dados do usuario q vamos enviar
  var email=req.body.email; // email do usuario
  const mailOptions = {// email q será enviado
    from: 'techhumicorporation@gmail.com',
    to: email,
    subject: 'Redefinição de senha',
    html: `<h1>Redefinição de senha</h1> <br>
    <p>Sua nova senha temporaria é <b>1234</b></p>
    <p>Por favor altere essa senha quando logar</p>`
  };

  // Autentifica se foi enviado e envia notificação
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500).send(error);

    } else {
      console.log('Email enviado: ' + info.response);
      res.send(info.response);
    }
  });
});


// ENVIAR EMAIL EMPRESA
router.post('/emailEmp', function (req, res, next) {

  // dados da TechHumi q vai enviar
  const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: "techhumicorporation@gmail.com",
          pass: "Voupassar123"
      },
      tls: { rejectUnauthorized: false }
    });
  
    // dados do usuario q vamos enviar
    var email="techhumicorporation@gmail.com"; // email do usuario
    const mailOptions = {// email q será enviado
      from: 'techhumicorporation@gmail.com',
      to: email,
      subject: 'Contato com a techHumi',
      html: `<h1>Dados do interessado</h1> <br>
      Empresa: ${req.body.nomeEmp} <br>
      Representante: ${req.body.nomeRep} <br>
      CNPJ: ${req.body.cnpjEmp} <br>
      Telefone: (${req.body.dd})${req.body.telEmp}<br>
      Mensagem:${req.body.msg}`
    };
  
    // Autentifica se foi enviado e envia notificação
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.status(500).send(error);
  
      } else {
        console.log('Email enviado: ' + info.response);
        res.send(info.response);
      }
    });
  });
  

  // não mexa nesta linha!
module.exports = router;

// Informações importantes
// https://support.google.com/mail/answer/7126229?p=BadCredentials&visit_id=636952698331422303-2710741373&rd=2#cantsignin
//https://support.google.com/accounts/answer/185833?hl=pt-BR
//https://myaccount.google.com/lesssecureapps?utm_source=google-account&utm_medium=web
