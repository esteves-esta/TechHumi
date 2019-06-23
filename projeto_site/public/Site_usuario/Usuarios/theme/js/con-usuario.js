// CHAMAR FUNÇÕES
autentificar('representante');
consultar_dados();
aguardar_consulta("Aguarde!");

// ---------------------------------------------------------------
// DECLARAR FUNÇÕES

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
       
        if (response.ok) {

            response.json().then(function (resposta) {

                if (resposta.length == undefined) {

                    swal({
                        title: "Você ainda não cadastrou nenhum funcionário.",
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

                        // <td>${atual.idFuncionario}</td>

                        conteudo += `<tr>
                        <td>${atual.nomeFuncionario}</td>
                        <td>${atual.rgFuncionario}</td>
                        <td>${atual.cpfFuncionario}</td>
                        <td>${atual.emailFuncionario}</td>
                        <td>${atual.telefoneFuncionario}</td>
                        <td>${atual.cargoFuncionario}</td>
                        <td class="actions">`;

                        if (atual.cargoFuncionario != 'Administrador') {
                            conteudo += `<a class="consulta-btn btn btn-warning btn-xs mb-1" onclick="alterar(${atual.idFuncionario})">Editar</a>`
                            conteudo += `<a class="consulta-btn btn btn-danger btn-xs mb-1" data-toggle="modal"data-target="#delete-modal" onclick="excluir(${atual.idFuncionario})">Excluir</a>`;
                        }

                        conteudo += `</td></tr>`;
                    }
                    corpo_tabela.innerHTML = conteudo;
                }
            });
        } else {
            console.log('Erro de consulta!');
        }
    });

    setTimeout(() => {
        $('#tabela').dataTable();
        $('input[type="search"').attr('id', 'search');
    }, 3000);

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

function excluir_dados(cod) {
    // coloca valores dos codigo em input escondidos para enviar para o js
    cdFunc = { codigo: cod }
    var corpo = new URLSearchParams(cdFunc);

    fetch("/excluir/excluir-funcionario", {
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


    // }
    return false;
}

// ---------------------------------------------------------------

function alterar(codigo) {
    sessionStorage.codigo_alterar = codigo;
    window.location.href = 'alterarUsuario.html';
}