const commentFormHandlers = async function (event){
    event.preventDefault();

    let post_id = window.location.toString().split("/")
   
    console.log(post_id[post_id.length-1].split("?")[0])

    post_id = post_id[post_id.length-1].split("?")[0];
    const comment_text = document.querySelector(
        "textarea[name='comment-body']"
    ).value;

    if(comment_text) {
        await fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify({
                post_id,
                comment_text,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        document.location.reload();
    }
};

document.querySelector("#comment-form").addEventListener("click", commentFormHandlers);