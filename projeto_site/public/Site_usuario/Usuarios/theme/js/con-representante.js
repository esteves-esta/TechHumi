// CHAMAR FUNÇÕES

autentificar('adm');
consultar_dados();

//aguardar_consulta("Aguarde!");


// DECLARAR FUNÇÕES

// ---------------------------------------------------------------
cabeca_tabela.style.display = "none";
function consultar_dados() {

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
                                <td>${atual.nomeFuncionario}</td>
                                <td>${atual.rgFuncionario}</td>
                                <td>${atual.cpfFuncionario}</td>
                                <td>${atual.emailFuncionario}</td>
                                <td>${atual.telefoneFuncionario}</td>
                                <td>${atual.nomeEmpresa}</td>
                                <td class="actions">
                                <a class="consulta-btn btn btn-warning btn-xs mb-1" onclick="alterar(${atual.idFuncionario})">Editar</a>
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

function alterar(codigo) {
    sessionStorage.codigo_alterar = codigo;
    window.location.href = 'alteraRepresentante.html';
}