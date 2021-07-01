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
//   console.log("hai");

  event.preventDefault();

  const searchQuery = document
    .querySelector('#searchField')
    .value.trim();

//   const post_id = window.location.toString().split("/")[
//     window.location.toString().split("/").length - 1
//   ];
    console.log(`********************${searchQuery}********************`);
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

// var e = document.addEventListener( "keypress", { which: 13 } );
// document
//     .querySelector('#searchField')
//     .trigger(e)
//     .addEventListener('click', tagSearch);

var input = document.getElementById('searchField');
input.addEventListener('keyup', function (event) {
    if (event.key === 13) {
        event.preventDefault;
        document.getElementById('searchbtn').click();
    }
});

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

