var exibiu_grafico = false;

autentificar('funcionario');


function cadastrarAmbiente() {
    //btn_salvar.disabled = true;
    idEmpresa.value =  sessionStorage.idEmpresa;
    validar_nomeambiente();

    if (validar == true) {
        var formulario = new URLSearchParams(new FormData(form_Ambiente));
        fetch("/cadastros/cadastrarAmbiente", {
            method: "POST",
            body: formulario
        }).then(function (response) {

            if (response.ok) {
                
                swal({
                    title: "Cadastrado com sucesso!",
                    text: "   ",
                    icon: "success"
                });

                setTimeout(function () {
                    window.location.href = 'consultaAmbientes.html';
                }, 2000);

            } else {
                
                swal({
                    title: "Erro ao cadastrar!",
                    text: "   ",
                    icon: "error"
                });
            }
        });
    } else {
        swal({
            title: "Este ambiente já foi cadastrado!",
            text: "Verifique na tela de consulta e edite o registro desejado.",
            icon: "error"
        });
    }

    btn_salvar.disable = false;

    return false;
}


function limpar() {
    descricaoAmbiente.value = '';
    localizacaoAmbiente.value = '';
}


consultar_dados();

function consultar_dados() {
    var cdEmpresa = { codigo: sessionStorage.idEmpresa }
    var corpo = new URLSearchParams(cdEmpresa);


    fetch("/consulta/consulta-ambiente", {
        method: "POST",
        body: corpo
    }).then(function (response) {

        if (response.ok) {

            response.json().then(function (resposta) {
                // devolve informação da empresa
                for (r = 0; r < resposta.length; r++) {
                    var atual = resposta[r];
                    ambientesLista.push(atual.descricaoAmbiente);
                }

            });
        } 
    }).catch(()=>{
        consultar_dados();
    });

}

var validar = false;
var ambientesLista = [];

function validar_nomeambiente() {
    for (r = 0; r < ambientesLista.length; r++) {
        if (descricaoAmbiente.value == ambientesLista[r]) {
            validar = false;
            break;
        } else {
            validar = true;

        }
    }
}