var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var cadastrosRouter = require('./routes/cadastros');
var leiturasRouter = require('./routes/leituras');
var consultaRouter = require('./routes/consulta-perfil');
var alteraRouter = require('./routes/alterar');
var excluiRouter = require('./routes/excluir');
var emailRouter = require('./routes/email');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/cadastros', cadastrosRouter);
app.use('/leituras', leiturasRouter);
app.use('/consulta-perfil', consultaRouter);
app.use('/alterar', alteraRouter);
app.use('/excluir', excluiRouter);
app.use('/email', emailRouter);

module.exports = app;
