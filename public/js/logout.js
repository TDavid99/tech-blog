const logout2 = async function() {
    const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
    });

    if(response.ok) {
        document.location.replace("/");
    } else {
        alert("unable to signout");
    }
};

document.querySelector("#logout-link")
.addEventListener("click", logout2);