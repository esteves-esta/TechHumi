// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.post('/consulta', function (req, res, next) {
  banco.sql.close();


  banco.conectar().then(() => {

    var idfunc = req.body.codigo; 
    
    return banco.sql.query(`select * from Empresa 
    inner join Funcionario on fkEmpresa = idEmpresa
    inner join Endereco as e on e.fkEmpresa = idEmpresa
    where idFuncionario =${idfunc};`);

  }).then(consulta => {

    console.log(`Dados: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length==1) {
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

// não mexa nesta linha!
module.exports = router;