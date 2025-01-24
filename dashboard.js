let hidefunction = (event) => {
    event.currentTarget.closest(".overlay").classList.remove("active");
}

document.getElementById("add-cancel").addEventListener("click", hidefunction);
document.getElementById("edit-cancel").addEventListener("click", hidefunction);
document.getElementById("delete-cancel").addEventListener("click", hidefunction);

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

function searchContact() {
    let search = document.getElementById("search-input").value;
    
    try {
        payload = JSON.stringify({
            search: search,
            userId: getCookie("userId")
        });
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "LAMPAPI/SearchContacts.php", true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        xhr.onreadystatechange = function() {
            if (this.readyState != XMLHttpRequest.DONE) {
                return;
            } else if (this.status == 200) {
                displayContacts(JSON.parse(this.response).results);
            } else {
                window.alert(`Error: (${this.status}) ${this.statusText}`);
            }
        };
        xhr.send(payload);
    } catch (e) {
        window.alert(`Error: ${e.message}`);
    }
}

function displayContacts(contactList) {
    let table = document.getElementById("contacts-table-tbody");
    table.innerHTML = "";
    for (let i = 0; i < contactList.length; i++) {
        let contact = contactList[i];
        let row = document.createElement("tr");

        let firstName = document.createElement("td");
        firstName.innerHTML = contact.firstName;

        let lastName = document.createElement("td");
        lastName.innerHTML = contact.lastName;

        let phone = document.createElement("td");
        phone.innerHTML = contact.phone;

        let email = document.createElement("td");
        email.innerHTML = contact.email;

        row.append(firstName, lastName, phone, email);
        table.append(row);
    }
}

function addContact() {
    let firstName = document.getElementById("add-firstName").value;
    let lastName = document.getElementById("add-lastName").value;
    let email = document.getElementById("add-email").value;
    let phone = document.getElementById("add-phone").value;

    try {
        let payload = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            userId: getCookie("userId")
        });
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "LAMPAPI/AddContact.php", true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        xhr.onreadystatechange = function() {
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