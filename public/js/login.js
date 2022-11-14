async function loginFormHandler(event) {
    event.preventDefault();
}

const usernameE1 = document.querySelector("username-data-login");
const passwordE1 = document.querySelector("password-data-login");

const response = await fetch("/api/user/login", {
    method: "POST",
    body:JSON.stringify({
        username: usernameE1.value
    })
})
