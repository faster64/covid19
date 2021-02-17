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
                return;
            }
        }
    }
}).catch(error => console.log(error));

window.onload = function () {
    showAll();
    lastUpdate();
}

