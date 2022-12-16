var r = document.querySelector(':root');
const source = document.getElementById('hexcode');
const result = document.getElementById('result');

const inputHandler = function(e) {
    var hexstring = String("#" + e.target.value);

    r.style.setProperty('--primary', hexstring);

    var rgba = "rgb(" + hexToRgb("#" + e.target.value).r + "," + hexToRgb("#" + e.target.value).g + "," + hexToRgb("#" + e.target.value).b + ",0.16)";
    console.log(rgba);

    r.style.setProperty('--secondary', rgba);

    document.getElementById("snippet").innerHTML = '\{\n\t\"color\"\: \"#' + document.getElementById("hexcode").value + '\" \n\}';
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function copySnippet() {
    var copyText = document.getElementById("snippet");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);

    document.getElementById("snippet").innerHTML = "Copied to clipboard";
  }

document.getElementById("snippet").addEventListener("click", copySnippet);
source.addEventListener('input', inputHandler);
source.addEventListener('propertychange', inputHandler); // for IE8
// Firefox/Edge18-/IE9+ don’t fire on <select><option>
// source.addEventListener('change', inputHandler); 