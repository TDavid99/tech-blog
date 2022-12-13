async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector("input[name='post-title']").value;
    const post_url = document.querySelector("textarea[name='post-body']").value;

    await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify({
            title,
            post_url,
        }),
        headers: {"Content-Type":"application/json"},
    });

    document.location.replace("/dashboard");
};

document.querySelector("#new-post-form")
.addEventListener("submit", newFormHandler);