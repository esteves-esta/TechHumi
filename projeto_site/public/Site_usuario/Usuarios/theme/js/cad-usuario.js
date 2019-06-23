// CHAMAR FUNÇÕES
$('#telefoneFuncionario').mask('(00) 0 0000-0000');
$('#cpfFuncionario').mask('000.000.000-00');

autentificar('representante');
consultar_dados();

// ---------------------------------------------------------------
// DECLARAR VARIÁVEIS

var exibiu_grafico = false;
var validar = false;
var cpfs = [];
// ---------------------------------------------------------------
// DECLARAR FUNÇÕES

function cadastrarUsuario() {
    btn_salvar.disabled = true;

    validar_cpf();

    if (validar == true) {
        fkEmpresa.value = sessionStorage.idEmpresa;
        var formulario = new URLSearchParams(new FormData(form_Usuario));
        fetch("/cadastros/cadastrarUsuario", {
            method: "POST",
            body: formulario
        }).then(function (response) {

            if (response.ok) {
                console.log('Cadastrado com sucesso');
                swal({
                    title: "Cadastrado com sucesso!",
                    text: "   ",
                    icon: "success"
                });

                //limpar();
                setTimeout(function () {
                    window.location.href = 'consultaUsuarios.html';
                }, 2000);

            } else {
                console.log('Erro ao cadastrar!');
                swal({
                    title: "Erro ao cadastrar!",
                    text: "   ",
                    icon: "error"
                });
            }
        });

    }
    else {
        swal({
            title: "Esse usuário já foi cadastrado!",
            text: "Verifique na tela de consulta e edite o registro desejado.",
            icon: "error"
        });
    }

    btn_salvar.disabled = false;
    return false;
}

// ---------------------------------------------------------------

function validar_cpf() {
    for (r = 0; r < cpfs.length; r++) {
        if (cpfFuncionario.value == cpfs[r]) {
            validar = false;
            break;
        } else {
            validar = true;

        }
    }
}

// ---------------------------------------------------------------

function limpar() {
    nomeFuncionario.value = '';
    emailFuncionario.value = '';
    cpfFuncionario.value = '';
    rgFuncionario.value = '';
    telefoneFuncionario.value = '';
    loginUsuario.value = '';
}

// ---------------------------------------------------------------

function consultar_dados() {
    // guarda código do usuário que está no atributo usuario_bandtec
    // em um json e depois utiliza a classe URLSearchParams
    //para mandar para o arquivo js


    var cdEmpresa = { codigo: sessionStorage.idEmpresa }
    var corpo = new URLSearchParams(cdEmpresa);


    fetch("/consulta-perfil/consulta-funcionario", {
        method: "POST",
        body: corpo
    }).then(function (response) {
        console.log(response);
        if (response.ok) {

            response.json().then(function (resposta) {

                if (resposta.length != undefined) {
                    // devolve informação da empresa
                    var conteudo = '';
                    for (r = 0; r < resposta.length; r++) {
                        var atual = resposta[r];
                        cpfs.push(atual.cpfFuncionario);
                    }
                }
            });
        } else {
            console.log('Erro de consulta!');
        }
    });

    return false;
}