// CHAMAR FUNÇÕES
aguardar();
consultar_dados();
autentificar('funcionario');

// ---------------------------------------------------------------
// DECLARAR FUNÇÕES
function consultar_dados() {
    // guarda código do usuário que está no atributo usuario_bandtec
    // em um json e depois utiliza a classe URLSearchParams
    //para mandar para o arquivo js


    var cdEmpresa = { codigo: sessionStorage.idEmpresa }
    var corpo = new URLSearchParams(cdEmpresa);


    fetch("/consulta-perfil/consulta-historico", {
        method: "POST",
        body: corpo
    }).then(function (response) {
        console.log(response);
        if (response.ok) {

            response.json().then(function (resposta) {
                if (resposta.length == undefined) {

                    swal({
                        title: "Não foram registrados dados.",
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

                        conteudo += `<tr>
                        <td>${atual.data}</td>
                        <td>${atual.hora}</td>
                        <td>${atual.temperatura}</td>
                        <td>${atual.umidade}</td> 
                    </tr>`;
                    }

                    corpo_tabela.innerHTML = conteudo;
                }
            });
        } else {
            console.log('Erro de consulta!');
            //window.location.reload(false); 
        }
    });

    setTimeout(() => {
        $('#tabela').dataTable();
        $('input[type="search"').attr('id', 'search');
    }, 3000);

    return false;
}

