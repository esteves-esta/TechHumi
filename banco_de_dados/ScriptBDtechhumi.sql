create database techhumi;
use techhumi;


create table Empresa(
idEmpresa int primary key,
emailRrepresentante varchar(80),
nomeRepresentante varchar (60),
nomeEmpresa varchar(60),
cnpjEmpresa varchar(30),
telefoneEmpresa1 varchar(20),
telefoneEmpresa2 varchar(20)

);


create table Endereco(
idEndereco int primary key,
cidade varchar(40),
uf varchar(2),
complemento varchar(60),
logradouro varchar(40),
bairro varchar(50),
cep varchar(12),
referencia varchar(35)
);


create table Funcionario(
idFuncionario int primary key,
nomeFuncionario varchar(55),
cpfFuncionario varchar(25),
cargoFuncionario varchar(40),
rgFuncionario varchar(25),
fkEmpresa int, foreign key (fkEmpresa) references Empresa(idEmpresa)
);


create table Login(
idLogin int primary key,
nivelAcesso varchar(40),
senhaUsuario varchar (10),
loginUsuario varchar(40),
fkFuncionario int, foreign key (fkFuncionario) references Funcionario(idFuncionario)
);


create table Ambiente(
idAmbiente int primary key,
localAmbiente varchar(40),
andar int,
fkEmpresa int, foreign key (fkEmpresa) references Empresa(idEmpresa)
);


create table Sensor(
idSensor int primary key,
umidade int,
data_hora datetime,
temperatura int,
fkAmbiente int, foreign key (fkAmbiente) references Ambiente(idAmbiente)
);


create table Funcionamento(
idFuncionamento int primary key,
horaInicio time,
horaFim time,
fkSensor int, foreign key (fkSensor) references Sensor(idSensor) 
);


