const url = "https://dealhuntersuite.com/api/corona";
const total = document.querySelector('.total span');
const dataRow = document.querySelector('.data');
const s = Date.now();

render();
window.onresize = () => {
    render();
};

function getData(url) {
    return fetch(url).then(response => response.json());
}

function render() {
    getData(url)
        .then(data => {
            const list = data.data.vietnam.list;
            const cases = data.data.vietnam.confirmed;
            const biggest = list[0].confirmed;
            const widthOfColumn = total.offsetWidth / 12; /* because total has class col-12 */
            let html = "";

            total.innerHTML = list.length + " TỈNH THÀNH CÓ CA NHIỄM COVID-19";
            for (let i = 0; i < list.length; i++) {
                let line = 5 * list[i].confirmed / biggest;
                html += `<div class="row">`
                    + `<span class="col-3 col-sm-2">${list[i].name} </span>`
                    + ` <span class="col-1 text-center" style="color:#ff9c00;">${list[i].confirmed}</span> 
                        <span class="col-1 text-center" style="color:green;">${list[i].recovered}</span> 
                        <span class="col-1 text-center" style="color:red;">${list[i].deaths}</span>`
                    + `<div class="line" style="width: ${line * widthOfColumn + "px"}"></div>`
                    + `</div>`
            }
            dataRow.innerHTML = html;
            removeLoading();
            CuongNguyenBelongsToVietnam();
            console.log("Loading time:", (Date.now() - s) / 1000 + "s");
        })
};

function CuongNguyenBelongsToVietnam() {
    console.clear();
    console.log("Hoàng Sa, Trường Sa là của Việt Nam!");
    console.log("Cương Nguyễn là của Việt Nam!");
}
