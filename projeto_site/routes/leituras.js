// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.get('/ultimas', function (req, res, next) {
  console.log(banco.conexao);
  banco.sql.close();
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
    temp_min: 20.0,
    temp_1q: 21.2,
    temp_media: 0,
    temp_mediana: 0,
    temp_3q: 22.3,
    temp_max: 23.0,
    umid_min: 40,
    umid_1q: 47,
    umid_media: 0,
    umid_mediana: 0,
    umid_3q: 56,
    umid_max: 60
  };
  banco.sql.close();
  banco.conectar().then(() => {
    return banco.sql.query(`
    select top 100
    avg(umidade) as umid_media, 
    avg(temperatura) as temp_media,
    min(umidade) AS umid_min, 
    min(temperatura) AS temp_min,
    max(umidade) AS umid_max, 
    max(temperatura) AS temp_max,
    ((min(temperatura) - max(temperatura)) / 2) + min(temperatura) AS temp_1q,
    ((min(umidade) - max(umidade)) / 2) + min(umidade) AS umid_1q,
    (((min(temperatura) - max(temperatura)) / 2) * 3) + min(temperatura) AS temp_3q,
    (((min(umidade) - max(umidade)) / 2) * 3) + min(umidade) AS umid_3q,
    ((SELECT MAX(umidade) FROM (SELECT TOP 50 PERCENT umidade FROM Sensor ORDER BY data_hora) AS primeira_metade)
    +
    (SELECT MIN(umidade) FROM (SELECT TOP 50 PERCENT umidade FROM Sensor ORDER BY data_hora DESC) AS segunda_metade)) / 2 AS mediana_umidade,
    ((SELECT MAX(temperatura) FROM (SELECT TOP 50 PERCENT temperatura FROM Sensor ORDER BY data_hora) AS primeira_metade)
    +
    (SELECT MIN(temperatura) FROM (SELECT TOP 50 PERCENT temperatura FROM Sensor ORDER BY data_hora DESC) AS segunda_metade)) / 2 AS mediana_temperatura 
    from Sensor;
        `);
  }).then(consulta => {
    estatisticas.temp_min = consulta.recordset[0].temp_min;
    estatisticas.umid_min = consulta.recordset[0].umid_min;
    estatisticas.temp_1q = consulta.recordset[0].temp_1q;
    estatisticas.umid_1q = consulta.recordset[0].umid_1q;
    estatisticas.temp_media = consulta.recordset[0].temp_media;
    estatisticas.umid_media = consulta.recordset[0].umid_media;
    estatisticas.temp_mediana = consulta.recordset[0].mediana_temperatura;
    estatisticas.umid_mediana = consulta.recordset[0].mediana_umidade;
    estatisticas.temp_3q = consulta.recordset[0].temp_3q;
    estatisticas.umid_3q = consulta.recordset[0].umid_3q;
    estatisticas.temp_max = consulta.recordset[0].temp_max;
    estatisticas.umid_max = consulta.recordset[0].umid_max;
    console.log(`Estatísticas: ${JSON.stringify(estatisticas)}`);
    res.send(estatisticas);
    res.status(201);
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
  banco.sql.close();
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
