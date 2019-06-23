// CHAMAR FUNÇÕES
$('#telefone').mask('(00) 0000-0000');
$('#tele1').mask('(00) 0000-0000');
$('#tele2').mask('(00) 0000-0000');
$('#cep').mask('00000-000');
$('#cpf').mask('000.000.000-00');
$('#cnpj').mask('00.000.000/0000-00');

autentificar('adm');

consultar_dados();

// ---------------------------------------------------------------

// DECLARAR VÁRIÁVEIS

var validar = false;
var vCnpj = [];

// ---------------------------------------------------------------
// DECLARAR FUNÇÕES

function cadastro() {
    btn_salvar.disabled = true;

    validar_cnpj();

    if (validar == true) {
        var formulario = new URLSearchParams(new FormData(form_Cadastro));
        fetch("/cadastros/cadastrarEmpresa", {
            method: "POST",
            body: formulario
        }).then(function (response) {

            if (response.ok) {

                swal({
                    title: "Cadastro realizado com sucesso!",
                    text: "   ",
                    icon: "success"
                });

                setTimeout(limpar(), 3000);
            } else {

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

function limpar() {
    empresa.value = ' ';
    cnpj.value = ' ';
    tele1.value = ' ';
    tele2.value = ' ';
    logradouro.value = ' ';
    cep.value = ' ';
    bairro.value = ' ';
    complemento.value = ' ';
    referencia.value = ' ';
    cidade.value = ' ';
    uf.value = ' ';
    representante.value = ' ';
    email.value = ' ';
    rg.value = ' ';
    cpf.value = ' ';
    telefone.value = ' ';
    login.value = ' ';
    empresa.focus();
}

// ---------------------------------------------------------------

function consultar_dados() {
    // guarda código do usuário que está no atributo usuario_bandtec
    // em um json e depois utiliza a classe URLSearchParams
    //para mandar para o arquivo js


    var cdEmpresa = { codigo: '' }
    var corpo = new URLSearchParams(cdEmpresa);


    fetch("/consulta-perfil/consulta-empresas", {
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
                        vCnpj.push(atual.cnpjEmpresa);
                    }
                }
            });
        } else {
            console.log('Erro de consulta!');
        }
    });

    return false;
}

// ---------------------------------------------------------------

function validar_cnpj() {
    for (r = 0; r < vCnpj.length; r++) {
        if (cnpj.value == vCnpj[r]) {
            validar = false;
            break;
        } else {
            validar = true;
        }
    }
}
