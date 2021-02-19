const url = "https://dealhuntersuite.com/api/corona";
const total = document.querySelector('.total span');
const dataRow = document.querySelector('.data');

function getData(url) {
    return fetch(url).then(response => response.json());
}

(function render() {
    const s = Date.now();
    getData(url)
        .then(data => {
            const list = data.data.vietnam.list;
            const cases = data.data.vietnam.confirmed;
            const biggest = list[0].confirmed;
            let html = "";

            total.innerHTML = list.length + " TỈNH THÀNH CÓ CA NHIỄM COVID-19";
            for (let i = 0; i < list.length; i++) {
                let line = 6 * list[i].confirmed / biggest;
                html += `<div class="row">`
                    + `<span class="col-2">${list[i].name} </span>`
                    + ` <span class="col-1 text-center" style="color:#ff9c00;">${list[i].confirmed}</span> 
                        <span class="col-1 text-center" style="color:green;">${list[i].recovered}</span> 
                        <span class="col-1 text-center" style="color:red;">${list[i].deaths}</span>`
                    + `<div class="col-${Math.ceil(line)} line"></div>`
                    + `</div>`
            }
            dataRow.innerHTML = html;
            console.log( "Loading time:", (Date.now() - s)/1000 + "s");
        })
})();