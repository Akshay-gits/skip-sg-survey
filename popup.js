const toggleButton = document.getElementById("toggleButton");
const statusText = document.getElementById("status");

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['enabled'], (result) => {
    const isEnabled = result.enabled !== false; 
    updateButtonState(isEnabled);
  });
});


toggleButton.addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "toggle" }, function (response) {
    const isEnabled = response.enabled;
    updateButtonState(isEnabled);
  });
});


function updateButtonState(isEnabled) {
  if (isEnabled) {
    toggleButton.classList.remove("off");
    toggleButton.classList.add("on");
    toggleButton.textContent = "ON";
    statusText.textContent = "Extension is ON";
    toggleButton.style.backgroundColor = "#4CAF50";  
  } else {
    toggleButton.classList.remove("on");
    toggleButton.classList.add("off");
    toggleButton.textContent = "OFF";
    statusText.textContent = "Extension is OFF";
    toggleButton.style.backgroundColor = "#f44336"; 
  }
}
