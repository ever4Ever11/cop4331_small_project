let hidefunction = (event) => {
    event.currentTarget.closest(".overlay").classList.remove("active");
}

document.getElementById("add-cancel").addEventListener("click", hidefunction);
document.getElementById("edit-cancel").addEventListener("click", hidefunction);
document.getElementById("delete-cancel").addEventListener("click", hidefunction);

document.getElementById("add-overlay-btn").addEventListener("click", () => {
    document.getElementById("add-overlay").classList.add("active");
});

function displayCookie() {
    document.getElementById("cookie").innerHTML = document.cookie;
}

function displayCookie() {
    document.getElementById("cookie").innerHTML = document.cookie;
}

function logout() {
    username = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}