import { key } from './conf.js';
const   api = {
            key : key,
            baseurl: 'https://api.openweathermap.org/data/2.5/',
            lang: 'pt_br',
        },
        search = document.querySelector("#q");

search.addEventListener('keypress', (e) =>{
    if(13 === e.keyCode){
        console.log(search.value);
        getResults(search.value)
    }
})

async function getResults(query){
    const response = await fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}&lang=${api.lang}`);
    const json = await response.json();
    displayResults(json);
}

function displayResults(weather){
    let now = new Date();
    let currentDate = getDate(now);
    let city = weather.name;
    let country = weather.sys.country;
    let description = weather.weather[0].description;
    let temp = Math.round(weather.main.temp);
    let tempMax = Math.round(weather.main.temp_max);
    let tempMin = Math.round(weather.main.temp_min);

    document.querySelector('.location').innerText = `${city} / ${country}`;
    document.querySelector('.date').innerText = `${currentDate}`;
    document.querySelector('.temp__now').innerText = `${temp}º`;
    document.querySelector('.temp__description').innerText = `${description}`;
    document.querySelector('.temp__minmax').innerText = `Min ${tempMax}º / Max ${tempMin}º`;
}

function getDate(d){
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const months = ['Janeiro', 'Fevereiro', 'Marçø', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hour = '0'+d.getHours();
    let minutes = d.getMinutes();

    return `${day}, ${date} de ${month} de ${year}, ${hour.slice(-2)}:${minutes}`;
}