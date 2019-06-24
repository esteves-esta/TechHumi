// CHAMAR FUNÇÕES
autentificar('adm');
consultar_dados()
//aguardar_consulta("Aguarde!");
// ---------------------------------------------------------------
// DECLARAR FUNÇÕES
cabeca_tabela.style.display = "none";
function consultar_dados() {
    // guarda código do usuário que está no atributo usuario_bandtec
    // em um json e depois utiliza a classe URLSearchParams
    //para mandar para o arquivo js

    var corpo = '';

    fetch("/consulta-perfil/consulta-empresas", {
        method: "POST",
        body: corpo
    }).then(function (response) {

        if (response.ok) {

            response.json().then(function (resposta) {
                // devolve informação da empresa
                var conteudo = '';
                for (r = 0; r < resposta.length; r++) {
                    var atual = resposta[r];

                   
                    conteudo += `<tr>
                                <td>${atual.nomeEmpresa}</td>
                                <td>${atual.cnpjEmpresa}</td>
                                <td>${atual.telefoneEmpresa1}</td>
                                <td>${atual.telefoneEmpresa2}</td>
                                <td>${atual.logradouro}</td>
                                <td>${atual.numero}</td>
                                <td>${atual.complemento}</td>
                                <td>${atual.bairro}</td>
                                <td>${atual.cidade}</td>
                                <td>${atual.uf}</td>
                                <td>${atual.cep}</td>
                                <td>${atual.referencia}</td>
                                <td class="actions">
                                <a class="consulta-btn btn btn-warning btn-xs mb-1" onclick="alterar(${atual.idFuncionario})">Editar</a>
                                <a class="consulta-btn btn btn-danger btn-xs mb-1" data-toggle="modal"
                                    data-target="#delete-modal" onclick="excluir(${atual.idEmpresa})">Excluir</a>
                                </td>
                              </tr>`;
                }
                corpo_tabela.innerHTML = conteudo;
                cabeca_tabela.style.display = "";
                div_aguarde.style.display = 'none';
                $('#tabela').dataTable();
                $('input[type="search"').attr('id', 'search');

            });
        } else {
            console.log('Erro de consulta!');
        }
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
                excluir_dados(codigo);

            } else {
                swal("Seus dados não foram excluídos.");
            }
        });
}

// ---------------------------------------------------------------

var cdEmpresa;
function excluir_dados(cod) {
    // coloca valores dos codigo em input escondidos para enviar para o js
    cdEmpresa = { codigo: cod }
    var corpo = new URLSearchParams(cdEmpresa);

    fetch("/excluir/excluir-empresa", {
        method: "POST",
        body: corpo
    }).then(function (response) {

        if (response.ok) {

            swal({
                title: "Excluído com sucesso!",
                text: "Aguarde enquanto atualizamos os registros",
                icon: "success",
                buttons: false,
                timer: 3000,
                closeOnClickOutside: false,
            });
            consultar_dados();

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
    window.location.href = 'alteraEmpresa.html';
}