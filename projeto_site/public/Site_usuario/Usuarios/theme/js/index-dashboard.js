// CHAMAR FUNÇÕES
autentificar('funcionario');
consultar_dados();

//DECLARAR VARIÁVEL
var limites_t = {
    max: 23.0,
    min: 20.0,
    q1: 20.4,
    q3: 22.6,
};

var limites_u = {
    max: 60,
    min: 40,
    q1: 44,
    q3: 56,
};

var ambientes = [];


//DECLARA FUNÇÕES

//-------------------------------------------------
// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!
// function atualizarGraficoReal() {
//     obterDadosGraficoReal();
//     setTimeout(atualizarGraficoReal, 2000);
// }

// PESQUISA OS AMBIENTES DA EMPRESA 
// GERA VALOR PARA SIMULAR DADOS DIFERENTES
function consultar_dados() {

    var cdEmpresa = { codigo: sessionStorage.idEmpresa }
    var corpo = new URLSearchParams(cdEmpresa);

    fetch("/consulta/consulta-ambiente", {
        method: "POST",
        body: corpo
    }).then(function (response) {

        if (response.ok) {
            response.json().then(function (resposta) {

                if (resposta.length != undefined) {

                    for (r = 0; r < resposta.length; r++) {

                        var ambiente = {
                            nome: '',
                            local: '',
                            inicio: '',
                            fim: '',
                            simula: 0,
                            temp: 0,
                            umid: 0,
                            status_t: 'normal',
                            status_u: 'normal'
                        }

                        var atual = resposta[r];
                        ambiente.nome = atual.descricaoAmbiente;
                        ambiente.local = atual.localizacaoAmbiente;
                        ambiente.inicio = atual.horaInicio.substring(11, 16);
                        ambiente.fim = atual.horaFim.substring(11, 16);
                        ambiente.simula = Math.random().toFixed(1);
                        ambientes.push(ambiente);
                    }
                    obter_dados();
                }
                else {
                    swal({
                        title: "Você não tem nenhum ambiente cadastrado.",
                        text: "Cadastre um ambiente na aba 'Ambientes'",
                        icon: "info",
                        buttons: false,
                        timer: 3000,
                    });
                }
            });
        }
    }).catch(() => {
        consultar_dados();
    });

    return false;
}

// ---------------------------------------------------------------

