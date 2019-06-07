create table Empresa(
idEmpresa int primary key identity(1,1),
nomeEmpresa varchar(60) not null,
cnpjEmpresa varchar(30) unique,
telefoneEmpresa1 varchar(20) unique,
telefoneEmpresa2 varchar(20) unique
);


create table Endereco(
idEndereco int primary key identity(1,1),
logradouro varchar(80) not null,
numero varchar(15) not null,
complemento varchar(30),
bairro varchar(50) not null,
cidade varchar(40) not null,
uf char(2) not null,
cep varchar(12) not null,
referencia varchar(80),
fkEmpresa int foreign key references Empresa(idEmpresa)
);


create table Funcionario(
idFuncionario int primary key identity(1,1),
nomeFuncionario varchar(55) not null,
rgFuncionario varchar(25) not null,
cpfFuncionario varchar(25) not null,
emailFuncionario varchar(80) not null,
telefoneFuncionario varchar(20) not null,
cargoFuncionario varchar(40) not null,
fkEmpresa int foreign key references Empresa(idEmpresa)
);


create table Login(
idLogin int primary key identity(1,1),
loginUsuario varchar(40) unique,
senhaUsuario varchar (50) not null,
nivelAcesso int not null,
fkFuncionario int foreign key references Funcionario(idFuncionario)
);

create table Funcionamento(
idFuncionamento int primary key identity(1,1),
horaInicio time not null,
horaFim time not null
);

create table Ambiente(
idAmbiente int primary key identity(1,1),
descricaoAmbiente varchar(40) not null,
localizacaoAmbiente varchar(20) not null,
fkEmpresa int foreign key references Empresa(idEmpresa),
fkFuncionamento int foreign key references Funcionamento(idFuncionamento),
);

create table Sensor(
idSensor int primary key identity(1,1),
temperatura float not null,
umidade int not null,
data_hora datetime not null,
fkAmbiente int foreign key references Ambiente(idAmbiente)
);

--INSERTS

insert into Empresa (nomeEmpresa,cnpjEmpresa,telefoneEmpresa1,telefoneEmpresa2) values
('TechHumi','28.118.114/0001-50','(11)2516-7236','(11)95366-5905'),
('Grow7','86.970.771/0001-27','(11)2539-1233','(11)92312-2233');

insert into Endereco(logradouro,numero,bairro,complemento,cidade,uf,cep,referencia,fkEmpresa) values
('R. Edmundo Orioli','225','Cidade Tiradentes','44A','São Paulo','SP','08470-600','Escola Camilo',1),
('Av. Paulista','1230','Bela Vista',null,', São Paulo','SP','01310-100','Safra',2);

select * from Endereco;

insert into Funcionario(nomeFuncionario,rgFuncionario,cpfFuncionario,emailFuncionario,telefoneFuncionario,cargoFuncionario,fkEmpresa) values 
('Vitor Leonardo Gonçalves de Oliveira Silva','37.481.521-9','480.023.422.192-10','vitor.osilva@bandtec.com.br','(11)92312-3211','Administrador',1),
('Letícia Lago Mori','23.471.373-2','157.954.708-72','leticia.mori@bandtec.com.br','(11)95218-7232','Representante',2),
('Gustavo Henrique','31.140.597-6','281.603.260-41','gustavo.henrique@bandtec.com.br','(11)92312-4212','Usuario',2);

insert into Login (loginUsuario,senhaUsuario,nivelAcesso,fkFuncionario) values
('admin','admin',1,1),
('representante','representante',2,2),
('usuario','usuario',3,3);

select * from Login;

insert into Funcionamento(horaInicio,horaFim) values 
('00:00:00','00:00:00'),
('07:30:00','18:00:00');

insert into Ambiente(descricaoAmbiente,localizacaoAmbiente,fkEmpresa,fkFuncionamento) values
('Sala dos Devs','3º Andar',2,1);

insert into Sensor (temperatura,umidade,data_hora,fkAmbiente) values
('23','57',CURRENT_TIMESTAMP,1),
('22.4','46',CURRENT_TIMESTAMP,1),
('21.3','50',CURRENT_TIMESTAMP,1);


select * from Sensor order by idSensor desc;

-- DROPS EM SEQUECIA CORRETA
-- drop table endereco;
-- drop table login;
-- drop table Funcionario;
-- drop table Funcionamento;
-- drop table Ambiente;
-- drop table Sensor;
-- drop table Empresa;