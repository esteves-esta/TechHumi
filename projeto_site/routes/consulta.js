// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

// ===============================================
// CONSULTAR O REPRESENTANTE LOGADO E SUA A EMPRESA E SEU ENDEREÇO
// USADO PARA TRAZER INFORMAÇÕES 
// PARA CONSULTA:
//    NA TELA PERFIL E 
//    NA TELA DE ALTERAÇÃO DO REPRESENTANTE 
//    NA TELA DE ALTERAÇÃO DA EMPRESA
router.post('/consultar', function (req, res, next) {
  banco.sql.close();


  banco.conectar().then(() => {

    var cod = req.body.codigo;
    

    return banco.sql.query(`select * from Empresa 
    inner join Funcionario on fkEmpresa = idEmpresa
    inner join Endereco as e on e.fkEmpresa = idEmpresa
    where idFuncionario = ${cod} or idEmpresa = ${cod};`);

  }).then(consulta => {

    //console.log(`Dados: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length >= 1) {
      res.send(consulta.recordset[0]);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

// ===============================================


// CONSULTAR TODAS AS EMPRESAS E SEUS REPRESENTANTES
// USADO NA CONSULTA DE EMPRESA E DE REPRESENTANTE
router.post('/consulta-empresas', function (req, res, next) {
  banco.sql.close();

  banco.conectar().then(() => {

    return banco.sql.query(`select * from Empresa 
    inner join Funcionario as f on f.fkEmpresa = idEmpresa
    inner join Endereco as e on e.fkEmpresa = idEmpresa
    where f.cargoFuncionario = 'Representante';`);

  }).then(consulta => {

    console.log(`Dados: ${JSON.stringify(consulta.recordset[1])}`);

    if (consulta.recordset.length != 0) {
      res.send(consulta.recordset);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

// ===============================================


// CONSULTA OS FUNCIONÁRIOS DA EMPRESA DO REPRESENTANTE LOGADO 
router.post('/consulta-funcionario', function (req, res, next) {
  banco.sql.close();


  banco.conectar().then(() => {

    var idempresa = req.body.codigo;
    console.log('Código da empresa: ' + idempresa);
    
    return banco.sql.query(`select * from Funcionario 
    where fkEmpresa = ${idempresa};`);

  }).then(consulta => {

    console.log(`Dados: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length > 0) {
      res.send(consulta.recordset);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

// ===============================================

// CONSULTA SOMENTE OS AMBIENTES
// DA EMPRESA DO FUNCIONÁRIO LOGADO 
router.post('/consulta-ambiente', function (req, res, next) {
  banco.sql.close();


  banco.conectar().then(() => {

    var cdempresa = req.body.codigo;
    return banco.sql.query(`select * from Ambiente 
    inner join Funcionamento on fkFuncionamento = idFuncionamento
    where fkEmpresa = ${cdempresa};`);

  }).then(consulta => {

    console.log(`Dados: ${JSON.stringify(consulta.recordset)}`);
    
    if (consulta.recordset.length >= 0) {
      res.send(consulta.recordset);
    } 
    else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

// ===============================================


// CONSULTA AMBIENTE PARA ALTERAÇÃO
router.post('/consulta-ambiente-alterar', function (req, res, next) {
  banco.sql.close();


  banco.conectar().then(() => {

    var cdambiente = req.body.codigo;
    
    return banco.sql.query(`select * from Ambiente 
    inner join Funcionamento on fkFuncionamento = idFuncionamento
    where idAmbiente = ${cdambiente};`);

  }).then(consulta => {

    //console.log(`Dados: ${JSON.stringify(consulta.recordset)}`);
    
    if (consulta.recordset.length >= 0) {
      res.send(consulta.recordset);
    } 
    else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro: ${err}`;
    
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

//Redefição
router.post('/consulta-email', function (req, res, next) {
  banco.sql.close();


  banco.conectar().then(() => {

    var cdempresa = req.body.email;
    return banco.sql.query(`select * from Funcionario 
    inner join  login on fkfuncionario=idfuncionario
    where emailFuncionario='${cdempresa}';`);

  }).then(consulta => {

    console.log(`Dados: ${JSON.stringify(consulta.recordset)}`);
    
    if (consulta.recordset.length >= 0) {
      res.send(consulta.recordset);
    } 
    else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});


// não mexa nesta linha!
module.exports = router;