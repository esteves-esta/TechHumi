// CHAMADA DE FUNÇÕES
autentificar('funcionario');

consultar_dados();

// MÁSCARAS
$('#telefone').mask('(00) 0 0000-0000');
$('#tele1').mask('(00) 0 0000-0000');
$('#tele2').mask('(00) 0 0000-0000');
$('#cep').mask('00000-000');
$('#cpf').mask('000.000.000-00');
$('#cnpj').mask('00.000.000/0000-00');

// FUNÇÕES
var cdAmbi;

function consultar_dados() {
    // guarda código do usuário que está no atributo usuario_bandtec
    // em um json e depois utiliza a classe URLSearchParams
    //para mandar para o arquivo js
    

    cdAmbi = { codigo: sessionStorage.codigo_alterar }
    var corpo = new URLSearchParams(cdAmbi);

    fetch("/consulta/consulta-ambiente-alterar", {
        method: "POST",
        body: corpo
    }).then(function (response) {

        if (response.ok) {

            response.json().then(function (resposta) {
                //devolve informação do ambiente
                descricao.value = resposta[0].descricaoAmbiente;
                localizacao.value = resposta[0].localizacaoAmbiente;
                campo_inicio.value = resposta[0].horaInicio.substring(11, 16);
                campo_fim.value = resposta[0].horaFim.substring(11, 16);
                toggleShow(form_Ambiente, div_aguarde);
            });
        } else {
            console.log('Erro de consulta!');
        }
    });

    return false;
}

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

function alterar_dados() {
    // coloca valores dos codigo em input escondidos para enviar para o js
    cd_amb.value = cdAmbi.codigo;

    var formulario = new URLSearchParams(new FormData(form_Ambiente));
    fetch("/alterar/alterar-ambiente", {
        method: "POST",
        body: formulario
    }).then(function (response) {

        if (response.ok) {

            swal({
                title: "Alterado com sucesso!",
                text: "   ",
                icon: "success"
            });

            // SE ALTEROU REMOVER DO SESSION STORAGE 
            //  CODIGO DO REPRESENTANTE QUE ERA PRA CADASTRAR
            sessionStorage.removeItem("codigo_alterar");
            
            setTimeout(function () {
                window.location.href = 'consultaAmbientes.html';
            }, 2000);

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
