// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

// consultar empresas e endereços e funcionario representante pelo código do usuário cadastrado
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

var empresa = {
  codigo: '',
  nome: '',
  cnpj: '',
  telefone_um: '',
  telefone_dois: '',
};

var funcionario = {
  codigo: '',
  nome: '',
  rg: '',
  cpf: '',
  telefone: '',
  email: '',
};

var endereco = {
  codigo: '',
  logradouro: '',
  cep: '',
  bairro: '',
  complemento: '',
  referencia: '',
  cidade: '',
  uf: '',
  numero: '',
};

//ALTERAÇÃO DO EMPRESA
router.post('/alterar-empresa', function (req, res, next) {

  empresa.codigo = req.body.cd_emp;
  empresa.nome = req.body.empresa;
  empresa.cnpj = req.body.cnpj;
  empresa.telefone_um = req.body.tele1;
  empresa.telefone_dois = req.body.tele2;

  endereco.codigo = req.body.cd_end;
  endereco.logradouro = req.body.logradouro;
  endereco.cep = req.body.cep;
  endereco.bairro = req.body.bairro;
  endereco.complemento = req.body.complemento;
  endereco.referencia = req.body.referencia;
  endereco.cidade = req.body.cidade;
  endereco.uf = req.body.uf;
  endereco.numero = req.body.numero;

 

  banco.conectar().then(() => {
  
    ///ALTERAÇÃO DA EMPRESA
    banco.sql.query(`update Endereco set 
         logradouro = '${endereco.logradouro}', 
         numero = '${endereco.numero}',
         complemento = '${endereco.complemento}',
         bairro = '${endereco.bairro}',
         cidade = '${endereco.cidade}',
         uf = '${endereco.uf}',
         cep = '${endereco.cep}',
         referencia = '${endereco.referencia}'
         where idEndereco = ${endereco.codigo};`)
      .then(function() {
        console.log('alterou 00');
        res.sendStatus(201);
        
      }).catch(err => {

        var erro = `Erro na alteração: ${err}`;
        console.error(erro);
        res.status(500).send(erro);

      }).finally(() => {
        banco.sql.close();
      });
   

        return banco.sql.query(`update Empresa set 
      nomeEmpresa = '${empresa.nome}', 
      cnpjEmpresa = '${empresa.cnpj}',
      telefoneEmpresa1 = '${empresa.telefone_dois}',
      telefoneEmpresa2 = '${empresa.telefone_um}'
      where idEmpresa = ${empresa.codigo};`);

      }).then(consulta => {
        console.log('alterou 11');
        res.sendStatus(201);

      }).catch(err => {

        var erro = `Erro: ${err}`;
        console.error(erro);

        res.status(500).send(erro);

      }).finally(() => {
        banco.sql.close();
      });
  
});

  // ALTERAÇÃO DO FUNCIONARIO
  router.post('/alterar-funcionario', function (req, res, next) {
    banco.sql.close();
    banco.conectar().then(() => {

      funcionario.codigo = req.body.cd_func;
      funcionario.nome = req.body.representante;
      funcionario.rg = req.body.rg;
      funcionario.cpf = req.body.cpf;
      funcionario.telefone = req.body.telefone;
      funcionario.email = req.body.email;

      return banco.sql.query(`update Funcionario set 
    nomeFuncionario = '${funcionario.nome}', 
    rgFuncionario = '${funcionario.rg}',
    cpfFuncionario = '${funcionario.cpf}',
    emailFuncionario = '${funcionario.email}',
    telefoneFuncionario = '${funcionario.telefone}'
    where idFuncionario = ${funcionario.codigo};`);

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


  // CONSULTAR TODAAS AS EMPRESAS
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


  // não mexa nesta linha!
  module.exports = router;