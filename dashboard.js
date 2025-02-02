let hidefunction = (event) => {
    event.currentTarget.closest(".overlay").classList.remove("active");
}

document.getElementById("add-cancel").addEventListener("click", hidefunction);
document.getElementById("edit-cancel").addEventListener("click", hidefunction);
document.getElementById("delete-cancel").addEventListener("click", hidefunction);

document.getElementById("add-contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
});

document.getElementById("edit-contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
});

document.getElementById("delete-contact-form").addEventListener("submit", (event) => {
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

function populateContacts() {
    try {
        payload = JSON.stringify({
            search: '',
            userId: getCookie("userId")
        });
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "LAMPAPI/search-contacts.php", true);
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

function searchContact() {
    let search = document.getElementById("search-input").value;
    
    try {
        payload = JSON.stringify({
            search: search,
            userId: getCookie("userId")
        });
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "LAMPAPI/search-contacts.php", true);
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
        row.setAttribute("id", `contact-${contact.id}`);

        let firstName = document.createElement("td");
        firstName.innerHTML = contact.firstName;
        firstName.className = "first-name";

        let lastName = document.createElement("td");
        lastName.innerHTML = contact.lastName;
        lastName.className = "last-name";

        let phone = document.createElement("td");
        phone.innerHTML = contact.phone;
        phone.className = "phone";

        let email = document.createElement("td");
        email.innerHTML = contact.email;
        email.className = "email";

        let actions = document.createElement("td");
        actions.innerHTML = `
            <button class="button" id="edit-button" aria-label="edit button" onclick="activateEdit(${contact.id})">
            <i class="fa fa-edit" id="edit-icon" aria-hidden="true"></i>
            </button>
            <button class="button" id="delete-button" aria-label="delete button" onclick="activateDelete(${contact.id})">
            <i class="fa fa-trash" id="delete-icon" aria-hidden="true"></i>
            </button>
        `;

        row.append(firstName, lastName, phone, email, actions);
        table.append(row);
    }
}

function activateEdit(id) {
    let overlay = document.getElementById("edit-overlay");
    overlay.classList.add("active");
    document.getElementById("edit-id").value = id;
    let contact = document.getElementById(`contact-${id}`);
    document.getElementById("edit-firstName").value = contact.getElementsByClassName("first-name")[0].innerHTML;
    document.getElementById("edit-lastName").value = contact.getElementsByClassName("last-name")[0].innerHTML;
    document.getElementById("edit-phone").value = contact.getElementsByClassName("phone")[0].innerHTML;
    document.getElementById("edit-email").value = contact.getElementsByClassName("email")[0].innerHTML;
}

function activateDelete(id) {
    let overlay = document.getElementById("delete-overlay");
    overlay.classList.add("active");
    document.getElementById("delete-id").value = id;
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
        xhr.open("POST", "LAMPAPI/add-contact.php", true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        xhr.onreadystatechange = function() {
            if (this.readyState != XMLHttpRequest.DONE) {
                return;
            }
            if (this.status == 200) {
                let contact_id = JSON.parse(this.response).id;

                let table = document.getElementById("contacts-table-tbody");

                let row = document.createElement("tr");
                row.setAttribute("id", `contact-${contact_id}`);

                let firstNameE = document.createElement("td");
                firstNameE.innerHTML = firstName;
                firstNameE.className = "first-name";

                let lastNameE = document.createElement("td");
                lastNameE.innerHTML = lastName;
                lastNameE.className = "last-name";

                let phoneE = document.createElement("td");
                phoneE.innerHTML = phone;
                phoneE.className = "phone";

                let emailE = document.createElement("td");
                emailE.innerHTML = email;
                emailE.className = "email";

                let actions = document.createElement("td");
                actions.innerHTML = `
                    <button class="button" id="edit-button" onclick="activateEdit(${contact_id})">
                    <i class="fa fa-edit" id="edit-icon" aria-hidden="true"></i>
                    </button>
                    <button class="button" id="delete-button" onclick="activateDelete(${contact_id})">
                    <i class="fa fa-trash" id="delete-icon" aria-hidden="true"></i>
                    </button>
                `;

                row.appendChild(firstNameE);
                row.appendChild(lastNameE);
                row.appendChild(phoneE);
                row.appendChild(emailE);
                row.appendChild(actions);
                table.appendChild(row);

                document.getElementById("add-overlay").classList.remove("active");
                
                document.getElementById("add-firstName").value = "";
                lastName = document.getElementById("add-lastName").value = "";
                phone = document.getElementById("add-phone").value = "";
                email = document.getElementById("add-email").value = "";
            } else {
                window.alert(`Error: (${this.status}) ${this.statusText}`);
            }
        };
        xhr.send(payload);
    } catch (e) {
        window.alert(`Error: ${e.message}`);
    }
}

function editContact() {
    let contactId = document.getElementById("edit-id").value;
    let firstName = document.getElementById("edit-firstName").value;
    let lastName = document.getElementById("edit-lastName").value;
    let phone = document.getElementById("edit-phone").value;
    let email = document.getElementById("edit-email").value;

    try {
        let payload = JSON.stringify({
            ID: contactId,
            FirstName: firstName,
            LastName: lastName,
            Phone: phone,
            Email: email
        });
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "LAMPAPI/edit-contact.php", true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        xhr.onreadystatechange = function() {
            if (this.readyState != XMLHttpRequest.DONE) {
                return;
            }
            if (this.status == 200) {
                let contact = document.getElementById(`contact-${contactId}`);
                contact.getElementsByClassName("first-name")[0].innerHTML = firstName;
                contact.getElementsByClassName("last-name")[0].innerHTML = lastName;
                contact.getElementsByClassName("phone")[0].innerHTML = phone;
                contact.getElementsByClassName("email")[0].innerHTML = email;

                document.getElementById("edit-overlay").classList.remove("active");               
            } else {
                window.alert(`Error: (${this.status}) ${this.statusTest}`);
            }
        };
        xhr.send(payload);
    } catch (e) {
        window.alert(`Error: ${e.message}`);
    }
}

function deleteContact() {
    let contactId = document.getElementById("delete-id").value;

    try {
        let payload = JSON.stringify({
            ID: contactId
        });
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "LAMPAPI/delete-contact.php", true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        xhr.onreadystatechange = function() {
            if (this.readyState != XMLHttpRequest.DONE) {
                return;
            }
            if (this.status == 200) {
                let contact = document.getElementById(`contact-${contactId}`);
                console.log(contact);
                contact.parentNode.removeChild(contact);
                console.log(contact);
                document.getElementById("delete-overlay").classList.remove("active");               
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