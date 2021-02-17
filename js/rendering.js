function showAll() {
    dataFromAPI
        .then(function (data) {
            renderInformation(indexOfVietnam, false);
            renderInformation(indexOfTheWorld, true);
        })
        .catch(err => {
            console.error(err);
        });
}

function renderInformation(index, isTheworld) {
    const cases = isTheworld ? theWorldCases : countryCases;
    const active = isTheworld ? theWorldActive : countryActive;
    const recoverd = isTheworld ? theWorldRecoverd : countryRecoverd;
    const deaths = isTheworld ? theWorldDeaths : countryDeaths;

    dataFromAPI
        .then(data => {
            try {
                console.log("[" + data.response[index].country + "] " + "New cases: " + data.response[index].cases.new);
                if (!isTheworld) {
                    let country = data.response[index].country;
                    country = country.toLowerCase() == "vietnam" ? "Việt Nam" : country;
                    countryName.innerHTML = country;
                    console.log("[" + data.response[index].country + "] " + "Population: " + data.response[index].population.toString().replace(regex, ".") + " people");
                }
                cases.innerHTML = data.response[index].cases.total.toString().replace(regex, ".");
                active.innerHTML = data.response[index].cases.active.toString().replace(regex, ".");
                recoverd.innerHTML = data.response[index].cases.recovered.toString().replace(regex, ".");
                deaths.innerHTML = data.response[index].deaths.total.toString().replace(regex, ".");
            } catch (error) {
                console.clear();
                console.log("Lỗi xíu nhẹ :v");
            };
        })
}

function lastUpdate() {
    dataFromAPI
        .then(data => {
            try {
                /* convert to Vietnam time */
                let index = data.response[0].time.toString().search("T");
                let hours = (Number)(data.response[0].time.toString().substr(index + 1, 2)) + 7;
                if (hours >= 24) {
                    hours -= 24;
                }
                /* render */
                updated.innerHTML = data.response[0].time.toString().replace(/T\d{2}/g, " " + hours).replace(/\+00\:00/g, "");
            } catch (error) {
                console.log("Lỗi xíu nhẹ :v");
            };
        })
}
