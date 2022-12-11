async function loginFormHandler(event) {
    event.preventDefault();


const emailEl = document.querySelector("#Email-data");
const passwordE1 = document.querySelector("#Password-data");
console.log(emailEl.value, passwordE1.value);
const response = await fetch("/api/user/login", {
    method: "POST",
    body:JSON.stringify({
        email: emailEl.value,
        password: passwordE1.value,
    }),
    headers: {"Content-Type": "application/json"},
});

if (response.ok) {
    document.location.replace("/dashboard");
    console.log(emailEl.value);
} else{
    alert("try again invald login");
}
};
document.querySelector("#login").addEventListener("click", loginFormHandler);
