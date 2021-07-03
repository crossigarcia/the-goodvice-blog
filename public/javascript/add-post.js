// Get the modal
var modal = document.getElementById("modalOne");
// Get the button that opens the modal
var btn = document.getElementById("button");
var closeBtn = document.getElementById("cancel");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal
btn.onclick = function () {
modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
modal.style.display = "none";
}
closeBtn.onclick = function () {
modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}

var myWidget = cloudinary.createUploadWidget({
    cloudName: 'goodviceuser', 
    uploadPreset: 'ozm4ur9t'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
        document.querySelector('input[name="image_url"]').value = result.info.secure_url;
      }
    }
  )
  document.getElementById("upload_widget").addEventListener("click", function(){
    myWidget.open();
  }, false);
  
async function newFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('textarea[name="post-text"]').value;
  const tagDrop = document.getElementById("tag-dropdown");
  const image_url = document.querySelector('input[name="image_url"]').value;
  const tagIds = [];
  for (let i = 0; i < tagDrop.options.length; i++) {
    if (tagDrop.options[i].selected) {
      tagIds.push(tagDrop.options[i].value);
    }
  }
  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      post_text,
      tagIds,
      image_url
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}
function openTheForm() {
document.getElementById("popupForm").style.display = "block";
}
function closeTheForm() {
document.getElementById("popupForm").style.display = "none";
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

