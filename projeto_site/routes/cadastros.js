// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!
var login, senha, nivel, ultimoCod;
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
    var cargo = req.body.cargoFuncionario;
    var telefone = req.body.telefoneFuncionario;
    //LOGIN
     login = req.body.loginUsuario;
     senha = req.body.senhaUsuario;
     nivel = req.body.nivelAcesso;

    if (nome == undefined || rg == undefined || cpf == undefined || email == undefined || telefone == undefined || cargo == undefined
      || login == undefined || senha == undefined || nivel == undefined) {
      throw new Error(`Dados de Funcionario não chegaram completos: ${nome} / ${rg} / ${cpf} / ${email} / ${telefone} / ${cargo} //
       / ${login} / ${senha} /`);
    }
    return banco.sql.query(`insert into Funcionario (nomeFuncionario,rgFuncionario,cpfFuncionario,emailFuncionario,telefoneFuncionario,cargoFuncionario) 
    values ('${nome}','${rg}','${cpf}','${email}','${telefone}','${cargo}');`);
    }).then(cadastro => {//CADASTRO DE FUNCIONARIO

      console.log(`Funcionario cadastrado com sucesso!`);
      res.sendStatus(201);
    
    }).then(cadastroLogin => { //CADASTRO DE LOGIN
    
      ultimoId();
      
    }).then(feito =>{
      banco.sql.query(`insert into Login (loginUsuario,senhaUsuario,nivelAcesso,fkFuncionario) values
      ('${login}','${senha}',${nivel},${ultimoCod})`);
      console.log(`insert into Login (loginUsuario,senhaUsuario,nivelAcesso,fkFuncionario) values
      ('${login}','${senha}',${nivel},${ultimoCod})`);
    }).then(cadastro=>{

      console.log(`Login cadastrado com sucesso!`);
      res.sendStatus(201);

    }).catch(err => {

      var erro = `Erro ao cadastrar Login: ${err}`;
      console.error(erro);
      res.status(500).send(erro);

    }).finally(() => {
      banco.sql.close();
    });
  });

function ultimoId() { //PEGA O ULTIMO FUNCIONARIO CADASTRADO
  // banco.conectar().then()
  banco.sql.query(`SELECT IDENT_CURRENT('Funcionario') as 'ultimoCodi'`).then(results =>{
    resultado = results.recordsets[0];
    ultimoCod = resultado[0].ultimoCodi;
    console.log(`VAI PORRA`);
  });
  
}
// não mexa nesta linha!
module.exports = router;