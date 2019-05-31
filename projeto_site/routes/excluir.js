
// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!


  // ===============================================
  var idExcluir;
  // ALTERAÇÃO DO FUNCIONARIO
  router.post('/excluir-funcionario', function (req, res, next) {
    banco.sql.close();
    idExcluir = req.body.codigo;
    
    banco.conectar().then(() => {
  

    console.log(idExcluir) ; 
  
     banco.sql.query(`delete from Login where fkFuncionario = ${idExcluir}`);
  
    }).then(consulta => {
      console.log('excluiu login');
      res.sendStatus(201);
  
    }).catch(err => {
  
      var erro = `Erro: ${err}`;
      console.error(erro);
  
      res.status(500).send(erro);
  
    }).finally(() => {
            banco.sql.query(`delete from Funcionario where idFuncionario = ${idExcluir}`)
            .then(consulta => {
            console.log('excluiu funcionario');
            res.sendStatus(201);
        
            }).catch(err => {
        
            var erro = `Erro: ${err}`;
            console.error(erro);
        
            res.status(500).send(erro);
        
            }).finally(() => {
            banco.sql.close();
            });
    });
  
  });

// não mexa nesta linha!
module.exports = router;