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

async function tagSearch(event) {
  console.log("hai");

  event.preventDefault();

  const searchQuery = document
    .querySelector('#myInput')
    .value.trim();

//   const post_id = window.location.toString().split("/")[
//     window.location.toString().split("/").length - 1
//   ];

  if (searchQuery) {
    const response = await fetch(`/search/q=${searchQuery}`, {
      method: "GET",
      body: JSON.stringify({
        title,
        post_text,
        tagIds
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
    //   document.location.reload();
    document.reload();
    } else {
      alert(response.statusText);
    }
  }
}

// var e = $.Event( "keypress", { which: 13 } );
// document
//     .querySelector('#myInput')
//     .trigger(e)
//     .addEventListener('click', tagSearch);

document
    .querySelector(".searchTag")
    .addEventListener("click", filterFunction);




// async function searchFormHandler() {
// let query = document.querySelector('[name="srch"]').value;
// console.log(query);

//   const response = await fetch(`/search/q=${query}`, {
//     method: "GET",
//     body: JSON.stringify({
//       title,
//       post_text,
//       tagIds,
//     }),
//     headers: { 'Content-Type': 'application/json '},
//   });

//   if (response.ok) {
//     document.location.reload();
//   } else {
//     alert(response.statusText);
//   }
// };

// $(document).ready(function() {
// 	const bclick = document.getElementById('text-search');
// 	bclick.addEventListener('click', searchFormHandler);
// });

// document.getElementById('text-search').addEventListener('click', function() {
//   console.log('hello')
// });

