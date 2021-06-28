async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_text = document.querySelector('input[name="post-text"]').value;
    const tagDrop = document.getElementById('tag-dropdown').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

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

async function tagHandler(event) {
    const tag_id = event.target.value;
    const tag_state = event.target.checked;
    const post_id = document.querySelector('input[name="id"]').value;
  
    const fetchOptions = {
      method: (tag_state ? 'POST' : 'DELETE'),
      body: JSON.stringify({
        post_id,
        tag_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    console.log(fetchOptions);
    const response = await fetch(`/api/posts/tag`, fetchOptions);
  
    if (response.ok) {
      console.log('success');
    } else {
      event.target.checked = !tag_state;
      alert(response.statusText);
    }
  }

document.querySelector('.tag-inputs').addEventListener('change', tagHandler);
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);