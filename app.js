document.addEventListener("DOMContentLoaded", function () {
  let img = new Image();
  img.width = 40;
  // img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg/402px-Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg";
  img.src = "/local_mona_lisa.jpg"
  //document.querySelector("body").appendChild(img);

  img.onload = function (){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0, c.width, c.height);

    data = ctx.getImageData(0, 0, 1, 1).data;

    console.log(data);
  }
});
