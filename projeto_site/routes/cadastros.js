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

    console.log(`Usuários encontrados: ${JSON.stringify(cadastro.recordset)}`);

    if (cadastro.recordset.length==1) {
      res.send(cadastro.recordset[0]);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

// não mexa nesta linha!
module.exports = router;