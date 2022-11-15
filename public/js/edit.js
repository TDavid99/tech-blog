// let post_id = window.location.toString().split("/")[
//     window.location.toString().split("/").length -1 
// ];
// post_id = post_id.split("?")[0]

async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector("input[name='post-title']").value;
    const body = document.querySelector("textarea[name='post-body']").value;
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    const response = await fetch("/api/posts/${id}", {
        method: "PUT",
        body: JSON.stringify({
            title,
            body,
        }),
        he
    })
}