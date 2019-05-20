create table Empresa(
idEmpresa int primary key identity(1,1),
nomeEmpresa varchar(60),
cnpjEmpresa varchar(30),
nomeRepresentante varchar (60),
emailRepresentante varchar(80),
telefoneEmpresa1 varchar(20),
telefoneEmpresa2 varchar(20)
);


create table Endereco(
idEndereco int primary key identity(1,1),
logradouro varchar(40),
numero varchar(15),
complemento varchar(7),
bairro varchar(50),
cidade varchar(40),
uf char(2),
cep varchar(12),
referencia varchar(35),
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
loginUsuario varchar(40),
senhaUsuario varchar (50),
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

select * from Sensor order by idSensor desc;