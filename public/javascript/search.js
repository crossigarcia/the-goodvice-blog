function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;

  input = document.getElementById("myInput");

  filter = input.value.toUpperCase();

  div = document.getElementById("myDropdown");

  a = div.getElementsByTagName("a");

  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

async function searchWord(event) {
  event.preventDefault();
  const searchQuery = document.getElementById("searchField").value;
  console.log(`**************${searchQuery}**************`);
  const response = await fetch(`/search/q=${searchQuery}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    console.log("ok");
    document.location.replace(`/search/q=${searchQuery}`);
  } else {
    console.log("not ok");
    alert(response.statusText);
  }
}


el = document.getElementById("searchbtn");
if (el) {
  el.addEventListener("click", searchWord);
}
