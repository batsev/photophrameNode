const gallery = document.querySelector("#gallery");

function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className} mt-3 fadein`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const form = document.querySelector("#igForm");
  container.insertBefore(div, form);
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

function showImages(IGNickname) {
  document.querySelector("#basic-url").value = "";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:8000/get?profile=${IGNickname}`, true);
  xhr.onload = function() {
    if (this.status == 200) {
      var images = JSON.parse(this.responseText);
      var output = "";
      for (var i in images) {
        output += `<div class="myCard"><img src="${
          images[i]
        }" class="card-img-top myImage"></div>`;
      }
      gallery.classList.add("fadein");
      gallery.innerHTML = output;
      setTimeout(() => gallery.classList.remove("fadein"), 5000);
    } else if (this.status == 401) {
      showAlert("Account is private!", "danger");
    } else {
      showAlert("No such account!", "danger");
    }
  };
  xhr.send();
}

document.querySelector("#igForm").addEventListener("submit", e => {
  e.preventDefault();
  const IGNickname = document.querySelector("#basic-url").value;
  if (IGNickname == "") {
    showAlert("Please fill the field", "danger");
  } else {
    showImages(IGNickname);
  }
});
