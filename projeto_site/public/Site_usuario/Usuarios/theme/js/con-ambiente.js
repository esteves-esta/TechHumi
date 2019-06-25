// CHAMAR FUNÇÕES

autentificar('funcionario');
consultar_dados();

// ---------------------------------------------------------------
// DECLARAR FUNÇÕES


cabeca_tabela.style.display = "none";

function consultar_dados() {
    // guarda código do usuário que está no atributo usuario_bandtec
    // em um json e depois utiliza a classe URLSearchParams
    //para mandar para o arquivo js

    var cdEmpresa = { codigo: sessionStorage.idEmpresa }
    var corpo = new URLSearchParams(cdEmpresa);

    fetch("/consulta/consulta-ambiente", {
        method: "POST",
        body: corpo
    }).then(function (response) {

        if (response.ok) {

            response.json().then(function (resposta) {
                if (resposta.length == undefined) {

                    swal({
                        title: "Você ainda não cadastrou nenhum ambiente.",
                        text: "   ",
                        icon: "info",
                        buttons: false,
                        timer: 2500,
                        closeOnClickOutside: true,
                    });
                }
                else {
                    // devolve informação da empresa
                    var conteudo = '';
                    for (r = 0; r < resposta.length; r++) {
                        var atual = resposta[r];

                        // <td>${atual.idAmbiente}</td>

                        conteudo += `<tr>
                                    <td>${atual.descricaoAmbiente}</td>
                                    <td>${atual.localizacaoAmbiente}</td>
                                    <td>${atual.horaInicio.substring(11, 16)} às ${atual.horaFim.substring(11, 16)}</td>
                                    <td class="actions">
                                    <a class="consulta-btn btn btn-warning btn-xs mb-1" onclick="alterar(${atual.idAmbiente})">Editar</a>
                                    <a class="consulta-btn btn btn-danger btn-xs mb-1" data-toggle="modal"
                                        data-target="#delete-modal" onclick="excluir(${atual.idAmbiente})">Excluir</a>
                                    </td>
                                </tr>`;
                    }
                    corpo_tabela.innerHTML = conteudo;

                    cabeca_tabela.style.display = "";
                    div_aguarde.style.display = 'none';

                    $('#tabela').dataTable({
                        "language": {
                            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
                        }
                      });
                }
            });
        } else {
            consultar_dados();
        }
    }).catch(() => {
       
        consultar_dados()
       
    });

    return false;
}

// ---------------------------------------------------------------

function excluir(codigo) {
    swal({
        title: "Você tem certeza que deseja excluir estes dados?",
        text: "Essa ação não poderá ser revertida!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                aguardar_consulta("Aguarde enquanto excluímos o registro!");
                excluir_dados(codigo);

            } else {
                swal("Seus dados não foram excluídos.");
            }
        });
}

// ---------------------------------------------------------------

var cd;
function excluir_dados(cod) {
    // coloca valores dos codigo em input escondidos para enviar para o js

    cd = { codigo: cod }
    var corpo = new URLSearchParams(cd);

    fetch("/excluir/excluir-ambiente", {
        method: "POST",
        body: corpo
    }).then(function (response) {

        if (response.ok) {
            consultar_dados();
            swal({
                title: "Excluído com sucesso!",
                text: "Aguarde enquanto atualizamos os registros",
                icon: "success",
                buttons: false,
                timer: 3000,
                closeOnClickOutside: false,
            });


        } else {

            swal({
                title: "Erro ao excluir! Por favor tente de novo.",
                text: "   ",
                icon: "error"
            });
        }
    });

    return false;
}

// ---------------------------------------------------------------

function alterar(codigo) {
    sessionStorage.codigo_alterar = codigo;
    window.location.href = 'alterarAmbiente.html';
}