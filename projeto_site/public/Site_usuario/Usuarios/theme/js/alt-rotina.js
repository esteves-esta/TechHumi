// CHAMAR FUNÇÕES
autentificar('funcionario');

// ---------------------------------------------------------------
// DECLARAR FUNÇÕES


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
