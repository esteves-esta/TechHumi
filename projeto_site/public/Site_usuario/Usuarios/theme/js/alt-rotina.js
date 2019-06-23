// CHAMAR FUNÇÕES
autentificar('representante');
aguardar();
consultar_dados();

// ---------------------------------------------------------------
// DECLARAR VARIÁVEIS
var guarda_consulta = [];

// ---------------------------------------------------------------
// DECLARAR FUNÇÕES


function consultar_dados() {
    // guarda código do usuário que está no atributo usuario_bandtec
    // em um json e depois utiliza a classe URLSearchParams
    //para mandar para o arquivo js


    var cdEmpresa = { codigo: sessionStorage.idEmpresa }
    var corpo = new URLSearchParams(cdEmpresa);


    fetch("/consulta-perfil/consulta-ambiente", {
        method: "POST",
        body: corpo
    }).then(function (response) {
        //console.log(response);
        if (response.ok) {

            response.json().then(function (resposta) {

                if (resposta.length == undefined) {

                }
                else {
                    // devolve informação da empresa
                    var conteudo = '';
                    conteudo = `<option selected disabled>Escolha um dos seus ambientes</option>`;
                    for (r = 0; r < resposta.length; r++) {

                        var atual = resposta[r];
                        conteudo += `<option value="${atual.idFuncionamento}">${atual.descricaoAmbiente}</option>`;

                        // GUARDA VALOR DE FUNCIONAMENTO PARA JOGAR NO CAMPO DEPOIS
                        var consulta = {
                            idFun: atual.idFuncionamento,
                            inicio: atual.horaInicio,
                            fim: atual.horaFim,
                        }

                        guarda_consulta.push(consulta);
                    }
                    ambientes_empresa.innerHTML = conteudo;
                }
            });
        } else {
            console.log('Erro de consulta!');
        }
    });

    return false;
}

// ---------------------------------------------------------------

function alterar() {

    swal({
        title: "Você tem certeza que deseja alterar estes dados?",
        text: "Essa ação não poderá ser revertida!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                alterar_dados();
            } else {
                swal("Seus dados não foram alterados.");
            }
        });

    return false;
}

// ---------------------------------------------------------------

function alterar_dados() {
    // coloca valores dos codigo em input escondidos para enviar para o js
    var formulario = new URLSearchParams(new FormData(form_funcionamento));

    fetch("/alterar/alterar-funcionamento", {
        method: "POST",
        body: formulario
    }).then(function (response) {

        if (response.ok) {

            swal({
                title: "Alterado com sucesso!",
                text: "   ",
                icon: "success"
            });
        } else {

            swal({
                title: "Erro ao alterar!",
                text: "   ",
                icon: "error"
            });
        }
    });

    return false;
}

// ---------------------------------------------------------------

function muda_tempo() {

    for (r = 0; r < guarda_consulta.length; r++) {

        if (guarda_consulta[r].idFun == ambientes_empresa.value) {
            // CORTA A DATA DO TEMPO PARA JOGAR NO CAMPO = SUBSTRING

            campo_inicio.value = guarda_consulta[r].inicio.substring(11, 16);
            campo_fim.value = guarda_consulta[r].fim.substring(11, 16);

            break;
        }
    }
}