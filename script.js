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
    '{\n  "color": "' + document.getElementById("hexcode").value + '"\n}';
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
  var span = document.getElementById("hexcaption");
  var parent = span.parentElement;
  var tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.innerText = message;

  // Append tooltip to the button's parent element
  parent.appendChild(tooltip);

  // Position the tooltip relative to the button
  // var buttonRect = button.getBoundingClientRect();
  // var tooltipRect = tooltip.getBoundingClientRect();

  // tooltip.style.position = "absolute";
  // tooltip.style.top =
  //   buttonRect.top +
  //   window.scrollY -
  //   tooltipRect.height / 2 +
  //   buttonRect.height / 2 +
  //   "px";
  // tooltip.style.left = buttonRect.right + window.scrollX + 8 + "px"; // Adjust 8px to move it to the right of the button

  // Remove tooltip after 1 second
  setTimeout(function () {
    if (tooltip && tooltip.parentElement) {
      tooltip.parentElement.removeChild(tooltip);
    }
  }, 1000);
}

function randomColor() {
  // Function to generate a two-digit hex value
  function randomHex() {
    return Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
  }

  // Array of the three color channels
  let channels = ["00", "00", "00"];

  // Determine the number of channels to set to '00'
  const numZeroChannels = Math.floor(Math.random() * 2) + 1; // 1 or 2 channels

  // Randomly select which channels will remain '00'
  let zeroChannels = [];
  while (zeroChannels.length < numZeroChannels) {
    let index = Math.floor(Math.random() * 3);
    if (!zeroChannels.includes(index)) {
      zeroChannels.push(index);
    }
  }

  // Fill in the remaining channels with random hex values
  for (let i = 0; i < 3; i++) {
    if (!zeroChannels.includes(i)) {
      channels[i] = randomHex();
    }
  }

  // Join the channels into a hex color string
  let randColorHex = "#" + channels.join("");

  console.log("Random color: " + randColorHex);

  // Set the value of the input field and trigger the inputHandler
  source.value = randColorHex;
  source.dispatchEvent(new Event("input"));
}

document.getElementById("copyButton").addEventListener("click", copySnippet);
document.getElementById("randomButton").addEventListener("click", randomColor);

source.addEventListener("input", inputHandler);
source.addEventListener("propertychange", inputHandler); // for IE8
// Firefox/Edge18-/IE9+ don’t fire on <select><option>
// source.addEventListener('change', inputHandler);
