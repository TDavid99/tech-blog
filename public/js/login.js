async function loginFormHandler(event) {
    event.preventDefault();


const usernameE1 = document.querySelector("username-data-login");
const passwordE1 = document.querySelector("password-data-login");

const response = await fetch("/api/user/login", {
    method: "POST",
    body:JSON.stringify({
        username: usernameE1.value,
        password: passwordE1.value,
    }),
    headers: {"Content-Type": "application/json"},
});

if (response.ok) {
    document.location.replace("/dashboard");
    console.log(usernameE1.value);
} else{
    alert("try again invald login");
}
};
document.querySelector("login-form").addEventListener("submit", loginFormHandler);



