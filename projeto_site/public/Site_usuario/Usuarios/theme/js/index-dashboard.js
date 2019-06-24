// CHAMAR FUNÇÕES
autentificar('funcionario');

//setInterval(consultar_analitycs, 1000);
//setTimeout(consultar_dados, 2000);

// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!
function atualizarGraficoReal() {
    obterDadosGraficoReal();
    setTimeout(atualizarGraficoReal, 2000);
}


// ---------------------------------------------------------------

//chama a atualização dos dois graficos no onload
function comeca() {
    atualizarGraficoReal();
}

// ---------------------------------------------------------------

function consultar_analitycs() {

    fetch("/leituras/estatisticas", {
        method: "GET"
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                //devolve informação do analitycs

                temp_min_conteudo.innerHTML = resposta.temp_min.toFixed(1);
                temp_1q_conteudo.innerHTML = resposta.temp_1q.toFixed(1);
                temp_media_conteudo.innerHTML = resposta.temp_media.toFixed(1);
                temp_mediana_conteudo.innerHTML = parseInt(resposta.temp_mediana);
                temp_3q_conteudo.innerHTML = resposta.temp_3q.toFixed(1);
                temp_max_conteudo.innerHTML = resposta.temp_max.toFixed(1);
                //UMIDADE
                umid_min_conteudo.innerHTML = parseInt(resposta.umid_min);
                umid_1q_conteudo.innerHTML = parseInt(resposta.umid_1q);
                umid_media_conteudo.innerHTML = parseInt(resposta.umid_media);
                umid_mediana_conteudo.innerHTML = parseInt(resposta.umid_mediana);
                umid_3q_conteudo.innerHTML = parseInt(resposta.umid_3q);
                umid_max_conteudo.innerHTML = parseInt(resposta.umid_max);
            });
        } else {
            console.log('Erro de consulta!');
        }
    });
    return false;
}

// ---------------------------------------------------------------

// altere aqui como os dados serão exibidos
// e como são recuperados do BackEnd
function obterDadosGraficoReal() {
    var dadosReal;

    fetch('/leituras/tempo-real', {
        cache: 'no-store'
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                // console.log(`Dados recebidos: ${JSON.stringify(dadosReal)}`);

                // aqui, após registro. use os nomes 
                // dos atributos que vem no JSON 
                // que gerou na consulta ao banco de dados
                dadosTemperatura = google.visualization.arrayToDataTable([
                    ['Label', 'Value'],
                    ['Temperatura', resposta.temperatura]
                ]);

                dadosUmidade = google.visualization.arrayToDataTable([
                    ['Label', 'Value'],
                    ['Umidade', resposta.umidade]
                ]);

                var dadosReal = {
                    temperatura: dadosTemperatura,
                    umidade: dadosUmidade
                }

                alertar(resposta.temperatura, resposta.umidade);
                plotarGraficoReal(dadosReal);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// ---------------------------------------------------------------

// só altere aqui se souber o que está fazendo!
function plotarGraficoReal(dadosReal) {
    // console.log('iniciando plotagem dos gráficos...');

    var chartTemperatura = new google.visualization.Gauge(div_temperatura);
    chartTemperatura.draw(dadosReal.temperatura, configurarGraficoReal().temperatura);

    var chartUmidade = new google.visualization.Gauge(div_umidade);
    chartUmidade.draw(dadosReal.umidade, configurarGraficoReal().umidade);
}


// ---------------------------------------------------------------

function alertar(temperatura, umidade) {
    // ideal que venham de algum EndPoint
    var limites = {
        max_temperatura: 23.0,
        min_temperatura: 20.0,
        max_umidade: 60,
        min_umidade: 40,
        primeiroQ_temperatura: 20.4,
        terceiroQ_temperatura: 22.6,
        primeiroQ_umidade: 44,
        terceiroQ_umidade: 56,
    };

    var mensagem = ``;
    if (temperatura < limites.primeiroQ_temperatura || temperatura > limites.terceiroQ_temperatura) {
        mensagem += `Temperatura fora de padrão  `;
    }
    if (umidade < limites.primeiroQ_umidade || umidade > limites.terceiroQ_umidade) {
        mensagem += `Umidade fora de padrão`;
    }

    if (mensagem == '') {

    } else {
        notificacao(mensagem);
    }
}


// ---------------------------------------------------------------


function notificacao(frase) {
    swal({
        title: frase,
        text: " ",
        icon: "warning",
        buttons: false,
        timer: 1000,
    });
}

// ---------------------------------------------------------------



function consultar_dados() {
    // guarda código do usuário que está no atributo usuario_bandtec
    // em um json e depois utiliza a classe URLSearchParams
    //para mandar para o arquivo js


    var cdEmpresa = { codigo: sessionStorage.idEmpresa }
    var corpo = new URLSearchParams(cdEmpresa);


    fetch("/consulta-perfil/consulta-ambiente", {
        method: "POST",
        body: corpo
    }).then(function (response) {
        
        if (response.ok) {

            response.json().then(function (resposta) {

                if (resposta.length == undefined) {

                }
                else {
                    // devolve informação da empresa
                    var conteudo = '';
                    for (r = 0; r < resposta.length; r++) {
                        var atual = resposta[r];
                        conteudo += `<option value="">${atual.descricaoAmbiente}</option>`;
                    }
                    ambientes_lista.innerHTML += conteudo;
                }
            });
        } 
    });

    return false;
}

// ---------------------------------------------------------------