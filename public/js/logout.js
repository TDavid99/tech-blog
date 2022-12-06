const logout = async function() {
    const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: { " Content-Type": "application/json"},
    });

    if(response.ok) {
        document.location.replace("/");
    } else {
        alert("unable to logout");
    }
};

let logoutLink = document.querySelector("#logout-link")
logoutLink.addEventListener("click", logout);