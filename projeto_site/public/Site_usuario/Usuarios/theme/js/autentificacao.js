// niveis de acesso
/*
    1 - Administrador Geral; 
    2 - Representante da Empresa; 
    3 - Funcionários Comuns.

*/

/*
    autentificar('adm');
    autentificar('representante');
    autentificar('funcionario');
*/

function autentificar(tipo) {
    var usuario = sessionStorage.usuario_bandtec;
    var nivel = sessionStorage.nivelacesso;

    switch (tipo) {
        case 'adm':
            if (usuario == undefined || nivel != 1) {
                window.location.href = '../../Login/login.html';
            }
            break;
        case 'representante':
            if (usuario == undefined || nivel != 2) {
                window.location.href = '../../Login/login.html';
            }
            break;
        case 'funcionario':
            if (usuario == undefined || nivel == 1) {
                window.location.href = '../../Login/login.html';
            }
            if (sessionStorage.nivelacesso == 3) {
                somente_adm.style.display = 'none';
                somente_adm1.style.display = 'none';
                somente_adm2.style.display = 'none';
            }
            if (sessionStorage.nivelacesso == 2) {
                somente_adm.style.display = 'block';
                somente_adm1.style.display = 'block';
                somente_adm2.style.display = 'block';
            }
            // idEmpresa.value = sessionStorage.idEmpresa;
            break;
    }

    usuario_logado.innerHTML = sessionStorage.nome_usuario;
}



function logoff() {
    sessionStorage.removeItem('idEmpresa');
    sessionStorage.removeItem('usuario_bandtec');
    sessionStorage.removeItem('idlogin');
    sessionStorage.removeItem('nivelacesso');
    sessionStorage.removeItem('nome_usuario');

    window.location.href = '../../Login/login.html';
}
