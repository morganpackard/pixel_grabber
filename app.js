colorCountsObj = {}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function calculateColorCounts(arr, pal) {

  colorCountsObj = {};

  for(var i=0; i<arr.length; i=i+4){
    var color = rgbToHex(arr[i], arr[i+1], arr[i+2]);

    if(colorCountsObj.hasOwnProperty(color)){
      colorCountsObj[color].count += 1;
    }
    else{
      colorCountsObj[color] = {
        "count" : 1
      }
    }

  }

  return colorCountsObj;
}


let img;
let opts = {
    colors: 2
    ,             // desired palette size
    method: 2,               // histogram method, 2: min-population threshold within subregions; 1: global top-population
    boxSize: [64,64],        // subregion dims (if method = 2)
    boxPxls: 2,              // min-population threshold (if method = 2)
    initColors: 4096,        // # of top-occurring colors  to start with (if method = 1)
    minHueCols: 0,           // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
    dithKern: null,          // dithering kernel name, see available kernels in docs below
    dithDelta: 0,            // dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference
    dithSerp: false,         // enable serpentine pattern dithering
    palette: [],             // a predefined palette to start with in r,g,b tuple format: [[r,g,b],[r,g,b]...]
    reIndex: false,          // affects predefined palettes only. if true, allows compacting of sparsed palette once target palette size is reached. also enables palette sorting.
    useCache: true,          // enables caching for perf usually, but can reduce perf in some cases, like pre-def palettes
    cacheFreq: 10,           // min color occurance count needed to qualify for caching
    colorDist: "euclidean",  // method used to determine color distance, can also be "manhattan"
};

let q = new RgbQuant(opts);

document.addEventListener("DOMContentLoaded", function () {
  img = new Image();
  img.width = 40;
  // img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg/402px-Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg";
  img.src = "/local_mona_lisa.jpg"
  //document.querySelector("body").appendChild(img);

  img.onload = function (){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0, c.width, c.height);

    // analyze histograms
    q.sample(img);

    // build palette
    pal = q.palette();

    // reduce images
    outA = q.reduce(ctx);

    calculatedColorCountsObj = calculateColorCounts(outA, pal);

  }
  // img.src = "/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg";
  // // img.src = "/FF4D00-0.8.png";
  // document.querySelector("body").appendChild(img);
  //
  // img.addEventListener("load", function () {
  //
  //
  // } );




});
