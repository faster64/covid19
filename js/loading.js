const loading = document.getElementById('loading');
let loadingText = "Loading...";
let pos = 7; /* first dot */
let interval = null;

interval = setInterval(() => {
    loading.innerHTML = loadingText.substr(0, pos++);
    if (pos == 11) {
        pos = 7;
    }
}, 300);

function removeLoading() {
    clearInterval(interval);
    loading.style.display = "none";
}