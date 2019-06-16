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
                            FORMAT(data_hora AT TIME ZONE 'UTC' AT TIME ZONE 'E. South America Standard Time','HH:mm:ss') as momento 
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
    select top 100 umidade from Sensor order by idSensor desc;
        `);
  }).then(consulta => {
    function ordenar(a,b){
      return a.umidade - b.umidade;
    }
    consulta.recordset.sort(ordenar);
    estatisticas.umid_min = Number(consulta.recordset[0].umidade);
    estatisticas.umid_max = Number(consulta.recordset[consulta.recordset.length-1].umidade);
    estatisticas.umid_mediana = Number(consulta.recordset[consulta.recordset.length/2].umidade);
    estatisticas.umid_1q = Number(consulta.recordset[25].umidade);
    estatisticas.umid_3q = Number(consulta.recordset[75].umidade);
    for(i=0;i<consulta.recordset.length;i++){
      estatisticas.umid_media += Number(consulta.recordset[i].umidade);
    }
    estatisticas.umid_media = estatisticas.umid_media/consulta.recordset.length;
  }).catch(err => {
    var erro = `Erro UMIDADE: ${err}`;
    console.error(erro);
    res.status(500).send(erro);
  }).finally(() =>{
    banco.sql.query(`select top 100 temperatura from Sensor order by idSensor desc;`).then(consulta =>{
      function ordenar(a,b){
        return a.temperatura - b.temperatura;
      }
      consulta.recordset.sort(ordenar);
      estatisticas.temp_min = Number(consulta.recordset[0].temperatura);
      estatisticas.temp_max = Number(consulta.recordset[consulta.recordset.length-1].temperatura);
      estatisticas.temp_mediana = Number(consulta.recordset[consulta.recordset.length/2].temperatura);
      estatisticas.temp_1q = Number(consulta.recordset[25].temperatura);
      estatisticas.temp_3q = Number(consulta.recordset[75].temperatura);
      for(i=0;i<consulta.recordset.length;i++){
        estatisticas.temp_media += Number(consulta.recordset[i].temperatura);
      }
      estatisticas.temp_media = estatisticas.temp_media/consulta.recordset.length;
    }).then(function(){
      console.log(`Estatísticas: ${JSON.stringify(estatisticas)}`);
      res.send(estatisticas);
      res.status(201);
    }).catch(err =>{
      var erro = `Erro TEMPERATURA: ${err}`;
      console.error(erro);
      res.status(500).send(erro);
    }); 
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
