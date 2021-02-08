const url = "https://covid-193.p.rapidapi.com/statistics";
const options = {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "12c92ef504msh73fb12b3fa0d984p1ad16djsn72f8afe0a019",
        "x-rapidapi-host": "covid-193.p.rapidapi.com"
    }
}


const countryCases = document.getElementById('country--cases');
const countryActive = document.getElementById('country--active');
const countryRecoverd = document.getElementById('country--recovered');
const countryDeaths = document.getElementById('country--deaths');

const theWorldCases = document.getElementById('theworld--cases');
const theWorldActive = document.getElementById('theworld--active');
const theWorldRecoverd = document.getElementById('theworld--recovered');
const theWorldDeaths = document.getElementById('theworld--deaths');

const regex = /\B(?=(\d{3})+(?!\d))/g;


window.onload = function () {
    getAllInformation(url, options);
}

function getAllInformation(url, options) {
    fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log(data.response[68]);
            renderCountry("Vietnam", data);
            renderTheWorld(data);
        })
        .catch(err => {
            console.error(err);
        });
}

function renderCountry(country, data) {
    for (let i = 0; i < data.response.length; i++) {
        if (data.response[i].country.toLowerCase() == "vietnam") {
            countryCases.innerHTML = data.response[i].cases.total.toString().replace(regex, ".");
            countryActive.innerHTML = data.response[i].cases.active.toString().replace(regex, ".");
            countryRecoverd.innerHTML = data.response[i].cases.recovered.toString().replace(regex, ".");
            countryDeaths.innerHTML = data.response[i].deaths.total.toString().replace(regex, ".");
            break;
        }

    }
}

function renderTheWorld(data) {
    for (let i = 0; i < data.response.length; i++) {
        if (data.response[i].country.toLowerCase() == "all") {
            theWorldCases.innerHTML = data.response[i].cases.total.toString().replace(regex, ".");
            theWorldActive.innerHTML = data.response[i].cases.active.toString().replace(regex, ".");
            theWorldRecoverd.innerHTML = data.response[i].cases.recovered.toString().replace(regex, ".");
            theWorldDeaths.innerHTML = data.response[i].deaths.total.toString().replace(regex, ".");
            break;
        }
    }
}
