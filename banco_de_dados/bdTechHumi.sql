CREATE TABLE tbEmpresa(
idEmpresa int primary key identity(1,1),
nomeEmpresa varchar(60) not null,
nomeRepresentante varchar(60) not null,
emailRepresentante varchar(60) not null,
cnpjCliente varchar(16) not null
);

CREATE TABLE tbFuncionario(
idFuncionario int primary key identity(1,1),
nomeFuncionario varchar(60) not null,
cargo varchar(40) not null,
rgFuncionario varchar(12) not null,
cpfFuncionario varchar(14) not null
);

CREATE TABLE tbLogin(
idLogin int primary key identity(1,1),
login varchar(60) not null,
senha varchar(30) not null,
fkEmpresa int foreign key references tbEmpresa(idEmpresa),
fkFuncionario int foreign key references tbFuncionario(idFuncionario)
);

CREATE TABLE tbDados(
idDado int primary key identity(1,1),
temperatura decimal(4,2) not null,
umidade int not null,
dataehora smalldatetime not null,
horaInicio time not null,
horaFim time not null,
fkLogin int foreign key references tbLogin(idLogin)  
);

CREATE TABLE tbEndereco(
idEndereco int primary key identity(1,1),
uf char(2) not null,
cidade varchar(40) not null,
cep varchar(9) not null,
bairro varchar(40) not null,
referencia varchar(50),
complemento varchar(8),
numero varchar(10) not null,
logradouro varchar(50) not null,
fkEmpresa int foreign key references tbEmpresa(idEmpresa),
fkFuncionario int foreign key references tbFuncionario(idFuncionario)
);

CREATE TABLE tbTelefone(
idTelefone int primary key identity(1,1),
numTelefone varchar(20) not null,
fkEmpresa int foreign key references tbEmpresa(idEmpresa),
fkFuncionario int foreign key references tbFuncionario(idFuncionario)
);