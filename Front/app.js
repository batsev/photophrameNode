document.querySelector("#igForm").addEventListener("submit", e => {
  e.preventDefault();
  const IGNickname = document.querySelector("#basic-url").value;
  console.log(IGNickname);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:8000/get?profile=${IGNickname}`, true);
  xhr.onload = function() {
    if (this.status == 200) {
      var images = JSON.parse(this.responseText);
      console.log(images);
      var output = "";
      for (var i in images) {
        output += `<img src="${images[i]}" class="card-img-top">`;
      }
      document.querySelector("#gallery").innerHTML = output;
    }
  };
  xhr.send();
});