// PESQUISA ÚLTIMOS DADOS INSERIDOS NO BANCO DE DADOS
// E OS PEGA DO BACK-END
// SIMULA DADOS DIFERENTES PARA CADA AMBIENTE E SALVA NO VETOR AMBIENTES
function obter_dados() {
    fetch('/leituras/tempo-real', {
        cache: 'no-store'
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                var t = resposta.temperatura;
                var u = resposta.umidade;

                for (r = 0; r < ambientes.length; r++) {
                    ambientes[r].temp = (Number(t) - Number(ambientes[r].simula)).toFixed(2);
                    ambientes[r].umid = parseInt(Number(u) - Number(ambientes[r].simula*10));

                    ambientes[r].status_t = analisar_dados(ambientes[r].temp, limites_t);
                    ambientes[r].status_u = analisar_dados(ambientes[r].umid, limites_u);
                }

                carregar_pagina();
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

// ---------------------------------------------------------------

// PEGA DADOS DO VETOR AMBIENTE 
// OS COLOCA NA TABELA '#ambientes-dados'
// CHAMA BIBLIOTECA dataTable
function carregar_pagina() {
    var conteudo = '';

    for (r = 0; r < ambientes.length; r++) {

        var status = '';
        // se algum dos dados está bom ou critico esse status prevalece um menor

        if (ambientes[r].status_t == 'critico' || ambientes[r].status_u == 'critico') {
            status = 'critico';
        }
        else if (ambientes[r].status_t == 'bom' || ambientes[r].status_u == 'bom') {
            status = 'bom';
        } 
        else {
            status = 'normal';
        }

        conteudo += `  <tr onclick="foco(${r}, '${status}')">
                            <td><span class="status ${status}">${status}</span></td>
                            <td>${ambientes[r].nome}</td>
                            <td>${ambientes[r].temp}</td>
                            <td>${ambientes[r].umid}</td>
                        </tr>`;
    }

    ambientes_lista.innerHTML = conteudo;

    // chama função da biblioteca dataTable
    $("#ambientes-dados").dataTable({
        "scrollY": false,
        "paging": true,
        "ordering": false,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        }
    });

    // retira gif de carregameto e mostra tabela
    toggleShow(lista, div_aguarde);

    ambientes.forEach(element => {
        var texto = '';
        if (element.status_t != 'normal' || element.status_u != 'normal') {
            console.log(element.status_t);
            console.log(element.status_u);
            if (element.status_t == 'critico') {
                texto = 'Temperatura fora do padrão, ';
            } else if (element.status_t == 'bom') {
                texto = 'Temperatura pode ser melhorada,';
            }

            if (element.status_u == 'critico') {
                texto = 'Umidade fora do padrão.';
            } else if (element.status_u == 'bom') {
                texto = 'Umidade pode ser melhorada.';
            }
            //notificacao(`${element.nome}`, texto);
        }
    });

}

// ---------------------------------------------------------------


// verifica se o dado atual
// seja temperatura ou umidade está fora do padrão
function analisar_dados(x, limite) {

    if (x > limite.q1 && x < limite.q3) {
        return "normal";
    }
    else if (x > limite.min && x < limite.q1) {
        return "bom";
    }
    else if (x > limite.q3 && x < limite.max) {
        return "bom";
    }
    else {
        return "critico";
    }

}


// ---------------------------------------------------------------


function notificacao(local, descricao) {
    swal({
        title: `${local} fora dos padrões`,
        text: descricao,
        icon: "warning",
        // buttons: false,
        // timer: 5000,
    });
}

// ---------------------------------------------------------------

// AO CLICAR NA LINHA CONDIZENTE AO AMBIENTE DESEJADO
// IRÁ PEGAR OS DADOS E COLOCA-LOS EM OUTRA DIV
// E SERÁ ADICIONADO A SEÇÃO DAS ESTÁTISTICAS
function foco(n, status) {

    toggleShow(div_aguarde, foco_ambiente);
    consultar_analitycs(ambientes[n].simula);

    // muda a cor de fundo da div de foco
    foco_ambiente.className = `col-sm-6 ${status}`;

    // coloca informações do ambiente
    nome.innerHTML = ambientes[n].nome;
    foco_t.innerHTML = `${ambientes[n].temp}ºC`;
    foco_u.innerHTML = `${ambientes[n].umid}%`;
    funcionamento.innerHTML = `${ambientes[n].inicio} às ${ambientes[n].fim}`;
    localizacao.innerHTML = ambientes[n].local;

    //mostra div e esconde gid de carregamento
    setTimeout(() => {
        toggleShow(foco_ambiente, div_aguarde);
    }, 2000);

}

// ---------------------------------------------------------------


// CONSULTA ANALITYCS DO AMBIENTE ESCOLHIDO
function consultar_analitycs(x) {

    fetch("/leituras/estatisticas", {
        method: "GET"
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                //devolve informação do analitycs
                var y = Number(x);
                t_min.innerHTML = (resposta.temp_mediana - y).toFixed(1);
                t_max.innerHTML = (resposta.temp_max - y).toFixed(1);
                t_med.innerHTML = (resposta.temp_media - y).toFixed(1);
                t_mda.innerHTML = parseInt(resposta.temp_mediana - y);


                //UMIDADE
                u_min.innerHTML = (resposta.umid_min - y).toFixed(1);
                u_max.innerHTML = (resposta.umid_max - y).toFixed(1);
                u_med.innerHTML = (resposta.umid_media - y).toFixed(1);
                u_mda.innerHTML = parseInt(resposta.umid_mediana - y);


            });
        } else {
            console.log('Erro de consulta!');
        }
    });
    return false;
}

// ---------------------------------------------------------------



