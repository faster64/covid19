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
const updated = document.getElementById('last-updated');

/* regular expression for format information */
const regex = /\B(?=(\d{3})+(?!\d))/g;

function getDataFromAPI(API_URL, options) {
    return fetch(API_URL, options).then(response => response.json());
}

