// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.post('/consulta', function (req, res, next) {
  banco.sql.close();


  banco.conectar().then(() => {

    var idfunc = req.body.codigo;

    return banco.sql.query(`select * from Empresa 
    inner join Funcionario on fkEmpresa = idEmpresa
    inner join Endereco as e on e.fkEmpresa = idEmpresa
    where idFuncionario =${idfunc};`);

  }).then(consulta => {

    //console.log(`Dados: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length == 1) {
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

router.post('/alterar', function (req, res, next) {


  var empresa = {
    codigo: req.body.cd_emp,
    nome: req.body.empresa,
    cnpj: req.body.cnpj,
    telefone_um: req.body.tele1,
    telefone_dois: req.body.tele2
  };

  var funcionario = {
    codigo: req.body.cd_func,
    nome: req.body.representante,
    rg: req.body.rg,
    cpf: req.body.cpf,
    telefone: req.body.telefone,
    email: req.body.email
  };

  var endereco = {
    codigo: req.body.cd_end,
    logradouro: req.body.logradouro,
    cep: req.body.cep,
    bairro: req.body.bairro,
    complemento: req.body.complemento,
    referencia: req.body.referencia,
    cidade: req.body.cidade,
    uf: req.body.uf,
    numero: req.body.numero
  };

console.log(funcionario);

  banco.conectar().then(() => {
    // ALTERAÇÃO DO FUNCIONARIO
    banco.sql.query(`update Funcionario set 
      nomeFuncionario = '${funcionario.nome}', 
      rgFuncionario = '${funcionario.rg}',
      cpfFuncionario = '${funcionario.cpf}',
      emailFuncionario = '${funcionario.email}',
      telefoneFuncionario = '${funcionario.telefone}'
      where idFuncionario = ${funcionario.codigo};`)
      .then(function () {

        res.sendStatus(201);
        console.log('alterou 4');
        // status 201 significa que algo foi criado no back-end, 
        // no caso, um registro de usuário ;)		
      }).catch(err => {

        var erro = `Erro na alteração: ${err}`;
        console.error(erro);
        res.status(500).send(erro);

      }).finally(() => {
        banco.sql.close();
      });

      ///ALTERAÇÃO DA EMPRESA
    banco.sql.query(`update Empresa set 
      nomeEmpresa = '${empresa.nome}', 
      cnpjEmpresa = '${empresa.cnpj}',
      telefoneEmpresa1 = '${empresa.telefone_dois}',
      telefoneEmpresa2 = '${empresa.telefone_um}'
      where idEmpresa = ${empresa.codigo};`)
      .then(function () {
        res.sendStatus(201);
        console.log('alterou 2');
        // status 201 significa que algo foi criado no back-end, 
        // no caso, um registro de usuário ;)		
      }).catch(err => {

        var erro = `Erro na alteração: ${err}`;
        console.error(erro);
        res.status(500).send(erro);

      }).finally(() => {
        banco.sql.close();
      });

      //ALTERAÇÃO DO ENDEREÇO
    return banco.sql.query(`update Endereco set 
      logradouro = '${endereco.logradouro}', 
      numero = '${endereco.numero}',
      complemento = '${endereco.complemento}',
      bairro = '${endereco.bairro}',
      cidade = '${endereco.cidade}',
      uf = '${endereco.uf}',
      cep = '${endereco.cep}',
      referencia = '${endereco.referencia}'
      where idEndereco = ${endereco.codigo};`);

  }).then(consulta => {
    console.log('alterou');
    res.sendStatus(201);

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