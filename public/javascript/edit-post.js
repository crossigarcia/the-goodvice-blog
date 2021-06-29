async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_text = document.querySelector('input[name="post-text"]').value;
    const tagSelected = document.getElementById('tag-dropdown');
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
  //   console.log(tagSelected);
  //   const tagIds = [];

  //   for (let i = 0; i < tagSelected.options.length; i++) {
     
  //     tagIds.push(tagSelected.options[i].value);
      
  // }
  //   console.log(tagIds);
  //   //const tagSelected = [];
    

    const response = await fetch(`/api/posts/${id}`, {
        
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_text,
            
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