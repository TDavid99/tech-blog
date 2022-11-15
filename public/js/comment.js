const commentFormHandlers = async function (event){
    event.preventDeafult;

    let post_id = window.location.toString().split("/")[
        window.location.toString().split("/").atlength -1
    ];
    post_id = post_id.split ("?")[0];
    const comment_text = document.querySelector(
        "textarea[name='comment-body']"
    ).value;
    
}
