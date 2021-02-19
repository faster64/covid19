const dataRow = document.querySelector('#data .country');
const countries_API = "https://restcountries.eu/rest/v2/all";
let flagURLs = [];

(function renderDataTable() {
    const s = Date.now(); // starting time  
    Promise.all([getCountryData(countries_API), getDataFromAPI(API_URL, options)])
        .then(data => {
            const dataCountries = data[0];
            const dataCovid = data[1];
            let html = "";

            getFlagURLs(dataCountries);
            sortConfirmedCases(dataCovid);

            /* ------- prepare render ------- */
            for (let index = 0; index < dataCovid.response.length; index++) {
                /* get value */
                let country = dataCovid.response[index].country;
                let flagUrl = getFlagUrlFromCountry(country);
                let confirmedCases = dataCovid.response[index].cases.total || 0;
                let newCases = dataCovid.response[index].cases.new || 0;
                let deaths = dataCovid.response[index].deaths.total || 0;
                let newDeaths = dataCovid.response[index].deaths.new || 0;
                /* add to html variable */
                html = prepareRender(html, flagUrl, country, confirmedCases, newCases, deaths, newDeaths);
            }
            /* render to data-table */
            dataRow.innerHTML = html;
            try {
                /* convert to Vietnam time */
                let index = dataCovid.response[0].time.toString().search("T");
                let hours = (Number)(dataCovid.response[0].time.toString().substr(index + 1, 2)) + 7;
                if (hours >= 24) {
                    hours -= 24;
                }
                /* render */
                updated.innerHTML = "Data last updated: "
                    + dataCovid.response[0].time.toString()
                        .replace(/T\d{2}/g, " " + hours)
                        .replace(/\+00\:00/g, "");
            } catch (error) {
                console.log("Lỗi xíu nhẹ :v");
            };
            removeLoading();
            console.log("Loading time: ", (Date.now() - s)/1000 + "s")
        })
        .catch(err => {
            console.log(err);
        })
})();

function getCountryData(url) {
    return fetch(url).then(response => response.json());
}

function getFlagURLs(data) {
    for (let index = 0; index < data.length; index++) {
        let country = {
            flagURL: data[index].flag,
            country: data[index].name
        }
        flagURLs.push(country);
    }
}

function getFlagUrlFromCountry(country) {
    /* fix USA */
    if (country.toLowerCase() == "usa") country = "United States of America";
    /* ------------ */

    /* first way */
    for (let i = 0; i < flagURLs.length; i++) {
        if (flagURLs[i].country.toLowerCase() == country.toLowerCase()) {
            return flagURLs[i].flagURL;
        }
    }
    /* ------------ */

    /* the second way if the first way is not found */
    for (let i = 0; i < flagURLs.length; i++) {
        if (flagURLs[i].country.toLowerCase().search(country.toLowerCase().replace(/-/g, " ")) != -1) {
            return flagURLs[i].flagURL;
        }
    }
    /* ------------ */

}

function prepareRender(html, flagUrl, country, confirmedCases, newCases, deaths, newDeaths) {
    /* ignore some countries */
    let tmp = country.toLowerCase();
    if (tmp == "europe" || tmp == "north-america" || tmp == "south-america" || tmp == "asia" || tmp == "all") {
        return html;
    }
    /* ------------ */
    html +=
        `<div class="row">`
        + `<span class="col-3"> 
        <img src="${flagUrl}" alt="f">
        ${country} 
     </span>`
        + `<span class="col-3 text-center">${confirmedCases.toString().replace(regex, ".")}</span>`
        + `<span class="col-2 text-center">${newCases.toString().replace(regex, ".")}</span>`
        + `<span class="col-2 text-center">${deaths.toString().replace(regex, ".")}</span>`
        + `<span class="col-2 text-center">${newDeaths.toString().replace(regex, ".")}</span>`
        + `</div>`;
    return html;
}

function sortConfirmedCases(data) {
    data.response.sort((a, b) => b.cases.total - a.cases.total);
}



