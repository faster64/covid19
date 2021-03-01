const API_URL = "https://covid-193.p.rapidapi.com/statistics";
const options = {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "12c92ef504msh73fb12b3fa0d984p1ad16djsn72f8afe0a019",
        "x-rapidapi-host": "covid-193.p.rapidapi.com"
    }
}
let getDataError = {value: false};

/* variables of country*/
const countryName = document.querySelector('.country--name h2');
const countryCases = document.getElementById('country--cases');
const countryActive = document.getElementById('country--active');
const countryRecoverd = document.getElementById('country--recovered');
const countryDeaths = document.getElementById('country--deaths');

/* variables of the world*/
const theWorldCases = document.getElementById('theworld--cases');
const theWorldActive = document.getElementById('theworld--active');
const theWorldRecoverd = document.getElementById('theworld--recovered');
const theWorldDeaths = document.getElementById('theworld--deaths');

const selectCountry = document.getElementById('select-country');
const updated = document.getElementById('last-update');



/* regular expression for format information */
const regex = /\B(?=(\d{3})+(?!\d))/g;

function getDataFromAPI(API_URL, options) {
    return fetch(API_URL, options).then(response => response.json());
}

