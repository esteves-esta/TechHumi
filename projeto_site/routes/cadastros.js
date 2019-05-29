// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.post('/cadastrarAmbiente', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastrar novo ambiente: ${JSON.stringify(req.body)}`);
    var descricao = req.body.descricaoAmbiente; // depois de .body, use o nome (name) do campo em seu formulário de login
    var localizacao = req.body.localizacaoAmbiente; // depois de .body, use o nome (name) do campo em seu formulário de login
    if (descricao == undefined || localizacao == undefined) {
      throw new Error(`Dados de Ambiente não chegaram completos: ${descricao} / ${localizacao}`);
    }
    return banco.sql.query(`insert into Ambiente (descricaoAmbiente,localizacaoAmbiente) values ('${descricao}','${localizacao}');`);
  }).then(cadastro => {

    console.log(`Ambiente cadastrado com sucesso!`);

    
      res.sendStatus(201);
    

  }).catch(err => {

    var erro = `Erro ao cadastrar: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.post('/cadastrarUsuario', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastrar novo funcionario: ${JSON.stringify(req.body)}`);
    //FUNCIONARIO
    var nome = req.body.nomeFuncionario; 
    var rg = req.body.rgFuncionario; 
    var cpf = req.body.cpfFuncionario;
    var email = req.body.emailFuncionario;
    var telefone = req.body.funcionarioFuncionario;
    //LOGIN
    var login = req.body.loginUsuario;
    var senha = req.body.senhaUsuario;
    var nivelAcesso = req.body.nivelAcesso;
    
    if (nome == undefined || rg == undefined || cpf == undefined || email == undefined || telefone == undefined 
      || login == undefined || senha == undefined || nivelAcesso == undefined) {
      throw new Error(`Dados de Funcionario não chegaram completos: ${nome} / ${rg} / ${cpf} / ${email} / ${telefone}
       / ${login} / ${senha} /`);
    }
    return banco.sql.query(`insert into Funcionario (nomeFuncionario,rgFuncionario,cpfFuncionario,emailFuncionario) 
    values ('${nome}','${rg}','${cpf}','${email}');`);
  }).then(cadastro => {

    console.log(`Funcionario cadastrado com sucesso!`);

    
      res.sendStatus(201);
    

  }).catch(err => {

    var erro = `Erro ao cadastrar: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});
// não mexa nesta linha!
module.exports = router;