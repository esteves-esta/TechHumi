// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

var login,senha,nivel;
let ultimoCod = 0;

router.post('/cadastrarAmbiente', function (req, res, next) {
  var descricao = req.body.descricaoAmbiente; // depois de .body, use o nome (name) do campo em seu formulário de login
  var localizacao = req.body.localizacaoAmbiente; // depois de .body, use o nome (name) do campo em seu formulário de login
  var fkEmpresa = req.body.idEmpresa; // depois de .body, use o nome (name) do campo em seu formulário de login
  banco.sql.close();
  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastrar novo ambiente: ${JSON.stringify(req.body)}`);
    
    if (descricao == undefined || localizacao == undefined) {
      throw new Error(`Dados de Ambiente não chegaram completos: ${descricao} / ${localizacao}`);
    }
     banco.sql.query(`insert into Funcionamento (horaInicio, horaFim) values 
     ('07:30:00','18:00:00');`);
  }).then(cadastro => {

    console.log(`FUNCIONAMENTO cadastrado com sucesso!`);
    res.sendStatus(201);

  }).catch(err => {

    var erro = `Erro ao cadastrar: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.query(`SELECT IDENT_CURRENT('Funcionamento') as ultimo`)
    .then(results => {
      ultimoCod = results.recordset[0].ultimo;
      console.log(ultimoCod);
    }).finally(() => {//CADASTRO DE LOGIN

      banco.sql.query(`insert into Ambiente (descricaoAmbiente ,localizacaoAmbiente, fkEmpresa, fkFuncionamento) 
      values ('${descricao}','${localizacao}', ${fkEmpresa}, ${ultimoCod});`);

    }).then(function () {

      console.log('AMBIENTE cadastrado com sucesso!');

    }).catch(err => {

      var erro = `Erro no cadastro de AMBIENTE: ${err}`;
      console.error(erro);
    }).finally(() => {

    });

  });

});

router.post('/cadastrarUsuario', function (req, res, next) {
  banco.sql.close();
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

    if (nome == undefined || rg == undefined || cpf == undefined || email == undefined || telefone == undefined || cargo == undefined || estrangeira == undefined
      || login == undefined || senha == undefined || nivel == undefined) {
      throw new Error(`Dados de Funcionario não chegaram completos: ${nome} / ${rg} / ${cpf} / ${email} / ${telefone} / ${cargo} / ${estrangeira} ///
       / ${login} / ${senha} /`);
    }
    return banco.sql.query(`insert into Funcionario (nomeFuncionario,rgFuncionario,cpfFuncionario,emailFuncionario,telefoneFuncionario,cargoFuncionario,fkEmpresa) 
    values ('${nome}','${rg}','${cpf}','${email}','${telefone}','${cargo}',${estrangeira})`);
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

      }).then(function(){

        console.log('Login cadastrado com sucesso!');
        res.sendStatus(201);

      }).catch(err=>{//Caso o cadastro do LOGIN dê certo

        var erro = `Erro no cadastro de LOGIN: ${err}`;
        console.error(erro);
      });
    }).then(function(){
    
      console.log(`Recuperamos o ultimo codigo cadastrado!`);

    }).catch(err =>{

      var erro = `Erro ao recuperar ultimo id: ${err}`;
     console.error(erro);

    });
});

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


// ===============================================


// CADASTRA NESSA ORDEM
// EMPRESA E SEU ENDEREÇO 
// SEU REPRESENTANTE(FUNCIONÁRIO) SEU E LOGIN 
// SENHA PADRÃO DO REPRESENTANTE = 'admin'
// NIVEL DE ACESSO - 2


router.post('/cadastrarEmpresa', function (req, res, next) {

  console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);

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
  banco.sql.close();

  funcionario.codigo = req.body.cd_func;
  funcionario.nome = req.body.representante;
  funcionario.rg = req.body.rg;
  funcionario.cpf = req.body.cpf;
  funcionario.telefone = req.body.telefone;
  funcionario.email = req.body.email;
  funcionario.login = req.body.login;

  banco.conectar().then(() => {

    banco.sql.query(`insert into Empresa (nomeEmpresa,cnpjEmpresa,telefoneEmpresa1,telefoneEmpresa2) values
    ('${empresa.nome}','${empresa.cnpj}','${empresa.telefone_um}','${empresa.telefone_dois}');`);
  }).then(consulta => {
    console.log(`EMPRESA cadastrado com sucesso!`);
    res.status(400);
  }).catch(err => {

    var erro = `Erro no cadastro EMPRESA: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => { //CONSULTANDO A ULTIMA EMPRESA CADASTRADO
          banco.sql.query(`SELECT IDENT_CURRENT('Empresa') as ultimo`)
          .then(results => {
            ultimoCod = results.recordset[0].ultimo;

          }).finally(() => {//CADASTRO DE LOGIN

            banco.sql.query(`insert into Endereco(logradouro,numero,bairro,complemento,cidade,uf,cep,referencia,fkEmpresa) values
             ('${endereco.logradouro}','${endereco.numero}','${endereco.bairro}','${endereco.complemento}','${endereco.cidade}',
             '${endereco.uf}','${endereco.cep}','${endereco.referencia}', ${ultimoCod});`);
          }).then(function () {

            console.log('ENDEREÇO cadastrado com sucesso!');

          }).catch(err => {

            var erro = `Erro no cadastro de ENDEREÇO: ${err}`;
            console.error(erro);
          }).finally(() => {
            banco.sql.query(`insert into Funcionario (nomeFuncionario,rgFuncionario,
              cpfFuncionario,emailFuncionario,telefoneFuncionario,
              cargoFuncionario,fkEmpresa) 
            values ('${funcionario.nome}','${funcionario.rg}','${funcionario.cpf}','${funcionario.email}',
            '${funcionario.telefone}','Representante',${ultimoCod})`);
         }).then(function () {

           console.log('FUNCIONÁRIO cadastrado com sucesso!');

         }).catch(err => {

           var erro = `Erro no cadastro de FUNCIONÁRIO: ${err}`;
           console.error(erro);  
          }).finally(() => {
                    banco.sql.query(`SELECT IDENT_CURRENT('Funcionario') as ultimo`).then(results =>{
                      ultimoCod = results.recordset[0].ultimo;
              
                    }).finally(() =>{//CADASTRO DE LOGIN
              
                      banco.sql.query(`insert into Login (loginUsuario,senhaUsuario,nivelAcesso,fkFuncionario) values
                      ('${funcionario.login}','admin', 2,${ultimoCod})`);
              
                    }).then(function(){
              
                      console.log('Login cadastrado com sucesso!');
          
              
                    }).catch(err=>{//Caso o cadastro do LOGIN dê certo
              
                      var erro = `Erro no cadastro de LOGIN: ${err}`;
                      console.error(erro);
                    });
          })
  }).then(function () {

    console.log(`Recuperamos o ultimo codigo cadastrado!`);
    res.sendStatus(201);
  }).catch(err => {

    var erro = `Erro ao recuperar ultimo id: ${err}`;
    console.error(erro);

  });
});



// não mexa nesta linha!
module.exports = router;
