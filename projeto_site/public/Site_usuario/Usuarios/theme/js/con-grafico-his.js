// ---------------------------------------------------------------
// DECLARAR VÁRIAVEIS
var exibiu_grafico = false;

// ---------------------------------------------------------------
// DECLARAR FUNÇÕES

// altere aqui as configurações do gráfico
// (tamanhos, cores, textos, etc)
function configurarGrafico() {
    var configuracoes = {
        responsive: true,
        animation: exibiu_grafico ? false : {
            duration: 1000
        },
        hoverMode: 'index',
        stacked: false,
        title: {
            display: true,
            text: 'Histórico recente de temperatura e umidade'
        },
        scales: {
            yAxes: [{
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'left',
                id: 'y-temperatura',
            }, {
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'right',
                id: 'y-umidade',

                // grid line settings
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            }],
        }
    };

    exibiu_grafico = true;

    return configuracoes;
}

// ---------------------------------------------------------------


// altere aqui como os dados serão exibidos
// e como são recuperados do BackEnd
function obterDadosGrafico() {

    // neste JSON tem que ser 'labels', 'datasets' etc, 
    // porque é o padrão do Chart.js
    var dados = {
        labels: [],
        datasets: [{
            yAxisID: 'y-temperatura',
            label: 'Temperatura',
            borderColor: "#ff16b9",
            backgroundColor: "#ff16b9",
            fill: false,
            data: []
        },
        {
            yAxisID: 'y-umidade',
            label: 'Umidade',
            borderColor: "#16abff",
            backgroundColor: "#16abff",
            fill: false,
            data: []
        }
        ]};

    fetch('/leituras/ultimas', {
        cache: 'no-store'
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                resposta.reverse();

                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];

                    // aqui, após 'registro.' use os nomes 
                    // dos atributos que vem no JSON 
                    // que gerou na consulta ao banco de dados

                    dados.labels.push(registro.momento);

                    dados.datasets[0].data.push(registro.temperatura);
                    dados.datasets[1].data.push(registro.umidade);
                }
                // console.log(JSON.stringify(dados));

                div_aguarde.style.display = 'none';

                plotarGrafico(dados);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}



// ---------------------------------------------------------------

// só altere aqui se souber o que está fazendo!
function plotarGrafico(dados) {
    var ctx = canvas_grafico.getContext('2d');
    window.grafico_linha = Chart.Line(ctx, {
        data: dados,
        options: configurarGrafico()
    });
}

// ---------------------------------------------------------------
// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!
function atualizarGrafico() {
    obterDadosGrafico();
    setTimeout(atualizarGrafico, 5000);
}

