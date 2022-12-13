const signupFormHandler = async function(event) {
    event.preventDefault();

    const  emailE1 = document.querySelector("#username-input-signup");
    const passwordE1 = document.querySelector("#password-input-signup");

    const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
            email:emailE1.value,
            password: passwordE1.value,
        }),
        headers: {"Content-Type": "application/json"},
    });

    if(response.ok) {
        document.location.replace("/dashboard");
    } else{
        alert("invaild sign up");
    }
};

document.querySelector("#signup-form")
.addEventListener("submit", signupFormHandler);