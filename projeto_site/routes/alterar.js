
// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!


// ===============================================
// DECLARAÇÃO DE 3 JSON
// UTILIZADOS ABAIXO PARA GUARDAR DADOS RECEBIDO E UTILIZA-LOS NA ALTERAÇÃO

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
  login: ''
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

var senhas = {
  senha: '',
  confirmaSenha: '',
  fkFuncionario: ''
};

var ambiente = {
  codigo:'',
  descricao: '',
  localizacao: '',
  fkEmpresa: '',
  fkAmbiente: ''
};


var funcionamento = {
  codigo:'',
  horaIn: '',
  horaFi: '',
};
// ===============================================


// ALTERAÇÃO DA EMPRESA E 
// DO SEU ENDEREÇO
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
      .then(function () {
        console.log('Endereço alterado com sucesso');
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
        telefoneEmpresa1 = '${empresa.telefone_um}',
        telefoneEmpresa2 = '${empresa.telefone_dois}'
        where idEmpresa = ${empresa.codigo};`);

  }).then(consulta => {
    console.log('Empresa alterada com sucesso!');
    res.sendStatus(201);

  }).catch(err => {

    var erro = `Erro: ${err}`;
    console.error(erro);

    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

// ===============================================

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

// ===============================================

// ALTERAÇÃO DA EMPRESA E
// SEU ENDEREÇO E SEU REPRESENTANTE (FUNCIONÁRIO)
// UTILIZADO NA TELA DO PERFIL
// ACESSADO SOMENTE PELO REPRESENTANTE
router.post('/alterar-perfil', function (req, res, next) {

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

  funcionario.codigo = req.body.cd_func;
  funcionario.nome = req.body.representante;
  funcionario.rg = req.body.rg;
  funcionario.cpf = req.body.cpf;
  funcionario.telefone = req.body.telefone;
  funcionario.email = req.body.email;

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
      .then(function () {
        console.log('Endereço alterado com sucesso');
        res.sendStatus(201);

      }).catch(err => {

        var erro = `Erro na alteração: ${err}`;
        console.error(erro);
        res.status(500).send(erro);

      }).finally(() => {

        banco.sql.query(`update Funcionario set 
            nomeFuncionario = '${funcionario.nome}', 
            rgFuncionario = '${funcionario.rg}',
            cpfFuncionario = '${funcionario.cpf}',
            emailFuncionario = '${funcionario.email}',
            telefoneFuncionario = '${funcionario.telefone}'
            where idFuncionario = ${funcionario.codigo};`)

          .then(consulta => {
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


    return banco.sql.query(`update Empresa set 
        nomeEmpresa = '${empresa.nome}', 
        cnpjEmpresa = '${empresa.cnpj}',
        telefoneEmpresa1 = '${empresa.telefone_um}',
        telefoneEmpresa2 = '${empresa.telefone_dois}'
        where idEmpresa = ${empresa.codigo};`);

  }).then(consulta => {
    console.log('Empresa alterada com sucesso!');
    res.sendStatus(201);

  }).catch(err => {

    var erro = `Erro: ${err}`;
    console.error(erro);

    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

// ALTERAÇÃO DE SENHA
router.post('/alterar-senha', function (req, res, next) {
  banco.sql.close();

  console.log(req); 
  banco.conectar().then(() => {

    senhas.senha = req.body.senha;
    senhas.confirmaSenha = req.body.confirmaSenha;
    senhas.fkFuncionario = req.body.estrangeira;

    return banco.sql.query(`update Login set 
        senhaUsuario = '${senhas.senha}'
        where fkFuncionario = ${senhas.fkFuncionario};`);

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

// ===============================================

// ALTERAÇÃO DO AMBIENTE
router.post('/alterar-ambiente', function (req, res, next) {
  banco.sql.close();
  banco.conectar().then(() => {

    ambiente.codigo = req.body.cd_amb;
    ambiente.descricao = req.body.descricao;
    ambiente.localizacao = req.body.localizacao;

    return banco.sql.query(`update Ambiente set 
      descricaoAmbiente = '${ambiente.descricao}', 
      localizacaoAmbiente = '${ambiente.localizacao}'
      where idAmbiente = ${ambiente.codigo};`);

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


// ===============================================

// ALTERAÇÃO DO FUNCIONAMENTO DE UM AMBIENTE
router.post('/alterar-funcionamento', function (req, res, next) {
  banco.sql.close();
  banco.conectar().then(() => {

    funcionamento.codigo = req.body.funcionamento;
    funcionamento.horaIn = req.body.inicio;
    funcionamento.horaFi = req.body.fim;

    return banco.sql.query(`update Funcionamento set 
      horaInicio = '${funcionamento.horaIn}', 
      horaFim = '${funcionamento.horaFi}'
      where idFuncionamento = ${funcionamento.codigo};`);

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


// ===============================================


// ALTERAÇÃO DO FUNCIONARIO NA PARTE DE REPRESENTANTE --VIRTO
router.post('/alterar-funcionario-rep', function (req, res, next) {
  banco.sql.close();
  banco.conectar().then(() => {

    funcionario.codigo = req.body.cd_func;
    funcionario.nome = req.body.nomeFuncionario;
    funcionario.rg = req.body.rgFuncionario;
    funcionario.cpf = req.body.cpfFuncionario;
    funcionario.telefone = req.body.telefoneFuncionario;
    funcionario.email = req.body.emailFuncionario;

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

// ===============================================


// não mexa nesta linha!
module.exports = router;