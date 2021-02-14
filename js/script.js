const API_URL = "https://covid-193.p.rapidapi.com/statistics";
const options = {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "12c92ef504msh73fb12b3fa0d984p1ad16djsn72f8afe0a019",
        "x-rapidapi-host": "covid-193.p.rapidapi.com"
    }
}

const dataFromAPI = getDataFromAPI(API_URL, options);

let indexOfVietnam = null;
let indexOfTheWorld = null;

/* get index of Vietnam all the world */
dataFromAPI.then(data => {
    for (let i = 0; i < data.response.length; i++) {
        const country = data.response[i].country.toLowerCase();
        if (country == "vietnam" || country == "all") {
            country == "vietnam" ? (indexOfVietnam = i) : (indexOfTheWorld = i);
            if (indexOfVietnam != null && indexOfTheWorld != null) {
                document.getElementById('default-country').value = indexOfVietnam;
                return;
            }
        }
    }
}).catch(error => console.log(error));

window.onload = function () {
    showAll();
    renderSelection();
    lastUpdate();
    selectCountry.onchange = () => {
        console.clear();
        renderInformation(selectCountry.value, false);
    }
}

