document.getElementById("post-btn").addEventListener("submit", async function (event) {
    event.preventDefault();
    var title = document.getElementById("post-title").textContent;
    var text = document.getElementById("post-text").textContent;
    const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
            title,
            text,
        }),
        headers: {
        "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
})
