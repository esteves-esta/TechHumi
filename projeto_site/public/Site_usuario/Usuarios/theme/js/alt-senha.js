// CHAMAR FUNÇÕES
autentificar('funcionario');

// ---------------------------------------------------------------
// DECLARAR FUNÇÕES
function redefinirSenha() {
    //btn_salvar.disabled = true;
    if (senha.value != confirmaSenha.value) {
        
        swal({
            title: "Senhas não conferem!",
            text: "   ",
            icon: "error"
        });
    } else {
        estrangeira.value = sessionStorage.usuario_bandtec;
        
        var formulario = new URLSearchParams(new FormData(form_Redefinir));
        
        fetch("/alterar/alterar-senha", {
            method: "POST",
            body: formulario
        }).then(function (response) {

            if (response.ok) {
                
                swal({
                    title: "Alterado com sucesso!",
                    text: "   ",
                    icon: "success"
                });
                limpar();

            } else {
                
                swal({
                    title: "Erro ao alterar!",
                    text: "   ",
                    icon: "error"
                });
            }
        });
    }
    btn_salvar.disable = false;
    return false;
}

// ---------------------------------------------------------------

function limpar() {
    senha.value = '';
    confirmaSenha.value = '';
}