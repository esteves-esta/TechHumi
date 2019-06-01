
// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!


// ===============================================
var idExcluir;
// EXCLUIR DO FUNCIONARIO
router.post('/excluir-funcionario', function (req, res, next) {
    banco.sql.close();
    idExcluir = req.body.codigo;

    banco.conectar().then(() => {


        console.log(idExcluir);

        banco.sql.query(`delete from Login where fkFuncionario = ${idExcluir}`);

    }).then(consulta => {
        console.log('excluiu login');
        res.sendStatus(201);

    }).catch(err => {

        var erro = `Erro: ${err}`;
        console.error(erro);

        res.status(500).send(erro);

    }).finally(() => {
        banco.sql.query(`delete from Funcionario where idFuncionario = ${idExcluir}`)
            .then(consulta => {
                console.log('excluiu funcionario');
                res.sendStatus(201);

            }).catch(err => {

                var erro = `Erro: ${err}`;
                console.error(erro);

                res.status(500).send(erro);

            }).finally(() => {
                banco.sql.close();
            });
    });

});


// ===============================================

// EXCLUIR AMBIENTE
// só exclui ambiente não as outras tabelas atreladas a ele
// 
/*

select * from Funcionamento;
select * from Sensor;
select * from Ambiente;

delete from Funcionamento where fkSensor in (20, 21,22, 23);
delete from Sensor where fkAmbiente =  9;
delete from Ambiente where idAmbiente =  9;



*/
router.post('/excluir-ambiente', function (req, res, next) {

    idExcluir = req.body.codigo;

    banco.conectar().then(() => {


        console.log(idExcluir);

        banco.sql.query(`DELETE FROM Funcionamento
        WHERE idFuncionamento IN 
        (SELECT fkFuncionamento FROM Ambiente where fkEmpresa = ${idExcluir})`);

    }).then(consulta => {
        console.log('excluiu Funcionamento');
        res.sendStatus(201);

    }).catch(err => {

        var erro = `Erro: ${err}`;
        console.error(erro);

        res.status(500).send(erro);

    }).finally(() => {
            banco.sql.query(`
            delete from Ambiente where idAmbiente = ${idExcluir}`)
                .then(consulta => {
                    console.log('excluiu ambiente');


                }).catch(err => {

                    var erro = `Erro: ${err}`;
                    console.error(erro);
                    res.status(500).send(erro);

                }).finally(() => {
                    banco.sql.close();
                        
                });
    });

});

// ===============================================


/* 
https://pt.stackoverflow.com/questions/176847/deletar-registros-de-forma-din%C3%A2mica-no-sql

DELETE FROM Funcionamento
WHERE idFuncionamento IN (SELECT fkFuncionamento FROM Ambiente where fkEmpresa = 3)

DELETE FROM Ambiente
WHERE fkEmpresa = 3

DELETE FROM Login
WHERE fkFuncionario IN (SELECT idFuncionario FROM Funcionario where fkEmpresa = 3)

DELETE FROM Funcionario
WHERE fkEmpresa = 3

DELETE FROM Endereco
WHERE fkEmpresa = 3

DELETE FROM Empresa
WHERE idEmpresa = 3



*/

// EXCLUIR EMPRESA
router.post('/excluir-empresa', function (req, res, next) {
    banco.sql.close();
    idExcluir = req.body.codigo;

    banco.conectar().then(() => {
        console.log(idExcluir);

        banco.sql.query(`DELETE FROM Funcionamento
                    WHERE idFuncionamento IN 
                    (SELECT fkFuncionamento 
                        FROM Ambiente where fkEmpresa = ${idExcluir});`);

    }).then(consulta => {
        console.log('excluiu Funcionamento');


    }).catch(err => {

        var erro = `Erro: ${err}`;
        console.error(erro);
        res.status(500).send(erro);

    }).finally(() => {
        banco.sql.query(`
                        DELETE FROM Ambiente
                        WHERE fkEmpresa = ${idExcluir};`)
            .then(consulta => {
                console.log('excluiu Ambiente');

            }).catch(err => {

                var erro = `Erro: ${err}`;
                console.error(erro);

                res.status(500).send(erro);

            }).finally(() => {
                banco.sql.query(`
                DELETE FROM Login
                WHERE fkFuncionario IN (SELECT idFuncionario FROM Funcionario 
                    where fkEmpresa = ${idExcluir});`)
                    .then(consulta => {
                        console.log('excluiu LOGIN');


                    }).catch(err => {

                        var erro = `Erro: ${err}`;
                        console.error(erro);

                        res.status(500).send(erro);

                    }).finally(() => {
                        banco.sql.query(`
                        DELETE FROM Funcionario
                        WHERE fkEmpresa = ${idExcluir};`)
                            .then(consulta => {
                                console.log('excluiu Funcionario');

                            }).catch(err => {

                                var erro = `Erro: ${err}`;
                                console.error(erro);

                                res.status(500).send(erro);

                            }).finally(() => {
                                banco.sql.query(`
                                DELETE FROM Endereco
                                WHERE fkEmpresa = ${idExcluir};`)
                                    .then(consulta => {
                                        console.log('excluiu Endereco');


                                    }).catch(err => {

                                        var erro = `Erro: ${err}`;
                                        console.error(erro);
                                        res.status(500).send(erro);

                                    }).finally(() => {
                                        banco.sql.query(`
                                        DELETE FROM Empresa
                                        WHERE idEmpresa = ${idExcluir};`)
                                            .then(consulta => {
                                                console.log('excluiu Empresa');
                                                res.sendStatus(201);

                                            }).catch(err => {

                                                var erro = `Erro: ${err}`;
                                                console.error(erro);

                                                res.status(500).send(erro);

                                            }).finally(() => {
                                                banco.sql.close();
                                            });
                                    });
                            });
                    });
            });
    });

});



// não mexa nesta linha!
module.exports = router;