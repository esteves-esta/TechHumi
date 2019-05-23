create table Empresa(
idEmpresa int primary key identity(1,1),
nomeEmpresa varchar(60) not null,
cnpjEmpresa varchar(30) unique,
nomeRepresentante varchar (60) not null,
emailRepresentante varchar(80) unique,
telefoneEmpresa1 varchar(20) unique,
telefoneEmpresa2 varchar(20) unique
);


create table Endereco(
idEndereco int primary key identity(1,1),
logradouro varchar(40) not null,
numero varchar(15) not null,
complemento varchar(30) not null,
bairro varchar(50) not null,
cidade varchar(40) not null,
uf char(2) not null,
cep varchar(12) not null,
referencia varchar(35) not null,
fkEmpresa int foreign key references Empresa(idEmpresa)
);


create table Funcionario(
idFuncionario int primary key identity(1,1),
nomeFuncionario varchar(55),
rgFuncionario varchar(25),
cpfFuncionario varchar(25),
cargoFuncionario varchar(40),
fkEmpresa int foreign key references Empresa(idEmpresa)
);


create table Login(
idLogin int primary key identity(1,1),
loginUsuario varchar(40) unique,
senhaUsuario varchar (50) not null,
nivelAcesso int not null,
fkFuncionario int foreign key references Funcionario(idFuncionario)
);


create table Ambiente(
idAmbiente int primary key identity(1,1),
descricaoAmbiente varchar(40),
localizacaoAmbiente varchar(20),
fkEmpresa int foreign key references Empresa(idEmpresa)
);


create table Sensor(
idSensor int primary key identity(1,1),
temperatura float not null,
umidade int not null,
data_hora datetime not null,
fkAmbiente int foreign key references Ambiente(idAmbiente)
);


create table Funcionamento(
idFuncionamento int,
horaInicio time not null,
horaFim time not null,
fkSensor int foreign key references Sensor(idSensor) 
);

insert into Endereco(logradouro,numero,bairro,complemento,cidade,uf,cep,referencia) values
('R. Edmundo Orioli','225','Cidade Tiradentes','44A','São Paulo','SP','08470-600','Escola Camilo'),
('R. Serra de Botucatu','2095','Vila Carrão','','São Paulo','SP','03317-001','');


select * from Endereco;

insert into Login (loginUsuario,senhaUsuario,nivelAcesso) values
('admin','admin',1),
('usuario','usuario',2);

select * from Login;

select * from Sensor order by idSensor desc;