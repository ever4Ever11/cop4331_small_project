let hidefunction = (event) => {
    event.currentTarget.closest(".overlay").classList.remove("active");
}

document.getElementById("add-cancel").addEventListener("click", hidefunction);
document.getElementById("edit-cancel").addEventListener("click", hidefunction);
document.getElementById("delete-cancel").addEventListener("click", hidefunction);

document.getElementById("add-contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
});

document.getElementById("add-overlay-btn").addEventListener("click", () => {
    document.getElementById("add-overlay").classList.add("active");
});

document.getElementById("username").addEventListener("load", () => {
    this.innerHTML = getCookie("firstName");
});
try {
    document.getElementById("username").innerHTML = getCookie("firstName");
} catch {};

function displayCookie() {
    document.getElementById("cookie").innerHTML = document.cookie;
}

function getCookie(name) {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let index = cookie.indexOf(name);
        if (index != -1) {
            return cookie.substring(index + name.length + 1);
        }
    }
    return "";
}

function addContact() {
    let firstName = document.getElementById("add-firstName").value;
    let lastName = document.getElementById("add-lastName").value;
    let phone = document.getElementById("add-phone").value;
    let email = document.getElementById("add-email").value;

    try {
        let payload = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            userId: getCookie("userId")
        });
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "LAMPAPI/AddContact.php", true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (this.readyState != XMLHttpRequest.DONE) {
                return;
            }
            if (this.status == 200) {
                document.getElementById("add-overlay").classList.remove("active");
                window.alert(`${firstName} ${lastName} successfully added to contacts!`);
            } else {
                window.alert(`Error: (${this.status}) ${this.statusText}`);
            }
        };
        xhr.send(payload);
    } catch (e) {
        window.alert(`Error: ${e.message}`);
    }
}

function logout() {
    username = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName = ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "userId = ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}