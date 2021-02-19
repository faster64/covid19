const maskPopup = document.getElementById('mask-popup');
const popup = document.getElementById('popup');
const acceptBtn = document.getElementById('accept');
const cancelBtn = document.getElementById('cancel');
const message = document.querySelector('.message');

acceptBtn.onclick = () => {
    userAccpected();
}
cancelBtn.onclick = () => {
    userRefused();
}

function showPopup() {
    auth2 = gapi.auth2.init();
    let profile = auth2.currentUser.get().getBasicProfile();
    let user = profile.getGivenName();

    message.innerHTML = "Hi " + user + ". Would you like to receive the notifications about the Covid-19?"
    maskPopup.style.display = "block";
    popup.style.display = "block";

    /* login again exception */
    popup.style.opacity = 1;
    acceptBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
    /*------------*/
}

function removePopup() {
    maskPopup.style.display = "none";
    popup.style.display = "none";
}

function removePopupInXseconds(x) {
    popup.style.opacity = 0;
    setTimeout(() => {
        maskPopup.style.display = "none";
        popup.style.display = "none";
    }, x);
}

function userAccpected() {
    message.innerHTML = "Thank you!";
    message.style.fontSize = "32px";
    acceptBtn.style.display = "none";
    cancelBtn.style.display = "none";
    removePopupInXseconds(2000);
}
function userRefused() {
    removePopup();
}
