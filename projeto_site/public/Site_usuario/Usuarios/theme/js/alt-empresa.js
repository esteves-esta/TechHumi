// CHAMAR FUNÇÕES
$('#telefone').mask('(00) 0 0000-0000');
$('#tele1').mask('(00) 0 0000-0000');
$('#tele2').mask('(00) 0 0000-0000');
$('#cep').mask('00000-000');
$('#cpf').mask('000.000.000-00');
$('#cnpj').mask('00.000.000/0000-00');

// ---------------------------------------------------------------
// DECLARAR FUNÇÕES

var cd_empresa, cd_endereco, cdFunc;

function consultar_dados(cod) {
    // guarda código do usuário que está no atributo usuario_bandtec
    // em um json e depois utiliza a classe URLSearchParams
    //para mandar para o arquivo js

    cdFunc = { codigo: cod};
    var corpo = new URLSearchParams(cdFunc);

    fetch("/consulta/consultar", {
        method: "POST",
        body: corpo
    }).then(function (response) {

        if (response.ok) {

            response.json().then(function (resposta) {
                // devolve informação da empresa
                cd_empresa = resposta.idEmpresa;
                empresa.value = resposta.nomeEmpresa;
                cnpj.value = resposta.cnpjEmpresa;
                tele1.value = resposta.telefoneEmpresa1;
                tele2.value = resposta.telefoneEmpresa2;

                //informações de endereço
                cd_endereco = resposta.idEndereco;
                cep.value = resposta.cep;
                logradouro.value = resposta.logradouro;
                bairro.value = resposta.bairro;
                complemento.value = resposta.complemento;
                referencia.value = resposta.referencia;
                cidade.value = resposta.cidade;
                uf.value = resposta.uf;
                numero.value = resposta.numero;
            });

            toggleShow(form_Empresa, div_aguarde);
        }

    }).catch(()=>{
        consultar_dados();
    });;

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
    cd_emp.value = cd_empresa;
    cd_end.value = cd_endereco;

    var formulario = new URLSearchParams(new FormData(form_Empresa));
    fetch("/alterar/alterar-empresa", {
        method: "POST",
        body: formulario
    }).then(function (response) {

        if (response.ok) {

            swal({
                title: "Alterado com sucesso!",
                text: "   ",
                icon: "success"
            });
            sessionStorage.removeItem("codigo_alterar");
         
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