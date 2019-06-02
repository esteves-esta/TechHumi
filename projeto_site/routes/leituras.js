// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.get('/ultimas', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    var limite_linhas = 8;
    return banco.sql.query(`select top ${limite_linhas} 
                            temperatura, 
                            umidade, 
                            FORMAT(data_hora,'HH:mm:ss') as momento 
                            from Sensor order by idSensor desc`);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${JSON.stringify(consulta.recordset)}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});


router.get('/estatisticas', function (req, res, next) {
  console.log(banco.conexao);

  var estatisticas = {
    umid_media: 0,
    umid_mediana: 0,
    temp_mediana: 0,
    temp_media: 0,
    temp_max: 23,
    temp_min: 20,
    umid_max: 60,
    umid_min: 40
  };
  banco.sql.close();
  banco.conectar().then(() => {
    return banco.sql.query(`
        select top 100
          avg(umdidade) as umid_media, 
          avg(temperatura) as temp_media 
        from Sensor
        `);
  }).then(consulta => {
    estatisticas.temp_media = consulta.recordset[0].umid_media;
    estatisticas.temp_media = consulta.recordset[0].temp_media;
    console.log(`Estatísticas: ${JSON.stringify(estatisticas)}`);
    res.send(estatisticas);
  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});


router.get('/tempo-real', function (req, res, next) {
  console.log(banco.conexao);

  var estatisticas = {
    temperatura: 0,
    umidade: 0
  };

  banco.conectar().then(() => {
    return banco.sql.query(`
        select top 1 temperatura, umidade from Sensor order by idSensor desc
        `);
  }).then(consulta => {

    estatisticas.temperatura = consulta.recordset[0].temperatura;
    estatisticas.umidade = consulta.recordset[0].umidade;
    console.log(`Tempo real: ${JSON.stringify(estatisticas)}`);

    res.send(estatisticas);

  }).catch(err => {

    var erro = `Erro na leitura dos registros de tempo real: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});


// não mexa nesta linha!
module.exports = router;
