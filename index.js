$(document).ready(function () {
    $(".toggler").on("click", function() {
        $(".noflip").toggleClass("flip");
    });
});

function login() {
    let username = document.getElementById("loginUsernameInput").value;
    let password = document.getElementById("loginPasswordInput").value;
    try {
        let payload = JSON.stringify({
            login: username,
            password: password
        });
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "LAMPAPI/login.php", true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (this.readyState != XMLHttpRequest.DONE) {
                return;
            }
            if (this.status == 200) {
                let response = JSON.parse(this.response);
                if (response.error != "") {
                    window.alert("😭 A user with this username/password was not found! \n Please correct your username/password.");
                } else {
                    document.cookie = `userId = ${response.id}`;
                    document.cookie = `firstName = ${response.firstName}`;
                    window.location.href = "dashboard.html";
                }
            } else if (this.status == 401) {
                window.alert("Error: Authentification failed! Correct your username and password.");
            } else {
                window.alert(`Error: (${this.status}) ${this.statusText}`);
            }
        };
        xhr.send(payload);
    } catch (e) {window.alert(`Error: ${e.message}`);}
}

function register() {
    let username = document.getElementById("registerUsernameInput").value;
    let password = document.getElementById("registerPasswordInput").value;
    let firstname = document.getElementById("registerFirstnameInput").value;
    let lastname = document.getElementById("registerLastnameInput").value;
    try {
        let payload = JSON.stringify({
            login: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
        });
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "LAMPAPI/register.php", true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (this.readyState != XMLHttpRequest.DONE) {
                return;
            }
            if (this.status == 200) {
                 window.alert("You have successful registered!");
            } else if (this.status == 409) {
                window.alert("Error: Username already taken.");
             } else {
                window.alert(`Error: (${this.status}) ${this.statusText}`);
            }
        };
        xhr.send(payload);
    } catch (e) {window.alert(`Error: ${e.message}`);}
}
