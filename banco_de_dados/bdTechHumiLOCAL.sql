CREATE TABLE tbEmpresa(
idEmpresa int primary key auto_increment,
nomeEmpresa varchar(60) not null,
nomeRepresentante varchar(60) not null,
emailRepresentante varchar(60) not null,
cnpjCliente varchar(16)
);

CREATE TABLE tbFuncionario(
idFuncionario int primary key auto_increment,
nomeFuncionario varchar(60),
cargo varchar(40),
rgFuncionario varchar(12),
cpfFuncionario varchar(14)
);

CREATE TABLE tbLogin(
idLogin int primary key auto_increment,
login varchar(60),
senha varchar(30),
fkEmpresa int, foreign key (fkEmpresa) references tbEmpresa(idEmpresa),
fkFuncionario int, foreign key (fkFuncionario) references tbFuncionario(idFuncionario)
);

CREATE TABLE tbDados(
idDado int primary key auto_increment,
temperatura decimal(4,2) not null,
umidade int not null,
dataehora datetime not null,
horaInicio time not null,
horaFim time not null,
fkLogin int, foreign key (fkLogin) references tbLogin(idLogin)  
);

CREATE TABLE tbEndereco(
idEndereco int primary key auto_increment,
uf char(2),
cidade varchar(40),
cep varchar(9),
bairro varchar(40),
referencia varchar(50),
complemento varchar(8),
numero varchar(10),
logradouro varchar(50),
fkEmpresa int, foreign key (fkEmpresa) references tbEmpresa(idEmpresa),
fkFuncionario int, foreign key (fkFuncionario) references tbFuncionario(idFuncionario)
);

CREATE TABLE tbTelefone(
idTelefone int primary key auto_increment,
numTelefone varchar(20),
fkEmpresa int, foreign key (fkEmpresa) references tbEmpresa(idEmpresa),
fkFuncionario int, foreign key (fkEmpresa) references tbFuncionario(idFuncionario)
);