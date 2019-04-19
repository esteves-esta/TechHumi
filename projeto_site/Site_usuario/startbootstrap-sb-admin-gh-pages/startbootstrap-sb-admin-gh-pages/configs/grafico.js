var socket = io.connect('http://localhost:4000');
var temper = temp.getContext('2d');
var umidade = umid.getContext('2d');

var t1 = new Chart(temper, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: "#fcfc3a",
            borderColor: "#fcfc3a",
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 7,
            lineTension: 0.2,
            fill: false,
            label: "Temperatura"
        }]
    },
    options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        title: {
            display: true,
            text: 'Gráfico de Temperatura',
            fontSize: 30,
            fontColor: "#fcfc3a",
            fontStyle: "normal"
        },
        scales: {
            yAxes: [{
                ticks: {
                    // Inclui a °C para o gráfico de Temperatura
                    callback: function(value) {
                        return value + '°C';
                    }
                }
            }]
        }
}
});

var t2 = new Chart(umidade, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: "#34A1C4",
            borderColor: "#34A1C4",
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 7,
            lineTension: 0.2,
            fill: false,
            label: "Umidade"
        }]
    },
    options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        title: {
            display: true,
            text: 'Gráfico de Umidade',
            fontSize: 30,
            fontColor: "#34A1C4",
            fontStyle: "normal"
        },
        scales: {
            yAxes: [{
                ticks: {
                    // Inclui a °C para o gráfico de Temperatura
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }]
        }
}
});