const logInBtn = document.getElementById('my-signin2');
const logOutBtn = document.getElementById('my-signout2');

function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    logInBtn.style.display = "none";
    logOutBtn.style.display = "inline-block";
    auth2 = gapi.auth2.init();
    let profile = auth2.currentUser.get().getBasicProfile();
    setTimeout(() => {
        showPopup();
    }, 2000);
}

function onFailure(error) {
    console.log(error);
}

function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 200,
        'height': 40,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        logInBtn.style.display = "inline-block";
        logOutBtn.style.display = "none";
    });
}