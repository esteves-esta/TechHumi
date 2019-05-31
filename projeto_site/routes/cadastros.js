// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

var login,senha,nivel,ultimoCod;

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
    var estrangeira = req.body.fkEmpresa;
    //LOGIN
    login = req.body.loginUsuario;
    senha = req.body.senhaUsuario;
    nivel = req.body.nivelAcesso;

    if (nome == undefined || rg == undefined || cpf == undefined || email == undefined || telefone == undefined || cargo == undefined || fkEmpresa == undefined
      || login == undefined || senha == undefined || nivel == undefined) {
      throw new Error(`Dados de Funcionario não chegaram completos: ${nome} / ${rg} / ${cpf} / ${email} / ${telefone} / ${cargo} / ${estrangeira} ///
       / ${login} / ${senha} /`);
    }
    return banco.sql.query(`insert into Funcionario (nomeFuncionario,rgFuncionario,cpfFuncionario,emailFuncionario,telefoneFuncionario,cargoFuncionario) 
    values ('${nome}','${rg}','${cpf}','${email}','${telefone}','${cargo}')`);
  }).then(cadastro => {//CADASTRO DE FUNCIONARIO
    
      console.log(`Funcionario cadastrado com sucesso!`);
      res.sendStatus(201);

    }).catch(err => {

      var erro = `Erro ao cadastrar FUNCIONARIO: ${err}`;
      console.error(erro);
      res.status(500).send(erro);

    }).finally(() => { //CONSULTANDO O ULTIMO FUNCIONARIO CADASTRADO

      banco.sql.query(`SELECT IDENT_CURRENT('Funcionario') as ultimo`).then(results =>{
        ultimoCod = results.recordset[0].ultimo;

      }).finally(() =>{//CADASTRO DE LOGIN

        banco.sql.query(`insert into Login (loginUsuario,senhaUsuario,nivelAcesso,fkFuncionario) values
        ('${login}','${senha}',${nivel},${ultimoCod})`);
        console.log(ultimoCod);
      }).then(function(){

        console.log('Login cadastrado com sucesso!');
        res.sendStatus(201);

      }).catch(err=>{//Caso o cadastro do LOGIN dê certo

        var erro = `Erro no cadastro de LOGIN: ${err}`;
        console.error(erro);
      });
    }).then(function(){
    
      console.log(`Recuperamos o CODIGO: ${ultimoCod}`);

    }).catch(err =>{

      var erro = `Erro ao recuperar ultimo id: ${err}`;
     console.error(erro);

    }).finally(() =>{

      banco.sql.close();
      console.log(`Banco FECHADO COM EXITO`)
    
    });
});

// não mexa nesta linha!
module.exports = router;