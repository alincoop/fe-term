var r = document.querySelector(":root");
const source = document.getElementById("hexcode");
const result = document.getElementById("result");

const inputHandler = function (e) {
  var hexstring = String(e.target.value);

  var spanCaption = document.getElementById("hexcaption");
  spanCaption.textContent = hexstring;

  r.style.setProperty("--primary", hexstring);

  var rgba =
    "rgb(" +
    hexToRgb(e.target.value).r +
    "," +
    hexToRgb(e.target.value).g +
    "," +
    hexToRgb(e.target.value).b +
    ",0.16)";

  r.style.setProperty("--secondary", rgba);
};

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function copySnippet() {
  var copyText =
    '{\n    "color": "' + document.getElementById("hexcode").value + '" \n}';
  navigator.clipboard
    .writeText(copyText)
    .then(function () {
      console.log("Copied - " + document.getElementById("hexcode").value);
      showTooltip("Copied to clipboard");
    })
    .catch(function (error) {
      console.error("Error copying text: ", error);
    });
}

function showTooltip(message) {
  var tooltip = document.createElement("div");
  tooltip.innerText = message;
  tooltip.style.position = "fixed";
  tooltip.style.top = "24px";
  tooltip.style.right = "24px";
  tooltip.style.padding = "16px 24px";
  tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  tooltip.style.color = "white";
  tooltip.style.zIndex = "1000";
  tooltip.style.fontSize = "14px";
  tooltip.style.borderRadius = "4px";

  document.body.appendChild(tooltip);

  setTimeout(function () {
    tooltip.remove();
  }, 1000); // Remove tooltip after 1 seconds
}

document.getElementById("copyButton").addEventListener("click", copySnippet);
source.addEventListener("input", inputHandler);
source.addEventListener("propertychange", inputHandler); // for IE8
// Firefox/Edge18-/IE9+ don’t fire on <select><option>
// source.addEventListener('change', inputHandler);
