async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    console.log(`post title test ${title}`);
    const post_text = document.querySelector('input[name="post-text"]').value;
    console.log(`post test ${post_text}`);
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log(`post id ${id}`);
    const response = await fetch(`/api/posts/${id}`, {
        
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);