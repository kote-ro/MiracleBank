// main calculation in currency converter
function mainCalculate(){
    var choosenInCurrency = document.getElementById("select-in").value;
    var choosenOutCurrency = document.getElementById("select-out").value;

    var inputNumber = document.getElementById("input").value;

    if(choosenInCurrency == choosenOutCurrency){
        document.getElementById("output").value = inputNumber;
    }else{
        parseInfo(choosenInCurrency, choosenOutCurrency, inputNumber);
    }
}
//generation of ajax-requests based on input parameters
//choosenInCurrency - input currency name
//choosenOutCurrency - output currency name
//inputNumber - amount of output currency
function parseInfo(choosenInCurrency, choosenOutCurrency, inputNumber){
    var url = 'http://www.floatrates.com/daily/'+choosenOutCurrency+'.json';
    $.getJSON(url, function(data) {
        // отношение значение одной выбраной валюты к другой
        var valueToValue = data[choosenInCurrency].inverseRate;
        document.getElementById("output").value = (inputNumber*valueToValue).toFixed(2);
    });
}
//supporting function to format date into 01-09
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}
//builds chart based on parsing results
$(document).ready(function(){
    //for what period information is needed
    var amountOfDays = 7;

    var arrayOfDates = [];
    var arrayOfDatesAsString = [];
    var resultUSD = [];
    var resultEUR = [];

    for(var i = amountOfDays; i > 0; i--){
        arrayOfDates.push(new Date(new Date().setDate(new Date().getDate()-i)));
    }

    for(var i = 0; i < amountOfDays; i++){
        var date = arrayOfDates[i].getFullYear()+'-'+pad(arrayOfDates[i].getMonth()+1)+'-'+pad(arrayOfDates[i].getDate()+1); //дата в формате YYYY-MM-DD
        arrayOfDatesAsString.push(date);
    }
    //this API allows cross-origin requests anywhere
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url = 'https://api.exchangeratesapi.io/history?base=USD&start_at='+arrayOfDatesAsString[0]+'&end_at='+arrayOfDatesAsString[amountOfDays-1]+'&symbols=RUB'; //дата в формате YYYY-MM-DD
    $.ajax({
        async: false,
        url: url,
        dataType: "json",
        success: function(data){
            for(var i = 0; i < amountOfDays; i++){
                if(data.rates[arrayOfDatesAsString[i]] != undefined){
                    var info = data.rates[arrayOfDatesAsString[i]].RUB;
                    resultUSD.push(info);
                }
            }
        }});

    url = 'https://api.exchangeratesapi.io/history?base=EUR&start_at='+arrayOfDatesAsString[0]+'&end_at='+arrayOfDatesAsString[amountOfDays-1]+'&symbols=RUB'; //дата в формате YYYY-MM-DD
    $.ajax({
        async: false,
        url: proxyurl+url,
        dataType: "json",
        success: function(data){
            for(var i = 0; i < amountOfDays; i++){
                if(data.rates[arrayOfDatesAsString[i]] != undefined){
                    var info = data.rates[arrayOfDatesAsString[i]].RUB;
                    resultEUR.push(info);
                }
            }
        }});

    document.getElementById("usd-sale").innerHTML = resultUSD[0].toFixed(4);
    document.getElementById("usd-buy").innerHTML = resultUSD[1].toFixed(4);
    document.getElementById("eur-sale").innerHTML = resultEUR[0].toFixed(4);
    document.getElementById("eur-buy").innerHTML = resultEUR[1].toFixed(4);

    amountOfDays = resultUSD.length;
    //chart building
    var ctx = document.getElementById('canvas').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    data: resultUSD, //массив спаршеных валют
                    label: "USD",
                    borderWidth: 2,
                    borderColor: "blue",
                    fill: true,
                    pointRadius: 2
                },
                {
                    data: resultEUR, //массив спаршеных валют
                    label: "EUR",
                    borderWidth: 2,
                    borderColor: "yellow",
                    fill: true,
                    pointRadius: 2
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        parser: 'YYYY-MM-DD',
                        unit: 'day',
                        displayFormats: {
                            day: 'DD.MM'
                        },
                        min: arrayOfDatesAsString[0],
                        max: arrayOfDatesAsString[amountOfDays-1]
                    },
                    ticks: {
                        source: 'data'
                    }
                }]
            },
            legend: {
                display: true
            }
        },
        plugins: [{
            beforeInit: function(chart) {
                var time = chart.options.scales.xAxes[0].time,
                    timeDiff = moment(time.max).diff(moment(time.min), 'd');
                for (i = 0; i <= timeDiff; i++) {
                    var _label = moment(time.min).add(i, 'd').format('YYYY-MM-DD');
                    chart.data.labels.push(_label);
                }
            }
        }]
    });
});
