$(document).ready(function () {
    $(".toggler").on("click", function() {
        $(".noflip").toggleClass("flip");
    });
});
/*password validation*/
var passwordInput = document.getElementById("registerPasswordInput");
var passwordMessageItems = document.getElementsByClassName("password-message-item");
var passwordMessage = document.getElementById("password-message");


passwordInput.onfocus = function () {
    passwordMessage.style.display = "block";
}

// After clicking outside of password input hide the message
passwordInput.onblur = function () {
    passwordMessage.style.display = "none";
}
passwordInput.onkeyup = function () {
    // checking uppercase letters
    let uppercaseRegex = /[A-Z]/g;
    if (passwordInput.value.match(uppercaseRegex)) {
        passwordMessageItems[1].classList.remove("invalid");
        passwordMessageItems[1].classList.add("valid");
    } else {
        passwordMessageItems[1].classList.remove("valid");
        passwordMessageItems[1].classList.add("invalid");
    }

    // checking lowercase letters
    let lowercaseRegex = /[a-z]/g;
    if (passwordInput.value.match(lowercaseRegex)) {
        passwordMessageItems[0].classList.remove("invalid");
        passwordMessageItems[0].classList.add("valid");
    } else {
        passwordMessageItems[0].classList.remove("valid");
        passwordMessageItems[0].classList.add("invalid");
    }

    // checking the number
    let numbersRegex = /[0-9]/g;
    if (passwordInput.value.match(numbersRegex)) {
        passwordMessageItems[2].classList.remove("invalid");
        passwordMessageItems[2].classList.add("valid");
    } else {
        passwordMessageItems[2].classList.remove("valid");
        passwordMessageItems[2].classList.add("invalid");
    }

    // Checking length of the password
    if (passwordInput.value.length >= 8) {
        passwordMessageItems[3].classList.remove("invalid");
        passwordMessageItems[3].classList.add("valid");
    } else {
        passwordMessageItems[3].classList.remove("valid");
        passwordMessageItems[3].classList.add("invalid");
    }
}


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
                document.getElementById("loginUsernameInput").value = username;
                document.getElementById("loginPasswordInput").value = password;
                login();
            } else if (this.status == 409) {
                window.alert("Error: Username already taken.");
             } else {
                window.alert(`Error: (${this.status}) ${this.statusText}`);
            }
        };
        xhr.send(payload);
    } catch (e) {window.alert(`Error: ${e.message}`);}
}
